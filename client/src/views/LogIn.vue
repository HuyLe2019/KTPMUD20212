<template>
  <div class="flex items-center justify-center h-screen px-6 bg-gray-200">
    <div class="w-full max-w-sm p-6 bg-white rounded-md shadow-md">
      <div class="flex items-center justify-center mb-3">
        <img src="/favicon.png" alt="log" class="w-10 h-10" />
      </div>
      <div class="flex items-center justify-center">
        <span class="text-2xl font-semibold text-gray-700">LOGIN</span>
      </div>

      <validate-form class="mt-4" @submit="login" v-slot="{ meta }">
        <label class="block">
          <span class="text-sm text-gray-700">Email</span>
          <base-input
            name="email"
            type="email"
            autocomplete="off"
            v-model:value="email"
            :rules="emailRules"
            class="block w-full mt-1 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500" />
        </label>

        <label class="block mt-3">
          <span class="text-sm text-gray-700">Password</span>
          <base-input
            name="password"
            type="password"
            autocomplete="off"
            v-model:value="password"
            :rules="passwordRules"
            class="block w-full mt-1 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500" />
        </label>

        <div class="flex items-center justify-end mt-4">
          <div>
            <a class="block text-sm text-indigo-700 fontme hover:underline" href="#">Forgot your password?</a>
          </div>
        </div>
        <div class="mt-6">
          <button
            type="submit"
            :disabled="!meta.valid"
            class="
              w-full
              px-4
              py-2
              text-sm text-center text-white
              bg-indigo-600
              rounded-md
              focus:outline-none
              hover:bg-indigo-500
              disabled:cursor-not-allowed disabled:opacity-50
            ">
            Sign in
          </button>
        </div>
      </validate-form>
    </div>
  </div>
</template>
<script>
import { defineComponent } from 'vue'
import AuthService from '../services/AuthService'
import { string } from 'yup'

export default defineComponent({
  name: 'Login',
  props: {
    msg: {
      type: String,
      required: false,
    },
  },
  data: () => {
    const emailRules = string().email().required()
    const passwordRules = string().min(6).required()
    return {
      emailRules,
      passwordRules,
      email: '',
      password: '',
    }
  },
  computed: {
    user() {
      return this.$store.state.user
    },
  },
  methods: {
    async login() {
      this.$store.dispatch('startLoading')
      try {
        const data = await AuthService.login(this.$axios, {
          email: this.email,
          password: this.password,
        })
        if (data) {
          this.$store.dispatch('login', data)
        }
      } catch (e) {
        this.$store.dispatch('handleNotifications', { message: 'Incorrect username or password.' })
      }
      this.$store.dispatch('stopLoading')
    },
  },
  watch: {
    user() {
      if (this.user) {
        this.$router.push('/dashboard')
      }
    },
  },
})
</script>

