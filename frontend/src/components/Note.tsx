import styles from "../styles/Note.module.css";
import styleUtills from "../styles/utils.module.css";
import { Card } from "react-bootstrap";
import { Note as NoteModel } from "../models/note";
import { formatDate } from "../utils/formatDate";
import { MdDeleteOutline } from "react-icons/md";

interface NoteProps {
  note: NoteModel;
  onDeleteNoteClicked: (note: NoteModel) => void;
  className?: string;
}

const Note = ({ note, onDeleteNoteClicked, className }: NoteProps) => {  // Ensure onDeleteNoteClicked is destructured
  const { title, text, createdAt, updatedAt } = note;

  let createdUpdateText: string;
  if (updatedAt > createdAt) {
    createdUpdateText = "Updated " + formatDate(updatedAt);
  } else {
    createdUpdateText = "Created " + formatDate(createdAt);
  }

  return (
    <Card className={`${styles.noteCard} ${className}`}>
      <Card.Body className={styles.cardBody}>
        <Card.Title className={styleUtills.flexCenter}>
          {title}{" "}
          <MdDeleteOutline
            onClick={(e) => {
              onDeleteNoteClicked(note); // Correctly calling the prop function
              e.stopPropagation();
            }}
          />
        </Card.Title>
        <Card.Text className={styles.cardText}>{text}</Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">{createdUpdateText}</Card.Footer>
    </Card>
  );
};

export default Note;
