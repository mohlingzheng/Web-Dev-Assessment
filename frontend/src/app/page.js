"use client";

import { useState } from 'react';
import useCountries from './hook'

export default function Home() {
  const [query, setQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState({
    name: "Malaysia",
    capital: "Kuala Lumpur",
    currency: "MYR"
  });
  const [mapLink, setMapLink] = useState("https://www.google.com/maps/place/KualaLumpur");
  const { filteredCountries, loading, error } = useCountries(query);

  const handleSelectCountry = (country) => {
    setSelectedCountry(country);
    setMapLink("https://www.google.com/maps/place/"+country.capital);
  }

  return (
    <div className='flex flex-row min-h-screen justify-center item-center p-4'>
      <div className="p-4 max-w-4xl w-full flex">
        <div className='w-1/2 p-8 border flex flex-col'>

          <div className='flex-1 flex flex-row items-center justify-center'>
            <div className='flex-1'>
              <h2>
                {selectedCountry.name}
              </h2>
              <p>Capital: <span>{selectedCountry.capital}</span></p>
              <p>Currency: <span>{selectedCountry.currency}</span></p>
            </div>

            <div className='flex-1'>
              <img src="https://flagsapi.com/MY/flat/64.png" className='w-20 h-auto'></img>
            </div>

          </div>

          <div className='flex-1'>
          <a href={mapLink} target="_blank" rel="noopener noreferrer">
            <button>
              Preview In Google Map
            </button>
          </a>
          </div>

        </div>

        <div className='w-1/2 p-8 border'>
          <div className="max-w-md mx-auto mt-10">
              <div>
                <div className="relative">
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Search for a country..."
                  />
                </div>
              </div>

              {loading && <p>Loading...</p>}
              {error && <p className="text-red-500">{error}</p>}

              <div className='max-h-80 overflow-y-auto mt-4'>
                <ul className="mt-4">

                  {filteredCountries.map((country) => (
                    <li key={country?.id} className="border-b p-2 cursor-pointer bg-gray-500 hover:bg-gray-700" onClick={() => handleSelectCountry(country)}>
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