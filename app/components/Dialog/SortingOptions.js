import { ArrowIcon } from "@/app/assets/Icon";
import { flexRender } from "@tanstack/react-table";

const SortingOptions = ({ table, headerGroups = [] }) => {
  return (
    <div className="flex flex-col gap-1">
      {headerGroups.map((headerGroup) => (
        <div className="flex flex-col gap-1" key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <button
              className="flex items-center justify-between p-4 border rounded hover:bg-slate-50 hover:border-gray-400"
              key={header.id}
              onClick={header.column.getToggleSortingHandler()}
            >
              {header.isPlaceholder ? null : (
                <div className="flex justify-start items-center gap-2 w-full h-full select-none">
                  <span>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </span>
                  {<ToggleIcon header={header} />}
                </div>
              )}
            </button>
          ))}
        </div>
      ))}
      <button
        className="flex items-center justify-center p-4 border border-blue-400 hover:border-blue-500 hover:bg-slate-100 text-center rounded select-none"
        onClick={() => {
          table.resetSorting(true);
        }}
      >
        Clear Sorting
      </button>
    </div>
  );
};

const ToggleIcon = ({ header }) => {
  return (
    <div className="p-0 m-0 duration-100 flex gap-2 flex-row w-4 h-4">
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
    </div>
  );
};

export default SortingOptions;
