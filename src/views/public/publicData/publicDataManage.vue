<template>
  <div>
    <div class="content_ content_top">
      <div class="title_">主代码</div>
      <a-row type="flex" justify="start" align="middle">
        <a-col :span="5" class="flex">
          <div class="data_title">中文名称</div>
          <a-input placeholder="请输入中文名称"  v-model="sDataRemark" class="search_ipt"/>
        </a-col>
        <a-col :span="5" class="flex">
          <div class="data_title">代码名称</div>
          <a-input placeholder="请输入名称" v-model="sDataName" class="search_ipt"/>
        </a-col>
        <a-col :span="5" class="flex">
          <div class="data_title">是否标准代码</div>
          <a-select class="search_ipt" defaultValue="" v-model="sDataIsStandard">
            <a-select-option value="1">
              是
            </a-select-option>
            <a-select-option value="0">
              否
            </a-select-option>
          </a-select>
        </a-col>
        <a-col :span="5" class="flex">
          <div class="data_title">数据来源</div>
          <a-input placeholder="请输入来源"  v-model="sDataSource" class="search_ipt"/>
        </a-col>
        <a-col :span="4">
          <a-button class="ant-btn-primary" @click="goMasterData">主代码值</a-button>
        </a-col>
      </a-row>
    </div>

    <div class="content_ content_bottom">
      <div class="title_">从代码列表</div>
      <div>
        <a-button icon="delete" class="operation_btn" :disabled="isSelected" @click="deleteOperation">删除</a-button>
        <a-button icon="plus" class="operation_btn" @click="showModel">新增</a-button>
        <a-button icon="edit" class="operation_btn" :disabled="isSelected" @click="goFromData">维护</a-button>
        <a-button icon="plus" class="operation_btn" :disabled="isSelected" @click="goRepresentation">枚举映射</a-button>
      </div>

      <div class="scroll_table_border">
        <a-table :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"  :columns="columns" :dataSource="data" ></a-table>
      </div>

    </div>


    <a-modal
      title="新增从代码"
      v-model="addNewModel"
      @ok="add_submit"
      okText="保存"
      cancelText="取消"
    >
      <ul>
        <li class="flex" style="margin-bottom:10px;justify-content:flex-end ;width:85%; ">
          代码名称：  <a-input placeholder="请输入名称" v-model="dataName" class="add_ipt"/>

        </li>
        <li class="flex" style="margin-bottom:10px;justify-content:flex-end ;width:85%; ">
          中文名称：  <a-input placeholder="请输入中文名称" v-model="dataRemark" class="add_ipt"/>
        </li>
        <li class="flex" style="margin-bottom:10px;justify-content:flex-end ;width:85%;  ">
          是否标准代码：
          <a-select class="add_ipt" defaultValue="" v-model="dataIsStandard">
            <a-select-option value="1">
              是
            </a-select-option>
            <a-select-option value="0">
              否
            </a-select-option>
          </a-select>
        </li>
<!--        <li class="flex" style="margin-bottom:10px;justify-content:flex-end ;width:85%;  ">-->
<!--          是否主代码： <a-select class="add_ipt" defaultValue="" v-model="dataIsMaster">-->
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
          <a-select class="add_ipt" defaultValue="" v-model="dataStatus">
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
      dataIndex: 'isStandard'},
    // }, {
    //   title: '是否主代码',
    //   dataIndex: ''
    // },
    {
      title: '数据来源',
      dataIndex: 'dataSource'
    }, {
      title: '版本号',
      dataIndex: 'version'
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
      dataSource: "ttt",
      id: "4028ab956f40e949016f40ea9cd10001",
      isMaster: null,
      isStandard: "1",
      name: "xxdcc",
      optDate: "2019-12-26 14:33:55",
      optUser: "admin",
      processId: null,
      remark: "从代码name",
      status: "1",
      version: null
    }
  ]

  export default {
    name: 'dataReview',
    props: [ 'enumId' ],
    data () {
      return {
        chineseName: '',
        data,
        columns,
        selectedRowKeys: [],
        selectedArrStr: '',
        pageSize: 5,
        currentPage: 1,
        total: 7,
        isSelected: true, // 是否可以点击
        addNewModel: false, // 显示新增弹窗
        currentenumId: this.enumId, // 主代码id
        // 新增从代码
        dataName: '',
        dataIsStandard: '',
        dataIsMaster: 0,
        dataSource: '',
        dataStatus: '',
        dataRemark: '',
        // 新增从代码 end
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
      this.getList()
      this.getDataInfo()
    },
    methods: {
      // 获取代码详情
      getDataInfo () {
        let url = '/enum/getEnumByMasterId'
        let params = {
          id: this.currentenumId
        }
        let response = (res) => {
          let obj = res.data
          this.sDataName = obj.name
          this.sDataIsStandard = obj.isStandard
          this.sDataSource = obj.dataSource
          this.sDataStatus = obj.status
          this.sDataRemark = obj.remark
        }
        this.$store.state.getMoreDataStringPost(url, params, response)
      },
      // 主代码维护页面
      goMasterData () {
        this.getSlaveId()
        this.$emit('goMasterData', '')
      },
      // 枚举映射页面
      goRepresentation () {
        let length = this.selectedRowKeys.length
        if( length == 1) {
          this.getSlaveId()
          this.$emit('goRepresentation', '')
        } else {
          this.$message.warn('不能同时选中多个列表进行操作')
        }

      },
      getSlaveId () {
        this.$emit('getSlaveId', this.selectedArrStr)
      },
      goFromData () {
        this.getSlaveId()
        this.$emit('goFromData', '')
      },
      showModel () {
        this.addNewModel = true
      },
      // 新增从代码
      add_submit () {
        let url = '/enum/addSlaveEnum'
        let params = {
          name: this.dataName,
          isStandard: this.dataIsStandard,
          isMaster: this.dataIsMaster,
          dataSource: this.dataSource,
          status: this.dataStatus,
          remark: this.dataRemark,
          masterId: this.currentenumId
        }
        let response = (res) => {
          this.getList()
          this.addNewModel = false
        }
        this.$store.state.getMoreDataStringPost(url, params, response)
      },
      // 获取从从代码列表
      getList () {
        let url = '/enum/getSlaveByMasterId'
        let params = {
          id: this.currentenumId
          // page: this.currentPage,
          // rows: this.pageSize
        }
        let response = (res) => {
          this.data = res.data
          //this.total = res.data.total
        }
        this.$store.state.getMoreDataStringPost(url, params, response)
      },
      // 切换分页
      onChange (pageNumber) {
        this.currentPage = pageNumber
        this.getList()
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
        if (selectedRowKeys.length != 0) {
          this.isSelected = false
        } else {
          this.isSelected = true
        }
      },
      // 删除从代码操作
      deleteOperation () {
        let url = '/enum/deleteEnumById'
        let params = {
          enumId: this.selectedArrStr
        }
        let response = (res) => {
          this.getList()
        }
        this.$store.state.getMoreDataDelete(url, params, response)
      }
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
  .operation_btn{
    margin-bottom: 10px;
  }
  .add_ipt{
    width: 250px;
    margin-left: 10px;
  }
  .title_{
    padding-bottom: 20px;
    margin-bottom: 10px;
    border-bottom: 1px solid #cccccc;
  }
  .operation_btn{
    margin-right: 10px;
  }
  .flex{
    display: flex;
    display: -webkit-flex;
    justify-content: flex-end;
    align-items: center;
  }
  .data_title{
    width: 100px;
  }
  .search_ipt{
    width: 150px;
    margin:0 10px;
  }
</style>
