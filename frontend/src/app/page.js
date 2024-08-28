"use client";

import { useState } from 'react';
import useCountries from './hook'

export default function Home() {
  const [query, setQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState({
    name: "Malaysia",
    capital: "Kuala Lumpur",
    currency: "MYR",
    country_code: "MY"
  });
  const [mapLink, setMapLink] = useState("https://www.google.com/maps/place/KualaLumpur");
  const [flagLink, setFlagLink] = useState(`https://flagcdn.com/192x144/my.png`);
  const [googleLink, setGoogleLink] = useState("");
  const { filteredCountries, loading, error } = useCountries(query);

  const handleSelectCountry = (country) => {
    setSelectedCountry(country);
    setMapLink("https://www.google.com/maps/place/"+country.capital);
    setFlagLink(`https://flagcdn.com/192x144/${country.country_code.toLowerCase()}.png`)
    setGoogleLink(`https://www.google.com/maps/embed/v1/search?q=${encodeURIComponent(country.name)}&zoom=5`);
  }

  return (
    <div className='flex justify-center items-center min-h-screen'>
      <div className='grid grid-cols-1 gap-x-8 border p-8 rounded-lg shadow-lg bg-gray-50 w-96 sm:grid-cols-2 sm:w-screen max-w-2xl'>
        <div>
          <div className='flex justify-center text-xl font-bold underline mb-2'>
            {selectedCountry.name}
          </div>

          <div className='flex flex-row'>
            <div className='basis-2/5'>
              Capital:
            </div>
            <div className='basis-3/5'>
              {selectedCountry.capital}
            </div>
          </div>

          <div className='flex flex-row'>
            <div className='basis-2/5'>
              Currency:
            </div>
            <div className='basis-3/5'>
              {selectedCountry.currency}
            </div>
          </div>

          <div className='flex justify-center m-6'>
            <img src={flagLink} className='w-32 h-auto'></img>
          </div>

          <div className='flex justify-center'>
             <a href={mapLink} target="_blank" rel="noopener noreferrer">
               <button className="bg-transparent hover:bg-zinc-500 text-zinc-700 font-semibold hover:text-white py-2 px-4 border-2 border-zinc-500 hover:border-transparent rounded text-sm">
                 Click To Preview In Google Maps
               </button>
             </a>
          </div>
        </div>

        <div>
          <div className='mt-4'>
            <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden p-3 border">
                <input
                className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                id="search"
                placeholder="Search a country..." /> 
            </div>
          </div>

          <div className='mt-2'>
            {loading && <p></p>}
            {error && <p className="text-red-500">{error}</p>}

            <div className='h-60 overflow-y-auto mt-4'>
              <ul className="mb-2">

                {filteredCountries.map((country) => (
                <li key={country?.id} className="text-xs font-semibold border-b p-2 cursor-pointer bg-zinc-300 hover:bg-zinc-500 hover:text-white" onClick={() => handleSelectCountry(country)}>
                  {country?.name}
                </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}