const CountriesList = ({ countries, filter }) => {
  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(filter.toLowerCase())
  );

  if (filteredCountries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  } else if (filteredCountries.length === 1) {
    const country = filteredCountries[0];
    return (
      <div>
        <h2>{country.name.common}</h2>
        <p>Capital: {country.capital}</p>
        <p>Area: {country.area}</p>
        <h3>Languages:</h3>
        <ul>
          {Object.values(country.languages).map((language, index) => (
            <li key={index}>{language}</li>
          ))}
        </ul>
        <img src={country.flags.png} alt={`Flag of ${country.name.common}`} />
      </div>
    );
  } else {
    return (
      <ul>
        {filteredCountries.map(country => (
          <li key={country.cca2}>{country.name.common}</li>
        ))}
      </ul>
    );
  }
};

export default CountriesList;