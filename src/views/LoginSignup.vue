<template>
  <v-app>
    <v-main>
      <v-container fill-height>
      <v-row justify="center" align="center">
        <v-col cols="12" md="8" lg="4">
          <v-tabs
            v-model="tab"
            show-arrows
            background-color="deep-purple accent-4"
            icons-and-text
            dark
            grow
          >
            <v-tabs-slider color="purple darken-4"></v-tabs-slider>
            <v-tab v-for="i in tabs" :key="i">
              <v-icon large>{{ i.icon }}</v-icon>
              <div class="caption py-1">{{ i.name }}</div>
            </v-tab>
            <v-tab-item>
              <v-card class="px-4">
                <v-card-text>
                  <v-form ref="loginForm" v-model="valid" lazy-validation>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field
                          v-model="loginEmail"
                          :rules="loginEmailRules"
                          label="E-mail"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          v-model="loginPassword"
                          :append-icon="show1 ? 'eye' : 'eye-off'"
                          :rules="[rules.required, rules.min]"
                          :type="show1 ? 'text' : 'password'"
                          name="input-10-1"
                          label="Password"
                          hint="At least 8 characters"
                          counter
                          @click:append="show1 = !show1"
                        ></v-text-field>
                      </v-col>
                      <v-col class="d-flex" cols="12" sm="6" xsm="12"> </v-col>
                      <v-spacer></v-spacer>
                      <v-col class="d-flex" cols="12" sm="3" xsm="12" align-end>
                        <v-btn
                          x-large
                          block
                          :disabled="!valid"
                          color="success"
                          @click="validateLogin"
                        >
                          Login
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-form>
                </v-card-text>
              </v-card>
            </v-tab-item>
            <v-tab-item>
              <v-card class="px-4">
                <v-card-text>
                  <v-form ref="registerForm" v-model="valid" lazy-validation>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field
                          v-model="email"
                          :rules="emailRules"
                          label="E-mail"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          v-model="password"
                          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                          :rules="[rules.required, rules.min]"
                          :type="show1 ? 'text' : 'password'"
                          name="input-10-1"
                          label="Password"
                          hint="At least 8 characters"
                          counter
                          @click:append="show1 = !show1"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          block
                          v-model="verify"
                          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                          :rules="[rules.required, passwordMatch]"
                          :type="show1 ? 'text' : 'password'"
                          name="input-10-1"
                          label="Confirm Password"
                          counter
                          @click:append="show1 = !show1"
                        ></v-text-field>
                      </v-col>
                      <v-spacer></v-spacer>
                      <v-col class="d-flex ml-auto" cols="12" sm="3" xsm="12">
                        <v-btn
                          x-large
                          block
                          :disabled="!valid"
                          color="success"
                          @click="validateRegister"
                          >Sign up</v-btn
                        >
                      </v-col>
                    </v-row>
                  </v-form>
                </v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs>
          <v-alert border="left" type="error" v-if="alert.message">
            {{ alert.message }}
          </v-alert>
        </v-col>
      </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>





<script>
export default {
  data() {
    return {
      dialog: true,
      tab: 0,
      tabs: [
        { name: 'Login', icon: 'mdi-account' },
        { name: 'Sign up', icon: 'mdi-account-outline' },
      ],
      valid: true,

      loginPassword: '',
      loginEmail: '',
      email: '',
      password: '',
      verify: '',
      loginEmailRules: [
        (v) => !!v || 'Required',
        (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      emailRules: [
        (v) => !!v || 'Required',
        (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],

      show1: false,
      rules: {
        required: (value) => !!value || 'Required.',
        min: (v) => (v && v.length >= 8) || 'Min 8 characters',
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
    passwordMatch() {
      return () => this.password === this.verify || 'Password must match';
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
    validateRegister() {
      if (this.$refs.registerForm.validate()) {
        const email = this.email;
        const password = this.password;
        this.$store.dispatch('auth/signup', { email, password });
      }
    },
    validateLogin() {
      if (this.$refs.loginForm.validate()) {
        const email = this.loginEmail;
        const password = this.loginPassword;
        this.$store.dispatch('auth/login', { email, password });
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
  },
};
</script>
