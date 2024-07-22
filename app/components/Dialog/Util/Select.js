import { CloseIcon, UpArrowIcon } from "@/app/assets/Icon";
import React, { useState } from "react";

const MultiSelectOption = ({
  items = [],
  optionList,
  setItems = () => {},
  optionalClass = "",
}) => {
  const [visible, setVisible] = useState(false);
  return (
    <div className="flex justify-between items-center w-full gap-7 relative group">
      <div
        className={`flex justify-between items-center text-sm text-center text-black bg-none border-2 border-designselect group-hover:border-blue-400 rounded-md cursor-pointer py-3 px-2 bg-white duration-200 select-none ${optionalClass}`}
        onClick={() => setVisible(!visible)}
      >
        <span
          className={`duration-300 whitespace-nowrap overflow-hidden overflow-ellipsis gap-1 flex flex-wrap ${
            visible
              ? "text-black"
              : "text-inputplaceholder group-hover:text-black"
          }`}
        >
          {items.map((item, i) => (
            <span
              key={i}
              className="text-xs p-1 bg-blue-200 border border-blue-300 rounded text-black flex gap-1 items-center"
            >
              {item.value}
              <button
                className="cursor-pointer duration-300 text-blue-200 bg-gray-400 rounded-full hover:bg-gray-500"
                onClick={(e) => {
                  e.stopPropagation();
                  setItems((prev) =>
                    prev.filter((prevItem) => prevItem !== item)
                  );
                }}
              >
                <CloseIcon size={12} />
              </button>
            </span>
          ))}
          <span className="text-inputplaceholder text-gray-500 group-hover:text-black my-auto">
            Select Value
          </span>
        </span>
        <span className="flex gap-2 items-center text-gray-500 group-hover:text-gray-700">
          <button
            className="cursor-pointer duration-300 text-inputplaceholder text-gray-500 group-hover:hover:text-gray-700"
            onClick={(e) => {
              e.stopPropagation();
              setItems([]);
            }}
          >
            <CloseIcon size={20} />
          </button>
          <button
            className={`cursor-pointer duration-300 text-inputplaceholder text-gray-500 group-hover:hover:text-gray-700 ${
              visible ? "transform rotate-0" : "transform rotate-180"
            }`}
          >
            <UpArrowIcon size={20} />
          </button>
        </span>
      </div>
      {visible && (
        <div
          className={`${optionalClass} absolute top-[110%] p-0 bg-transparent border-2 border-designselect rounded-md cursor-pointer shadow-md bg-white z-20`}
        >
          <div className="w-full max-h-48 overflow-y-auto flex flex-col">
            {optionList.map((option, i) => (
              <span
                key={i}
                className="text-sm text-start text-black py-2 px-4 bg-none hover:bg-navbarhandle hover:bg-slate-50 border-b border-designselect last:border-b-0"
                onClick={() => {
                  //Set unique items only if not already present do nothing
                  if (!items.find((item) => item.value === option.value)) {
                    setItems((prev) => [...prev, option]);
                  }

                  setVisible(false);
                }}
              >
                {option.label}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const SingleSelectOption = ({
  value = null,
  optionList,
  optionalClass = "",
  setItems = () => {},
}) => {
  const [visible, setVisible] = useState(false);
  console.log(value);
  return (
    <div className="flex justify-between items-center w-full gap-7 relative group">
      <div
        className={`flex justify-between items-center text-sm text-center text-black bg-none border-2 border-designselect group-hover:border-blue-400 rounded-md cursor-pointer py-3 px-2 bg-white duration-200 select-none ${optionalClass}`}
        onClick={() => setVisible(!visible)}
      >
        <span
          className={`duration-300 whitespace-nowrap overflow-hidden overflow-ellipsis gap-1 flex flex-wrap ${
            visible
              ? "text-black"
              : "text-inputplaceholder group-hover:text-black"
          }`}
        >
          {value ? (
            <span className="text-black">{value.label}</span>
          ) : (
            <span className="text-inputplaceholder text-gray-500 group-hover:text-black my-auto">
              Select Value
            </span>
          )}
        </span>
        <span className="flex gap-2 items-center text-gray-500 group-hover:text-gray-700">
          <button
            className={`cursor-pointer duration-300 text-inputplaceholder text-gray-500 group-hover:hover:text-gray-700 ${
              visible ? "transform rotate-0" : "transform rotate-180"
            }`}
          >
            <UpArrowIcon size={20} />
          </button>
        </span>
      </div>
      {visible && (
        <div
          className={`${optionalClass} absolute top-[110%] p-0 bg-transparent border-2 border-designselect rounded-md cursor-pointer shadow-md bg-white z-20`}
        >
          <div className="w-full max-h-48 overflow-y-auto flex flex-col">
            {optionList.map((option, i) => (
              <span
                key={i}
                className="text-sm text-start text-black py-2 px-4 bg-none hover:bg-navbarhandle hover:bg-slate-50 border-b border-designselect last:border-b-0"
                onClick={() => {
                  setItems(option);
                  setVisible(false);
                }}
              >
                {option.label}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiSelectOption;

export { SingleSelectOption, MultiSelectOption };
