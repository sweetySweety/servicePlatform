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
        <data-management v-if="pane.key =='1'" @goPast="goPast" @goReview="goReview"></data-management>
        <past-data v-else-if="pane.key == '/pastData'"></past-data>
        <review-data v-else-if="pane.key == '/reviewData'"></review-data>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script>
  import dataManagement from './metaData/dataManagement'
  import pastData from './metaData/pastData'
  import reviewData from './metaData/reviewData'
  export default {
    data () {
      const panes = [
        { title: '元数据管理', content: '', key: '1' }
      ]

      return {
        activeKey: panes[0].key,
        panes,
        newTabIndex: 0
      }
    },
    components: {
      dataManagement,
      pastData,
      reviewData
    },
    computed: {

    },
    methods: {
      // 过时元数据
      goPast () {
        const panes = this.panes
        const activeKey = `/pastData`
        let isSave = 0 // 是否存在此tab 0 不存在 1存在
        panes.map((item, index) => {
          if(item.key == activeKey) {
            isSave = 1
          }
        })
        if(isSave == 1) {
          this.activeKey = activeKey
          //this.$router.push(activeKey)
        }else{
          panes.push({ title: `过时元数据`, content: `Content of new Tab ${activeKey}`, key: activeKey })
          this.panes = panes
          this.activeKey = activeKey
          //this.$router.push(activeKey)
        }
      },
      // 评审元数据
      goReview () {
        const panes = this.panes
        const activeKey = `/reviewData`
        let isSave = 0 // 是否存在此tab 0 不存在 1存在
        panes.map((item, index) => {
          if(item.key == activeKey) {
            isSave = 1
          }
        })
        if(isSave == 1) {
          this.activeKey = activeKey
          //this.$router.push(activeKey)
        }else{
          panes.push({ title: `评审元数据`, content: `Content of new Tab ${activeKey}`, key: activeKey })
          this.panes = panes
          this.activeKey = activeKey
          //this.$router.push(activeKey)
        }
      },
      onChange (activeKey) {
        // console.log(activeKey)
        if(activeKey == '1') {
          let link = '/public/metadata'
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


