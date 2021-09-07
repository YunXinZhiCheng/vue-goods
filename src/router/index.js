import { createRouter, createWebHistory } from 'vue-router'

const Home = () => import('../views/home/Home')
const Category = () => import('../views/category/Category.vue')
const Detail = () => import('../views/detail/Detail.vue')
const Profile = () => import('../views/profile/Profile.vue')
const ShopCart = () => import('../views/shopcart/ShopCart.vue')

const routes = [
  {
    path: '',
    name: 'DefaultHome',
    component: Home,
    // 导航守卫
    meta: {
      title: '图书兄弟',
    },
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    // 导航守卫
    meta: {
      title: '图书兄弟',
    },
  },
  {
    path: '/category',
    name: 'Category',
    component: Category,
    // 导航守卫
    meta: {
      title: '图书兄弟-商品分类',
    },
  },
  {
    path: '/detail',
    name: 'Detail',
    component: Detail,
    // 导航守卫
    meta: {
      title: '图书兄弟-商品详情',
    },
  },
  {
    path: '/shopcart',
    name: 'ShopCart',
    component: ShopCart,
    // 导航守卫
    meta: {
      title: '图书兄弟-购物车',
    },
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    // 导航守卫
    meta: {
      title: '图书兄弟-个人中心',
    },
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})
//
router.beforeEach((to, from, next) => {
  // 如果没有登录，在这里到login
  next()
  document.title = to.meta.title
})

export default router
