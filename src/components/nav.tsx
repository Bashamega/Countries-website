import React from "react";
import LightDarkModeToggle from "./toggle";
export function Nav(
    {isDarkMode, setIsDarkMode}: {isDarkMode: boolean, setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>}
){
    return(
        <nav className={"p-5 pl-10 flex items-center relitve w-screen shadow-md " + (isDarkMode ? 'bg-[#2C3742]' : '')}>
            <h1 className=" font-bold text-2xl">Where in the world?</h1>
            <LightDarkModeToggle isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} className="absolute right-5"></LightDarkModeToggle>
        </nav>
    )
}