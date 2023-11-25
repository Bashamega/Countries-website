"use client"
import { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { Nav } from '@/components/nav';
import { isdark } from '@/functions/darkmode';
import Link from 'next/link';
import { IoMdArrowBack } from "react-icons/io";
import Image from 'next/image';
interface Country {
  name: {
    official: string;
    common: string;
    nativeName: { [key: string]: { official: string; common: string } };
  };
  flags: {
    svg: string;
  };
  population: number;
  region: string;
  subregion: string;
  capital: string;
  tld: string[];
  currencies: { [key: string]: { name: string } };
  languages: { [key: string]: string };
  borders: string[];
  // Other properties...
}

export default function Topic() {
  const [country, setCountry] = useState<Country | null>(null);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const getTerm = (): string => {
    const urlSegments = window.location.pathname.split('/');
    return decodeURI(urlSegments[urlSegments.length - 1]);
  };

  useEffect(() => {
    const fetchData = async () => {
      const term = getTerm();
      try {
        const url: string = `https://restcountries.com/v3.1/name/${term}?fullText=true`;
        const response: AxiosResponse<any> = await axios.get(url);
        const data: any = response.data;
        if (data && data.length > 0) {
          setCountry(data[0]); // Assuming you want the first country from the response
        } else {
          setCountry(null); // Reset country state if no data is found
        }
      } catch (error) {
        console.error(error);
        setCountry(null); // Reset country state in case of an error
      }
    };

    const isDark = isdark();
    setIsDarkMode(isDark);
    fetchData();
  }, []);
  return (
    <main>
        <Nav isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}></Nav>
        {country ? (
            <section>
                <nav className=' my-10 ml-16'>
                    <Link href="/">
                        <button className={' flex items-center px-10 shadow-lg rounded-lg p-2 justify-center  '  + (isDarkMode ? 'bg-[#2C3742]' : 'bg-white')}>
                            <IoMdArrowBack/>
                            <p className='ml-2'>Back</p>
                            
                        </button>
                    </Link>
                </nav>
                
                <section className=' mx-[10%] grid grid-cols-1 gap-48 justify-center lg:grid-cols-2'>
                    <Image width={600} alt={country.name.official} height={0} src={country.flags.svg}></Image>
                    <div>
                        <h1 className=' text-5xl font-bold'>{country.name.common}</h1>
                        <div className="grid grid-cols-2 gap-5 ">
                            <div>
                            <p className="font-light text-slate-400">
                                <span className={"font-normal " + (isDarkMode ? 'text-white' : 'text-black')}>
                                    Native Name: 
                                </span>
                                {country.name && typeof country.name === 'object' &&
                                    country.name.nativeName &&
                                    typeof country.name.nativeName === 'object' &&
                                    Object.values(country.name.nativeName)[0] &&
                                    typeof Object.values(country.name.nativeName)[0] === 'object' &&
                                    Object.values(country.name.nativeName)[0]?.common
                                }
                            </p>


                            <p className=" font-light text-slate-400"><span className={" font-normal " + (isDarkMode ? ' text-white' : 'text-black')}>Population: </span>{country.population}</p>
                            <p className=" font-light text-slate-400"><span className={" font-normal " + (isDarkMode ? ' text-white' : 'text-black')}>Region: </span>{country.region}</p>
                            <p className=" font-light text-slate-400"><span className={" font-normal " + (isDarkMode ? ' text-white' : 'text-black')}>Sub Region: </span>{country.subregion}</p>                            
                            <p className=" font-light text-slate-400"><span className={" font-normal " + (isDarkMode ? ' text-white' : 'text-black')}>Capital: </span>{country.capital}</p>

                            </div>
                            <div>
                                <p className=" font-light text-slate-400"><span className={" font-normal " + (isDarkMode ? ' text-white' : 'text-black')}>Top level domain: </span>{country.tld}</p>
                                <p className=" font-light text-slate-400"><span className={" font-normal " + (isDarkMode ? ' text-white' : 'text-black')}>Currencies: </span>{country.name && typeof country.name === 'object' &&
                                    country.currencies &&
                                    typeof country.currencies === 'object' &&
                                    Object.values(country.currencies)[0] &&
                                    typeof Object.values(country.currencies)[0] === 'object' &&
                                    Object.values(country.currencies)[0]?.name
                                }</p>
                                <p className="font-light text-slate-400">
                                    <span className={"font-normal " + (isDarkMode ? 'text-white' : 'text-black')}>
                                        Languages:
                                    </span>
                                    {country.languages && typeof country.languages === 'object' &&
                                        Object.entries(country.languages).map(([code, language], index) => (
                                        <span key={code}>
                                            {index !== 0 && ', '}
                                            {language}
                                        </span>
                                        ))
                                    }
                                </p>


                            </div>
                        </div>
                        <div className=' flex space-x-10 items-center mt-[120px]'>
                        <p>Border countries:</p>
                        {country.borders && country.borders.map((e: string, index: number) => (
                            <div key={index} className={' p-2 shadow-lg ' + (isDarkMode ? 'bg-[#2C3742]' : 'bg-white')}>{e}</div>
                        ))}
                        </div>
                    </div>

                </section>  
            </section>
            
        ):(
            <p>Not Found</p>
        )}
        
    </main>
  );
}
