import React, { useState, useEffect } from 'react';
import { MenuItem, FormControl, Select, Card, CardContent} from '@material-ui/core';
import './styles/App.css';
import InfoBox from './InfoBox.js';
import Map from './Map.js';
import Table from './Table.js';
import { sortData } from "./util";
import LineGraph from './LineGraph.js';
import "leaflet/dist/leaflet.css";

function App() {
  // STATE - short term memory / how to write a variable in react
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 34.800746, lng: -40.4796 })  // center of the world map pacific ocean
  const [mapZoom, setMapZoom] = useState(3);


  // useEffect : componentDidMount / when app.js loaded, render it once
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then(response => response.json())
      .then(data => {
        setCountryInfo(data);
      })
  }, []);

  useEffect(() => {
    // getting countries api info and organize data and set to countries
    // async -> send a request, wait for it.do something with info
    const getCountriesData = async () => {
      await fetch ("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.json())
      .then((data) => {
        console.log('countries data >>>', data[0])
        console.log('data[0].country >>>', data[0].country)
        const countries = data.map((country) => (
          {
            name: country.country,  // United States, United Kingdom
            value: country.countryInfo.iso2 // US, UK
          }));

          // using util helper fn to sort
          const sortedData = sortData(countries)
          setTableData(sortedData);
          setCountries(sortedData);
      });
    };
    getCountriesData();
  }, []);


  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);

    const url = countryCode === 'worldwide'
    ? "https://disease.sh/v3/covid-19/all"
    : `https://disease.sh/v3/covid-19/${countryCode}`

    await fetch(url)
    .then((response) => response.json)
    .then((data) => {
      setCountry(countryCode);
    })
  }

  return (

    <div className="app">
        {/* // Big Left Container */}
      <div className="app__left">

        {/* Header */}
      <div className="app__header">
        <h1> Covid Tracker Dashboard</h1>
        <FormControl className="app__dropdown">
          <Select variant="outlined" value={country} onChange={onCountryChange}>
            <MenuItem value="worldwide">Worldwide</MenuItem>
            { countries.map((country) => (
              <MenuItem value={country.value}>{country.name}</MenuItem>
            ))}

          </Select>
        </FormControl>
      </div>

      <div className="app__stats">
        <InfoBox
          title="Coronavirus Cases"
          cases={countryInfo.todayCases}
          total={countryInfo.cases} />
        <InfoBox
          title="Recovered"
          cases={countryInfo.todayRecovered}
          total={countryInfo.recovered}/>
        <InfoBox
          title="Deaths"
          cases={countryInfo.todayDeaths}
          total={countryInfo.deaths}/>
      </div>

         <Map
          center={mapCenter}
          zoom={mapZoom}/>
      </div>

      {/* // Big Right Container */}
      <Card className="app__right">
        <CardContent>
          <h3>Live Cases by Country</h3>
            {/* Table */}
          <Table countries={tableData}/>
          <h3>Worldwide new cases</h3>
           {/* Graph */}
          <LineGraph />

        </CardContent>
      </Card>

    </div>
  );
}

export default App;
