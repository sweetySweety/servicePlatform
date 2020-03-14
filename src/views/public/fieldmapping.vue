<template>
    <div>
        <div class="title">导入Excel</div>
        <div style="display:flex;display:-webkit-flex">
            <a-upload name="file" :multiple="true"
                      action="http://172.20.10.14:9091/resourceImport/import" :beforeUpload="beforeUpload">
              <a-button>
                <a-icon type="upload" /> 选择文件
              </a-button>
            </a-upload>
            <a-select defaultValue="覆盖" style="width: 120px;margin-left:10px;" @change="handleChange">
              <a-select-option value="y">覆盖</a-select-option>
              <a-select-option value="n">不覆盖</a-select-option>
            </a-select>

            <a-button icon="save"  style="margin-left:10px;" type="primary"
                      @click="handleUpload"
                      :disabled="fileList.length === 0"
                      :loading="uploading" >文件上传</a-button>
        </div>


        <div class="title" style="margin-top:20px;">导入日志</div>

        <div style="margin-bottom:20px">

            <a-button v-if="selectedRowKeys.length == 0" disabled icon="delete" style="margin-right:10px;" @click="deleteOperation">删除</a-button>
          <a-button v-else icon="delete" style="margin-right:10px;" @click="deleteOperation">删除</a-button>
            <a-button icon="delete"  style="margin-right:10px;" @click="emptyOperation">清空</a-button>

        </div>

        <div >
          <a-table :scroll="{ y: 200 }" :pagination="{
          pageSize: pageSize,
          onShowSizeChange: onShowSizeChange,
          total: total,
          onChange: onChange}" :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}" :columns="columns" :dataSource="data" ></a-table>
        </div>
    </div>
</template>

<script>
const columns = [
  {
    title: '日志类型',
    dataIndex: 'typeStr'
  }, {
    title: '日志描述',
    dataIndex: 'detail'
  }, {
    title: '操作用户',
    dataIndex: 'userId'
  }, {
    title: '日志日期',
    dataIndex: 'time'
  }
]

const data = []

export default {
  data () {
    return {
      data,
      columns,
      add_newenglish: false,
      fileList: [],
      select: 'y',
      file: '',
      uploading: false,
      selectedRowKeys: [],
      pageSize: 5,
      currentPage: 1,
      total: 7,
      selectedArrStr: '',
      type: 1
    }
  },
  computed: {
    // rowSelection() {
    //   const { selectedRowKeys } = this;
    //   return {
    //     onChange: (selectedRowKeys, selectedRows) => {
    //       console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    //     },
    //     getCheckboxProps: record => ({
    //       props: {
    //         disabled: record.name === 'Disabled User', // Column configuration not to be checked
    //         name: record.name,
    //       }
    //     }),
    //   }
    // }
  },
  mounted () {
    let pageSize = this.pageSize
    this.getLogList(1, pageSize)
  },
  destroyed () {
    // console.log(111)
  },
  methods: {
    // 切换分页
    onChange (pageNumber) {
      let pageSize = this.pageSize
      this.currentPage = pageNumber
      this.getLogList(pageNumber, pageSize)
    },
    // 改变size
    onShowSizeChange (current, pageSize) {
      console.log(current, pageSize)
    },
    // checkbox操作
    onSelectChange (selectedRowKeys) {
      let idArr = []
      selectedRowKeys.map((item) => {
        idArr.push(this.data[item].id)
      })
      this.selectedRowKeys = selectedRowKeys
      this.selectedArrStr = idArr.join()
    },
    // 获取日志列表
    getLogList (pageNo, pageSize) {
      let type = this.type
      let url = '/log/getFileImportLog'
      let params = {
        pageNumber: pageNo,
        pageSize: pageSize,
        type: type
      }
      let response = (res) => {
        // console.log(res.data.rows)
        let lists = res.data.rows
        lists.map((item, index) => {
          this.$set(item, 'key', index)
          if (item.type === type) {
            this.$set(item, 'typeStr', '数据字典导入')
          }
        })
        this.data = lists
        this.total = res.data.total
      }
      this.$store.state.getMoreDataGet(url, params, response)
    },
    // 删除操作
    deleteOperation () {
      let logInfos = this.selectedArrStr
      let respFunc = () => {
        let page = 1
        let pageSize = this.pageSize
        this.selectedRowKeys = []
        this.getLogList(page, pageSize)
      }
      this.$store.state.deleteLogList(logInfos, respFunc)
    },
    // 清空操作
    emptyOperation () {
      let type = this.type
      let respFunc = () => {
        let page = 1
        let pageSize = this.pageSize
        this.getLogList(page, pageSize)
      }
      this.$store.state.emptyLogList(type, respFunc)
    },
    goTo () {
      this.$router.push({path: '/platform'})
    },
    addnew () {
      this.add_newenglish = true
    },
    handleChange (val) {
      this.select = val
    },
    beforeUpload (file, fileList) {
      this.file = file
      this.fileList = fileList
      // console.log(this.file)
      return false
    },
    handleUpload () {
      let fd = new FormData()
      fd.append('file', this.file) // 传文件
      fd.append('select', this.select) // 传其他参数
      let url = '/mappingImport/fieldImport'
      let params = fd
      let response = (res) => {
        // console.log(res)
      }
      this.$store.state.getUploadPost(url, params, response, this)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.title{
    font-size: 20px;
    font-weight: bold;
    margin-bottom:20px;
}
.flex{
    display: flex;
    display:-webkit-flex;
    align-items: center;
}
ul{
    list-style: none;
    padding:0;
}
li{
    margin-right: 10px;
    margin-bottom: 10px;
}
#components-layout-demo-top-side-2 .logo {
  width: 120px;
  height: 31px;
  background: rgba(255,255,255,.2);
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
