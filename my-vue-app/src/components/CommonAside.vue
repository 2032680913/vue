<template>
  <el-aside :width="$store.state.isCollapse?'180px':'64px'">
    <el-menu class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff" :collapse-transition="false" :collapse="!$store.state.isCollapse">
      <h3 v-show="$store.state.isCollapse">后台管理</h3>
      <h3 v-show="!$store.state.isCollapse">后台</h3>
      <el-menu-item :index="item.path" v-for="(item) in noChildren()" :key="item.path" @click="clickMenu(item)">
        <component class="icons" :is="item.icon"></component>
        <span>{{item.label}}</span>
      </el-menu-item>
      <el-sub-menu :index="item.path" v-for="(item) in hasChildren()" :key="item.path">
        <template #title>
          <component class="icons" :is="item.icon"></component>
          <span>{{item.label}}</span>
        </template>
        <el-menu-item-group title="Group One">
          <el-menu-item :index="subItem.path" v-for="(subItem,subIndex) in item.children" :key="subIndex" @click="clickMenu(subItem)">
            <component class="icons" :is="subItem.icon"></component>
            <span>{{subItem.label}}</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>

    </el-menu>
  </el-aside>
</template>
<script>
import { useRouter } from 'vue-router';
import { useStore } from 'vuex'
export default {
  setup() {
    const router = useRouter();
    let store = useStore();

    const list = [
      {
        name: 'user',
        path: '/user',
        label: '用户管理',
        icon: 'user',
        url: 'userManage/userManage'
      },
      {
        name: '其他',
        icon: 'location',
        label: '其他1',
        path: 'otherPage',
        children: [
          {
            name: 'page1',
            path: '/page1',
            label: '页面1',
            icon: 'setting',
            url: 'otherPage/otherPageOne'

          },
          {
            name: 'page2',
            path: '/page2',
            label: '页面2',
            icon: 'setting',
            url: 'otherPage/otherPageTwo'

          },
        ]

      }
    ]
    const noChildren = () => {
      return list.filter((item) => { return !item.children })
    }
    const hasChildren = () => {
      return list.filter((item) => { return item.children })
    }

    const clickMenu = (item) => {
      router.push({
        name: item.name
      })
      store.commit('selectMenu', item)
    }

    console.log(noChildren(), '===');
    console.log(hasChildren(), '===');
    //通过vuex管理

    return {
      noChildren,
      hasChildren,
      clickMenu
    }
  }
}
</script>
<style lang="less" scoped>
.icons {
  width: 15px;
  height: 15px;
}
.el-menu {
  border-right: none;
  h3 {
    line-height: 40px;
    color: #fff;
    text-align: center;
  }
}
</style>