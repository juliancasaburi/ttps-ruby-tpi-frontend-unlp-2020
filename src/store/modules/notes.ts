import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import { Note } from '../models';
import { db } from '@/db';
import { CardColorTypes } from '@/store/enums';

@Module({
  namespaced: true
})
export default class NotesModule extends VuexModule {
  notes: Note[] = [];

  @Mutation
  setNotes(notes: Note[]) {
    this.notes = notes;
  }

  @Mutation
  addNote(note: Note) {
    this.notes.unshift(note);
  }

  @Mutation
  removeNote(id: string) {
    const idx = this.notes.findIndex(i => i.id === id);
    if (idx !== -1) {
      this.notes.splice(idx, 1);
    }
  }

  @Mutation
  setNote(note: Note) {
    const idx = this.notes.findIndex(i => i.id === note.id);
    if (idx !== -1) {
      this.notes[idx].attributes = note.attributes;
      this.notes[idx].attributes.color = note.attributes.color || CardColorTypes.Default;
    }
  }

  @Action({ commit: 'setNotes' })
  async getNotes() {
    const notes = await db.getNotes();
    return notes;
  }

  @Action({ commit: 'setNotes' })
  async getBookNotes(id: string) {
    const notes = await db.getBookNotes(id);
    return notes;
  }

  @Action({ commit: 'addNote' })
  async createNote(params: Array<any>) {
    const data = await db.createNote(params[0], params[1]);
    return data;
  }

  @Action({ commit: 'removeNote' })
  async removeNoteAsync(id: string) {
    await db.deleteNote(id);
    return id;
  }

  @Action
  async downloadNoteAsync(id: string) {
    await db.downloadNote(id);
    return id;
  }

  @Action({ commit: 'setNote' })
  async updateNoteAsync(note: Note) {
    await db.updateNote(note);
    return note;
  }
}
