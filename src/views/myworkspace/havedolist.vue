<template>
  <div>
    <!--    <div @click="goManage">pay</div>-->
    <a-tabs :style="{margin: 0, minHeight: '280px',width:'100%'}"
            v-model="activeKey"
            type="editable-card"
            @edit="onEdit"
            @change="onChange"
            hideAdd
    >
      <a-tab-pane v-for="pane in panes" :tab="pane.title" :key="pane.key" :closable="pane.key == '1'?false : true" style="overflow-y:scroll; maxHeight:'100px" >
        <!-- {{content}} -->
        <havedoList v-if="pane.key =='1'" @goInfo="goInfo"></havedoList>
        <viewInfo v-else-if="pane.key == '/myworkspace/havedolist/viewInfo'"></viewInfo>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script>
  import havedoList from './havedolistManage'
  import viewInfo from '../myworkspace/havedoList/viewInfo'
  export default {
    data () {
      const panes = [
        { title: '已办事宜', content: '', key: '1' }
      ]

      return {
        activeKey: panes[0].key,
        panes,
        newTabIndex: 0
      }
    },
    components: {
      havedoList,
      viewInfo
    },
    computed: {

    },
    methods: {
      // 查看详情
      goInfo(){
        const panes = this.panes
        const activeKey = `/myworkspace/havedolist/viewInfo`
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
          panes.push({ title: `查看详情`, content: `Content of new Tab ${activeKey}`, key: activeKey});
          this.panes = panes
          this.activeKey = activeKey
          //this.$router.push(activeKey)
        }

      },
      onChange (activeKey) {
        // console.log(activeKey)
        if(activeKey == '1') {
          let link = '/myworkspace/havedolist'
          this.$router.push(link)
        } else {
          this.$router.push(activeKey)
        }

      },
      onEdit (targetKey, action) {
        this[action](targetKey);
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
    },
    mounted () {

    }
  }
</script>

<style scoped>
  .content_{
    border: 1px solid #cccccc;
    border-radius: 4px;
    padding: 10px;
    margin-bottom: 20px;
  }
  .title_{
    padding-bottom: 15px;
    margin-bottom: 10px;
    border-bottom: 1px solid #cccccc;
  }
</style>


