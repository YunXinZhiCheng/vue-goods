import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 导入Vant样式
import 'vant/lib/index.css'
// 导入Vant组件：按需引入 轮播图 懒加载 徽标 侧边导航 折叠面板 标签页 商品卡片 图片 标签 按钮 空状态 表单 轻提示
// 复选框 步进器 滑动单元格 提交订单栏 图标
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
  Toast,
  Checkbox,
  CheckboxGroup,
  Stepper,
  SwipeCell,
  SubmitBar,
  Icon
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
  .use(Toast)
  .use(Checkbox)
  .use(CheckboxGroup)
  .use(Stepper)
  .use(SwipeCell)
  .use(SubmitBar)
  .use(Icon)
  .mount('#app')
