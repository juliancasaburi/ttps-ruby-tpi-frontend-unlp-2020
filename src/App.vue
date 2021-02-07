<template>
  <v-app>
    <v-app-bar app color="white">
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="../public/img/icons/ruby.png"
          transition="scale-transition"
          width="30"
        />

        <v-toolbar-title>RubyNotes</v-toolbar-title>
      </div>

      <v-spacer></v-spacer>
      <v-btn icon href="https://github.com/juliancasaburi" target="_blank">
        <v-icon>mdi-github</v-icon>
      </v-btn>
      <v-menu offset-y v-if="currentUser">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="teal" dark v-bind="attrs" v-on="on">
            {{ currentUser.email }}
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in items"
            :key="index"
            :to="item.link"
            link
          >
            <v-list-item-title :to="item.link">{{
              item.title
            }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <router-view />
    <v-bottom-navigation
      app
      v-if="currentUser"
      dark
      :value="activeBtn"
      grow
      color="red"
    >
      <v-btn to="/books">
        <span>Books</span>
        <v-icon>mdi-book</v-icon>
      </v-btn>
      <v-btn to="/">
        <span>Notes</span>
        <v-icon>mdi-note</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    items: [{ title: 'Logout', link: '/login' }],
  }),
  computed: {
    alert() {
      return this.$store.state.alert;
    },
    currentUser() {
      return this.$store.state.auth.user;
    },
    globalBookId() {
      return this.$store.state.auth.globalBookId;
    },
  },
  watch: {
    $route(/* to, from */) {
      this.$store.dispatch('alert/clear');
    },
  },
};
</script>