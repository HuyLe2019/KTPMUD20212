import Dashboard from '../views/Dashboard.vue'
import LogIn from '../views/LogIn.vue'
import CustomerIndex from '../views/customer/Index.vue'
import CustomerCreate from '../views/customer/Create.vue'
import CustomerEdit from '../views/customer/Edit.vue'
import Profile from '../views/Profile.vue'
import NotFound from '../views/NotFound.vue'

const routes = [
  {
    path: '/',
    name: 'Root',
    redirect: '/dashboard',
    meta: { requiresAuth: true, isAdmin: false },
  },
  {
    path: '/login',
    name: 'Login',
    component: LogIn,
    meta: { layout: 'empty' },
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true, isAdmin: false },
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: { requiresAuth: true, isAdmin: false },
  },
  {
    path: '/customer',
    name: 'Customer',
    component: CustomerIndex,
    meta: { requiresAuth: true, isAdmin: false },
  },
  {
    path: '/customer/create',
    name: 'Create Customer',
    component: CustomerCreate,
    meta: { requiresAuth: true, isAdmin: false },
  },
  {
    path: '/customer/edit/:id',
    name: 'Edit Customer',
    component: CustomerEdit,
    meta: { requiresAuth: true, isAdmin: false },
  },
  { path: '/:catchAll(.*)', component: NotFound, meta: { layout: 'empty' } },
]

export default routes
