<template>
  <v-card
    :color="note.attributes.color"
    outlined
    hover
    class="flex d-flex flex-column"
    @mouseenter="toggleEditIcon"
    @mouseleave="toggleEditIcon"
    @click="viewNote"
  >
    <v-card-subtitle class="text-right">
      Book: {{ note.attributes.book.name }}
    </v-card-subtitle>
    <v-card-subtitle class="text-right">
      <div class="text-right">
        <v-icon small>mdi-calendar-clock</v-icon>
        Created: {{ note.attributes.created_at }}
      </div>
      <div class="text-right">
        <v-icon small>mdi-calendar-clock</v-icon>
        Updated: {{ note.attributes.updated_at }}
      </div>
    </v-card-subtitle>
    <v-divider></v-divider>
    <v-card-title>
      {{ note.attributes.title }}
      <v-spacer></v-spacer>
      <v-btn icon :ripple="false">
        <v-icon v-show="showEditIcon">mdi-pencil-outline</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-text v-text="note.attributes.content"></v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Note } from '@/store/models';
import { namespace } from 'vuex-class';

const globalModule = namespace('global');

@Component
export default class NoteItem extends Vue {
  @Prop({ type: Object as () => Note, required: true })
  note!: Note;

  showEditIcon = false;

  toggleEditIcon() {
    this.showEditIcon = !this.showEditIcon;
  }

  viewNote() {
    this.setSelectedNote(this.note);
    this.setShowNoteDialog(true);
  }

  @globalModule.Mutation
  setSelectedNote!: (note: Note) => void;

  @globalModule.Mutation
  setShowNoteDialog!: (payload: boolean) => void;
}
</script>
