<template>
  <v-app>
    <v-main>
      <v-snackbar centered v-model="snackbar.open" :color="snackbar.color">{{ snackbar.text }}</v-snackbar>
      <v-container class="mt-3 mb-16">

        <v-btn class="mt-3 mb-3" tile outlined large text @click="downloadBooks">
          Export books
          <v-icon>mdi-file-pdf</v-icon>
        </v-btn>

        <CreateBook />

        <div class="text-center mt-2" v-if="loading">
          <v-progress-circular :size="50" color="primary" indeterminate></v-progress-circular>
        </div>

        <Books v-else />

        <BookModal />

      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CreateBook from '../components/CreateBook.vue';
import Books from '../components/Books.vue';
import BookModal from '../components/BookModal.vue';
import { namespace } from 'vuex-class';
import { Snackbar, Book } from '../store/models';

const booksModule = namespace('books');
const globalModule = namespace('global');

@Component({
  components: {
    CreateBook,
    Books,
    BookModal,
  },
})
export default class App extends Vue {
  loading = true;
  refreshLoading = false;

  async created() {
    this.loading = true;
    await this.getBooks();
    this.loading = false;
  }

  async refresh() {
    this.refreshLoading = true;
    await this.getBooks();
    this.refreshLoading = false;
  }

  @globalModule.State
  snackbar!: Snackbar;

  @booksModule.Action
  getBooks!: () => Promise<Book[]>;

  @booksModule.Action
  downloadBooksAsync!: () => Promise<boolean>;

  async downloadBooks() {
    await this.downloadBooksAsync();
  }
}
</script>
