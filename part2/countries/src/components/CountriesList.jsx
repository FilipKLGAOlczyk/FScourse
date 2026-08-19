import Button from './Button';
import Details from './Details';

const CountriesList = ({ countries, filter, handleShowDetails }) => {
  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(filter.toLowerCase())
  );

  if (filteredCountries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  } else if (filteredCountries.length === 1) {
    const country = filteredCountries[0];
    return (
      <Details country={country} />
    );
  } else {
    return (
      <ul>
        {filteredCountries.map(country => (
          <li key={country.cca2}>{country.name.common} <Button onClick={() => handleShowDetails(country)} text='Show' /></li>
        ))}
      </ul>
    );
  }
};

export default CountriesList;