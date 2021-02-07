import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import { Book, NewBook } from '../models';
import { db } from '@/db';

@Module({
  namespaced: true
})
export default class BooksModule extends VuexModule {
  books: Book[] = [];

  @Mutation
  setBooks(books: Book[]) {
    this.books = books;
  }

  @Mutation
  addBook(book: Book) {
    this.books.unshift(book);
  }

  @Mutation
  removeBook(id: string) {
    const idx = this.books.findIndex(i => i.id === id);
    if (idx !== -1) {
      this.books.splice(idx, 1);
    }
  }

  @Mutation
  setBook(book: Book) {
    const idx = this.books.findIndex(i => i.id === book.id);
    if (idx !== -1) {
      this.books[idx].attributes = book.attributes
    }
  }

  @Action({ commit: 'setBooks' })
  async getBooks() {
    const books = await db.getBooks();
    return books;
  }

  @Action({ commit: 'addBook' })
  async createBook(book: NewBook) {
    const data = await db.createBook(book);
    return data;
  }

  @Action({ commit: 'setBook' })
  async updateBookAsync(book: Book) {
    await db.updateBook(book);
    return book;
  }

  @Action({ commit: 'removeBook' })
  async removeBookAsync(id: string) {
    await db.deleteBook(id);
    return id;
  }

  @Action
  async downloadBookAsync(id: string) {
    await db.downloadBook(id);
    return id;
  }

  @Action
  async downloadBooksAsync() {
    await db.downloadBooks();
    return true;
  }
}
