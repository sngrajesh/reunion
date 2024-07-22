const ToggleButton = ({ checked = true, setOnChange = () => {} }) => {
  return (
    <>
      <label className="inline-flex items-center cursor-pointer">
        <input
          checked={checked}
          onClick={setOnChange}
          type="checkbox"
          value=""
          className="sr-only peer"
        />
        <div className="relative w-8 h-4 bg-gray-200 peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-600 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-4 rtl:peer-checked:after:translate-x-[2px] peer-checked:after:bg-blue-600 peer-checked:after:border-blue-800 after:content-[''] after:absolute after:top-[-2px] after:start-[-2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-400"></div>
        <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300"></span>
      </label>
    </>
  );
};

export default ToggleButton;
