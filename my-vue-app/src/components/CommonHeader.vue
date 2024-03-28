<template>
  <el-header>
    <div class="l-content">
      <el-button size="small" plain @click="handleCollapse()">
        <el-icon :size="size" :color="color">
          <Menu />
        </el-icon>
      </el-button>

      <el-breadcrumb separator="/" class="bread">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="current.path" v-if="current">{{current.label}}</el-breadcrumb-item>

      </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown>
        <span class="el-dropdown-link">
          Dropdown List
          <img class="user" :src="getImageUrl('dog')" alt="">
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人中心 1</el-dropdown-item>
            <el-dropdown-item>退出 2</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-header>
</template>
<script>
import { defineComponent,computed } from 'vue'
import { useStore } from 'vuex'
export default defineComponent({
  setup() {
    let store = useStore()
    let getImageUrl = (dog) => {
      console.log(import.meta.url, '打印的url');
      return new URL(`../assets/images/${dog}.gif`, import.meta.url)
    }
    let handleCollapse = () => {
      //调用vuex中mutations里的方法;
      store.commit('updateCollapse')
    }
    //计算属性
    const current = computed(() => {
      return store.state.currentMenu
    })
    return {
      getImageUrl,
      handleCollapse,
      current,
    }
  }
})
</script>
<style lang="less" scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: #333;
}
.r-content {
  .user {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
}
.l-content {
  display: flex;
  align-items: center;
  .el-button {
    margin-right: 20px;
  }
  h3 {
    color: #fff;
  }
}
.bread /deep/ span{
  color: #fff !important;
  cursor: pointer;

}
</style>