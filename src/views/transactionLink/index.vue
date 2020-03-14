<template>
    <a-layout id="components-layout-demo-top-side-2">
       <headshow :items="['4']"></headshow>
    <a-layout>
      <a-layout-sider width="250" style="background: #fff">
        <a-input-search placeholder="input search text" style="width: 230px;margin:10px" @search="onSearch"/>
        <ul class="systemListname">
            <li v-for="(item,index) in systemList" :key="index" :class="activeClass==index?'active':''" @click="getitem(index,item. name)"><a-icon type="desktop" />{{item.name}}</li>    
        </ul>
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
              <conditioSearch v-if="pane.key=='/transactionLink'"></conditioSearch>
          <keep-alive v-else>
            <div></div>
            <router-view @createP="pointprotect">

              
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
          { title: '首页服务检测', content: '首页内容', key: '/transactionLink' }
    ]
    return {
        activeClass: -1 ,
        activeKey: panes[0].key,
        panes,
        newTabIndex: 0,
        systemList:[
            {
                name:'加密平台'
            },
            {
                name:'理财销售系统'
            },
            {
                name:'生物识别系统'
            },
            {
                name:'信用卡前置系统'
            },
            {
                name:'综合管理平台'
            },
            {
                name:'IC卡系统'
            },
            
            {
                name:'客服信息管理'
            }
        ],
      
    }
  },
  components:{
     headshow,
     conditioSearch
  },
  mounted(){
    localStorage.removeItem('search');
    localStorage.removeItem('protect');
    localStorage.removeItem('preview');
  },
  methods: {
    onSearch (value) {
      console.log(value)
    },
    pointAdd () {   // methods方法  val即为子组件传过来的值
        
    },  
    pointprotect(val){
      console.log(val)
      if(localStorage.protect == null || localStorage.protect == 0){
          const panes = this.panes
          const activeKey = `/transactionLink/preserve`
          // const pagePath =  `/platform/rolemaintenance`;
          panes.push({ title: `节点维护`, content: `Content of new Tab ${activeKey}`, key: activeKey })
          this.panes = panes
          this.activeKey = activeKey;
          this.$router.push(activeKey);
          localStorage.protect = activeKey;
        }else{
            this.activeKey =  localStorage.protect ;
            this.$router.push( localStorage.protect);
        }
    },
    preview(){
      if(localStorage.preview == null || localStorage.preview == 0){
          const panes = this.panes
          const activeKey = `/transactionLink/preview`
          // const pagePath =  `/platform/rolemaintenance`;
          panes.push({ title: `预览`, content: `Content of new Tab ${activeKey}`, key: activeKey })
          this.panes = panes
          this.activeKey = activeKey;
          this.$router.push(activeKey);
          localStorage.preview = activeKey;
          console.log('创建预览成功')
        }else{
            this.activeKey =  localStorage.preview ;
            this.$router.push( localStorage.preview);
        }
    },
    getitem(e,name){
        this.activeClass = e;
        if(localStorage.search == null || localStorage.search == 0){
        const panes = this.panes;
        const activeKey = `/transactionLink/search`;
        // const pagePath =  `/platform/usermaintenance`;
        panes.push({ title:name, content: `Content of new Tab ${activeKey}`, key: activeKey});
        this.panes = panes;
        this.activeKey = activeKey;
        // this.pagePath = pagePath;
        this.$router.push(activeKey);
        localStorage.search = activeKey;
      }else{
           this.activeKey =  localStorage.search ;
          this.$router.push( localStorage.search);
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
