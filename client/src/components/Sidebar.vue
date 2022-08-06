<template>
  <div class="flex">
    <div :class="isOpen ? 'block' : 'hidden'" @click="closeSidebar" class="fixed inset-0 z-20 transition-opacity bg-black opacity-50 lg:hidden"></div>
    <div
      :class="isOpen ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'"
      class="fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto transition duration-300 transform bg-gray-900 lg:translate-x-0 lg:static lg:inset-0">
      <div class="flex items-center justify-center mt-8">
        <div class="flex items-center">
          <img src="/favicon.png" alt="Iot project" width="30" height="30" />
          <span class="mx-2 text-2xl font-semibold text-white">RFIDPro</span>
        </div>
      </div>

      <nav class="mt-10">
        <router-link
          @click="closeSidebar"
          class="flex items-center px-6 py-2 mt-4 duration-200 border-l-4"
          :class="[$route.name === 'Dashboard' ? activeClass : inactiveClass]"
          to="/dashboard">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z"></path>
          </svg>
          <span class="mx-4">Dashboard</span>
        </router-link>
        <router-link
          @click="closeSidebar"
          class="flex items-center px-6 py-2 mt-4 duration-200 border-l-4 cursor-pointer"
          :class="[$route.name === 'Customer' ? activeClass : inactiveClass]"
          to="/customer">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" class="w-5 h-5" fill="currentColor">
            <path
              d="M224 256c70.7 0 128-57.31 128-128S294.7 0 224 0C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3c-95.73 0-173.3 77.6-173.3 173.3C0 496.5 15.52 512 34.66 512H413.3C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304zM479.1 320h-73.85C451.2 357.7 480 414.1 480 477.3C480 490.1 476.2 501.9 470 512h138C625.7 512 640 497.6 640 479.1C640 391.6 568.4 320 479.1 320zM432 256C493.9 256 544 205.9 544 144S493.9 32 432 32c-25.11 0-48.04 8.555-66.72 22.51C376.8 76.63 384 101.4 384 128c0 35.52-11.93 68.14-31.59 94.71C372.7 243.2 400.8 256 432 256z" />
          </svg>
          <span class="mx-4">Customer</span>
        </router-link>

        <router-link
          @click="closeSidebar"
          class="flex items-center px-6 py-2 mt-4 duration-200 border-l-4 cursor-pointer"
          :class="[$route.name === 'Profile' ? activeClass : inactiveClass]"
          to="/profile">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="w-5 h-5" fill="currentColor">
            <path
              d="M256 128h64c17.67 0 32-14.33 32-32V32c0-17.67-14.33-32-32-32H256C238.3 0 224 14.33 224 32v64C224 113.7 238.3 128 256 128zM528 64H384v48C384 138.5 362.5 160 336 160h-96C213.5 160 192 138.5 192 112V64H48C21.49 64 0 85.49 0 112v352C0 490.5 21.49 512 48 512h480c26.51 0 48-21.49 48-48v-352C576 85.49 554.5 64 528 64zM288 224c35.35 0 64 28.66 64 64s-28.65 64-64 64s-64-28.66-64-64S252.7 224 288 224zM384 448H192c-8.836 0-16-7.164-16-16C176 405.5 197.5 384 224 384h128c26.51 0 48 21.49 48 48C400 440.8 392.8 448 384 448z" />
          </svg>
          <span class="mx-4">Profile</span>
        </router-link>
      </nav>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  data: () => {
    return {
      activeClass: 'bg-gray-600 bg-opacity-25 text-gray-100 border-gray-100',
      inactiveClass: 'border-gray-900 text-gray-500 hover:bg-gray-600 hover:bg-opacity-25 hover:text-gray-100',
    }
  },
  computed: {
    isOpen() {
      return this.$store.state.isOpenSidebar
    },
  },
  methods: {
    closeSidebar() {
      this.$store.dispatch('closeSidebar')
    },
  },
})
</script>

