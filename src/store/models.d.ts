import { SnackbarColorTypes, CardColorTypes } from './enums';

export interface User {
  id: number;
  jti?: string;
  email: string;
  password: string;
}

export interface Note {
  id: string;
  type: string;
  attributes: { [key: string]: string };
}

export type NewNote = Omit<Note, 'id'>;

export interface Book {
  id: string;
  type: string;
  attributes: { [key: string]: string };
}

export type NewBook = Omit<Book, 'id'>;

export interface Snackbar {
  open: boolean;
  text: string;
  color: SnackbarColorTypes;
}

export interface EditNoteField {
  name: string;
  value: string;
}

export interface EditBookField {
  name: string;
  value: string;
}

export type CardColors = keyof typeof CardColorTypes;