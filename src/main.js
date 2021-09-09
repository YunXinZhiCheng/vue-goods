import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 导入Vant样式
import 'vant/lib/index.css'
// 导入Vant组件：按需引入 轮播图 懒加载 徽标 侧边导航 折叠面板 标签页 商品卡片 图片 标签 按钮 空状态 表单

import {
  Swipe,
  SwipeItem,
  Lazyload,
  Badge,
  Sidebar,
  SidebarItem,
  Collapse,
  CollapseItem,
  Tab,
  Tabs,
  Card,
  Image as VanImage,
  Tag,
  Button,
  Empty,
  Form,
  Field,
  CellGroup,
} from 'vant'

createApp(App)
  .use(store)
  .use(router)
  .use(Swipe)
  .use(SwipeItem)
  .use(Lazyload, {
    loading: require('./assets/images/default.png'),
  })
  .use(Badge)
  .use(Sidebar)
  .use(SidebarItem)
  .use(Collapse)
  .use(CollapseItem)
  .use(Tab)
  .use(Tabs)
  .use(Card)
  .use(VanImage)
  .use(Tag)
  .use(Button)
  .use(Empty)
  .use(Form)
  .use(Field)
  .use(CellGroup)
  .mount('#app')
