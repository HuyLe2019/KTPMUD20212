<template>
  <div>
    <div class="">
      <div class="flex flex-wrap sm:-mx-6 xl:mx-0">
        <div class="w-full px-3 mt-3">
          <div class="items-center px-5 py-6 pb-5 pt-3 bg-white rounded-md shadow-sm overflow-x-auto w-full max-h-full">
            <h2 class="font-semibold text-gray-600 pb-6">List Customer</h2>
            <div class="relative sm:flex justify-between items-center sm:space-x-4">
              <div>
                <router-link
                  tag="button"
                  class="
                    inline-flex
                    items-center
                    focus:outline-none
                    text-white
                    bg-green-700
                    hover:bg-green-800
                    focus:ring-4 focus:ring-green-300
                    font-medium
                    rounded-lg
                    text-sm
                    px-5
                    py-2.5
                    mr-2
                    mb-2
                    dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800
                  "
                  to="/customer/create">
                  Add
                </router-link>
              </div>
              <div class="relative mt-1 sm:flex justify-between items-center sm:space-x-4">
                <base-input
                  name="keyword"
                  type="text"
                  autocomplete="on"
                  placeholder="Search name..."
                  v-model:value="keyword"
                  class="block w-full border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500" />
                <div class="inline-flex mt-2 sm:mt-0" role="group">
                  <button
                    type="button"
                    class="
                      inline-flex
                      items-center
                      py-2
                      px-4
                      text-sm
                      font-medium
                      text-gray-900
                      bg-transparent
                      rounded-md
                      border border-gray-900
                      hover:bg-gray-900 hover:text-white
                      focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white
                      dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700
                    "
                    @click="search()">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z"></path>
                    </svg>
                    Search
                  </button>
                </div>
              </div>
            </div>

            <div class="container py-2 overflow-x-auto w-full h-full">
              <div class="inline-block min-w-full overflow-hidden rounded-lg shadow">
                <table class="min-w-full leading-normal">
                  <thead>
                    <tr>
                      <th
                        class="
                          px-2
                          py-3
                          text-xs
                          font-semibold
                          tracking-wider
                          text-left text-gray-600
                          uppercase
                          bg-gray-100
                          border-b-2 border-gray-200
                        ">
                        No.
                      </th>
                      <th
                        class="
                          px-2
                          py-3
                          text-xs
                          font-semibold
                          tracking-wider
                          text-left text-gray-600
                          uppercase
                          bg-gray-100
                          border-b-2 border-gray-200
                        ">
                        Full Name
                      </th>
                      <th
                        class="
                          px-2
                          py-3
                          text-xs
                          font-semibold
                          tracking-wider
                          text-left text-gray-600
                          uppercase
                          bg-gray-100
                          border-b-2 border-gray-200
                        ">
                        Email
                      </th>
                      <th
                        class="
                          px-2
                          py-3
                          text-xs
                          font-semibold
                          tracking-wider
                          text-left text-gray-600
                          uppercase
                          bg-gray-100
                          border-b-2 border-gray-200
                        ">
                        Phone Number
                      </th>
                      <th
                        class="
                          px-2
                          py-3
                          text-xs
                          font-semibold
                          tracking-wider
                          text-left text-gray-600
                          uppercase
                          bg-gray-100
                          border-b-2 border-gray-200
                        ">
                        Room Number
                      </th>
                      <th
                        class="
                          px-2
                          py-3
                          text-xs
                          font-semibold
                          tracking-wider
                          text-left text-gray-600
                          uppercase
                          bg-gray-100
                          border-b-2 border-gray-200
                        ">
                        RFID
                      </th>
                      <th
                        class="
                          px-2
                          py-3
                          text-xs
                          font-semibold
                          tracking-wider
                          text-left text-gray-600
                          uppercase
                          bg-gray-100
                          border-b-2 border-gray-200
                        ">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody class="overflow-y-auto max-h-full h-full">
                    <tr v-for="(item, index) in histories" :key="index">
                      <td class="px-2 py-5 text-sm bg-white border-b border-gray-200">
                        {{ range[index] }}
                      </td>
                      <td class="px-2 py-5 text-sm bg-white border-b border-gray-200">
                        {{ item.full_name }}
                      </td>
                      <td class="px-2 py-5 text-sm bg-white border-b border-gray-200">
                        {{ item.email }}
                      </td>
                      <td class="px-2 py-5 text-sm bg-white border-b border-gray-200">
                        {{ item.phone_number }}
                      </td>
                      <td class="px-2 py-5 text-sm bg-white border-b border-gray-200">
                        {{ item.room_number }}
                      </td>
                      <td class="px-2 py-5 text-sm bg-white border-b border-gray-200">
                        {{ item.rfid }}
                      </td>
                      <td class="px-2 py-5 text-sm bg-white border-b border-gray-200">
                        <router-link
                          tag="button"
                          :to="`/customer/edit/${item._id}`"
                          class="
                            text-white
                            bg-blue-700
                            hover:bg-blue-800
                            focus:ring-4 focus:ring-blue-300
                            font-medium
                            rounded-lg
                            text-xs
                            px-5
                            py-2.5
                            mr-2
                            mb-2
                            dark:bg-blue-600 dark:hover:bg-blue-700
                            focus:outline-none
                            dark:focus:ring-blue-800
                          ">
                          Edit
                        </router-link>
                        <button
                          type="button"
                          class="
                            focus:outline-none
                            text-white
                            bg-red-700
                            hover:bg-red-800
                            focus:ring-4 focus:ring-red-300
                            font-medium
                            rounded-lg
                            text-xs
                            px-5
                            py-2.5
                            mr-2
                            mb-2
                            dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900
                          "
                          @click="onDelete(item)">
                          Delete
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="flex flex-col mt-15 items-end justify-end">
                <span class="text-sm text-gray-700 dark:text-gray-400">
                  Showing <span class="font-semibold text-gray-600 dark:text-white">{{ startIndex }}</span> to
                  <span class="font-semibold text-gray-600 dark:text-white">{{ endIndex }}</span> of
                  <span class="font-semibold text-gray-600 dark:text-white">{{ totalItem }}</span> Entries
                </span>
                <div class="inline-flex mt-2 xs:mt-0 space-x-1">
                  <a
                    class="
                      inline-flex
                      items-center
                      py-2
                      px-4
                      text-sm
                      font-medium
                      text-white
                      bg-gray-800
                      rounded-l
                      hover:bg-gray-900
                      dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white
                      cursor-pointer
                    "
                    :class="[{ 'rounded opacity-50 cursor-not-allowed': currentPage <= 1 }]"
                    @click="changePage(currentPage - 1)">
                    <svg class="mr-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path
                        fill-rule="evenodd"
                        d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                        clip-rule="evenodd"></path>
                    </svg>
                    Prev
                  </a>
                  <a
                    class="
                      inline-flex
                      items-center
                      py-2
                      px-4
                      text-sm
                      font-medium
                      text-white
                      bg-gray-800
                      rounded-r
                      border-0 border-l border-gray-700
                      hover:bg-gray-900
                      dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white
                      cursor-pointer
                    "
                    :class="[{ 'rounded opacity-50 cursor-not-allowed': currentPage >= totalPage }]"
                    @click="changePage(currentPage + 1)">
                    Next
                    <svg class="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path
                        fill-rule="evenodd"
                        d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                        clip-rule="evenodd"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <base-modal :open="isOpenModal" title="Delete customer action" @close="isOpenModal = false" @submit="onModalSubmit">
        <div class="py-5">
          <div>
            <p>Are you sure to delete custome:</p>
            <p>{{ `${currentCustomer?.full_name}` }}</p>
          </div>
        </div>
      </base-modal>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import DatePicker from 'vue-datepicker-next'
import 'vue-datepicker-next/index.css'
import CustomerService from '../../services/CustomerService.js'

export default defineComponent({
  name: 'ListCustomer',
  components: { DatePicker },
  data: () => {
    return {
      isOpenModal: false,
      histories: [],
      totalPage: 0,
      totalItem: 0,
      currentPage: 0,
      keyword: '',
      currentCustomer: null,
    }
  },
  computed: {
    startIndex() {
      return (this.currentPage - 1) * this.$store.state.limit + 1
    },
    endIndex() {
      return this.currentPage >= this.totalPage ? this.totalItem : this.currentPage * this.$store.state.limit
    },
    range() {
      const arr = []
      for (let i = this.startIndex; i <= this.endIndex; i++) {
        arr.push(i)
      }
      return arr
    },
  },
  async created() {
    await this.search()
  },
  methods: {
    onDelete(data) {
      this.isOpenModal = true
      this.currentCustomer = data
    },
    changePage(page) {
      if (page > this.totalPage || page < 1) return
      this.$store.commit('setPage', page)
    },
    async onModalSubmit() {
      let res
      this.$store.dispatch('startLoading')
      try {
        res = await CustomerService.deleteCustomer(this.$axios, this.currentCustomer._id)
        if (res.success) {
          this.isOpenModal = false
          this.$store.dispatch('handleNotifications', res)
          await this.search()
        }
      } catch (e) {
        this.$store.dispatch('handleNotifications', e.response.data)
      }
      this.$store.dispatch('stopLoading')
    },
    async search() {
      let res
      this.$store.dispatch('startLoading')
      try {
        res = await CustomerService.search(this.$store, this.$axios, { keyword: this.keyword })
        if (res.success) {
          this.totalItem = res.totalItem
          this.totalPage = res.totalPage
          this.currentPage = res.currentPage
          this.histories = res.data
        }
      } catch (e) {
        this.$store.dispatch('handleNotifications', e.response.data)
      }
      this.$store.dispatch('stopLoading')
    },
  },
  watch: {
    '$store.state.page': async function () {
      await this.search()
    },
  },
})
</script>