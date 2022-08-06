<template>
  <div class="flex items-center w-full justify-center">
    <div class="max-w-xs">
      <div class="bg-white shadow-xl rounded-lg py-3 px-6">
        <div class="photo-wrapper p-2">
          <img
            class="w-32 h-32 rounded-full mx-auto object-cover"
            src="https://images.unsplash.com/photo-1528892952291-009c663ce843?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=296&q=80"
            alt="avatar" />
        </div>
        <div class="p-2">
          <h3 class="text-center text-xl text-gray-900 font-medium leading-8">{{ currentUser.username }}</h3>
          <div class="text-center text-gray-400 text-xl font-semibold">
            <p>{{ getRole(currentUser.role) }}</p>
          </div>
          <table class="text-md my-3">
            <tbody>
              <tr>
                <td class="px-2 py-2 text-gray-500 font-semibold">Username</td>
                <td class="px-2 py-2">
                  {{ currentUser.username }}
                </td>
              </tr>
              <tr>
                <td class="px-2 py-2 text-gray-500 font-semibold">Email</td>
                <td class="px-2 py-2">
                  {{ currentUser.email }}
                </td>
              </tr>
            </tbody>
          </table>

          <div class="text-center my-3">
            <a class="text-l text-indigo-500 italic hover:underline hover:text-indigo-600 font-medium cursor-pointer" @click="isOpenModal = true"
              >Edit Profile</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
  <base-modal :open="isOpenModal" title="Edit profile" @close="isOpenModal = false" @submit="onModalSubmit">
    <div class="w-full">
      <validate-form class="text-start" :validation-schema="ruleSchema" v-slot="{ meta }">
        <div class="grid grid-cols-1 mt-4">
          <div>
            <label class="text-gray-700" for="full_name">UserName</label>
            <base-input
              name="username"
              type="text"
              autocomplete="off"
              v-model:value="user.username"
              class="w-full mt-2 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500" />
          </div>
          <div>
            <label class="text-gray-700" for="email">Email</label>
            <base-input
              name="email"
              type="text"
              autocomplete="off"
              v-model:value="user.email"
              class="w-full mt-2 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500" />
          </div>
        </div>
      </validate-form>
    </div>
  </base-modal>
</template>
<script>
import { defineComponent } from 'vue'
import * as Yup from 'yup'
import UserService from '../services/UserService'
import ERole from '../enums/role.enum.js'

export default defineComponent({
  name: 'Profile',
  data: () => {
    const ruleSchema = Yup.object().shape({
      username: Yup.string().required().label('User Name'),
      email: Yup.string().email().required().label('Email Address'),
      rfid: Yup.string().required().label('RFID'),
    })
    return {
      ruleSchema,
      isOpenModal: false,
      user: {
        email: '',
        username: '',
        role: '',
      },
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.user
    },
  },
  created() {
    this.user = { ...this.currentUser }
  },
  methods: {
    getRole(value) {
      return Object.keys(ERole).find((k) => ERole[k] === value)
    },
    async onModalSubmit() {
      this.$store.dispatch('startLoading')
      try {
        const data = await UserService.editUser(this.$axios, this.user._id, this.user)
        if (data.success) {
          location.reload()
        }
      } catch (e) {
        this.$store.dispatch('handleNotifications', e)
      }
      this.$store.dispatch('stopLoading')
    },
  },
})
</script>

