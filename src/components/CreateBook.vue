<template>
  <v-row justify="center">
    <v-col cols="12" md="8" lg="6" xl="4" v-click-outside="onClickOutside">
      <v-card>
        <div class="pa-2">
          <v-text-field
            v-model="book.attributes.name"
            v-show="nameFieldVisible"
            label="Create a book..."
            single-line
            flat
            background-color="transparent"
            maxlength="255"
            counter
          ></v-text-field>
          <v-textarea
            @focus="showNameFieldAndActions"
            :rows="2"
            auto-grow
            flat
            label="Create a book..."
            single-line
            solo
            maxlength="0"
            background-color="transparent"
          ></v-textarea>
        </div>
        <v-card-actions v-show="actionsVisible">
          <v-spacer></v-spacer>
          <v-btn text @click="close">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { NewBook, Book, Snackbar } from '@/store/models';
import { namespace } from 'vuex-class';
import { SnackbarColorTypes } from '../store/enums';

const globalModule = namespace('global');
const booksModule = namespace('books');

@Component({
  components: {},
})
export default class CreateBook extends Vue {
  book: NewBook = {
    type: '',
    attributes: {
      name: '',
    },
  };

  nameFieldVisible = false;
  actionsVisible = false;

  showNameFieldAndActions() {
    this.nameFieldVisible = true;
    this.actionsVisible = true;
  }

  hideNameFieldAndActions() {
    this.nameFieldVisible = false;
    this.actionsVisible = false;
  }

  onClickOutside() {
    this.close();
  }

  @booksModule.Action
  createBook!: (newBook: NewBook) => Promise<Book>;

  @globalModule.Mutation
  showSnackbar!: (snackbar: Snackbar) => void;

  async close() {
    this.hideNameFieldAndActions();

    if (this.book.attributes.name) {
      await this.createBook(this.book)
        .then(() => {
          this.showSnackbar({
            open: true,
            text: 'Book saved',
            color: SnackbarColorTypes.Success,
          });
        })
        .catch((errorMessage) => {
          this.showSnackbar({
            open: true,
            text: 'Book not saved',
            color: SnackbarColorTypes.Error,
          });
        });
    }

    this.book = {
      type: '',
      attributes: {
        name: '',
      },
    };
  }
}
</script>
