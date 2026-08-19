import Countries from "./services/Countries";
import CountriesList from "./components/CountriesList";
import Filter from "./components/Filter";
import { useState, useEffect } from "react";

const App = () => {
  const [countries, setCountries] = useState(null)
  const [filter, setFilter] = useState('')

  useEffect(() => {
    Countries
    .getAll()
      .then(data => {
        setCountries(data)
      })
  }, [])

  if (countries === null) {
    return <div>Loading...</div>
  }
  
  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }



  return (
    <div>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <CountriesList countries={countries} filter={filter} />
    </div>
  )
}

export default App