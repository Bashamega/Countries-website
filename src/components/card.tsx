import React from "react";
import Link from 'next/link';
import Image from "next/image";
interface props {
    key : number;
    data: any;
    isDarkMode: boolean
}
export default function Card({key, data, isDarkMode}: props){
    return(
        <Link href={"/" + data.name.common} className={" w-[250px] h-[350px] shadow-lg rounded-lg "+ (isDarkMode ? ' bg-[#2C3742]' : 'bg-white')}>
            <Image alt="flag" width={250} height={200} src={data.flags.svg} className=" rounded-tl-lg rounded-tr-lg"></Image>
            <div className="p-5">
                <h1 className=" font-bold" >{data.name.common}</h1>
                <div className="mt-5">
                <p className=" font-light text-slate-500"><span className={" font-normal " + (isDarkMode ? ' text-white' : 'text-black')}>Population: </span>{data.population}</p>
                <p className=" font-light text-slate-500"><span className={" font-normal " + (isDarkMode ? ' text-white' : 'text-black')}>Region: </span>{data.region}</p>
                <p className=" font-light text-slate-500"><span className={" font-normal " + (isDarkMode ? ' text-white' : 'text-black')}>Capital: </span>{data.capital}</p>
                </div>
            </div>
            
        </Link>
    )
}