import { CloseIcon } from "@/app/assets/Icon";

function Header({ dialogState, filtering, setFiltering }) {
  return (
    <div className="flex justify-end gap-3 items-center py-4">
      <HeaderInput filtering={filtering} setFiltering={setFiltering} />
      {dialogState.map((dialog) => (
        <button
          key={dialog.id}
          className="p-0 m-0 duration-100 text-gray-600 hover:text-gray-800"
          onClick={() => dialog.ref.current.showModal()}
        >
          {dialog.Icon}
        </button>
      ))}
    </div>
  );
}

function HeaderInput({ filtering, setFiltering }) {
  return (
    <div className="w-64 relative">
      <input
        type="text"
        className="w-full py-1.5 pl-4 pr-6 border border-gray-300 rounded focus:outline-none focus:ring-blue-400 focus:ring-1 hover:border-gray-400 text-sm"
        value={filtering}
        placeholder="Search"
        onChange={(e) => setFiltering(e.target.value)}
      />
      <button
        onClick={() => setFiltering("")}
        className="absolute right-2 top-0 h-full p-0 m-0 duration-100 text-gray-600 hover:text-gray-800"
        disabled={!filtering}
      >
        <CloseIcon size={16} />
      </button>
    </div>
  );
}

export { Header, HeaderInput };
export default Header;
