<template>
  <div>
    <NavBar>
      <!-- 为插槽添加内容 -->
      <template v-slot:default>
        购物车(
        <span style="color:red">{{ $store.state.cartCount }}</span>
        )
      </template>
    </NavBar>

    <!-- 购物车容器 -->
    <div class="cart-box">
      <!-- 购物车主体 -->
      <div class="cart-body">
        <!-- 复选框组件 -->
        <van-checkbox-group
          ref="checkboxGroup"
          @change="groupChange"
          v-model="result"
        >
          <van-swipe-cell
            :right-width="50"
            v-for="(item, index) in list"
            :key="index"
          >
            <!-- 商品项 -->
            <div class="good-item">
              <!-- 商品选中 -->
              <van-checkbox :name="item.id"></van-checkbox>
              <!-- 商品图片 -->
              <div class="good-img">
                <img :src="item.goods.cover_url" alt="" />
              </div>
              <!-- 商品描述 -->
              <div class="good-desc">
                <div class="good-title">
                  <span>{{ item.goods.title }}</span>
                  <!-- <span>x{{ item.goods.stock }}</span> -->
                </div>
                <div class="good-btn">
                  <div class="price">
                    <small>¥</small>
                    {{ item.goods.price + '.00' }}
                  </div>
                  <!-- 步进器组件 -->
                  <van-stepper
                    integer
                    :min="1"
                    :max="item.goods.stock"
                    :model-value="item.num"
                    :name="item.id"
                    async-change
                    @change="onChange"
                  />
                </div>
              </div>
            </div>
            <!-- 模板:删除按钮 -->
            <template #right>
              <van-button
                square
                icon="delete"
                type="danger"
                class="delete-button"
                @click="deleteGood(item.id)"
              />
            </template>
          </van-swipe-cell>
        </van-checkbox-group>
      </div>

      <!-- 购物车结算 -->
      <van-submit-bar class="submit-all" :price="9999" button-text="结算">
        <van-checkbox @click="allCheck" v-model:checked="checkAll">
          全选
        </van-checkbox>
      </van-submit-bar>

      <!-- 购物车空状态 -->
      <div class="empty" v-if="!list.length">
        <img
          class="empty-cart"
          src="~assets/images/empty-car.png"
          alt="空购物车"
        />
        <div class="title">购物车空空如也</div>
        <van-button round color="#1baeae" type="primary" block @click="goTo">
          前往选购
        </van-button>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar'
import { onMounted, ref, reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { Toast } from 'vant'
// 导入购物车接口函数
import {
  getCart,
  deleteCartItem,
  checkedCard,
  modifyCart,
} from '@/network/cart.js'

export default {
  // 购物车页面
  name: 'ShopCart',
  components: {
    NavBar,
  },
  setup() {
    const router = useRouter() // 路由
    const store = useStore() // 状态

    // 数据模型,状态
    const state = reactive({
      list: [], // 购物车列表
      result: [], // 购物车id数组
      checkAll: true, // 购物车全选
    })

    // 初始化购物车数据
    const init = () => {
      // 加载轻提示
      Toast.loading({
        message: '加载中...',
        forbidClick: true,
      })
      getCart('include=goods').then((res) => {
        state.list = res.data
        console.log(res.data) // 获取购物车数据

        state.result = res.data
          .filter((n) => n.is_checked == 1)
          .map((item) => item.id)
        // console.log(state.result) // 获取购物车选中数组

        Toast.clear()
      })
    }
    onMounted(() => {
      init()
    })
    // 异步改变购物车数量
    const onChange = (value, detail) => {
      // 轻提示
      Toast.loading({
        message: '修改中...',
        forbidClick: true,
      })

      // console.log(value);
      // console.log(detail.name);
      modifyCart(detail.name, { num: value }).then((res) => {
        // 将在onMounted中的list中的num也要修改
        state.list.forEach((item) => {
          if (item.id == detail.name) {
            item.num = value
          }
        })
        Toast.clear()
      })
    }

    // 复选框改变处理
    const groupChange = (result) => {
      if (result.length == state.list.length) {
        state.checkAll = true
      } else {
        state.checkAll = false
      }

      console.log(result)

      state.result = result
      // 改变数据表中选中状态
      checkedCard({ cart_ids: result })
    }

    // 全选处理
    const allCheck = () => {
      if (!state.checkAll) {
        state.result = state.list.map((item) => item.id)
        state.checkAll = true
      } else {
        state.result = []
        state.checkAll = false
      }
    }
    // 删除购物商品
    const deleteGood = (id) => {
      deleteCartItem(id).then((res) => {
        // 删除后重新初始化数据
        init()
        store.dispatch('updateCart') // 改变vuex中的状态数量
      })
    }

    // 前往购物
    const goTo = () => {
      router.push({ path: '/home' })
    }

    return {
      ...toRefs(state),
      goTo,
      onChange,
      groupChange,
      allCheck,
      deleteGood,
    }
  },
}
</script>

<style lang="less" scoped>
.cart-box {
  .cart-body {
    margin: 60px 0 100px 0;
    padding-left: 10px;
    .good-item {
      display: flex;
      .good-img {
        img {
          width: 100px;
          height: auto;
        }
      }
      .good-desc {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        flex: 1;
        padding: 20px;
        .good-title {
          display: flex;
          justify-content: space-between;
        }
        .good-btn {
          display: flex;
          justify-content: space-between;
          .price {
            font-size: 16px;
            color: red;
            line-height: 28px;
          }
          .van-icon-delete {
            font-size: 20px;
            margin-top: 4px;
          }
        }
      }
    }
    .delete-button {
      width: 50px;
      height: 100%;
    }
  }
  .empty {
    width: 50%;
    margin: 0 auto;
    text-align: center;
    margin-top: 200px;
    .empty-cart {
      width: 150px;
      margin-bottom: 20px;
    }
    .van-icon-smile-o {
      font-size: 50px;
    }
    .title {
      font-size: 16px;
      margin-bottom: 20px;
    }
  }
  .submit-all {
    margin-bottom: 50px;
    .van-checkbox {
      margin-left: 0px;
    }
    .van-submit-bar__text {
      margin-right: 10px;
    }
    .van-submit-bar__button {
      background: red;
    }
  }
  .van-checkbox__icon--checked .van-icon {
    background-color: red;
    border-color: red;
  }
}
</style>
