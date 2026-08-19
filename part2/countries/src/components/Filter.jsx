const Filter = ({ filter, handleFilterChange }) => {
  return (
    <div>
        <p>Find countries: <input value={filter} onChange={handleFilterChange} /> </p>
    </div>
  )
}

export default Filter