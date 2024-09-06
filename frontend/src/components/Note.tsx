import { useState, useEffect } from "react";
import styles from "../styles/Note.module.css";
import styleUtils from "../styles/utils.module.css";
import { Card, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Note as NoteModel } from "../models/note";
import { formatDate } from "../utils/formatDate";
import { MdDeleteOutline } from "react-icons/md";
import ConfirmationModal from "./ConfirmationModal";

interface NoteProps {
  note: NoteModel;
  onNoteClicked: (note: NoteModel) => void;
  onDeleteNoteClicked: (note: NoteModel) => void;
  className?: string;
}

const lightColors = [
  "#f8d7da", // Light red
  "#d4edda", // Light green
  "#cce5ff", // Light blue
  "#fff3cd", // Light yellow
  "#e2e3e5", // Light gray
];

const getRandomLightColor = () => {
  const randomIndex = Math.floor(Math.random() * lightColors.length);
  return lightColors[randomIndex];
};

const Note = ({ note, onNoteClicked, onDeleteNoteClicked, className }: NoteProps) => {
  const { title, text, createdAt, updatedAt } = note;

  const [cardColor, setCardColor] = useState<string>(getRandomLightColor);
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);

  useEffect(() => {
    setCardColor(getRandomLightColor());
  }, [note]);

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowConfirmModal(true);
  };

  const handleConfirmDelete = () => {
    onDeleteNoteClicked(note);
    setShowConfirmModal(false);
  };

  const handleCancelDelete = () => {
    setShowConfirmModal(false);
  };

  let createdUpdateText: string;
  if (updatedAt > createdAt) {
    createdUpdateText = "Updated " + formatDate(updatedAt);
  } else {
    createdUpdateText = "Created " + formatDate(createdAt);
  }

  return (
    <>
      <Card
        className={`${styles.noteCard} ${className}`}
        style={{ backgroundColor: cardColor }}
        onClick={() => onNoteClicked(note)}
      >
        <Card.Body className={`${styles.cardBody} d-flex flex-column`}>
          <div className="d-flex justify-content-between align-items-center">
            <Card.Title className={`${styleUtils.flexCenter} mb-2 text-truncate`} style={{ maxWidth: "80%" }}>
              {title}
            </Card.Title>
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip id="delete-tooltip">Delete Note</Tooltip>}
            >
              <Button
                variant="outline-danger"
                size="sm"
                onClick={handleDeleteClick}
                className="p-1"
              >
                <MdDeleteOutline />
              </Button>
            </OverlayTrigger>
          </div>
          <Card.Text className={`${styles.cardText} text-truncate`} style={{ overflow: "hidden" }}>
            {text}
          </Card.Text>
        </Card.Body>
        <Card.Footer className="text-muted text-end">{createdUpdateText}</Card.Footer>
      </Card>

      <ConfirmationModal
        show={showConfirmModal}
        message="Are you sure you want to delete this note?"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </>
  );
};

export default Note;
