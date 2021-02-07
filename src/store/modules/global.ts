import { Module, VuexModule, Mutation } from 'vuex-module-decorators';
import { Note, Book, Snackbar, EditNoteField, EditBookField } from '@/store/models';
import { SnackbarColorTypes, CardColorTypes } from '@/store/enums';

@Module({
  namespaced: true
})
export default class GlobalModal extends VuexModule {
  selectedNote: Note = {
    id: '',
    type: '',
    attributes: {
      'title': '',
      'content': '',
      'color': CardColorTypes.Default,
    },
  };
  showNoteDialog = false;
  snackbar: Snackbar = {
    open: false,
    text: '',
    color: SnackbarColorTypes.Success
  };
  colorMenuOpen = false;

  @Mutation
  setSelectedNote(note: Note) {
    this.selectedNote = note;
  }

  @Mutation
  setNoteAttribute(payload: EditNoteField) {
    this.selectedNote.attributes = {
      ...this.selectedNote.attributes,
      [payload.name]: payload.value
    };
  }

  @Mutation
  setNoteField(payload: EditNoteField) {
    this.selectedNote = {
      ...this.selectedNote,
      [payload.name]: payload.value
    };
  }

  @Mutation
  setShowNoteDialog(payload: boolean) {
    this.showNoteDialog = payload;
  }

  @Mutation
  showSnackbar(payload: Snackbar) {
    this.snackbar = payload;
  }

  @Mutation
  setColorMenuOpen(payload: boolean) {
    this.colorMenuOpen = payload;
  }

  selectedBook: Book = {
    id: '',
    type: '',
    attributes: {
      'name': '',
    },
  };

  showBookDialog = false;

  @Mutation
  setSelectedBook(book: Book) {
    this.selectedBook = book;
  }

  @Mutation
  setBookAttribute(payload: EditBookField) {
    this.selectedBook.attributes = {
      ...this.selectedBook.attributes,
      [payload.name]: payload.value
    };
  }

  @Mutation
  setShowBookDialog(payload: boolean) {
    this.showBookDialog = payload;
  }
}
