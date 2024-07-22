import { LeftIcon } from "@/app/assets/Icon";

export function TablePaginationSetPageButton({
  table,
  pageIndex,
  currentPageIndex,
}) {
  return (
    <button
      className={`h-9 aspect-square border border-gray-300 rounded focus:outline-none focus:ring-gray-300 focus:ring-1 hover:border-gray-400 text-sm ${
        currentPageIndex === pageIndex ? "bg-slate-100" : ""
      }`}
      onClick={() => table.setPageIndex(pageIndex)}
    >
      {pageIndex + 1}
    </button>
  );
}

export function TablePagination({ table }) {
  const currentPageIndex = table.getState().pagination.pageIndex;
  const pageCount = table.getPageCount();

  const renderPageButtons = () => {
    const buttons = [];
    const maxVisiblePages = 4;

    if (pageCount <= maxVisiblePages) {
      for (let i = 0; i < pageCount; i++) {
        buttons.push(
          <TablePaginationSetPageButton
            key={i}
            table={table}
            currentPageIndex={currentPageIndex}
            pageIndex={i}
          />
        );
      }
    } else {
      // SHowing firts page always
      buttons.push(
        <TablePaginationSetPageButton
          key={0}
          table={table}
          currentPageIndex={currentPageIndex}
          pageIndex={0}
        />
      );

      // Showing ellipsis if currentPageIndex is greater than 2
      if (currentPageIndex > 2) {
        buttons.push(
          <span key="ellipsis1" className="px-2">
            ...
          </span>
        );
      }

      // Calculating start and end index for the buttons
      let start = Math.max(1, currentPageIndex - 1);
      let end = Math.min(pageCount - 2, currentPageIndex + 1);

      if (currentPageIndex < 3) {
        end = 3;
      } else if (currentPageIndex > pageCount - 4) {
        start = pageCount - 4;
      }

      for (let i = start; i <= end; i++) {
        buttons.push(
          <TablePaginationSetPageButton
            key={i}
            table={table}
            currentPageIndex={currentPageIndex}
            pageIndex={i}
          />
        );
      }

      // Showing ellipsis if currentPageIndex is less than pageCount - 3
      if (currentPageIndex < pageCount - 3) {
        buttons.push(
          <span key="ellipsis2" className="px-2">
            ...
          </span>
        );
      }

      // Showing last page always
      buttons.push(
        <TablePaginationSetPageButton
          key={pageCount - 1}
          table={table}
          currentPageIndex={currentPageIndex}
          pageIndex={pageCount - 1}
        />
      );
    }

    return buttons;
  };

  return (
    <div className="flex items-center justify-center space-x-2 mt-6">
      <button
        onClick={() =>
          table.setPageIndex(
            currentPageIndex - 1 < 0 ? 0 : currentPageIndex - 1
          )
        }
        disabled={currentPageIndex === 0}
        className="p-0 m-0 duration-100 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:hover:text-gray-600"
      >
        <LeftIcon size={25} />
      </button>
      {renderPageButtons()}
      <button
        onClick={() =>
          table.setPageIndex(
            currentPageIndex + 1 >= pageCount
              ? pageCount - 1
              : currentPageIndex + 1
          )
        }
        disabled={currentPageIndex === pageCount - 1}
        className="p-0 m-0 duration-100 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:hover:text-gray-600 rotate-180"
      >
        <LeftIcon size={25} />
      </button>
    </div>
  );
}

export default TablePagination;
