import React, { useState, useEffect } from 'react';
import { MenuItem, FormControl, Select } from '@material-ui/core';
import './App.css';

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');

  // STATE = how to write a variable in react

  useEffect(() => {
    // useEffect : similar to componentDidMount
    // async -> send a request, wait for it.do something with info
    const getCountriesData = async () => {
      await fetch ("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.json())
      .then((data) => {
        const countries = data.map((country) => (
          {
            name: country.country,  // United States, United Kingdom
            value: country.countryInfo.iso2 // US, UK
          }));
          setCountries(countries);
      });
    };
    getCountriesData();
  }, []);

  const onCountryChange = (event) => {
    const countryCode = event.target.value;

    console.log('HELLO COUNTRYCODE', countryCode)

    setCountry(countryCode);
  }



  return (
    <div className="App">
      <div className="app__header">
        <h1> Covid tracker dashboard</h1>
        <FormControl className="app__dropdown">
          <Select variant="outlined" value={country} onChange={onCountryChange}>
            <MenuItem value="worldwide">Worldwide</MenuItem>
            { countries.map(country => (
              <MenuItem value={country.value}>{country.name}</MenuItem>
            ))}
            {/* <MenuItem value="worldwide">Worldwide</MenuItem>
            <MenuItem value="worldwide">Option2</MenuItem>
            <MenuItem value="worldwide">Option3</MenuItem>
            <MenuItem value="worldwide">Option4</MenuItem> */}
          </Select>
        </FormControl>
      </div>
      {/* Header */}
      {/* Title */}ㄴ

      {/* InfoBox */}
      {/* InfoBox */}
      {/* InfoBox */}

      {/* Table */}
      {/* Graph */}

      {/* Map */}
    </div>
  );
}

export default App;
