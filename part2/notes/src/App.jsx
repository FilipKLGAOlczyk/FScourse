import Note from './components/Note'
import { useState, useEffect } from 'react'
import noteService from './services/notes'
import Notification from './components/Notification'
import Footer from './components/Footer'

const App = () => {
const [notes, setNotes] = useState(null)
const [newNote, setNewNote] = useState('')
const [showAll, setShowAll] = useState(true)
const [errorMessage, setErrorMessage] = useState('some error happened...')



useEffect(() => {
  console.log('effect')
  noteService
    .getAll()
    .then(initialNotes => {
      console.log('promise fulfilled')
      setNotes(initialNotes)
      console.log('response.data', initialNotes);

    })
}, [])
  if (notes === null) {
    return <div>Loading...</div>
  }
console.log('render', notes.length, 'notes')

  const toggleImportance = (id) => {
  console.log(`importance of ${id} needs to be toggled`)
  const note = notes.find(n => n.id === id)
  const changedNote = { ...note, important: !note.important }

  noteService
    .update(id, changedNote)
    .then(returnedNote => {
      setNotes(notes.map(note =>
        note.id === id ? returnedNote : note))
    })
    .catch(error => {
      setErrorMessage(
`Note '${note.content}' was already removed from server`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      setNotes(notes.filter(n => n.id !== id))
    })
  }

const notesToShow = showAll ? notes : notes.filter(note => note.important)

const handleNoteChange = (event) => {
  console.log(event.target.value);
  setNewNote(event.target.value)
} 
  
const addNote = (event) => {
  event.preventDefault()
  console.log('button clicked', event.target)
  const noteObject = {
    content: newNote,
    important: Math.random() < 0.5,
  }
  noteService
    .create(noteObject)
    .then(returnedNote => {
      setNotes(notes.concat(returnedNote))
      setNewNote('')
    })
}
return (
  <div>
    <h1>Notes</h1>
    <Notification message={errorMessage} />
    <div>
      <button onClick={() => setShowAll(!showAll)}>
        show {showAll ? 'important' : 'all'}
      </button>
    </div>
    <ul>
      {notesToShow.map((note) => (
        <Note 
        key={note.id} 
        note={note} 
        toggleImportance={() => 
          toggleImportance(note.id)} />
      ))}
    </ul>
    <form onSubmit={addNote}>
      <input
      value={newNote}
      onChange={handleNoteChange}
      />
      <button type="submit">save</button>
    </form>
    <Footer />
  </div>
)
}

export default App