<template>
    <a-layout id="components-layout-demo-top-side-2">
        <headshow :items="['7']"></headshow>
    <a-layout>
      <a-layout-sider width="250" >
        <a-menu
          mode="inline"
          theme="light"
          :defaultOpenKeys="['sub1','sub2','sub3','sub4','sub5','sub6']"
          :style="{ height: '100%', borderRight: 0 }"
        >
          <a-sub-menu key="sub1">
              <span slot="title"><a-icon type="user" />项目管理</span>
              <a-menu-item key="1" @click="gores">资源管理</a-menu-item>
              <a-menu-item key="2" @click="gorpro">项目管理</a-menu-item>
              <a-menu-item key="3" @click="goPlus">数据统计</a-menu-item>
            </a-sub-menu>

          <a-menu-item key="4" @click="gotodo">待办事宜</a-menu-item>
          <a-menu-item key="5" @click="gohavedo">已办事宜</a-menu-item>
          <a-menu-item key="6" @click="gosp">服务流程</a-menu-item>
          <a-menu-item key="7" @click="gopt">流程模板</a-menu-item>
        </a-menu>
      </a-layout-sider>
          <!-- 原先普通展示content -->
          <a-tabs :style="{ padding: '24px', margin: 0, minHeight: '280px',width:'100%'}"
            v-model="activeKey"
            type="editable-card"
            @edit="onEdit"
             @change=" onChange"
            hideAdd
          >
          <a-tab-pane v-for="pane in panes" :tab="pane.title" :key="pane.key" :closable="pane.closable">
            <!-- {{content}} -->
          <conditioSearch v-if="pane.key=='/myworkspace'"></conditioSearch>
          <keep-alive v-else>
            <router-view></router-view>
          </keep-alive>
          </a-tab-pane>
      </a-tabs>
<!--
            <a-layout :style="{ padding: '24px'}">
        <a-layout-content :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px' }">


          <router-view></router-view>
        </a-layout-content>
      </a-layout> -->
    </a-layout>
  </a-layout>


</template>

<script>
import headshow from '../../components/menu.vue'
import conditioSearch from '../../components/conditioSearch.vue'
export default {

  data() {
       const panes = [
      { title: '服务检测', content: '首页内容', key: '/myworkspace' }
    ]
    return {
      activeKey: panes[0].key,
      panes,
      newTabIndex: 0,
    }
  },
  components:{
    headshow,
    conditioSearch
  },
  computed: {

  },
  methods: {
    gores () {
      const panes = this.panes
      const activeKey = `/myworkspace/resource`
      let isSave = 0 // 是否存在此tab 0 不存在 1存在
      panes.map((item, index) => {
        if(item.key == activeKey) {
          isSave = 1
        }
      })
      if(isSave == 1){
        this.activeKey = activeKey
        this.$router.push(activeKey)
      }else{
        panes.push({ title: `资源管理`, content: `Content of new Tab ${activeKey}`, key: activeKey});
        this.panes = panes
        this.activeKey = activeKey
        this.$router.push(activeKey)
      }
    },
    gorpro(){
      const panes = this.panes
      const activeKey = `/myworkspace/project`
      let isSave = 0 // 是否存在此tab 0 不存在 1存在
      panes.map((item, index) => {
        if(item.key == activeKey) {
          isSave = 1
        }
      })
      if(isSave == 1){
        this.activeKey = activeKey
        this.$router.push(activeKey)
      }else{
        panes.push({ title: `项目管理`, content: `Content of new Tab ${activeKey}`, key: activeKey});
        this.panes = panes
        this.activeKey = activeKey
        this.$router.push(activeKey)
      }
    },
    goPlus(){
      const panes = this.panes
      const activeKey = `/myworkspace/datacount`
      let isSave = 0 // 是否存在此tab 0 不存在 1存在
      panes.map((item, index) => {
        if(item.key == activeKey) {
          isSave = 1
        }
      })
      if(isSave == 1){
        this.activeKey = activeKey
        this.$router.push(activeKey)
      }else{
        panes.push({ title: `数据统计`, content: `Content of new Tab ${activeKey}`, key: activeKey});
        this.panes = panes
        this.activeKey = activeKey
        this.$router.push(activeKey)
      }
    },
    gotodo(){
      const panes = this.panes
      const activeKey = `/myworkspace/todolist`
      let isSave = 0 // 是否存在此tab 0 不存在 1存在
      panes.map((item, index) => {
        if(item.key == activeKey) {
          isSave = 1
        }
      })
      if(isSave == 1){
        this.activeKey = activeKey
        this.$router.push(activeKey)
      }else{
        panes.push({ title: `待办事宜`, content: `Content of new Tab ${activeKey}`, key: activeKey});
        this.panes = panes
        this.activeKey = activeKey
        this.$router.push(activeKey)
      }
    },
    gohavedo(){
      const panes = this.panes
      const activeKey = `/myworkspace/havedolist`
      let isSave = 0 // 是否存在此tab 0 不存在 1存在
      panes.map((item, index) => {
        if(item.key == activeKey) {
          isSave = 1
        }
      })
      if(isSave == 1){
        this.activeKey = activeKey
        this.$router.push(activeKey)
      }else{
        panes.push({ title: `已办事宜`, content: `Content of new Tab ${activeKey}`, key: activeKey});
        this.panes = panes
        this.activeKey = activeKey
        this.$router.push(activeKey)
      }
    },
    gosp(){
      const panes = this.panes
      const activeKey = `/myworkspace/serviceprocess`
      let isSave = 0 // 是否存在此tab 0 不存在 1存在
      panes.map((item, index) => {
        if(item.key == activeKey) {
          isSave = 1
        }
      })
      if(isSave == 1){
        this.activeKey = activeKey
        this.$router.push(activeKey)
      }else{
        panes.push({ title: `服务流程`, content: `Content of new Tab ${activeKey}`, key: activeKey});
        this.panes = panes
        this.activeKey = activeKey
        this.$router.push(activeKey)
      }
    },
    gopt(){
      const panes = this.panes
      const activeKey = `/myworkspace/processtemplate`
      let isSave = 0 // 是否存在此tab 0 不存在 1存在
      panes.map((item, index) => {
        if(item.key == activeKey) {
          isSave = 1
        }
      })
      if(isSave == 1){
        this.activeKey = activeKey
        this.$router.push(activeKey)
      }else{
        panes.push({ title: `流程模板`, content: `Content of new Tab ${activeKey}`, key: activeKey});
        this.panes = panes
        this.activeKey = activeKey
        this.$router.push(activeKey)
      }
    },
    goTopublic(){
        this.$router.push({ path: "/" });
    },
     onEdit (targetKey, action) {
      this[action](targetKey)
    },

    onChange(activeKey){
      // console.log(activeKey,33333333333333,pagePath)
      this.$router.push(activeKey)
    },
    remove (targetKey) {
      let activeKey = this.activeKey
      let lastIndex
      this.panes.forEach((pane, i) => {
        if (pane.key === targetKey) {
          lastIndex = i - 1
        }
      })
      const panes = this.panes.filter(pane => pane.key !== targetKey)
      if (lastIndex >= 0 && activeKey === targetKey) {
        activeKey = panes[lastIndex].key
      }
      this.panes = panes
      this.activeKey = activeKey
      this.$router.push(activeKey)
    }
  },
  mounted(){

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#components-layout-demo-top-side-2 .logo {
  width: 172px;
  font-size: 24px;
  height: 31px;
  line-height: 31px;
  /* background: rgba(255,255,255,.2); */
  margin: 16px 28px 16px 0;
  color: #fff;
  font-weight: bold;
  float: left;

}
.table-operations {
  margin-bottom: 16px;
}

.table-operations > button {
  margin-right: 8px;
}
</style>
