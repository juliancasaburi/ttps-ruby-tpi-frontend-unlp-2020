<template>
  <v-dialog v-model="showBookDialog" persistent max-width="500">
    <v-card dark>
      <v-card-subtitle>
        <div class="text-right">
          <v-icon small>mdi-calendar-clock</v-icon>
          Created: {{ selectedBook.attributes.created_at }}
        </div>
        <div class="text-right">
          <v-icon small>mdi-calendar-clock</v-icon>
          Updated: {{ selectedBook.attributes.updated_at }}
        </div>
      </v-card-subtitle>
      <v-divider></v-divider>
      <div class="pa-2">
        <v-text-field
          label="Name"
          single-line
          flat
          solo
          :value="selectedBook.attributes.name"
          @input="updateName"
          maxlength="255"
          counter
          background-color="transparent"
        ></v-text-field>
        <v-btn class="mt-3" tile outlined large text @click="downloadPDF">
          Export as PDF
          <v-icon>mdi-file-pdf</v-icon>
        </v-btn>
        <v-btn
          class="mt-3 text-centered"
          tile
          outlined
          large
          text
          :to="{ name: 'book', params: { bookId: selectedBook.id } }"
        >
          Manage Notes
          <v-icon>mdi-note-text</v-icon>
        </v-btn>
      </div>
      <v-card-actions>
        <v-btn
          v-if="selectedBook.attributes.name != 'Global'"
          icon
          @click="deleteBook"
          :loading="deleteLoading"
        >
          <v-icon>mdi-delete-outline</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn text @click="setShowBookDialog(false)">Close</v-btn>
        <v-btn text @click="saveBook" :loading="loading">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Book, Snackbar, EditBookField } from '@/store/models';
import { SnackbarColorTypes } from '@/store/enums';
import { namespace } from 'vuex-class';

const booksModule = namespace('books');
const globalModule = namespace('global');

@Component({
  components: {},
})
export default class BookModal extends Vue {
  loading = false;
  deleteLoading = false;

  @globalModule.State
  showBookDialog!: boolean;

  @globalModule.State
  selectedBook!: Book;

  @globalModule.Mutation
  setShowBookDialog!: (payload: boolean) => void;

  @globalModule.Mutation
  showSnackbar!: (snackbar: Snackbar) => void;

  @globalModule.Mutation
  setBookField!: (field: EditBookField) => void;

  @globalModule.Mutation
  setBookAttribute!: (field: EditBookField) => void;

  @booksModule.Action
  updateBookAsync!: (book: Book) => Promise<Book>;

  @booksModule.Action
  removeBookAsync!: (id: string) => Promise<string>;

  @booksModule.Action
  downloadBookAsync!: (id: string) => Promise<string>;

  route() {
    return this.$store.state.alert;
  }

  async saveBook() {
    this.loading = true;
    await this.updateBookAsync(this.selectedBook)
      .then(() => {
        this.showSnackbar({
          open: true,
          text: 'Book updated',
          color: SnackbarColorTypes.Success,
        });
      })
      .catch((errorMessage) => {
        this.showSnackbar({
          open: true,
          text: 'Book not updated',
          color: SnackbarColorTypes.Error,
        });
      });
    this.loading = false;
    this.setShowBookDialog(false);
  }

  async deleteBook() {
    this.deleteLoading = true;
    await this.removeBookAsync(this.selectedBook.id)
      .then(() => {
        this.showSnackbar({
          open: true,
          text: 'Book removed',
          color: SnackbarColorTypes.Success,
        });
      })
      .catch(() => {
        this.showSnackbar({
          open: true,
          text: 'Book not removed',
          color: SnackbarColorTypes.Error,
        });
      });
    this.deleteLoading = false;
    this.setShowBookDialog(false);
  }

  async downloadPDF() {
    await this.downloadBookAsync(this.selectedBook.id);
  }

  updateName(value: string) {
    this.setBookAttribute({
      name: 'name',
      value,
    });
  }
}
</script>
