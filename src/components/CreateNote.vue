<template>
  <v-row justify="center">
    <v-col cols="12" md="8" lg="6" xl="4" v-click-outside="onClickOutside">
      <v-card :color="note.attributes.color">
        <div class="pa-2">
          <v-text-field
            v-model="note.attributes.title"
            v-show="titleFieldVisible"
            label="Title"
            single-line
            flat
            solo
            background-color="transparent"
            maxlength="255"
            counter
          ></v-text-field>
          <v-textarea
            v-model="note.attributes.content"
            @focus="showTitleFieldAndActions"
            :rows="2"
            auto-grow
            flat
            solo
            label="Take a note..."
            single-line
            counter
            background-color="transparent"
          ></v-textarea>
        </div>
        <v-card-actions v-show="actionsVisible">
          <ColorPickerMenu
            @color-selected="colorSelected"
            :selected="note.attributes.color"
          />
          <v-spacer></v-spacer>
          <v-btn text @click="close">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { NewNote, Note, Snackbar, CardColors } from '@/store/models';
import { namespace } from 'vuex-class';
import { SnackbarColorTypes, CardColorTypes } from '../store/enums';
import ColorPickerMenu from './ColorPickerMenu.vue';

const globalModule = namespace('global');
const notesModule = namespace('notes');

@Component({
  components: {
    ColorPickerMenu,
  },
})
export default class CreateNote extends Vue {
  note: NewNote = {
    type: '',
    attributes: {
      title: '',
      content: '',
      color: CardColorTypes.Default,
    },
  };

  get colors() {
    return CardColorTypes;
  }

  titleFieldVisible = false;
  actionsVisible = false;

  @globalModule.State
  colorMenuOpen!: boolean;

  showTitleFieldAndActions() {
    this.titleFieldVisible = true;
    this.actionsVisible = true;
  }

  hideTitleFieldAndActions() {
    this.titleFieldVisible = false;
    this.actionsVisible = false;
  }

  colorSelected(color: CardColors) {
    this.note.attributes.color = CardColorTypes[color];
  }

  onClickOutside() {
    if (!this.colorMenuOpen) {
      this.close();
    }
  }

  @notesModule.Action
  createNote!: (params: Array<any>) => Promise<Note>;

  @globalModule.Mutation
  showSnackbar!: (snackbar: Snackbar) => void;

  get bookId(){
    return this.$route.params.bookId
  }

  async close() {
    this.hideTitleFieldAndActions();

    if (this.note.attributes.title) {
      const bookId = Number(this.bookId);
      await this.createNote([this.note, bookId])
        .then(() => {
          this.showSnackbar({
            open: true,
            text: 'Note saved',
            color: SnackbarColorTypes.Success,
          });
        })
        .catch((errorMessage) => {
          this.showSnackbar({
            open: true,
            text: 'Note not saved',
            color: SnackbarColorTypes.Error,
          });
        });
    }

    this.note = {
      type: '',
      attributes: {
        title: '',
        content: '',
        color: CardColorTypes.Default,
      },
    };
  }
}
</script>
