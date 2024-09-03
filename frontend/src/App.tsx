import { useEffect, useState } from "react";
import { Note as NoteModel } from "./models/note";
import Note from "./components/Note";
import { Button, Col, Container, Row } from "react-bootstrap";
import styles from "./styles/NotesPage.module.css";
import styleUtills from "./styles/utils.module.css";
import * as NotesApi from "./network/notes_api";
import AddNoteDialog from "./components/AddEditNoteDialog";

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);
  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);

  useEffect(() => {
    async function loadNotes() {
      try {
        const notes = await NotesApi.fetchNotes();
        setNotes(notes);
        console.log(notes);
      } catch (error) {
        console.error(error);
      }
    }

    loadNotes();
  }, []);

  async function deleteNote(note: NoteModel) {
    try {
      await NotesApi.deleteNote(note._id);
      setNotes(notes.filter(existingNote => existingNote._id !== note._id));
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <Container>
        <h1>Notes</h1>
        <Button
          onClick={() => setShowAddNoteDialog(true)}
          className={`mb-4 ${styleUtills.blockCenter}`}
        >
          Add Note
        </Button>
        <Row xs={1} md={2} xl={3} className="g-4">
          {notes.map((note) => (
            <Col key={note._id}>
              <Note
                note={note}
                className={styles.note}
                onDeleteNoteClicked={deleteNote} 
              />
            </Col>
          ))}
        </Row>
        {showAddNoteDialog && (
          <AddNoteDialog
            onDismiss={() => setShowAddNoteDialog(false)}
            onNoteSaved={(newNote) => {
              setNotes((prevNotes) => [...prevNotes, newNote]);
              setShowAddNoteDialog(false);
            }}
          />
        )}
      </Container>
    </>
  );
}

export default App;
