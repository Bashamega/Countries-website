import React from 'react';
import '../app/globals.css'
import { MdDarkMode, MdOutlineDarkMode } from "react-icons/md";
const LightDarkModeToggle: React.FC<{isDarkMode: boolean, setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>, className?:string}> = ({isDarkMode, setIsDarkMode, className}) => {
  
  const toggleMode = () => {
    setIsDarkMode(prevMode => !prevMode);
    const root = document.documentElement;
    if (isDarkMode) {
      root.style.setProperty('--foreground-rgb', '0, 0, 0');
      root.style.setProperty('--background-rgb', '250, 250, 250');
    } else {
      root.style.setProperty('--foreground-rgb', '255, 255, 255');
      root.style.setProperty('--background-rgb', '33, 46, 55');
    }
  };

  return (
    <div className={isDarkMode ? 'dark ' + className : 'light ' + className}>
      <button
        className="flex"
        onClick={toggleMode}
      >
        {!isDarkMode ? (
            <p className='flex items-center'><MdDarkMode />Light mode </p>
        ) : (
            <p className='flex items-center'><MdOutlineDarkMode/>Dark mode  </p>
            
        )}

      </button>
    </div>
  );
};

export default LightDarkModeToggle;
