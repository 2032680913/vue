<template>
  <div class="tags">
    <el-tag v-for="(tag,index) in tags" :key="tag.name" :closable="tag.name!=='home'"
      :disable-transitions="false"
      :effect="$router.name == tag.name?'dark':'plain'"
     @click="handleTag(tag)"
     @close="closeTag(tag,index)"
     >
      {{ tag.label }}
    </el-tag>
  </div>
</template>
<script>
import { defineComponent } from 'vue'
import { useRouter,useRoute } from 'vue-router'
import { useStore } from 'vuex'
export default defineComponent({
  setup() {
    let store = useStore();
    let router = useRouter();
    let route = useRoute();
    const tags = store.state.tagList;
    const handleTag=(item)=>{
      router.push({
        name:item.name
      })
    }
    const closeTag =(tag,index)=>{
      let length = tags.length-1;
      // 处理vuex中的tagList
      store.commit('selectTag',tag)
      //做第一个判断
      if(tag.name !==route.name){
        return ;

      }
      if(index == length){
        router.push({
          name:tags[index-1].name
        })
      }else{
        router.push({
          name:tags[index].name
        })
      }

    }
    return {
      tags,
      handleTag,
      closeTag
    }
  }
})
</script>
<style lang="less" scoped>
.tags{
  padding-top: 20px;
  width: 100%;
  .el-tag{
    margin-left: 15px;
    cursor: pointer;
  }
}
</style>