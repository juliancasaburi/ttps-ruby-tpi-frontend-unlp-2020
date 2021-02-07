<template>
  <v-row>
    <v-col
      v-for="(book, idx) in books"
      :key="idx"
      cols="12"
      sm="6"
      md="4"
      lg="3"
      xl="2"
      class="d-flex flex-column"
    >
      <BookItem :book="book" />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BookItem from './Book.vue';
import { Book } from '@/store/models';
import { namespace } from 'vuex-class';

const booksModule = namespace('books');

@Component({
  components: {
    BookItem,
  },
})
export default class Books extends Vue {
  @booksModule.State
  books!: Book[];
}
</script>
