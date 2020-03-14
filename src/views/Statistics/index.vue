<template>
    <a-layout id="components-layout-demo-top-side-2">
       <headshow :items="['5']"></headshow>
    <a-layout>
      <a-layout-sider width="250" style="background: #fff">
        <a-menu
          mode="inline"
   
          :defaultOpenKeys="['sub1','sub2','sub3','sub4','sub5','sub6']"
          :style="{ height: '100%', borderRight: 0 }"
        >
          <a-sub-menu key="sub1">
              <span slot="title"><a-icon type="user" />统计报表</span>
              <a-menu-item key="1" @click="gorepeat">复用类统计</a-menu-item>
              <a-menu-item key="2" @click="goleout">发布统计</a-menu-item>
              <a-menu-item key="3" @click="goservice">服务数统计</a-menu-item>


            </a-sub-menu>
        
        </a-menu>
      </a-layout-sider>
          <!-- 原先普通展示content -->
          <a-tabs :style="{ padding: '24px', margin: 0, minHeight: '280px',width:'100%'}"
            v-model="activeKey"
            type="editable-card"
            @edit="onEdit"
             @change=" onChange"
            hideAddf
          >
          <a-tab-pane v-for="pane in panes" :tab="pane.title" :key="pane.key" :closable="pane.closable">
            <!-- {{content}} -->
          <conditioSearch v-if="pane.key=='/Statistics'"></conditioSearch>
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
      { title: '服务检测', content: '首页内容', key: '/Statistics' }
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
  methods: {
    gorepeat(){
         if(localStorage.rep == null || localStorage.rep == 0){
        const panes = this.panes;
        const activeKey = `/Statistics/repeat`;
        // const pagePath =  `/platform/usermaintenance`;
        panes.push({ title: `系统复用率`, content: `Content of new Tab ${activeKey}`, key: activeKey});
        this.panes = panes;
        this.activeKey = activeKey;
        // this.pagePath = pagePath;
        this.$router.push(activeKey);
        localStorage.rep = activeKey;
      }else{
           this.activeKey =  localStorage.rep ;
          this.$router.push( localStorage.rep);
      }
    },
    goleout(){
         if(localStorage.leout == null || localStorage.leout == 0){
        const panes = this.panes;
        const activeKey = `/Statistics/leout`;
        // const pagePath =  `/platform/usermaintenance`;
        panes.push({ title: `发布统计`, content: `Content of new Tab ${activeKey}`, key: activeKey});
        this.panes = panes;
        this.activeKey = activeKey;
        // this.pagePath = pagePath;
        this.$router.push(activeKey);
        localStorage.leout = activeKey;
      }else{
           this.activeKey =  localStorage.leout ;
          this.$router.push( localStorage.leout);
      }
    },


    goservice(){
        if(localStorage.serv == null || localStorage.serv == 0){
        const panes = this.panes;
        const activeKey = `/Statistics/service`;
        // const pagePath =  `/platform/usermaintenance`;
        panes.push({ title: `系统服务统计`, content: `Content of new Tab ${activeKey}`, key: activeKey});
        this.panes = panes;
        this.activeKey = activeKey;
        // this.pagePath = pagePath;
        this.$router.push(activeKey);
        localStorage.serv = activeKey;
      }else{
           this.activeKey =  localStorage.serv ;
          this.$router.push( localStorage.serv);
      }
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
    },
  
  },
  mounted(){
    localStorage.removeItem('rep');
    localStorage.removeItem('leout');
    localStorage.removeItem('serv');

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
