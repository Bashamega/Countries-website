"use client"
// Import necessary dependencies
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import axios from "axios";
import DropdownMenu from "@/components/dropdown";
import Card from "@/components/card";
import { Nav } from "@/components/nav";
import { isdark } from "@/functions/darkmode";

// Define the Country interface
interface Country {
  name: {
    common: string;
  };
  // Other properties of the country object, if any
}

// Define the Home component
export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [dataStore, setDataStore] = useState<Country[] | null>(null); // Set initial state as null
  const [search, setSearch] = useState<string>('');

  // Fetch data function
  const fetchData = async () => {
    try {
      const url: string =
        selectedOption === ""
          ? "https://restcountries.com/v3.1/all"
          : `https://restcountries.com/v3.1/region/${selectedOption}`;

      const response = await axios.get(url);
      const data: Country[] = response.data;
      setDataStore(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    const isDark = isdark();
    setIsDarkMode(isDark);
    fetchData(); // Fetch data on initial load
    
  }, [selectedOption]); // Trigger fetching when selectedOption changes

  const handleSearch = async(e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm: string = e.target.value.toLowerCase();
    setSearch(searchTerm);

    try {
      const url: string =
        selectedOption === ""
          ? "https://restcountries.com/v3.1/all"
          : `https://restcountries.com/v3.1/region/${selectedOption}`;

      const response = await axios.get(url);
      const data: Country[] = response.data;
      if (data) {
        const filteredData = data.filter((element: Country) =>
          element.name.common.toLowerCase().includes(searchTerm)
        );
        setDataStore(filteredData);
      }
      
    } catch (error) {
      console.error('Error handling search:', error);
    }
  };

  return (
    <main className="w-screen overflow-x-hidden">
      {/* Your Nav component */}
      <Nav isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}></Nav>
      <section className="m-10  flex">
        <div className={"flex items-center w-1/5 p-1 rounded-lg shadow-lg " + (isDarkMode ? 'bg-[#2C3742]' : 'bg-white')}>
          <CiSearch />
          <input
            type="text"
            value={search}
            onChange={handleSearch}
            placeholder="search for a country ..."
            className={"selection:border-none focus:border-none ml-2 " + (isDarkMode ? 'bg-[#2C3742]' : 'bg-white')}
          />
        </div>
        <DropdownMenu
          options={['Africa', 'America', 'Asia', 'Europe', 'Oceania']}
          isDark={isDarkMode}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        />
      </section>

      <section className="mt-20 grid grid-cols-4 gap-4 items-center justify-center w-screen px-52 lg:px-20">
        {dataStore ? (
          dataStore.length === 0 ? (
            <p className="text-3xl items-center justify-center text-center">404 not found</p>
          ) : (
            dataStore.map((item: Country, index: number) => (
              <Card key={index} data={item} isDarkMode={isDarkMode} />
            ))
          )
        ) : (
          <p className="text-3xl items-center justify-center text-center">Loading</p>
        )}
      </section>
    </main>
  );
}
