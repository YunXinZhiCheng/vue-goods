<template>
  <div class="home">
    {{ banner }}
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { getHomeAllData } from '@/network/home.js'

export default {
  name: 'Home',
  setup() {
    // 轮播图数据
    const banner = ref([])

    // 生命周期：异步获取网络请求
    onMounted(() => {
      getHomeAllData()
        .then((res) => {
          console.log(res)
          banner.value = res.slides
        })
        .catch((err) => {
          console.log(err)
        })
    })
    return {
      banner,
    }
  },
}
</script>
