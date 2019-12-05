import Home from './components/Home'
import About from './components/About'
import Login from './components/Login'

const routes = [
  {
      path: '/',
      exact: true,
      private: true,
      label: 'Home',
      component: Home,
  },
  {
      path: '/about',
      exact: true,
      private: true,
      label: 'About',
      component: About,
  },
  {
      path: '/login',
      exact: true,
      private: false,
      label: 'Login',
      component: Login
  }
]

export default routes