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
      <conditio-search v-if="pane.key =='1'" @getEnumId="getEnumId"  @goManage="goManage"></conditio-search>
      <public-data-manage v-else-if="pane.key == '/publicDataManage'" @goRepresentation="goRepresentation" @getSlaveId="getSlaveId" @goFromData="goFromData" @goMasterData="goMasterData" :enumId="enumId"></public-data-manage>
      <from-data-manage v-else-if="pane.key == '/fromDataManage'" :slaveId="slaveId" :enumId="enumId"></from-data-manage>
      <represen-tation v-else-if="pane.key == '/representation'" :slaveId="slaveId" :enumId="enumId"></represen-tation>
      <master-data-manage v-else-if="pane.key == '/masterDataManage'" :slaveId="slaveId" :enumId="enumId"></master-data-manage>
    </a-tab-pane>
  </a-tabs>
  </div>
</template>
<script>
  import conditioSearch from './publicData/publicData' // 首页
  import publicDataManage from './publicData/publicDataManage' // 公共代码维护
  import fromDataManage from './publicData/fromDataManage' // 从代码维护
  import represenTation from './publicData/representation' // 枚举映射
  import masterDataManage from './publicData/masterDataManage' // 主代码维护

  export default {
    data () {
      const panes = [
        { title: '公共代码', content: '', key: '1' }
      ]

      return {
        activeKey: panes[0].key,
        panes,
        newTabIndex: 0,
        enumId: '', // 主代码id
        slaveId: '', // 从代码id
        slaveName: '',
        enumName: ''
      }
    },
    components: {
      conditioSearch,
      publicDataManage,
      fromDataManage,
      represenTation,
      masterDataManage
    },
    computed: {

    },
    methods: {
      // 枚举映射页面
      goRepresentation () {
        const panes = this.panes
        const activeKey = `/representation`
        let isSave = 0 // 是否存在此tab 0 不存在 1存在
        panes.map((item, index) => {
          if(item.key == activeKey) {
            isSave = 1
          }
        })
        if(isSave == 1) {
          this.activeKey = activeKey
        } else {
          panes.push({ title: `代码枚举映射`, content: `Content of new Tab ${activeKey}`, key: activeKey })
          this.panes = panes
          this.activeKey = activeKey
        }
      },
      // 从代码维护页面
      goFromData () {
        const panes = this.panes
        const activeKey = `/fromDataManage`
        let isSave = 0 // 是否存在此tab 0 不存在 1存在
        panes.map((item, index) => {
          if(item.key == activeKey) {
            isSave = 1
          }
        })
        if(isSave == 1) {
          this.activeKey = activeKey
        } else {
          panes.push({ title: `从代码维护`, content: `Content of new Tab ${activeKey}`, key: activeKey })
          this.panes = panes
          this.activeKey = activeKey
        }
      },
      getSlaveId (res) {
        this.slaveId = res
      },
      getEnumId (res) {
        this.enumId = res
      },
      goMasterData () {
        const panes = this.panes
        const activeKey = `/masterDataManage`
        let isSave = 0 // 是否存在此tab 0 不存在 1存在
        panes.map((item, index) => {
          if(item.key == activeKey) {
            isSave = 1
          }
        })
        if(isSave == 1) {
          this.activeKey = activeKey
        }else{
          panes.push({ title: `主代码维护`, content: `Content of new Tab ${activeKey}`, key: activeKey })
          this.panes = panes
          this.activeKey = activeKey
        }
      },
      goManage () {
        const panes = this.panes
        const activeKey = `/publicDataManage`
        let isSave = 0 // 是否存在此tab 0 不存在 1存在
        panes.map((item, index) => {
          if(item.key == activeKey) {
            isSave = 1
          }
        })
        if(isSave == 1) {
          this.activeKey = activeKey
        }else{
          panes.push({ title: `公共代码维护`, content: `Content of new Tab ${activeKey}`, key: activeKey })
          this.panes = panes
          this.activeKey = activeKey
        }
      },
      onChange (activeKey) {
        // console.log(activeKey)
        if(activeKey == '1') {
          let link = '/public/publicm'
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

</style>
