<template>
  <a-layout id="components-layout-demo-top-side-2" >
    <headshow :items="['1']"></headshow>
    <a-layout >
      <a-layout-sider width="250" style="background: #fff">
        <a-menu
          theme="light"
          mode="inline"
          :defaultOpenKeys="['sub1','sub2','sub3','sub4','sub5']"
          :style="{ height: '100%', borderRight: 0 }"
        >
          <a-sub-menu key="sub1">
            <span slot="title"><a-icon type="user" />数据字典管理</span>
            <a-menu-item key="1" @click="goenglish">英文单词及缩写管理</a-menu-item>
            <a-menu-item key="2" @click="gocategory">类别词管理</a-menu-item>
            <a-menu-item key="3" @click="gometadata">元数据管理</a-menu-item>
          </a-sub-menu>
          <a-menu-item key="15" @click="gopublic"><a-icon type="laptop"/>公共代码管理</a-menu-item>
          <a-sub-menu key="sub3">
            <span slot="title"><a-icon type="notification" />资源导入</span>
            <a-menu-item key="4" @click="godd">数据字典导入</a-menu-item>
            <a-menu-item key="5" @click="gomap">字段映射导入</a-menu-item>
            <a-menu-item key="6" @click="goorgin">原始接口导入</a-menu-item>
            <a-menu-item key="7" @click="gomeheader">报文头导入</a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="sub4">
            <span slot="title"><a-icon type="fork" />流程申请</span>
            <a-menu-item key="8" @click="registered">注册申请</a-menu-item>
            <a-menu-item key="9" @click="use">调用申请</a-menu-item>
            <a-menu-item key="10" @click="change">变更申请</a-menu-item>
            <a-menu-item key="11" @click="retired">退役申请</a-menu-item>
            <a-menu-item key="12" @click="systemConnect">系统接入申请</a-menu-item>
          </a-sub-menu>
          <a-menu-item key="16" @click="servicemess"><a-icon type="laptop"/>服务报文头管理</a-menu-item>
        </a-menu>
      </a-layout-sider>
      <a-tabs :style="{ padding: '24px', margin: 0, minHeight: '280px',width:'100%'}"
              v-model="activeKey"
              type="editable-card"
              @edit="onEdit"
              @change="onChange"
              hideAdd
      >
        <a-tab-pane v-for="pane in panes" :tab="pane.title" :key="pane.key" :closable="pane.closable" style="overflow-y:scroll; maxHeight:'100px" >
          <!-- {{content}} -->
          <conditioSearch v-if="pane.key=='/home'"></conditioSearch>
          <keep-alive v-else>
            <router-view></router-view>
          </keep-alive>
        </a-tab-pane>
      </a-tabs>

    </a-layout>
  </a-layout>
</template>

<script>
  import headshow from '../../components/menu.vue'
  import conditioSearch from '../../components/conditioSearch.vue'
  export default {

    data() {
      const panes = [
        { title: '首页服务检测', content: '首页内容', key: '/home' }
      ]

      return {
        activeKey: panes[0].key,
        panes,
        newTabIndex: 0
      }
    },

    components: {
      headshow,
      conditioSearch
    },
    computed: {

    },
    methods: {
      goenglish () {
        const panes = this.panes
        const activeKey = `/public/english`
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
          panes.push({ title: `英文单词及缩写管理`, content: `Content of new Tab ${activeKey}`, key: activeKey })
            this.panes = panes
            this.activeKey = activeKey
            this.$router.push(activeKey)
        }
      },
      gocategory () {
        const panes = this.panes
        const activeKey = `/public/category`
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
          panes.push({ title: `类别词管理`, content: `Content of new Tab ${activeKey}`, key: activeKey })
          this.panes = panes
          this.activeKey = activeKey
          this.$router.push(activeKey)
        }

      },
      gometadata () {
        const panes = this.panes
        const activeKey = `/public/metadata`
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
          panes.push({ title: `元数据管理`, content: `Content of new Tab ${activeKey}`, key: activeKey })
          this.panes = panes
          this.activeKey = activeKey
          this.$router.push(activeKey)
        }
      },
      gopublic () {
        const panes = this.panes
        const activeKey = `/public/publicm`
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
          panes.push({ title: `公共代码管理`, content: `Content of new Tab ${activeKey}`, key: activeKey })
          this.panes = panes
          this.activeKey = activeKey
          this.$router.push(activeKey)
        }
      },
      godd(){
        const panes = this.panes
        const activeKey = `/public/datadictionary`
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
          panes.push({ title: `数据字典导入`, content: `Content of new Tab ${activeKey}`, key: activeKey })
          this.panes = panes
          this.activeKey = activeKey
          this.$router.push(activeKey)
        }
      },
      gomap(){
        let panes = this.panes
        let activeKey = `/public/fieldmapping`
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
          panes.push({ title: `字段映射导入`, content: `Content of new Tab ${activeKey}`, key: activeKey })
          this.panes = panes
          this.activeKey = activeKey
          this.$router.push(activeKey)
        }
      },
      goorgin(){
        let panes = this.panes
        let activeKey = `/public/orgininterface`
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
          panes.push({ title: `原始接口导入`, content: `Content of new Tab ${activeKey}`, key: activeKey })
          this.panes = panes
          this.activeKey = activeKey
          this.$router.push(activeKey)
        }
      },
      gomeheader(){
        let panes = this.panes
        let activeKey = `/public/messageheader`
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
          panes.push({ title: `报文头导入`, content: `Content of new Tab ${activeKey}`, key: activeKey })
          this.panes = panes
          this.activeKey = activeKey
          this.$router.push(activeKey)
        }
      },
      registered () {
        let panes = this.panes
        let activeKey = `/public/registered`
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
          panes.push({ title: `注册申请`, content: `Content of new Tab ${activeKey}`, key: activeKey })
          this.panes = panes
          this.activeKey = activeKey
          this.$router.push(activeKey)
        }
      },
      systemConnect(){
        let panes = this.panes
        let activeKey = `/public/systemconnect`
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
          panes.push({ title: `系统接入申请`, content: `Content of new Tab ${activeKey}`, key: activeKey })
          this.panes = panes
          this.activeKey = activeKey
          this.$router.push(activeKey)
        }
      },
      retired () {
        let panes = this.panes
        let activeKey = `/public/retired`
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
          panes.push({ title: `退役申请`, content: `Content of new Tab ${activeKey}`, key: activeKey })
          this.panes = panes
          this.activeKey = activeKey
          this.$router.push(activeKey)
        }
      },
      change(){
        let panes = this.panes
        let activeKey = `/public/change`
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
          panes.push({ title: `变更申请`, content: `Content of new Tab ${activeKey}`, key: activeKey })
          this.panes = panes
          this.activeKey = activeKey
          this.$router.push(activeKey)
        }

      },
      use(){
        let panes = this.panes
        let activeKey = `/public/use`
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
          panes.push({ title: `调用申请`, content: `Content of new Tab ${activeKey}`, key: activeKey })
          this.panes = panes
          this.activeKey = activeKey
          this.$router.push(activeKey)
        }
      },
      servicemess(){
        let panes = this.panes
        let activeKey = `/public/servicemess`
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
          panes.push({ title: `服务报文头管理`, content: `Content of new Tab ${activeKey}`, key: activeKey })
          this.panes = panes
          this.activeKey = activeKey
          this.$router.push(activeKey)
        }
      },
      onChange (activeKey) {
        this.$router.push(activeKey)
      },
      onEdit (targetKey, action) {
        this[action](targetKey);
        console.log(this.panes)
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
      },
    },
    mounted () {

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .ant-tabs-tabpane{
    height: 800px;
    overflow-y: scroll;
  }
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
