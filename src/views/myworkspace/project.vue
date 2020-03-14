<template>
  <div>
    <a-tabs :style="{margin: 0, minHeight: '280px',width:'100%'}"
            v-model="activeKey"
            type="editable-card"
            @edit="onEdit"
            @change="onChange"
            hideAdd
    >
      <a-tab-pane v-for="pane in panes" :tab="pane.title" :key="pane.key" :closable="pane.key == '1'?false : true" style="overflow-y:scroll; maxHeight:'100px" >
        <project-manage v-if="pane.key =='1'" @goDetail="goDetail"></project-manage>
        <detail-project v-else-if="pane.key == '/detailProject'" :propsdetail="detailData"></detail-project>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script>
  import projectManage from './project/projectManage'
  import detailProject from './project/detailProject'
  export default {
    data () {
      const panes = [
        { title: '项目管理主页', content: '', key: '1' }
      ]

      return {
        activeKey: panes[0].key,
        panes,
        newTabIndex: 0,
        detailData: '', //在data中定义需要传入的值
      }
    },
    components: {
      projectManage,
      detailProject,
    },
    computed: {

    },
    methods: {
      // 系统详情
      goDetail (data) {
        this.detailData = data
        const panes = this.panes
        const activeKey = `/detailProject`
        let isSave = 0 // 是否存在此tab 0 不存在 1存在
        panes.map((item, index) => {
          if(item.key == activeKey) {
            isSave = 1
          }
        })
        if(isSave == 1) {
          this.activeKey = activeKey
        }else{
          panes.push({ title: data.userName+`-系统详情`, content: `Content of new Tab ${activeKey}`, key: activeKey })
          this.panes = panes
          this.activeKey = activeKey
        }
      },
      onChange (activeKey) {
        if(activeKey == '1') {
          let link = '/myworkspace/project'
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


