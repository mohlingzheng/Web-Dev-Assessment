import { useState, useEffect } from 'react';

const useCountries = (query) => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState({
    name: "Malaysia",
    capital: "Kuala Lumpur",
    currency: "MYR",
    country_code: "MY",
    flagLink: "https://flagcdn.com/192x144/my.png",
    googleLink: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8149887.992813519!2d104.32177711615103!3d4.13400682505989!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3034d3975f6730af%3A0x745969328211cd8!2sMalaysia!5e0!3m2!1sen!2smy!4v1724834662150!5m2!1sen!2smy"
  });

  const handleSelectCountry = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/api/countries/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch country');
      }
      let country = await response.json();
      setSelectedCountry(country);
    } catch (error) {
      setError(error.message);
    }

  }

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
  
  return { selectedCountry, countries, filteredCountries, loading, error, setFilteredCountries, handleSelectCountry };
}

export default useCountries;