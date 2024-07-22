"use client";
import React, { useRef, useState } from "react";
import {
  ArrowIcon,
  CloseIcon,
  EyeIcon,
  FilterIcon,
  SortIcon,
  StackIcon,
} from "@/app/assets/Icon";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  
} from "@tanstack/react-table";
import Header from "./TableHeader";
import TablePagination from "./TablePagination";
import ShowHideColumn from "../Dialog/ShowHideColumn";
import SortingOptions from "../Dialog/SortingOptions";
import { Filters } from "../Dialog/Filters";
import CreateGroup from "../Dialog/CreateGroup";

export default function Table({ data, columns }) {
  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState("");

  // Initialize column visibility state
  const initialColumnVisibility = {};
  columns.forEach((column) => {
    initialColumnVisibility[column.accessorKey] = true;
  });

  const [columnVisibility, setColumnVisibility] = useState(() => {
    return initialColumnVisibility;
  });

  // Create a new table instance
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting: sorting,
      globalFilter: filtering,
      columnVisibility: columnVisibility,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  });

  // Dialog state for each filter
  const dialogState = [
    {
      id: "showHideColumn",
      title: "Show/Hide Columns",
      ref: useRef(),
      Icon: <EyeIcon size={25} />,
      children: (
        <ShowHideColumn
          table={table}
          columnVisibility={columnVisibility}
          setColumnVisibility={setColumnVisibility}
        />
      ),
    },
    {
      id: "sortingOptions",
      title: "Sorting Options",
      ref: useRef(),
      Icon: <SortIcon size={28} />,
      children: (
        <SortingOptions table={table} headerGroups={table.getHeaderGroups()} />
      ),
    },
    {
      id: "filters",
      title: "Filters",
      ref: useRef(),
      Icon: <FilterIcon size={25} />,
      children: <Filters table={table} />,
    },
    {
      id: "createGroup",
      title: "Create Group",
      ref: useRef(),
      Icon: <StackIcon size={22} />,
      children: <CreateGroup table={table} />,
    },
  ];

  return (
    <div className="container w-full">
      <Header
        dialogState={dialogState}
        filtering={filtering}
        setFiltering={setFiltering}
      />
      <table className="table-auto w-full text-center text-sm">
        <TableHead headerGroups={table.getHeaderGroups()} />
        <TableBody rowModel={table.getRowModel()} />
      </table>
      <TablePagination table={table} />
      {dialogState.map((dialog) => (
        <dialog
          key={dialog.id}
          open={dialog.open}
          ref={dialog.ref}
          className="fixed inset-0 w-full h-full p-0 m-0 bg-black bg-opacity-50 border-none outline-none overflow-hidden"
        >
          <div className="h-full w-[35vw] absolute top-0 right-0 bg-white shadow-lg flex flex-col border-none outline-none overflow-hidden">
            <div className="flex justify-between p-6">
              <h2 className="text-base font-normal">{dialog.title}</h2>
              <button
                className="dialog-close"
                onClick={() => dialog.ref.current.close()}
              >
                <CloseIcon size={24} />
              </button>
            </div>
            <div className="dialog-body flex-grow overflow-y-auto p-6">
              {dialog.children}
            </div>
          </div>
        </dialog>
      ))}
    </div>
  );
}

function TableHead({ headerGroups = [] }) {
  return (
    <thead className="border-y bg-white">
      {headerGroups.map((headerGroup) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <th className="py-2" key={header.id}>
              {header.isPlaceholder ? null : (
                <div className="flex justify-center items-center gap-2">
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  {<ToggleSortButton header={header} />}
                </div>
              )}
            </th>
          ))}
        </tr>
      ))}
    </thead>
  );
}

function ToggleSortButton({ header }) {
  return (
    <button
      onClick={header.column.getToggleSortingHandler()}
      className="relative p-0 m-0 duration-100 flex gap-2 flex-row w-4 h-4"
    >
      <span
        className={`rotate-45 ${
          header.column.getIsSorted() == "asc"
            ? "text-gray-600"
            : "text-gray-300"
        } absolute translate-y-[2px]`}
      >
        <ArrowIcon size={18} />
      </span>
      <span
        className={`rotate-[-135deg] ${
          header.column.getIsSorted() == "desc"
            ? "text-gray-600"
            : "text-gray-300"
        } absolute translate-y-[-2px]`}
      >
        <ArrowIcon size={18} reverse={true} />
      </span>
    </button>
  );
}

function TableBody({ rowModel = [] }) {
  return (
    <tbody>
      {rowModel.rows.map((row) => (
        <tr key={row.id}>
          {row.getVisibleCells().map((cell) => (
            <td className="py-2 text-gray-700" key={cell.id}>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}

export { Table, ToggleSortButton };
