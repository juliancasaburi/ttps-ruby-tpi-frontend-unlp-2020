import Vue from 'vue';
import Vuex from 'vuex';

import { alert } from './alert';
import { auth } from './auth';

import global from '@/store/modules/global';
import notes from '@/store/modules/notes';
import books from '@/store/modules/books';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    alert,
    auth,
    global,
    notes,
    books
  }
});
