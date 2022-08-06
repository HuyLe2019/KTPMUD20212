import { defineRule, Form } from 'vee-validate'
import AllRules from '@vee-validate/rules'
export default {
  install(app) {
    Object.keys(AllRules).forEach((rule) => {
      defineRule(rule, AllRules[rule])
    })
    app.component('validate-form', Form)
  },
}
