import React, { useState } from "react";
import { SingleSelectOption } from "./Util/Select";

const CreateGroup = ({ table }) => {
  const optionList = [
    { label: "Category", value: "category" },
    { label: "Subcategory", value: "subcategory" },
  ];

  const [items, setItems] = useState(null);

  return (
    <div className="flex flex-col gap-1">
      <SingleSelectOption
        optionList={optionList}
        value={items}
        setItems={setItems}
        optionalClass="w-full py-4"
      />
      <button
        onClick={() => {
          setItems(null);
        }}
        className="flex items-center justify-center  py-3 px-2 border border-blue-400 hover:border-blue-500 hover:bg-slate-100 text-center rounded select-none"
      >
        Clear Grouping
      </button>
      <button
        onClick={() => {}}
        className="flex items-center justify-center  py-3 px-2 bg-blue-600 text-white border text-center font-semibold rounded select-none"
      >
        Apply Grouping
      </button>
    </div>
  );
};

export default CreateGroup;
