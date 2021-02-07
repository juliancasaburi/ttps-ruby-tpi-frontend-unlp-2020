<template>
  <v-app>
    <v-main>
      <v-snackbar centered v-model="snackbar.open" :color="snackbar.color">{{ snackbar.text }}</v-snackbar>
      <v-container class="mt-5 mb-5">

        <div class="text-center mt-2" v-if="loading">
          <v-progress-circular :size="50" color="primary" indeterminate></v-progress-circular>
        </div>

        <Notes v-else />

        <NoteModal />

      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CreateNote from '../components/CreateNote.vue';
import Notes from '../components/Notes.vue';
import NoteModal from '../components/NoteModal.vue';
import { namespace } from 'vuex-class';
import { Snackbar, Note } from '../store/models';

const notesModule = namespace('notes');
const globalModule = namespace('global');

@Component({
  components: {
    CreateNote,
    Notes,
    NoteModal,
  },
})
export default class App extends Vue {
  loading = true;
  refreshLoading = false;

  async created() {
    this.loading = true;
    await this.getNotes();
    this.loading = false;
  }

  async refresh() {
    this.refreshLoading = true;
    await this.getNotes();
    this.refreshLoading = false;
  }

  @globalModule.State
  snackbar!: Snackbar;

  @notesModule.Action
  getNotes!: () => Promise<Note[]>;
}
</script>
