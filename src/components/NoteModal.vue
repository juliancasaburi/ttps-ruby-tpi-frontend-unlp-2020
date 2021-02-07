<template>
  <v-dialog v-model="showNoteDialog" persistent max-width="500">
    <v-card :color="selectedNote.attributes.color">
      <v-card-subtitle>
        Book: {{ selectedNote.attributes.book.name }}
      </v-card-subtitle>
      <v-card-subtitle class="text-right">
        <div class="text-right">
          <v-icon small>mdi-calendar-clock</v-icon>
          Created: {{ selectedNote.attributes.created_at }}
        </div>
        <div class="text-right">
          <v-icon small>mdi-calendar-clock</v-icon>
          Updated: {{ selectedNote.attributes.updated_at }}
        </div>
      </v-card-subtitle>
      <v-divider></v-divider>
      <div class="pa-2">
        <v-text-field
          label="Title"
          single-line
          flat
          solo
          :value="selectedNote.attributes.title"
          @input="updateTitle"
          maxlength="255"
          counter
          background-color="transparent"
        ></v-text-field>
        <v-textarea
          auto-grow
          flat
          solo
          label="Take a note..."
          single-line
          :value="selectedNote.attributes.content"
          @input="updateContent"
          counter
          background-color="transparent"
        ></v-textarea>
        <v-btn class="mt-3" tile outlined large text @click="downloadPDF">
          Open as PDF
          <v-icon>mdi-file-pdf</v-icon>
        </v-btn>
      </div>
      <v-card-actions>
        <v-btn icon @click="deleteNote" :loading="deleteLoading">
          <v-icon>mdi-delete-outline</v-icon>
        </v-btn>
        <ColorPickerMenu
          @color-selected="colorSelected"
          :selected="selectedNote.attributes.color"
        />
        <v-spacer></v-spacer>
        <v-btn text @click="setShowNoteDialog(false)">Close</v-btn>
        <v-btn text @click="saveNote" :loading="loading">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Note, Snackbar, EditNoteField, CardColors } from '@/store/models';
import { SnackbarColorTypes, CardColorTypes } from '@/store/enums';
import { namespace } from 'vuex-class';
import ColorPickerMenu from './ColorPickerMenu.vue';

const notesModule = namespace('notes');
const globalModule = namespace('global');

@Component({
  components: {
    ColorPickerMenu,
  },
})
export default class NoteModal extends Vue {
  loading = false;
  deleteLoading = false;

  @globalModule.State
  showNoteDialog!: boolean;

  @globalModule.State
  selectedNote!: Note;

  @globalModule.Mutation
  setShowNoteDialog!: (payload: boolean) => void;

  @globalModule.Mutation
  showSnackbar!: (snackbar: Snackbar) => void;

  @globalModule.Mutation
  setNoteAttribute!: (field: EditNoteField) => void;

  @notesModule.Action
  updateNoteAsync!: (note: Note) => Promise<Note>;

  @notesModule.Action
  removeNoteAsync!: (id: string) => Promise<string>;

  @notesModule.Action
  downloadNoteAsync!: (id: string) => Promise<string>;

  async saveNote() {
    this.loading = true;
    await this.updateNoteAsync(this.selectedNote)
      .then(() => {
        this.showSnackbar({
          open: true,
          text: 'Note updated',
          color: SnackbarColorTypes.Success,
        });
      })
      .catch(() => {
        this.showSnackbar({
          open: true,
          text: 'Note not updated',
          color: SnackbarColorTypes.Error,
        });
      });
    this.loading = false;
    this.setShowNoteDialog(false);
  }

  async deleteNote() {
    this.deleteLoading = true;
    await this.removeNoteAsync(this.selectedNote.id)
    .then(() => {
        this.showSnackbar({
          open: true,
          text: 'Note removed',
          color: SnackbarColorTypes.Success,
        });
      })
      .catch(() => {
        this.showSnackbar({
          open: true,
          text: 'Note not removed',
          color: SnackbarColorTypes.Error,
        });
      });
    this.deleteLoading = false;
    this.setShowNoteDialog(false);
  }

  async downloadPDF() {
    await this.downloadNoteAsync(this.selectedNote.id);
  }

  updateTitle(value: string) {
    this.setNoteAttribute({
      name: 'title',
      value,
    });
  }

  updateContent(value: string) {
    this.setNoteAttribute({
      name: 'content',
      value,
    });
  }

  colorSelected(color: CardColors) {
    this.setNoteAttribute({
      name: 'color',
      value: CardColorTypes[color],
    });
  }
}
</script>
