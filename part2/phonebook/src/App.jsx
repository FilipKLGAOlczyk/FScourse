import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonsForm from './components/PersonsForm'
import Persons from './components/Persons'
import phonebookService from './services/phonebook'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)

  useEffect(() => {
    phonebookService.getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
        console.log('response.data', initialPersons);
      })
  }, [])

  


  const handleFilterChange = (event) => {
      console.log(event.target.value)
      setFilter(event.target.value)
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newName && person.number === newNumber)) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    if (newNumber === '' || newName === '') {
      alert('Name and/or number cannot be empty')
      return
    }
    if (persons.some(person => person.name === newName && person.number !== newNumber)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const personToUpdate = persons.find(p => p.name === newName)
        phonebookService.update(personToUpdate.id, { name: newName, number: newNumber })
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== personToUpdate.id ? p : returnedPerson))
            setNotificationMessage(`Updated ${returnedPerson.name}'s number in the phonebook`)
            setTimeout(() => {
              setNotificationMessage(null)
            }, 5000)
            setNewName('')
            setNewNumber('')
          })
      }
      return
    }

    phonebookService.create({ 
      name: newName,
      number: newNumber
    })
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNotificationMessage(`Added ${returnedPerson.name}'s number to the phonebook`)
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
        setNewName('')
        setNewNumber('')
      })
  }

  const handleRemove = (id) => {
    if (window.confirm(`Delete ${persons.find(p => p.id === id).name}?`)) {
      phonebookService.remove(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
        })
    }
  }


  const personsToShow = filter === ''
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
  
  

  


  

  return (
    <div>
      <h2>Phonebook</h2>
        <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonsForm 
      newName={newName} 
      newNumber={newNumber} 
      handleNameChange={handleNameChange} 
      handleNumberChange={handleNumberChange} 
      handleSubmit={handleSubmit} />
    <div>
      <Notification message={notificationMessage} />
      <h2>Numbers</h2>
    </div>
    <div>
      <Persons personsToShow={personsToShow} handleRemove={handleRemove} />
    </div>
  </div>
  )
}

export default App