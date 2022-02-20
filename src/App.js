import logo from "./logo.svg";
import "./App.css";
import React from "react";
import axios from 'axios';

function App() {
  const [allNotes, setAllNotes] = React.useState([]);
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");

  React.useEffect(() => {
    axios.get('http://localhost:3001/').then(res => {
      setAllNotes(res.data)
    });
  }, [])

  function handleNote(e) {
    setTitle(e.target.value);
  }

  function handleDescription(e) {
    setDescription(e.target.value);
  }

  function handleSave(e) {
    const noteObject = {
      title: title,
      description: description,
    };
    e.preventDefault();
    if (title) {
      setAllNotes([...allNotes, noteObject]);
      setTitle("");
      setDescription("");
      axios.post('http://localhost:3001/note', { title: title, description: description });
    }
  }
  return (
    <div className="App">
      <h1>Auti's Keep</h1>
      <form className="note-form">
        <input
          className="note-input"
          value={title}
          type="text"
          onChange={handleNote}
          placeholder="Title"
        />
        <textarea
          className="note-text-area"
          value={description}
          type="text"
          onChange={handleDescription}
          placeholder="Description"
        />
        <button type="submit" className="save-btn" onClick={handleSave}>
          Save
        </button>
      </form>

      <div className="row">
        {allNotes
          ? allNotes.map((note, index) => (
              <NoteCard
                title={note.title}
                description={note.description}
                srno={index + 1}
              />
            ))
          : null}
      </div>
    </div>
  );
}

function NoteCard(props) {
  return (
    <div class="column">
      <div class="card">
        <h3>{props.title}</h3>
        <p>{props.description}</p>
        <button class="edit-btn">
        ✏️
        </button>
        <button class="delete-btn">
        ❌
        </button>
      </div>
    </div>
  );
}

export default App;
