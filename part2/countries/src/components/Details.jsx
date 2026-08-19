import Button from './Button';
const Details = ({ country }) => {
  if (!country) {
    return null;
  }

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
      <br />
      <Button onClick={() =>
        window.location.reload()} text='Back' />
    </div>
  );
};

export default Details;
