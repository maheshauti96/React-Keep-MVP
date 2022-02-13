import logo from "./logo.svg";
import "./App.css";
import React from "react";

function App() {
  const [allNotes, setAllNotes] = React.useState([]);
  const [note, setNote] = React.useState("");

  function handleNote(e) {
    setNote(e.target.value);
  }

  function handleSave(e) {
    e.preventDefault();
    if (note) {
      setAllNotes([...allNotes, note]);
      setNote("");
    }
  }
  return (
    <div className="App">
      <form>
        <input
          className="note-input"
          value={note}
          type="text"
          onChange={handleNote}
        />
        <button type="submit" className="save-btn" onClick={handleSave}>
          Save
        </button>
      </form>

      <div className="notes">
        {allNotes
          ? allNotes.map((note, index) => (
              <NoteCard note={note} srno={index + 1} />
            ))
          : null}
      </div>
    </div>
  );
}

function NoteCard(props) {
  return (
    <div className="note">
      {props.srno} - <b>{props.note}</b>
    </div>
  );
}

export default App;
