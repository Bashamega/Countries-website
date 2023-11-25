import React, { useState } from 'react';
import { RiArrowDropDownLine, RiArrowDropUpLine  } from "react-icons/ri";
interface Props {
  options: string[];
  isDark: boolean;
  selectedOption: string;
  setSelectedOption: React.Dispatch<React.SetStateAction<string>>
}


const DropdownMenu: React.FC<Props> = ({ options, isDark, selectedOption, setSelectedOption}: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleDropdown = () => {
    setIsOpen((prevState) => !prevState); // Toggle dropdown visibility
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option); // Set the selected option
    setIsOpen(false); // Close the dropdown after selecting an option
  };

  return (
    <div className={" inline-block  absolute right-[10%] " + (isDark ? "bg-[#2C3742]": "bg-white")}>
      <div>
        <span className="rounded-md shadow-sm">
          <button
            type="button"
            className={" shadow-lg inline-flex w-56 justify-center  rounded-md border-0 px-4 py-2 text-sm font-medium focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200"
                    + (isDark ? "bg-[#2C3742]": "bg-white")
                    }
            onClick={toggleDropdown}
          >
            {selectedOption || 'Fillter  by option'}
           {isOpen ? (
            <RiArrowDropUpLine  size={24} />
           ):(
            <RiArrowDropDownLine size={24} />
           )}
          </button>
        </span>
      </div>

      {/* Dropdown content */}
      {isOpen && (
        <div className={"absolute z-10 mt-2 w-56 origin-top-right  rounded-md shadow-lg " + (isDark ? "bg-[#2C3742] border border-[#2C3742] text-white": "bg-white border border-gray-200")}>
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionClick(option)}
                className={"block px-4 py-2 text-sm  w-full text-left " + (isDark ? "bg-[#2C3742] text-white hover:bg-slate-700": "text-gray-700 hover:bg-gray-100")}
                role="menuitem"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
