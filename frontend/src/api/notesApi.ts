import axios from 'axios';
import { Note } from "../models/note";

const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

export interface NoteInput {
  title: string;
  text?: string;
}

export async function fetchNotes(): Promise<Note[]> {
  try {
    const response = await axios.get<Note[]>(`${API_BASE_URL}/notes`, {
      withCredentials: true, // Include cookies with the request
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch notes:', error);
    throw new Error('Failed to fetch notes');
  }
}

export async function createNote(note: NoteInput): Promise<Note> {
  try {
    const response = await axios.post<Note>(`${API_BASE_URL}/notes`, note, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true, 
    });
    return response.data;
  } catch (error) {
    console.error('Failed to create note:', error);
    throw new Error('Failed to create note');
  }
}

export async function updateNote(
  noteId: string,
  note: NoteInput
): Promise<Note> {
  try {
    const response = await axios.patch<Note>(`${API_BASE_URL}/notes/${noteId}`, note, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true, 
    });
    return response.data;
  } catch (error) {
    console.error('Failed to update note:', error);
    throw new Error('Failed to update note');
  }
}

export async function deleteNote(noteId: string): Promise<void> {
  try {
    await axios.delete(`${API_BASE_URL}/notes/${noteId}`, {
      withCredentials: true, 
    });
  } catch (error) {
    console.error('Failed to delete note:', error);
    throw new Error('Failed to delete note');
  }
}
