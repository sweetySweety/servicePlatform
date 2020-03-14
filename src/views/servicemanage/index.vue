<template>
    <a-layout id="components-layout-demo-top-side-2">
       <headshow :items="['3']"></headshow>
    <a-layout>
      <a-layout-sider width="250" style="background: #fff">
          <!-- 树形插件 -->
          <div></div>
          <!-- 版本管理导航 -->

        <a-menu
          theme="light"
          mode="inline"
          :defaultOpenKeys="['sub1','sub2','sub3','sub4','sub5']"
          :style="{ height: '100%', borderRight: 0 }"
        >
          <a-sub-menu key="sub1">
              <span slot="title"><a-icon type="user" />服务版本管理 </span>
              <a-menu-item key="1" @click="letout">版本发布</a-menu-item>
              <a-menu-item key="2" >版本历史</a-menu-item>
              <a-menu-item key="3" @click="linedo" >基线制作</a-menu-item>
              <a-menu-item key="4">基线历史</a-menu-item>
          </a-sub-menu>
          <a-menu-item key="5" ><a-icon type="laptop"/>接口版本管理</a-menu-item>
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
            <conditioSearch v-if="pane.key=='/servicemanage'"></conditioSearch>
            <keep-alive v-else>
              <router-view>
              </router-view>
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
          { title: '服务检测', content: '首页内容', key: '/servicemanage' }
    ]
    return {
        activeClass: -1 ,
        activeKey: panes[0].key,
        panes,
        newTabIndex: 0,
    }
  },
  components:{
     headshow,
     conditioSearch
  },
  mounted(){
      localStorage.removeItem('lout');
      localStorage.removeItem('linedo');

  },
  methods: {
    onSearch (value) {
      console.log(value)
    },
    pointAdd () {   // methods方法  val即为子组件传过来的值
        
    },  
    letout() {//版本发布
       if(localStorage.lout == null || localStorage.lout == 0){
          const panes = this.panes;
          const activeKey = `/servicemanage/versionManger`;
          // const pagePath =  `/platform/rolemaintenance`;
          panes.push({ title: `版本发布`, content: `Content of new Tab ${activeKey}`, key: activeKey })
          this.panes = panes
          this.activeKey = activeKey;
          this.$router.push(activeKey);
          localStorage.lout = activeKey;
        }else{
            this.activeKey =  localStorage.lout ;
            this.$router.push( localStorage.lout);
        }
    },
    linedo(){
      if(localStorage.linedo == null || localStorage.linedo == 0){
          const panes = this.panes;
          const activeKey = `/servicemanage/lineDo`;
          // const pagePath =  `/platform/rolemaintenance`;
          panes.push({ title: `基线制作`, content: `Content of new Tab ${activeKey}`, key: activeKey })
          this.panes = panes
          this.activeKey = activeKey;
          this.$router.push(activeKey);
          localStorage.linedo = activeKey;
        }else{
            this.activeKey =  localStorage.linedo ;
            this.$router.push( localStorage.linedo);
        }
    },
  
    onEdit (targetKey, action) {
      this[action](targetKey)
    },

    onChange(activeKey){
      this.$router.push(activeKey)
    },
   
    remove (targetKey) {
      let activeKey = this.activeKey
      console.log(this.activeKey)
      if( this.activeKey == '/servicemanage/versionManger' ){
         localStorage.removeItem('lout');
      }else if( this.activeKey == '/servicemanage/linedo' ){
        localStorage.removeItem('linedo');
      }
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
  
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.table-operations {
  margin-bottom: 16px;
}

.table-operations > button {
  margin-right: 8px;
}
.systemListname{
    padding: 0;
    margin-top:20px;
}
.systemListname li{
    list-style: none;
    padding:10px 10px 10px 15px;
    cursor: pointer;
}
.systemListname li:hover{
    background: #1890ff;
    color: #fff;
}
.systemListname li i{
    margin-right:10px;
}
.systemListname li.active {
    background: #1890ff;
    color: #fff;
}
</style>
