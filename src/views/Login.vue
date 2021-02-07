<template>
  <v-app id="inspire">
    <v-main>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-alert border="left" type="error" v-if="alert.message"
              >{{ alert.message }}
            </v-alert>
            <v-card class="elevation-12">
              <v-toolbar dark color="teal">
                <v-toolbar-title>Login</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form @submit.prevent="handleSubmit">
                  <v-text-field
                    :rules="[rules.required, rules.email]"
                    color="teal"
                    v-model="email"
                    prepend-icon="mdi-account"
                    name="email"
                    label="Email"
                  ></v-text-field>
                  <v-text-field
                    :rules="[rules.required]"
                    color="teal"
                    v-model="password"
                    id="password"
                    prepend-icon="mdi-lock"
                    name="password"
                    label="Password"
                    type="password"
                  ></v-text-field>
                  <v-btn block color="primary" type="submit" @click="handleSubmit">Login</v-btn>
                </v-form>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>





<script>
export default {
  data() {
    return {
      email: 'email@email.com',
      password: '',
      submitted: false,
      rules: {
          required: value => !!value || 'Required.',
          email: value => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'Invalid e-mail.'
          },
      },
    };
  },
  computed: {
    alert() {
      return this.$store.state.alert;
    },
    loggingIn() {
      return this.$store.state.auth.loggingIn;
    },
  },
  created() {
    this.$store.dispatch('auth/logout');
  },
  methods: {
    handleSubmit() {
      this.submitted = true;
      const { email, password } = this;
      if (email && password) {
        this.$store.dispatch('auth/login', { email, password });
      }
    },
  },
};
</script>
