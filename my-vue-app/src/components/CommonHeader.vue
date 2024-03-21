<template>
  <el-header>
    <div class="l-content">
      <el-button size="small" plain @click="handleCollapse()">
        <el-icon :size="size" :color="color">
          <Menu />
        </el-icon>
      </el-button>
      <h3>首页</h3>
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
import { defineComponent} from 'vue'
import { useStore } from 'vuex'
export default defineComponent({
  setup(){
    let store = useStore()
    let getImageUrl= (dog)=>{
      console.log(import.meta.url,'打印的url');
      return new URL(`../assets/images/${dog}.gif`,import.meta.url)
    }
    let handleCollapse =()=>{
      //调用vuex中mutations里的方法;
      console.log(store.$commit,'store');
      store.commit('updateCollapse')
    }
    return{
      getImageUrl,
      handleCollapse,
    }
  }
})
</script>
<style lang="less" scoped>
header{
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: #333;

}
.r-content{
  .user{
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

}
.l-content{
  display: flex;
  align-items: center;
  .el-button{
    margin-right: 20px;
  }
  h3{
    color: #fff;
  }
}
</style>