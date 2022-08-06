<template>
  <div>
    <div class="">
      <div class="flex flex-wrap sm:-mx-6 xl:mx-0">
        <div class="w-full px-3 mt-3 sm:w-1/2 xl:w-1/2">
          <div class="w-full bg-white rounded-md px-5 py-5 pb-5 pt-3">
            <div class="w-full">
              <validate-form class="text-start" @submit="submit" :validation-schema="ruleSchema" v-slot="{ meta }">
                <div class="grid grid-cols-1 mt-4">
                  <div>
                    <label class="text-gray-700" for="full_name">Full Name</label>
                    <base-input
                      name="full_name"
                      type="text"
                      autocomplete="off"
                      v-model:value="customer.full_name"
                      class="w-full mt-2 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500" />
                  </div>
                  <div>
                    <label class="text-gray-700" for="email">Email</label>
                    <base-input
                      name="email"
                      type="text"
                      autocomplete="off"
                      v-model:value="customer.email"
                      class="w-full mt-2 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500" />
                  </div>
                  <div class="mt-3">
                    <label class="text-gray-700" for="phone_number">Phone Number</label>
                    <base-input
                      name="phone_number"
                      type="text"
                      autocomplete="off"
                      v-model:value="customer.phone_number"
                      class="w-full mt-2 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500" />
                  </div>
                  <div class="mt-3">
                    <label class="text-gray-700" for="phone_number">Room Number</label>
                    <base-input
                      name="room_number"
                      type="text"
                      autocomplete="off"
                      v-model:value="customer.room_number"
                      class="w-full mt-2 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500" />
                  </div>
                  <div class="mt-3">
                    <label class="text-gray-700" for="rfid">Rfid</label>
                    <base-input
                      name="rfid"
                      type="text"
                      autocomplete="off"
                      :disabled="true"
                      v-model:value="customer.rfid"
                      class="
                        w-full
                        mt-2
                        border-gray-200
                        rounded-md
                        focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500
                        disabled:cursor-not-allowed disabled:opacity-50
                      " />
                  </div>
                  <div class="flex justify-end pt-5">
                    <button
                      :disabled="!meta.valid"
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
                        disabled:cursor-not-allowed disabled:opacity-50
                      ">
                      <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M9.707 7.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L13 8.586V5h3a2 2 0 012 2v5a2 2 0 01-2 2H8a2 2 0 01-2-2V7a2 2 0 012-2h3v3.586L9.707 7.293zM11 3a1 1 0 112 0v2h-2V3z"></path>
                        <path d="M4 9a2 2 0 00-2 2v5a2 2 0 002 2h8a2 2 0 002-2H4V9z"></path>
                      </svg>
                      Save
                    </button>
                  </div>
                </div>
              </validate-form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import CustomerService from '../../services/CustomerService.js'
import * as Yup from 'yup'
export default defineComponent({
  name: 'CreateCustomer',
  components: {},
  data() {
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    const ruleSchema = Yup.object().shape({
      full_name: Yup.string().required().label('Full Name'),
      email: Yup.string().email().required().label('Email Address'),
      rfid: Yup.string().required().label('RFID'),
      phone_number: Yup.string()
        .required('required')
        .min(10, 'Phone number to short')
        .max(10, 'Phone number to long')
        .matches(phoneRegExp, 'Phone number is not valid')
        .label('Phone number'),
      room_number: Yup.string().required().label('Room Number'),
    })
    return {
      ruleSchema,
      customer: { full_name: '', email: '', phone_number: '', room_number: '', rfid: '' },
    }
  },
  created() {
    this.$socket.on('sync-rfid', (data) => {
      this.customer.rfid = data.rfid
    })
  },
  beforeUnmount() {
    this.$socket.off('sync-rfid')
  },
  methods: {
    async submit() {
      console.log(this.customer)
      this.$store.dispatch('startLoading')
      try {
        const res = await CustomerService.addCustomer(this.$axios, this.customer)
        if (res.success) {
          this.$store.dispatch('handleNotifications', { message: res.message, success: true })
          this.$router.push('/customer')
        }
      } catch (e) {
        const { message } = typeof e === 'string' ? e : e.response.data
        this.$store.dispatch('handleNotifications', { message })
      } finally {
        this.$store.dispatch('stopLoading')
      }
    },
  },
})
</script>