<template>
  <div>
    <div class="title">接口标签历史</div>
    <div>
      <a-table :pagination="{
          pageSize: pageSize,
          onShowSizeChange: onShowSizeChange,
          total: total,
          onChange: onPageChange}"
               :columns="columns"
               :dataSource="data">
      </a-table>
    </div>
  </div>
</template>

<script>
const columns = [{
  title: '接口名',
  dataIndex: 'interfaceName'
}, {
  title: '交易码',
  dataIndex: 'ereturnCode'
}, {
  title: '描述',
  dataIndex: 'desc'
}, {
  title: '备注',
  dataIndex: 'remark'
}, {
  title: '状态',
  dataIndex: 'status'
}, {
  title: '版本',
  dataIndex: 'versionId'
}, {
  title: '使用者',
  dataIndex: 'optUser'
}, {
  title: '操作时间',
  dataIndex: 'optDate'
}, {
  title: '操作',
  dataIndex: 'operation',
  scopedSlots: { customRender: 'operation' }
}]
const data = []
export default {
  // props: ['headId'],
  data () {
    return {
      data,
      columns,
      currentPage: 1,
      pageSize: 10,
      total: 10
    }
  },
  mounted () {
    this.searchheadMsgList()
  },
  methods: {
    // 切换分页
    onPageChange (pageNumber) {
      this.currentPage = pageNumber
      this.searchheadMsgList()
    },
    // 改变size
    onShowSizeChange (current, pageSize) {
      console.log(current, pageSize)
    },
    // 导出记录
    expertHeadMsg (record) {
      let url = '/excelExporter/exportHeadModifRecord'
      let params = {
        headId: record.headId
      }
      let response = (res) => {
        this.searchheadMsgList()
      }

      this.$store.state.getMoreDataPost(url, params, response)
    },
    // 获取接口标签历史列表
    searchheadMsgList () {
      let url = '/interfaceHis/history'
      let params = {
        interfaceId: 'UPP0001',
        pageNo: this.currentPage,
        pageNumber: this.pageSize
      }
      let response = (res) => {
        let obj = res.data
        this.data = obj
      }
      this.$store.state.getMoreDataGet(url, params, response)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.operation_btn {
  margin: 0 10px 10px 0;
}
.iptTitle {
  width: 100px;
}
.title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
}
.flex {
  display: flex;
  display: -webkit-flex;
  align-items: center;
}
ul {
  list-style: none;
  padding: 0;
}
li {
  margin-right: 10px;
}
#components-layout-demo-top-side-2 .logo {
  width: 120px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 28px 16px 0;
  float: left;
}
.table-operations {
  margin-bottom: 16px;
}

.table-operations > button {
  margin-right: 8px;
}
</style>
