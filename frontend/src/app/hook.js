import { useState, useEffect } from 'react';

const useCountries = (query) => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:4000/api/countries');
        
        if (!response.ok) 
          throw new Error('Failed to fetch countries');
        
        const data = await response.json();
        setCountries(data);

      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, [])

  useEffect(() => {
    if (query === '') {
      setFilteredCountries(countries);
    } else {
      setFilteredCountries(
        countries.filter((country) =>
            country.name.toLowerCase().startsWith(query.toLowerCase())
        )
    );
    }
  }, [query, countries])
  
  return { countries, filteredCountries, loading, error, setFilteredCountries };
}

export default useCountries;