<template>
  <v-card
    dark
    outlined
    hover
    class="flex d-flex flex-column"
    @mouseenter="toggleEditIcon"
    @mouseleave="toggleEditIcon"
    @click="viewBook"
  >
    <v-icon large color="red lighten-1">mdi-book</v-icon>
    <v-card-subtitle>
      <div class="text-right">
        <v-icon small>mdi-calendar-clock</v-icon>
        Created: {{ book.attributes.created_at }}
      </div>
      <div class="text-right">
        <v-icon small>mdi-calendar-clock</v-icon>
        Updated: {{ book.attributes.updated_at }}
      </div>
    </v-card-subtitle>
    <v-divider></v-divider>
    <v-card-title>
      {{ book.attributes.name }}
      <v-spacer></v-spacer>
      <v-btn icon :ripple="false">
        <v-icon v-show="showEditIcon">mdi-pencil-outline</v-icon>
      </v-btn>
    </v-card-title>
    <v-spacer></v-spacer>
    <v-card-subtitle class="text-right">
      {{ book.attributes.note_count }} notas
    </v-card-subtitle>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Book } from '@/store/models';
import { namespace } from 'vuex-class';

const globalModule = namespace('global');

@Component
export default class BookItem extends Vue {
  @Prop({ type: Object as () => Book, required: true })
  book!: Book;

  showEditIcon = false;

  toggleEditIcon() {
    this.showEditIcon = !this.showEditIcon;
  }

  viewBook() {
    this.setSelectedBook(this.book);
    this.setShowBookDialog(true);
  }

  @globalModule.Mutation
  setSelectedBook!: (book: Book) => void;

  @globalModule.Mutation
  setShowBookDialog!: (payload: boolean) => void;
}
</script>
