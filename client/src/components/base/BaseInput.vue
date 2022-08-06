<template>
  <validate-field
    :type="type"
    :validateOnInput="true"
    :name="name"
    :id="id"
    :class="class"
    :modelValue="value"
    :placeholder="placeholder"
    :rules="rules"
    :autocomplete="autocomplete"
    :disabled="disabled"
    @input="handleInput" />
  <error-message class="text-red-500 text-sm" :name="name" />
</template>

<script>
import { Field, ErrorMessage } from 'vee-validate'
export default {
  name: 'base-input',
  components: {
    'validate-field': Field,
    'error-message': ErrorMessage,
  },
  props: {
    autocomplete: String,
    name: String,
    id: String,
    class: String,
    value: [Number, String, Boolean],
    placeholder: String,
    type: String,
    rules: Object,
    disabled: Boolean,
  },
  methods: {
    handleInput(e) {
      this.$emit('update:value', this.type === 'checkbox' ? e.target.checked : e.target.value)
    },
  },
}
</script>