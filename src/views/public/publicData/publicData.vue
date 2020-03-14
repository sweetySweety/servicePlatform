<template>
  <div>
    <div class="content_ content_top">
      <div class="title_">条件搜索</div>
    <ul class="flex" style="flex-wrap:wrap">
      <li class="flex">

        代码名称
        <a-input placeholder="请输入名称" v-model="sDataName" class="search_ipt"/>
      </li>
      <li class="flex">
        中文名称
        <a-input placeholder="请输入中文名称"  v-model="sDataRemark" class="search_ipt"/>
      </li>
      <li class="flex">
        是否为标准代码
        <a-select class="search_ipt" defaultValue="" v-model="dataIsStandard">
          <a-select-option value="1">
            是
          </a-select-option>
          <a-select-option value="0">
            否
          </a-select-option>
        </a-select>
      </li>
      <li class="flex">
        主代码数据来源
        <a-input placeholder="请输入主代码来源"  v-model="sDataSource" class="search_ipt"/>
      </li>
      <li class="flex">
        代码状态
        <a-select class="search_ipt" defaultValue="" v-model="sDataStatus">
          <a-select-option value="1">
            使用
          </a-select-option>
          <a-select-option value="0">
            退役
          </a-select-option>
        </a-select>
      </li>

      <a-button icon="search"  style="margin-right:10px;" type="primary" @click="goSearch">查询</a-button>
      <a-button icon="close"  style="margin-right:10px;" @click="emptyIpt">清空</a-button>
    </ul>
    </div>

    <div class="content_ content_bottom">
      <div class="title_">公共代码列表</div>

      <div style="margin-bottom:20px">
        <a-button icon="plus"  style="margin-right:10px;" @click="addnew">新增代码</a-button>
        <a-button icon="edit"  style="margin-right:10px;" @click="openManage" :disabled="ischangeone">维护</a-button>

        <a-button icon="delete"  style="margin-right:10px;" @click="deleteOperation" :disabled="ischangeone">删除</a-button>

      </div>

      <div class="scroll_table_border">
        <a-table :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}" :pagination="{
            pageSize: pageSize,
            onShowSizeChange: onShowSizeChange,
            total: total,
            onChange: onChange}" :columns="columns" :dataSource="data"></a-table>
      </div>
    </div>

    <a-modal
      title="新增公共代码"
      v-model="add_newData"
      @ok="handleOk"
      okText="保存"
      cancelText="取消"
    >
      <ul>
        <li class="flex" style="margin-bottom:10px;justify-content:flex-end ;width:85%; ">
          代码名称：  <a-input placeholder="请输入名称" v-model="dataName" class="add_ipt"/>

        </li>
        <li class="flex" style="margin-bottom:10px;justify-content:flex-end ;width:85%; ">
          中文名称：  <a-input placeholder="请输入中文名" v-model="dataRemark" class="add_ipt"/>
        </li>
        <li class="flex" style="margin-bottom:10px;justify-content:flex-end ;width:85%;  ">
          是否标准代码：
          <a-select class="add_ipt" defaultValue="请选择" v-model="dataIsStandard">
            <a-select-option value="1">
              是
            </a-select-option>
            <a-select-option value="0">
              否
            </a-select-option>
          </a-select>
        </li>
<!--        <li class="flex" style="margin-bottom:10px;justify-content:flex-end ;width:85%;  ">-->
<!--          是否主代码： <a-select class="add_ipt" defaultValue="请选择" v-model="dataIsMaster">-->
<!--          <a-select-option value="1">-->
<!--            是-->
<!--          </a-select-option>-->
<!--          <a-select-option value="0">-->
<!--            否-->
<!--          </a-select-option>-->
<!--        </a-select>-->
<!--        </li>-->
        <li class="flex" style="margin-bottom:10px;justify-content:flex-end ;width:85%;  ">
          数据来源：  <a-input placeholder="请输入数据来源" v-model="dataSource" class="add_ipt"/>
        </li>
        <li class="flex" style="margin-bottom:10px;justify-content:flex-end ;width:85%;  ">
          代码状态：
          <a-select class="add_ipt" defaultValue="请选择" v-model="dataStatus">
            <a-select-option value="1">
              使用
            </a-select-option>
            <a-select-option value="0">
              退役
            </a-select-option>
          </a-select>
        </li>
      </ul>
    </a-modal>
  </div>
</template>

<script>
  const columns = [
    {
      title: '代码名称',
      dataIndex: 'name'
    }, {
      title: '是否标准代码',
      dataIndex: 'isStandard'
    }, {
      title: '是否主代码',
      dataIndex: 'isMaster'
    }, {
      title: '数据来源',
      dataIndex: 'dataSource'
    }, {
      title: '备注',
      dataIndex: 'src'
    }, {
      title: '操作用户',
      dataIndex: 'optUser'
    }, {
      title: '操作时间',
      dataIndex: 'optDate'
    }
  ]

  let data = [
    {
      name: '1234',
      isStandard: '是',
      dataSource: 'jjjjjjj',
      id: '123556',
      optUser: '张三',
      optDate: '2017-09-11',
      isMaster: '是',
      src: '备注'
    }]

  export default {
    data () {
      return {
        data,
        columns,
        add_newData: false,
        selectedRowKeys: [],
        selectedArrStr: '',
        pageSize: 5,
        currentPage: 1,
        total: 7,
        message: '',
        ischangeone: true, // 控制
        // 新增公共代码 start
        dataName: '',
        dataIsStandard: '',
        dataIsMaster: 1,
        dataSource: '',
        dataStatus: '',
        dataVersion: '',
        dataRemark: '',
        dataProcessId: '',
        // 新增公共代码 end
        // search 参数 start
        sDataName: '',
        sDataIsStandard: '',
        sDataSource: '',
        sDataStatus: '',
        sDataRemark: ''
        // search 参数 end
      }
    },
    mounted () {
      this.getDataList()
    },
    computed: {

    },
    destroyed () {

    },
    methods: {
      openManage () { // 触发父组件事件
        let length = this.selectedRowKeys.length

        if(length == 1) {
          this.$emit('goManage', '')
          this.getEnumId()
        } else {
          this.$message.warn('不能同时选中多个数据进行修改')
        }
      },
      // 获取选中的id
      getEnumId () {
        this.$emit('getEnumId', this.selectedArrStr)
      },
      addnew () { // 新增窗口
        this.add_newData = true
      },
      // 清空输入框
      emptyIpt () {
        this.sDataName = ''
        this.sDataIsStandard = ''
        this.sDataSource = ''
        this.sDataStatus = ''
        this.sDataRemark = ''
      },
      // 搜索
      goSearch () {
        this.getDataList()
      },
      // 获取公共代码列表
      getDataList () {
        let url = '/enum/query'
        let params = {
          page: this.currentPage,
          rows: this.pageSize,
          name: this.sDataName,
          remark: this.sDataRemark,
          isStandard: this.sDataIsStandard,
          dataSource: this.sDataSource,
          status: this.sDataStatus
        }
        let response = (res) => {
          let obj = res.data.row
          obj.map((item) => {
            let status = item.status
            let isMaster = item.isMaster
            let isStandard = item.isStandard

            switch (parseInt(status)) {
              case 1:
                item.status = '使用'
                break
              case 0:
                item.status = '退役'
            }
            switch (parseInt(isMaster)) {
              case 1:
                item.isMaster = '是'
                break
              case 0:
                item.isMaster = '否'
            }
            switch (parseInt(isStandard)) {
              case 1:
                item.isStandard = '是'
                break
              case 0:
                item.isStandard = '否'
            }
          })


          this.data = obj
          this.total = res.data.resultCount
        }
        this.$store.state.getMoreDataGet(url, params, response)
      },
      // 新增公共代码
      add_submit () {
        let url = '/enum/add'
        let params = {
          name: this.dataName,
          isStandard: this.dataIsStandard,
          isMaster: this.dataIsMaster,
          dataSource: this.dataSource,
          status: this.dataStatus,
          version: this.dataVersion,
          remark: this.dataRemark,
          processId: this.dataProcessId
        }
        let response = (res) => {
          this.dataName = ''
          this.dataRemark = ''
          this.dataIsStandard = ''
          this.dataIsMaster = ''
          this.dataSource = ''
          this.dataStatus = ''
          this.dataVersion = ''
          this.dataProcessId = ''

          this.getDataList()
        }
        this.$store.state.getMoreDataPost(url, params, response)
      },
      // 确定新增操作
      handleOk (e) {
        this.add_newData = false
        this.emptyIpt()
        this.add_submit()
      },
      // 切换分页
      onChange (pageNumber) {
        this.currentPage = pageNumber
        this.getDataList()
      },
      // 改变size
      onShowSizeChange (current, pageSize) {
        console.log(current, pageSize)
      },
      // checkbox操作
      onSelectChange (selectedRowKeys) {
        let idArr = []
        let length = selectedRowKeys.length
        if(length != 0) {
          this.ischangeone = false
        } else {
          this.ischangeone = true
        }
        selectedRowKeys.map((item) => {
          idArr.push(this.data[item].id)
        })
        this.selectedRowKeys = selectedRowKeys
        this.selectedArrStr = idArr.join()
        this.enumId = this.selectedArrStr
      },
      // 删除操作
      deleteOperation () {
        let url = '/enum/deleteEnumById'
        let params = {
          enumId: this.selectedArrStr
        }
        let response = (res) => {
          this.getDataList()
        }
        this.$store.state.getMoreDataDelete(url, params, response)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
  .add_ipt{
    width:250px;
    margin-left:10px;
  }
  .search_ipt{
    width:150px;
    margin-left:10px;
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

