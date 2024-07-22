"use client";
import React, { useState, useEffect } from "react";
import { RefreshIcon } from "@/app/assets/Icon";
import SelectOption from "./Util/Select";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";
import DoubleRangeSlider from "./Util/DoubleRangeSlider";

export const Filters = ({ table }) => {
  const [name, setName] = useState("");
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [category, setCategory] = useState([]);
  const [subcategoryOptions, setSubcategoryOptions] = useState([]);
  const [subcategory, setSubcategory] = useState([]);
  const [createdAt, setCreatedAt] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [updatedAt, setUpdatedAt] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [price, setPrice] = useState([0, 100]);
  const [salePrice, setSalePrice] = useState([0, 100]);

  useEffect(() => {
    const generateFacetsWithCounts = (columnId) => {
      const facetedRowModel = table.getColumn(columnId).getFacetedRowModel();
      const counts = facetedRowModel.rows.reduce((acc, row) => {
        const value = row.original[columnId];
        if (value in acc) {
          acc[value]++;
        } else {
          acc[value] = 1;
        }
        return acc;
      }, {});
      return Object.entries(counts).map(([key, count]) => ({
        value: key,
        count: count,
      }));
    };

    const categoryFacet = generateFacetsWithCounts("category");
    const subcategoryFacet = generateFacetsWithCounts("subcategory");

    setCategoryOptions(categoryFacet);
    setSubcategoryOptions(subcategoryFacet);
  }, [table]);

  return (
    <div className="flex flex-col gap-2">
      <Cover
        title="Name"
        clearInput={() => {
          setName("");
        }}
      >
        <input
          id="filter-name"
          value={name}
          autoComplete="new-password"
          onChange={(e) => setName(e.target.value)}
          className="w-[95%] py-3 px-2 border-2 border-gray-300 rounded focus:outline-none focus:ring-blue-400 focus:ring-1 hover:border-blue-400 text-sm"
        />
      </Cover>
      <Cover
        title="Category"
        clearInput={() => {
          setCategory([]);
        }}
      >
        <SelectOption
          items={category}
          optionList={categoryOptions.map((option) => ({
            label: `${option.value} (${option.count})`,
            value: option.value,
          }))}
          setItems={setCategory}
          optionalClass="w-[95%]"
        />
      </Cover>
      <Cover
        title="Subcategory"
        clearInput={() => {
          setSubcategory([]);
        }}
      >
        <SelectOption
          items={subcategory}
          optionList={subcategoryOptions.map((option) => ({
            label: `${option.value} (${option.count})`,
            value: option.value,
          }))}
          setItems={setSubcategory}
          optionalClass="w-[95%]"
        />
      </Cover>
      <Cover
        title="Created At"
        clearInput={() => {
          setCreatedAt([
            {
              startDate: new Date(),
              endDate: new Date(),
              key: "selection",
            },
          ]);
        }}
      >
        <DateRange
          editableDateInputs={true}
          onChange={(item) => setCreatedAt([item.selection])}
          moveRangeOnFirstSelection={false}
          ranges={createdAt}
          rangeColors={["#3c91fe"]}
        />
      </Cover>
      <Cover
        title="Updated At"
        clearInput={() => {
          setUpdatedAt([
            {
              startDate: new Date(),
              endDate: new Date(),
              key: "selection",
            },
          ]);
        }}
      >
        <DateRange
          editableDateInputs={true}
          onChange={(item) => setUpdatedAt([item.selection])}
          moveRangeOnFirstSelection={false}
          ranges={updatedAt}
          rangeColors={["#3c91fe"]}
        />
      </Cover>
      <Cover
        title="Price"
        clearInput={() => {
          setPrice([0, 100]);
        }}
      >
        <DoubleRangeSlider
          min={0}
          max={100}
          value={price}
          setValue={setPrice}
        />
      </Cover>
      <Cover
        title="Sale Price"
        clearInput={() => {
          setPrice([0, 100]);
        }}
      >
        <DoubleRangeSlider
          min={0}
          max={100}
          value={salePrice}
          setValue={setSalePrice}
        />
      </Cover>

      <button
        className="flex items-center justify-center p-4 border border-blue-400 hover:border-blue-500 hover:bg-slate-100 text-center rounded select-none"
        onClick={() => {
          setName("");
          setCategory([]);
          setSubcategory([]);
          setCreatedAt([
            {
              startDate: new Date(),
              endDate: new Date(),
              key: "selection",
            },
          ]);
          setUpdatedAt([
            {
              startDate: new Date(),
              endDate: new Date(),
              key: "selection",
            },
          ]);
          setPrice([0, 100]);
          setSalePrice([0, 100]);
        }}
      >
        Clear Filters
      </button>
    </div>
  );
};

const Cover = ({ children, title, clearInput }) => {
  return (
    <div className="flex flex-row justify-between items-start p-2 rounded-md bg-gray-50 border border-gray-200 relative w-[100%]">
      <div className="flex flex-col justify-between items-start gap-3 flex-1 max-w-[90%]">
        <span className="text-sm">{title}</span>
        {children}
      </div>
      <button
        onClick={clearInput}
        className="text-sm scale-x-[-1] text-gray-500 hover:text-gray-700 cursor-pointer "
      >
        <RefreshIcon size={24} />
      </button>
    </div>
  );
};

export default Filters;
