<template>
    <a-layout id="components-layout-demo-top-side-2">
       <headshow :items="['6']"></headshow>
    <a-layout>
      <a-layout-sider width="250" style="background: #fff">
        <a-menu
          mode="inline"
          :defaultOpenKeys="['sub1','sub2','sub3','sub4','sub5','sub6']"
          :style="{ height: '100%', borderRight: 0 }"
        >
          <a-sub-menu key="sub1">
              <span slot="title"><a-icon type="user" />权限管理</span>
              <a-menu-item key="1" @click="gomenu">菜单管理</a-menu-item>
              </a-sub-menu>
          <a-sub-menu key="sub2">
              <span slot="title"><a-icon type="laptop" />用户管理</span>
              <a-menu-item key="2"  @click="gouserm">用户维护</a-menu-item>
              <a-menu-item key="3"  @click="gorolem">角色维护</a-menu-item>
              <a-menu-item key="4"  @click="goinsm">机构管理</a-menu-item>

          </a-sub-menu>
          <a-sub-menu key="sub3">
              <span slot="title"><a-icon type="notification" />日志管理</span>
              <a-menu-item key="5"  @click="gonote">系统日志</a-menu-item>
          </a-sub-menu>
           <a-menu-item key="sub4" @click="goclassify"><a-icon type="notification"/>生成类管理</a-menu-item>
           <a-menu-item key="sub5" @click="goesb"><a-icon type="notification"/>ESB管理</a-menu-item>

           <a-menu-item key="sub6" @click="goword"><a-icon type="laptop"/>字段处理办法</a-menu-item>
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
            <conditioSearch v-if="pane.key=='/platform'"></conditioSearch>
          <keep-alive v-else>

            <router-view ></router-view>
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

  data () {
    const panes = [
      { title: '服务检测', content: '首页内容', key: '/platform' }
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
  mounted () {

  },
  methods: {
    goTopublic () {
      this.$router.push({ path: "/" })
    },
    gouserm () { // 用户维护
      let panes = this.panes
      let activeKey = `/platform/usermaintenance`
      let isSave = 0 // 是否存在此tab 0 不存在 1存在
      panes.map((item, index) => {
        if (item.key == activeKey) {
          isSave = 1
        }
      })
      if (isSave == 1) {
        this.activeKey = activeKey
        this.$router.push(activeKey)
      } else {
        panes.push({ title: `用户维护`, content: `Content of new Tab ${activeKey}`, key: activeKey })
        this.panes = panes
        this.activeKey = activeKey
        this.$router.push(activeKey)
      }
    },
    gorolem () {
      let panes = this.panes
      let activeKey = `/platform/rolemaintenance`
      let isSave = 0 // 是否存在此tab 0 不存在 1存在
      panes.map((item, index) => {
        if (item.key == activeKey) {
          isSave = 1
        }
      })
      if (isSave == 1) {
        this.activeKey = activeKey
        this.$router.push(activeKey)
      } else {
        panes.push({ title: `角色维护`, content: `Content of new Tab ${activeKey}`, key: activeKey })
        this.panes = panes
        this.activeKey = activeKey
        this.$router.push(activeKey)
      }
    },
    goinsm () {
      let panes = this.panes
      let activeKey = `/platform/institutions`
      let isSave = 0 // 是否存在此tab 0 不存在 1存在
      panes.map((item, index) => {
        if (item.key == activeKey) {
          isSave = 1
        }
      })
      if (isSave == 1) {
        this.activeKey = activeKey
        this.$router.push(activeKey)
      } else {
        panes.push({ title: `机构管理`, content: `Content of new Tab ${activeKey}`, key: activeKey })
        this.panes = panes
        this.activeKey = activeKey
        this.$router.push(activeKey)
      }
    },
    gonote () {
      let panes = this.panes
      let activeKey = `/platform/note`
      let isSave = 0 // 是否存在此tab 0 不存在 1存在
      panes.map((item, index) => {
        if (item.key == activeKey) {
          isSave = 1
        }
      })
      if (isSave == 1) {
        this.activeKey = activeKey
        this.$router.push(activeKey)
      } else {
        panes.push({ title: `系统日志`, content: `Content of new Tab ${activeKey}`, key: activeKey })
        this.panes = panes
        this.activeKey = activeKey
        this.$router.push(activeKey)
      }
    },
    gomenu(){
      let panes = this.panes
      let activeKey = `/platform/menu`
      let isSave = 0 // 是否存在此tab 0 不存在 1存在
      panes.map((item, index) => {
        if (item.key == activeKey) {
          isSave = 1
        }
      })
      if (isSave == 1) {
        this.activeKey = activeKey
        this.$router.push(activeKey)
      } else {
        panes.push({ title: `菜单管理`, content: `Content of new Tab ${activeKey}`, key: activeKey })
        this.panes = panes
        this.activeKey = activeKey
        this.$router.push(activeKey)
      }
    },
    goclassify(){
      let panes = this.panes
      let activeKey = `/platform/classify`
      let isSave = 0 // 是否存在此tab 0 不存在 1存在
      panes.map((item, index) => {
        if (item.key == activeKey) {
          isSave = 1
        }
      })
      if (isSave == 1) {
        this.activeKey = activeKey
        this.$router.push(activeKey)
      } else {
        panes.push({ title: `生成类管理`, content: `Content of new Tab ${activeKey}`, key: activeKey })
        this.panes = panes
        this.activeKey = activeKey
        this.$router.push(activeKey)
      }
    },
    goesb(){
      let panes = this.panes
      let activeKey = `/platform/esb`
      let isSave = 0 // 是否存在此tab 0 不存在 1存在
      panes.map((item, index) => {
        if (item.key == activeKey) {
          isSave = 1
        }
      })
      if (isSave == 1) {
        this.activeKey = activeKey
        this.$router.push(activeKey)
      } else {
        panes.push({ title: `esb服务管理`, content: `Content of new Tab ${activeKey}`, key: activeKey })
        this.panes = panes
        this.activeKey = activeKey
        this.$router.push(activeKey)
      }
    },
    goword () {
      let panes = this.panes
      let activeKey = `/platform/word`
      let isSave = 0 // 是否存在此tab 0 不存在 1存在
      panes.map((item, index) => {
        if (item.key == activeKey) {
          isSave = 1
        }
      })
      if (isSave == 1) {
        this.activeKey = activeKey
        this.$router.push(activeKey)
      } else {
        panes.push({ title: `字段处理方法`, content: `Content of new Tab ${activeKey}`, key: activeKey })
        this.panes = panes
        this.activeKey = activeKey
        this.$router.push(activeKey)
      }
    },

    onEdit (targetKey, action) {
       this[action](targetKey)
    },

    onChange (activeKey) {
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
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#components-layout-demo-top-side-2 .logo {
  width: 120px;
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
