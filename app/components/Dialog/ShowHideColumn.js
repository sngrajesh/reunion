import { useState } from "react";
import ToggleButton from "../Utils/ToggleButton";

const ShowHideColumn = ({ table, columnVisibility, setColumnVisibility }) => {
  let columns = table.getAllColumns();
  const [initialColumnVisibility, setInitialColumnVisibility] =
    useState(columnVisibility);
  return (
    <div className="flex flex-col gap-1">
      {columns.map((column) => {
        return (
          <div
            key={column.id}
            className="flex items-center justify-between p-4 border hover:bg-slate-50 hover:border-gray-400"
          >
            <div className="flex items-center">
              <span className="font-normal">{column.columnDef.header}</span>
            </div>
            <ToggleButton
              checked={initialColumnVisibility[column.id]}
              setOnChange={() => {
                setInitialColumnVisibility({
                  ...initialColumnVisibility,
                  [column.id]: !initialColumnVisibility[column.id],
                });
              }}
            />
          </div>
        );
      })}
      <button
        onClick={() => {
          let newColumnVisibility = {};
          Object.keys(initialColumnVisibility).forEach((key) => {
            newColumnVisibility[key] = true;
          });
          setInitialColumnVisibility(newColumnVisibility);
        }}
        className="flex items-center justify-center p-4 border border-blue-400 hover:border-blue-500 hover:bg-slate-100 text-center rounded select-none"
      >
        Show All Columns
      </button>
      <button
        onClick={() => {
          setColumnVisibility(initialColumnVisibility);
        }}
        className="flex items-center justify-center p-4 bg-blue-600 text-white border text-center font-semibold rounded select-none"
      >
        Apply
      </button>
    </div>
  );
};

export default ShowHideColumn;
