import BaseInput from '../components/base/BaseInput.vue'
import BaseModal from '../components/base/BaseModal.vue'
export default {
  install(app) {
    app.component(BaseInput.name, BaseInput)
    app.component(BaseModal.name, BaseModal)
  },
}
