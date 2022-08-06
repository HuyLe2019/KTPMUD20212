<template>
  <div class="items-center px-5 py-6 pb-5 pt-3 bg-white rounded-md shadow-sm overflow-x-auto w-full max-h-full">
    <h2 class="font-semibold text-gray-600 pb-6">History</h2>
    <div class="relative mt-1 sm:flex justify-between items-center sm:space-x-4">
      <base-input
        name="keyword"
        type="text"
        autocomplete="on"
        placeholder="Search name or RFID..."
        v-model:value="keyword"
        class="block w-auto border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500" />
      <!-- eslint-disable-next-line -->
      <date-picker v-model:value="dateRange" type="date" range format="YYYY-MM-DD" placeholder="Select date range"></date-picker>
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
            rounded-l-lg
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
            rounded-r-md
            border border-gray-900
            hover:bg-gray-900 hover:text-white
            focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white
            dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700
          "
          @click="download()">
          <svg class="mr-2 w-4 h-4 fill-current" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path
              fill-rule="evenodd"
              d="M2 9.5A3.5 3.5 0 005.5 13H9v2.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 15.586V13h2.5a4.5 4.5 0 10-.616-8.958 4.002 4.002 0 10-7.753 1.977A3.5 3.5 0 002 9.5zm9 3.5H9V8a1 1 0 012 0v5z"
              clip-rule="evenodd"></path>
          </svg>
          Downloads
        </button>
      </div>
    </div>

    <div class="container py-2 overflow-x-auto w-full h-full">
      <div class="inline-block min-w-full overflow-hidden rounded-lg shadow">
        <table class="min-w-full leading-normal">
          <thead>
            <tr>
              <th class="px-2 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                No.
              </th>
              <th class="px-2 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                Full Name
              </th>
              <th class="px-2 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                RFID
              </th>
              <th class="px-2 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                Type
              </th>
              <th class="px-2 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                Scan Time
              </th>
            </tr>
          </thead>
          <tbody class="overflow-y-auto max-h-full h-full">
            <tr v-for="(item, index) in histories" :key="index">
              <td class="px-2 py-5 text-sm bg-white border-b border-gray-200">
                {{ range[index] }}
              </td>
              <td class="px-2 py-5 text-sm bg-white border-b border-gray-200">
                {{ item.customer.full_name }}
              </td>
              <td class="px-2 py-5 text-sm bg-white border-b border-gray-200">
                {{ item.customer.rfid }}
              </td>
              <td class="px-2 py-5 text-sm bg-white border-b border-gray-200">
                <span
                  v-if="!(item.index % 2 === 0)"
                  class="bg-blue-100 text-white-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-white-900"
                  >CHECK IN</span
                >
                <span
                  v-else
                  class="bg-green-100 text-white-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-white-900"
                  >CHECK OUT</span
                >
              </td>
              <td class="px-2 py-5 text-sm bg-white border-b border-gray-200">
                {{ item.created_at }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="flex flex-col mt-15 items-end justify-end">
        <!-- Help text -->
        <span class="text-sm text-gray-700 dark:text-gray-400">
          Showing <span class="font-semibold text-gray-600 dark:text-white">{{ startIndex }}</span> to
          <span class="font-semibold text-gray-600 dark:text-white">{{ endIndex }}</span> of
          <span class="font-semibold text-gray-600 dark:text-white">{{ totalItem }}</span> Entries
        </span>
        <div class="inline-flex mt-2 xs:mt-0 space-x-1">
          <!-- Buttons -->
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
</template>
<script>
import { defineComponent } from 'vue'
import DatePicker from 'vue-datepicker-next'
import 'vue-datepicker-next/index.css'
import HistoryService from '../services/HistoryService.js'
import FileSaver from 'file-saver'
import moment from 'moment-timezone'
export default defineComponent({
  name: 'history-box',
  components: { DatePicker },
  data() {
    return {
      keyword: '',
      histories: [],
      dateRange: [moment().subtract(1, 'days').startOf('day').toDate(), moment().endOf('day').toDate()],
      totalPage: 0,
      totalItem: 0,
      currentPage: 0,
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
    changePage(page) {
      if (page > this.totalPage || page < 1) return
      this.$store.commit('setPage', page)
    },
    async download() {
      this.$store.dispatch('startLoading')
      try {
        const fromDate = moment(this.dateRange[0]).startOf('day').toDate()
        const toDate = moment(this.dateRange[1]).endOf('day').toDate()
        const res = await HistoryService.download(this.$store, this.$axios, { fromDate, toDate, keyword: this.keyword })
        FileSaver.saveAs(new Blob([res], { type: 'text/csv;charset=utf-8;' }), `data_${Date.now()}.csv`)
      } catch (e) {
        this.$store.dispatch('handleNotifications', e.response.data)
      }
      this.$store.dispatch('stopLoading')
    },
    async search() {
      let res
      this.$store.dispatch('startLoading')
      try {
        const fromDate = moment(this.dateRange[0]).startOf('day').toDate()
        const toDate = moment(this.dateRange[1]).endOf('day').toDate()
        res = await HistoryService.search(this.$store, this.$axios, { fromDate, toDate, keyword: this.keyword })
        if (res.success) {
          this.totalItem = res.totalItem
          this.totalPage = res.totalPage
          this.currentPage = res.currentPage
          this.histories = res.data.map((item) => {
            item.created_at = moment(item.created_at).tz('Asia/Ho_Chi_Minh').format('DD/MM/YYYY, HH:mm:ss')
            return item
          })
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
<style >
.mx-datepicker {
  border-color: #519fc5;
  max-width: 100% !important;
}

.mx-input {
  --tw-border-opacity: 1;
  border-color: rgba(229, 231, 235, var(--tw-border-opacity)) !important;
  border-radius: 0.375rem !important;
  padding-top: 0.5rem !important;
  padding-right: 0.75rem !important;
  padding-bottom: 0.5rem !important;
  padding-left: 0.75rem !important;
  font-size: 1rem !important;
  line-height: 1.5rem !important;
  height: auto;
}

.mx-input:focus {
  --tw-ring-opacity: 0.4 !important;
  --tw-ring-color: rgba(99, 102, 241, var(--tw-ring-opacity)) !important;
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color) !important;
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color) !important;
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000) !important;
  --tw-border-opacity: 1 !important;
  border-color: rgba(79, 70, 229, var(--tw-border-opacity)) !important;
}

.mx-date-row .active {
  background-color: rgba(79, 70, 229, 1) !important;
}

.mx-date-row .in-range {
  background-color: rgba(99, 102, 241, 0.1) !important;
}
</style>