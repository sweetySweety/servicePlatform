<template>
  <div>
    <div class="title">填写系统接入申请单</div>
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
        <a-col :span="6" class="flex">
          <div class="ename">系统中文名称</div>
          <a-input placeholder="请输入元数据名称" v-model="systemCName" style="width:150px ;"/>
        </a-col>
        <a-col :span="6" class="flex">
          <div class="ename"> 系统英文名称</div>
          <a-input placeholder="请输入中文名称"  v-model="systemEName" style="width:150px;"/>
        </a-col>
        <a-col  :span="6" class="flex">
          <div class="ename">系统能否改造</div>
          <a-select class="submit_select" v-model="isRemould">
            <a-select-option v-for="item in protocolList" :value="item.protocolId" :key="item.protocolId">{{ item.protocolName }}</a-select-option>
          </a-select>
        </a-col>
        <a-col  :span="6" class="flex">
          <div class="ename">改造说明	</div>
          <a-input placeholder="请输入数据项分类" v-model="RemouldDesc"  style="width:150px;"/>
        </a-col>

      </a-row>


      <a-row>
        <a-col  :span="6" class="flex">
          <div class="ename">系统部署架构</div>
          <a-select class="submit_select" v-model="deployArchite">
          <a-select-option v-for="item in protocolList" :value="item.protocolId" :key="item.protocolId">{{ item.protocolName }}</a-select-option>
          </a-select>
        </a-col>
        <a-col  :span="6" class="flex">
          <div class="ename">系统设计日均交易吞吐量（万笔）</div>
          <a-input placeholder="请输入创建人" v-model="DhandlingCapacity"  style="width:150px;"/>
        </a-col>
        <a-col  :span="6" class="flex">
          <div class="ename">系统当前实际日均交易吞吐量（万笔）</div>
          <a-input placeholder="请输入创建人" v-model="ThandlingCapacity"  style="width:150px;"/>
        </a-col>

      </a-row>
      <a-row>
        <a-col  :span="6" class="flex">
          <div class="ename">是否PIN字段处理</div>
          <a-select class="submit_select" v-model="isPIN">
          <a-select-option v-for="item in protocolList" :value="item.protocolId" :key="item.protocolId">{{ item.protocolName }}</a-select-option>
          </a-select>
        </a-col>
        <a-col  :span="6" class="flex">
          <div class="ename">是否需要加密报文信息</div>
          <a-select class="submit_select" v-model="isEncryption">
            <a-select-option v-for="item in protocolList" :value="item.protocolId" :key="item.protocolId">{{ item.protocolName }}</a-select-option>
          </a-select>
        </a-col>
        <a-col  :span="6" class="flex">
          <div class="ename">编码格式</div>
          <a-input placeholder="请输入创建人" v-model="Encode"  style="width:150px;"/>
        </a-col>
      </a-row>
      <ul  class="flex" style="flex-wrap:wrap;">
        <a-col  :span="6" class="flex">
          <div class="ename">交易附件需求</div>
          <a-select class="submit_select" v-model="isFile">
            <a-select-option v-for="item in protocolList" :value="item.protocolId" :key="item.protocolId">{{ item.protocolName }}</a-select-option>
          </a-select>

        </a-col>
        <a-col  :span="6" class="flex">
          <div class="ename">	附件大小 </div>
          <a-input placeholder="请输入创建人" v-model="FileSize"  style="width:150px;"/>
        </a-col>
        <a-col  :span="6" class="flex">
          <div class="ename">	单位</div>
          <a-select class="submit_select" v-model="Unit">
            <a-select-option v-for="item in protocolList" :value="item.protocolId" :key="item.protocolId">{{ item.protocolName }}</a-select-option>
          </a-select>
        </a-col>
      </ul>
      <ul  class="flex" style="flex-wrap:wrap;">
        <a-col  :span="6" class="flex">
          <div class="ename">通讯协议/中间件</div>
          <a-select class="submit_select" v-model="communicationProtocol">
            <a-select-option v-for="item in protocolList" :value="item.protocolId" :key="item.protocolId">{{ item.protocolName }}</a-select-option>
          </a-select>
        </a-col>
        <a-col  :span="6" class="flex">
          <div class="ename">同步模式/异步模式</div>
          <a-select class="submit_select" v-model="interactiveMode">
            <a-select-option v-for="item in protocolList" :value="item.protocolId" :key="item.protocolId">{{ item.protocolName }}</a-select-option>
          </a-select>
        </a-col>
        <a-col  :span="6" class="flex">
          <div class="ename">连接方式</div>
          <a-select class="submit_select" v-model="connectMode">
            <a-select-option v-for="item in protocolList" :value="item.protocolId" :key="item.protocolId">{{ item.protocolName }}</a-select-option>
          </a-select>
        </a-col>
      </ul>
      <ul  class="flex" style="flex-wrap:wrap;">
        <a-col  :span="6" class="flex">
          <div class="ename">	报文格式</div>
          <a-input placeholder="请输入创建人" v-model="messageType" style="width:150px;"/>
        </a-col>
        <a-col  :span="6" class="flex">
          <div class="ename">	系统超时时间（秒）</div>
          <a-input placeholder="请输入创建人" v-model="outtime"  style="width:150px;"/>
        </a-col>
        <a-col  :span="6" class="flex">
          <div class="ename">	系统最大连接数</div>
          <a-input placeholder="请输入创建人" v-model="connectNum"  style="width:150px;"/>
        </a-col>
      </ul>
      <ul  class="flex" style="flex-wrap:wrap;">
        <a-col  :span="6" class="flex">
          <div class="ename">	流水号长度</div>
          <a-input placeholder="请输入创建人" v-model="SeqnoLength"  style="width:150px;"/>
        </a-col>

        <a-col  :span="6" class="flex">
          <div class="ename">	流水号范围区间</div>
          <a-input placeholder="请输入创建人" v-model="SeqnoDesc"  style="width:150px;"/>
        </a-col>
        <a-col  :span="6" class="flex">
          <div class="ename">通讯方式是否统一</div>
          <a-select class="submit_select" v-model="isUnify">
            <a-select-option v-for="item in protocolList" :value="item.protocolId" :key="item.protocolId">{{ item.protocolName }}</a-select-option>
          </a-select>
        </a-col>
      </ul>
      <ul  class="flex" style="flex-wrap:wrap; ">
        <a-col  :span="6" class="flex">
          <div class="ename">  特殊方式说明</div>
          <a-input placeholder="请输入创建人" v-model="CommunicateDesc"  style="width:150px;"/>
        </a-col>
        <a-col  :span="6" class="flex">
          <div class="ename">	是否宣贯</div>
          <a-select class="submit_select" v-model="isExplain">
            <a-select-option v-for="item in protocolList" :value="item.protocolId" :key="item.protocolId">{{ item.protocolName }}</a-select-option>
          </a-select>
        </a-col>
        <a-col  :span="6" class="flex">
          <div class="ename">通知ESB</div>
          <a-select class="submit_select" v-model="esbUser">
            <a-select-option v-for="item in protocolList" :value="item.protocolId" :key="item.protocolId">{{ item.protocolName }}</a-select-option>
          </a-select>
        </a-col>
      </ul>

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
  import ATextarea from 'ant-design-vue/es/input/TextArea'

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
//   系统申请表
//   系统英文名称
//   系统中文名称
//   系统能否改造（0可以，1不可以）
// 改造说明
//   系统部署架构（0集中分布，1分布部署，2分布部署，负载均衡）
// 系统设计日均交易吞吐量（万笔）
// 系统当前实际日均交易吞吐量（万笔）
//
//   是否PIN字段处理（0需要，1不需要）
// 是否需要加密报文信息（0需要，1不需要）
// 编码格式
//   交易附件需求（0有，1无）
// 附件大小
//   单位（KB,M）
// 通讯协议/中间件（0 TCP，1 HTTP,2 JMS,3 MQ,4 WTC Tuxedo）
// 同步模式/异步模式（0 同步，1 异步）
// 连接方式（0 长连接，1短连接）
// 报文格式
//   系统超时时间（秒）
// 系统最大连接数
//   流水号长度
//   流水号范围区间
//   通讯方式是否统一（0统一，1不统一）
// 特殊方式说明
//   是否宣贯（0 已宣贯，1 未宣贯）
// 通知ESB人员ID
  let data = []

  export default {
    components: {ATextarea},
    data () {
      return {
        data,
        columns,
        uploadAction: config.baseURL + '/resourceImport/import',
        add_newenglish: false,
        file: '',
        systemEName: '',
        systemCName: '',
        isRemould: '',
        RemouldDesc: '',
        deployArchite: '',
        DhandlingCapacity: '',
        ThandlingCapacity: '',
        isPIN: '',
        isEncryption: '',
        Encode: '',
        isFile: '',
        FileSize: '',
        Unit: '',
        communicationProtocol: '',
        interactiveMode: '',
        connectMode: '',
        messageType: '',
        outtime: '',
        connectNum: '',
        SeqnoLength: '',
        SeqnoDesc: '',
        isUnify: '',
        CommunicateDesc: '',
        isExplain: '',
        esbUser: '',
        systemList: [],
        protocolList: [],
        pageSize: 5,
        currentPage: 1,
        total: 7,
        selectedRowKeys: [],
        selectedArrStr: '',
        type: 9
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

        fd.append('file', this.file) // 传文件
        fd.append('systemEName', this.systemEName) // id
        fd.append('systemCName', this.systemCName) // id
        fd.append('isRemould', this.isRemould) // id
        fd.append('RemouldDesc', this.RemouldDesc) // id
        fd.append('deployArchite', this.deployArchite) // id
        fd.append('esbUser', this.esbUser) // id
        fd.append('DhandlingCapacity', this.DhandlingCapacity) // id
        fd.append('ThandlingCapacity', this.ThandlingCapacity) // id
        fd.append('isPIN', this.isPIN) // id
        fd.append('isEncryption', this.isEncryption) // id
        fd.append('Encode', this.Encode) // id
        fd.append('isFile', this.isFile) // id
        fd.append('TFileSize', this.FileSize) // id
        fd.append('Unit', this.Unit) // id
        fd.append('communicationProtocol', this.communicationProtocol) // id
        fd.append('interactiveMode', this.interactiveMode) // id
        fd.append('connectMode', this.connectMode) // id
        fd.append('messageType', this.messageType) // id
        fd.append('outtime', this.outtime) // id
        fd.append('connectNum', this.connectNum) // id
        fd.append('SeqnoLength', this.SeqnoLength) // id
        fd.append('SeqnoDesc', this.SeqnoDesc) // id
        fd.append('isUnify', this.isUnify) // id
        fd.append('CommunicateDesc', this.CommunicateDesc) // id
        fd.append('isExplain', this.isExplain) // id

        let url = '/application/systemcollect'
        let params = fd
        let response = (res) => {}
        this.$store.state.getUploadPost(url, params, response, this)
      },
      // 获取系统列表
      getSystemList () {
        let url = '/system/getAll'
        let params = {}
        let response = (res) => {
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
        let url = '/application/getSystemRegisterLog'
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
              this.$set(item, 'typeStr', '系统申请导入')
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
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .submit_select{
    width: 150px;
  }
  .ant-row{
    margin-bottom: 10px;
  }
  .ename{
    width: 40%;
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
    margin-bottom: 15px;
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
