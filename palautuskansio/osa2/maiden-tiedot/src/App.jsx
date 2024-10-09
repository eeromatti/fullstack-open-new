import { useState, useEffect } from 'react'
import axios from 'axios'
import countryService from './services/countries'
import './App.css'


const Filter = (props) => {
  return (
    <input
      value={props.filter}
      onChange={props.handleFilterChange}
      placeholder="Filter by name" 
    />
  )
}

const Print = ({countries, setFilter}) => {
  return (
    <>
      {countries.length > 1 ? (
        <div>
          <List countries={countries} setFilter={setFilter}/>
        </div>
        ) 
      : (
        <div>
          <Specs countries={countries}/> 
        </div>
      )}
    </>
  )
}

const List = ({countries, setFilter}) => {
  return (
    <ul>
      {countries.map(country => (
        <li key={country.cca3}>
          {country.name.common}
          <button onClick={() => setFilter(country.name.common)}>
            show
          </button>
        </li>
      ))}
    </ul>
  )
}

const Specs = ({countries}) => {
  if (countries.length > 0) {
    const country = countries[0]
    return (
      <div>
        <h1>{country.name.common}</h1>
        <ul className="specs">
          <li>capital {country.capital}</li>
          <li>area {country.area}</li>
        </ul>
        <h4>languages</h4>
        <ul>
          {Object.values(country.languages).map((language, index) => (
            <li key={index}>{language}</li>
          ))}
        </ul>
        <img 
          src={country.flags.png} 
          alt={country.flags[2]}
          style={{ width: '150px', height: 'auto'}}
          />
      </div>
    )}}

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  
// effect hook
  useEffect(() => {
    countryService
      .getAll()
      .then(response => {
        const countries_init = response
        setCountries(countries_init)
      })
  }, [])

  // filtered list
    const countriesToShow = filter
    ? countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))
    : countries

  // käsittelyfunktiot
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      Find countries 
      <Filter filter={filter} handleFilterChange={handleFilterChange}/>
      {countriesToShow.length > 10 
      ? (
        <div>
          Too many matches, specify another filter
        </div>
        )
      : (
        <div>
          <Print countries={countriesToShow} setFilter={setFilter} />
        </div>
      )}

    </div>
  )
}

export default App
