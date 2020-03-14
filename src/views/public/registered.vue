<template>
    <div>
        <div class="title">填写注册申请单</div>
           <div>

             <a-upload name="file" :multiple="true"
                       action="uploadAction" :beforeUpload="beforeUpload">
              <a-button>
                <a-icon type="upload" />选择文件
              </a-button>
            </a-upload>

            </div>
        <div style="margin-top:20px">
                <a-row>
                    <a-col :span="5" class="flex">
                        <div class="ename">所属系统</div>
                        <a-select defaultValue="" v-model="systemId" style="width: 120px;margin-left:10px;">
                            <a-select-option v-for="item in systemList" v-model="item.systemId" :key="item.systemId">{{ item.systemChineseName }}</a-select-option>

                        </a-select>
                    </a-col>
                    <a-col :span="5"  class="flex">
                        <div class="ename">接入方向</div>
                        <a-select defaultValue="" v-model="interfaceType" style="width: 120px;margin-left:10px;">
                            <a-select-option value="0" :key="3">提供方</a-select-option>
                            <a-select-option value="1" :key="4">消费方</a-select-option>
                        </a-select>
                   </a-col>
                <a-col :span="5"  class="flex">
                       <div class="ename"> 是否标准</div>
                        <a-select defaultValue="" v-model="isStandard" style="width: 120px;margin-left:10px;">
                            <a-select-option value="0" :key="5">标准</a-select-option>
                            <a-select-option value="1" :key="6">不标准</a-select-option>
                        </a-select>
                    </a-col>
                   <a-col :span="5"  class="flex">

                    <div class="ename">采用协议</div>
                      <a-select defaultValue="" v-model="protocol" style="width: 120px;margin-left:10px;" >
                        <a-select-option v-for="item in protocolList" :value="item.protocolId" :key="item.protocolId">{{ item.protocolName }}</a-select-option>
                      </a-select>
                    </a-col>

                  <a-col :span="4"  class="flex">
                    <div class="ename">优先级</div>
                    <a-select defaultValue="" v-model="priority" style="width: 120px;margin-left:10px;" >
                      <a-select-option value="1" :key="9">低 </a-select-option>
                      <a-select-option value="2" :key="10">中 </a-select-option>
                      <a-select-option value="3" :key="11">高 </a-select-option>
                    </a-select>
                  </a-col>
                </a-row>

                <a-row>
                     <a-button icon="save"  type="primary" @click="handleRegister">提交</a-button>
                </a-row>
        </div>
        <div class="title" style="margin-top:20px;">导入日志</div>
        <div style="margin-bottom:20px">
            <a-button icon="delete"  style="margin-right:10px;" @click="deleteOperation">删除</a-button>
            <a-button icon="delete"  style="margin-right:10px;" @click="emptyOperation">清空</a-button>
        </div>
        <div class="scroll_table_border">
          <a-table :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}" :pagination="{
          pageSize: pageSize,
          onShowSizeChange: onShowSizeChange,
          total: total,
          onChange: onChange}" :columns="columns" :dataSource="data" ></a-table>
        </div>
    </div>
</template>

<script>
import config from '../../../src/api/config'

const columns = [
  {
    title: '日志类型',
    dataIndex: 'typeStr'
  }, {
    title: '日志描述',
    dataIndex: 'detail'
  }, {
    title: '操作用户操作用户',
    dataIndex: 'userId'
  }, {
    title: '日志日期',
    dataIndex: 'time'
  }
]

let data = [
  {
    detail: '1234',
    typeStr: '1234',
    userId: 'jjjjjjjjjjjjjjjjdxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    time: '1234'
  },{
    detail: '1234',
    typeStr: '1234',
    userId: 'jjjjjjjjjjjjjjjjdxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    time: '1234'
  },{
    detail: '1234',
    typeStr: '1234',
    userId: 'jjjjjjjjjjjjjjjjdxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    time: '1234'
  },{
    detail: '1234',
    typeStr: '1234',
    userId: 'jjjjjjjjjjjjjjjjdxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    time: '1234'
  }
]

export default {
  data () {
    return {
      data,
      columns,
      uploadAction: config.baseURL + '/resourceImport/import',
      add_newenglish: false,
      file: '',
      systemId: '',
      interfaceType: '',
      isStandard: '',
      protocol: '',
      priority: '',
      systemList: [],
      protocolList: [],
      pageSize: 5,
      currentPage: 1,
      total: 7,
      selectedRowKeys: [],
      selectedArrStr: '',
      type: 5
    }
  },
  mounted () {
    this.getLogList(1, this.pageSize)
    this.getSystemList()
  },
  watch: {
    systemId () {
      let systemId = this.systemId
      this.getProtocolList(systemId)
    }
  },
  destroyed: function () {
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
      console.log(selectedRowKeys)
      let idArr = []
      selectedRowKeys.map((item) => {
        idArr.push(this.data[item].id)
      })
      this.selectedRowKeys = selectedRowKeys
      this.selectedArrStr = idArr.join()
    },
    // 获取file
    beforeUpload (file, fileList) {
      this.file = file
      return false
    },
    // 注册
    handleRegister () {
      let fd = new FormData()
      console.log(this.systemId)
      fd.append('file', this.file) // 传文件
      fd.append('systemId', this.systemId) // id
      fd.append('interfaceType', this.interfaceType) // id
      fd.append('isStandard', this.isStandard) // id
      fd.append('protocol', this.protocol) // id
      fd.append('priority', this.priority) // id
      let url = '/application/register'
      let params = fd
      let response = (res) => {}
      this.$store.state.getUploadPost(url, params, response, this)
    },
    // 获取系统列表
    getSystemList () {
      let url = '/system/getAll'
      let params = {}
      let response = (res) => {
        console.log(res.data)
        this.systemList = res.data
      }

      this.$store.state.getMoreDataGet(url, params, response)
    },
    // 获取协议列表
    getProtocolList (systemId) {
      let url = '/protocol/getSystemProtocol'
      let params = {
        'systemId': systemId
      }
      let response = (res) => {
        this.protocolList = res.data
      }

      this.$store.state.getMoreDataStringPost(url, params, response)
    },
    // 获取日志列表
    getLogList (pageNo, pageSize) {
      let type = this.type
      let url = '/application/getRegisterLog'
      let params = {
        pageNo: pageNo,
        rowNo: pageSize
      }
      let response = (res) => {
        // console.log(res.data.rows)
        let lists = res.data.row
        lists.map((item, index) => {
          this.$set(item, 'key', index)
          if (item.type === type) {
            this.$set(item, 'typeStr', '注册申请导入')
          }
        })
        this.data = lists
        this.total = res.data.resultCount
      }
      this.$store.state.getMoreDataStringPost(url, params, response)
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
      if (logInfos) {
        this.$store.state.deleteLogList(logInfos, respFunc)
      }

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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.ant-row{
   margin-bottom: 10px;
}
.ename{
  width: 30%;
}
.flex{
    display: flex;
    display: -webkit-flex;
}
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
.ant-select{
  margin-right: 10px
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
