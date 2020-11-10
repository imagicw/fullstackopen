import React, {useState, useEffect} from 'react'
import axios from 'axios'

const CountriesList = ({ countries, filterName }) =>
{
  const data = countries.filter(country => country.name.toLowerCase().indexOf(filterName.toLowerCase()) > -1)
  const [show, setShow] = useState(false)
  const [factoryDetail, setFactoryDetail] = useState([])

  const handlerShow = (factory) =>
  {
    setShow(true)
    setFactoryDetail(factory)
  }

  if(data.length > 10)
  {
    return <div>Too many matches, specify another filter</div>
  }

  if(data.length === 1)
  {
    return(
      <CountryDetails country={data[0]} />
    )
  }

  return show
    ?
      (
        <>
          <p><button onClick={() => setShow(!show)}>{show ? 'close' : 'true'}</button></p>
          <CountryDetails country={factoryDetail} />
        </>
      )
    :
      (
        <>
          {data.map(country =>
            <div key={country.name}>{country.name} <button onClick={() => handlerShow(country)}>show</button></div>
          )}
        </>
      )
}

const CountryDetails = ({ country }) =>
{
  return(
    <div>
      <h1>{country.name}</h1>
      <div>capital {country.capital}</div>
      <div>population {country.population}</div>
      <h2>languages</h2>
      <ul>
        {country.languages.map(language =>
            <li key={language.name}>{language.name}</li>
        )}
      </ul>
      <img src={country.flag} alt={`${country.name} flag`} height={180} />
    </div>
  )
}

const App = () =>
{
  const [ countries, setCountries ] = useState([])
  const [ filterName, setFilterName ] = useState('')

  useEffect(()=>{
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response =>
        {
          setCountries(response.data)
        })
  },[])

  const filterHandler = (event) => setFilterName(event.target.value)

  return (
    <div>
      find countries <input value={filterName} onChange={filterHandler} />
      <CountriesList countries={countries} filterName={filterName} />
    </div>
  )
}

export default App;
