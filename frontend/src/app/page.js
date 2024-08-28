"use client";

import { useState } from 'react';
import useCountries from './hook'

export default function Home() {
  const [query, setQuery] = useState('');
  const { 
    selectedCountry, 
    filteredCountries, 
    loading, 
    error, 
    handleSelectCountry 
  } = useCountries(query);

  return (
    <div className='flex justify-center items-center min-h-screen'>
      <div className='grid grid-cols-1 gap-x-8 border p-8 rounded-lg shadow-lg bg-gray-50 w-96 sm:grid-cols-2 sm:w-screen max-w-2xl'>
        <div>
          <div className='flex justify-center text-xl font-bold underline mb-2'>
            {selectedCountry.name}
          </div>

          <div className='flex flex-row font-semibold'>
            <div className='basis-2/5'>
              Capital:
            </div>
            <div className='basis-3/5'>
              {selectedCountry.capital}
            </div>
          </div>

          <div className='flex flex-row font-semibold'>
            <div className='basis-2/5'>
              Currency:
            </div>
            <div className='basis-3/5'>
              {selectedCountry.currency}
            </div>
          </div>

          <div className='flex justify-center m-4'>
            <img src={selectedCountry.flagLink} className='w-32 h-auto'></img>
          </div>

          <div className='flex justify-center'>
             <iframe
              width="600"
              height="250"
              src={selectedCountry.googleLink}>
            </iframe>
          </div>
        </div>

        <div>
          <div className='mt-4'>
            <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden p-3 border">
                <input
                className="h-full w-full outline-none text-sm text-gray-700 pr-2"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search a country..." /> 
            </div>
          </div>

          <div className='mt-2'>
            {loading && <p></p>}
            {error && <p className="text-red-500">{error}</p>}

            <div className='h-96 overflow-y-auto mt-4 border'>
              <ul className="mb-2">

                {filteredCountries.map((country) => (
                <li 
                  key={country?.id} 
                  className="text-xs font-semibold border-b p-2 cursor-pointer bg-zinc-300 hover:bg-zinc-500 hover:text-white" 
                  onClick={() => handleSelectCountry(country.id)}>
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