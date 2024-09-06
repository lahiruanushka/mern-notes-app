import React, { useState, useEffect } from "react";
import { Note as NoteModel } from "../models/note";
import { fetchNotes, deleteNote } from "../api/notesApi";
import { Button, Col, Row, Container, Alert } from "react-bootstrap";
import Note from "../components/Note";
import { FaPlus } from "react-icons/fa";
import AddEditNoteDialog from "../components/AddEditNoteDialog";
import styles from "../styles/NotesPage.module.css"; // Import custom CSS module
import { useUser } from "../context/UserContext";

const NotesPage: React.FC = () => {
  const { user } = useUser();

  const [notes, setNotes] = useState<NoteModel[]>([]);
  const [noteToEdit, setNoteToEdit] = useState<NoteModel | null>(null);
  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);

  useEffect(() => {
    async function loadNotes() {
      try {
        const notes = await fetchNotes();
        setNotes(notes);
      } catch (error) {
        console.error("Failed to fetch notes:", error);
      }
    }
    loadNotes();
  }, []);

  async function handleDeleteNote(note: NoteModel) {
    try {
      await deleteNote(note._id);
      setNotes(notes.filter((existingNote) => existingNote._id !== note._id));
    } catch (error) {
      console.error("Failed to delete note:", error);
    }
  }

  const notesGrid = (
    <Row xs={1} md={2} xl={3} className="g-4">
      {notes.map((note) => (
        <Col key={note._id}>
          <Note
            note={note}
            onNoteClicked={setNoteToEdit}
            onDeleteNoteClicked={handleDeleteNote}
          />
        </Col>
      ))}
    </Row>
  );

  return (
    <Container className="py-4">
      {user ? (
        <>
          <div className={styles.header}>
            <h1 className="mb-4">Notes</h1>
            <Button
              onClick={() => setShowAddNoteDialog(true)}
              variant="primary"
              size="lg"
              className="d-flex align-items-center"
            >
              <FaPlus className="me-2" />
              Add Note
            </Button>
          </div>

          <div className="mt-4">
            {notes.length > 0 ? (
              notesGrid
            ) : (
              <Alert variant="info">
                You don't have any notes! Click "Add Note" to create one.
              </Alert>
            )}
          </div>

          {showAddNoteDialog && (
            <AddEditNoteDialog
              onDismiss={() => setShowAddNoteDialog(false)}
              onNoteSaved={(newNote) => {
                setNotes([...notes, newNote]);
                setShowAddNoteDialog(false);
              }}
            />
          )}

          {noteToEdit && (
            <AddEditNoteDialog
              noteToEdit={noteToEdit}
              onDismiss={() => setNoteToEdit(null)}
              onNoteSaved={(updatedNote) => {
                setNotes(
                  notes.map((existingNote) =>
                    existingNote._id === updatedNote._id
                      ? updatedNote
                      : existingNote
                  )
                );
                setNoteToEdit(null);
              }}
            />
          )}
        </>
      ) : (
        <Alert variant="info">
          Login to create view notes!
        </Alert>
      )}
    </Container>
  );
};

export default NotesPage;
