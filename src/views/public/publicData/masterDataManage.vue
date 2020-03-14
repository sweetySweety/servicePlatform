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
          <a-input placeholder="请输入数据来源"  v-model="sDataSource" class="search_ipt"/>
        </a-col>
        <a-col :span="5" class="flex">
          <div class="data_title">代码版本</div>
          <a-input placeholder=""  v-model="sDataVersion" class="search_ipt"/>
        </a-col>
        <a-col :span="4">
          <a-button class="ant-btn-primary" @click="saveData">保存</a-button>
        </a-col>
      </a-row>
    </div>

    <div class="content_ content_bottom">
      <div class="title_">枚举列表</div>
      <div>
        <a-button icon="delete" class="operation_btn" @click="deleteOperation">删除</a-button>
        <a-button icon="plus" class="operation_btn" @click="showModel">新增</a-button>
<!--        <a-button icon="edit" class="operation_btn">维护</a-button>-->
<!--        <a-button icon="plus" class="operation_btn">枚举映射</a-button>-->
      </div>

      <div class="scroll_table_border">
        <a-table :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}" :pagination="{
          pageSize: pageSize,
          onShowSizeChange: onShowSizeChange,
          total: total,
          onChange: onChange}" :columns="columns" :dataSource="data" ></a-table>
      </div>

    </div>


    <a-modal
      title="新增枚举"
      v-model="addNewModel"
      @ok="add_submit"
      okText="保存"
      cancelText="取消"
    >
      <ul>
        <li class="flex" style="margin-bottom:10px;justify-content:flex-end ;width:85%; ">
          枚举名称：  <a-input placeholder="请输入名称" v-model="elementName" class="add_ipt"/>

        </li>
        <li class="flex" style="margin-bottom:10px;justify-content:flex-end ;width:85%; ">
          中文名称：  <a-input placeholder="请输入中文名称" v-model="remark" class="add_ipt"/>
        </li>
        <li class="flex" style="margin-bottom:10px;justify-content:flex-end ;width:85%; ">
          业务定义：  <a-input placeholder="请输入中文名称" v-model="bussDefine" class="add_ipt"/>
        </li>

        <li class="flex" style="margin-bottom:10px;justify-content:flex-end ;width:85%; ">
          备注：  <a-input placeholder="请输入中文名称" v-model="processId" class="add_ipt"/>
        </li>
      </ul>
    </a-modal>
  </div>
</template>

<script>
  const columns = [
    {
      title: '枚举名称',
      dataIndex: 'elementName'
    }, {
      title: '业务定义',
      dataIndex: 'bussDefine'
    }, {
      title: '中文名称',
      dataIndex: 'remark'
    }, {
      title: '修订人',
      dataIndex: 'optUser'
    }, {
      title: '修订时间',
      dataIndex: 'optDate'
    }
  ]

  let data = [
    {
      bussDefine: "ddd",
      elementId: "4028ab956f40e949016f417de4ba000b",
      elementName: "xx",
      enumId: "4028ab956f401542016f401cc43d0001",
      optDate: "2019-12-26 14:33:55",
      optUser: "admin",
      processId: "ff",
      remark: "cc"
    }
  ]

  export default {
    name: 'dataReview',
    props: [
      'enumId'
    ],
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
        addNewModel: false, // 显示新增弹窗
        currentenumId: this.enumId, // 主代码id
        // currentslaveId: this.slaveId, // 从代码id
        // 新增枚举
        elementName: '',
        remark: '',
        bussDefine: '',
        processId: '',
        //enumId: '',
        // 新增枚举 end
        // save 参数 start
        sDataName: '',
        sDataIsStandard: '',
        sDataSource: '',
        sDataStatus: '',
        sDataRemark: '',
        sDataVersion: ''
        // save 参数 end

      }
    },
    mounted () {
      this.getList()
      this.getDataInfo()
    },
    methods: {
      showModel () {
        this.addNewModel = true
      },
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
      // 保存主代码
      saveData () {
        let url = '/enum/saveEnum'
        let params = {
          id: this.currentenumId,
          name: this.sDataName,
          isStandard: this.sDataIsStandard,
          dataSource: this.sDataSource,
          status: this.sDataStatus,
          version: this.sDataVersion,
          remark: this.sDataRemark
          // processId: this.processId
        }
        let response = (res) => {
          this.$message.success('保存成功')
        }
        this.$store.state.getMoreDataPost(url, params, response)
      },
      // 新增枚举
      add_submit () {
        let url = '/enum/addElement'

        let params = {
          elementName: this.elementName,
          remark: this.remark,
          bussDefine: this.bussDefine,
          processId: this.processId,
          enumId: this.currentenumId
        }
        let response = (res) => {
          this.getList()
          this.addNewModel = false
        }
        this.$store.state.getMoreDataPost(url, params, response)
      },
      // 获取枚举列表
      getList () {
        // console.log(this.currentenumId)
        let url = '/enum/getElementByMasterId'
        let params = {
          enumId: this.currentenumId,
          page: this.currentPage,
          rows: this.pageSize
        }
        let response = (res) => {
          let lists = res.data.rows
          lists.map((item, index) => {
            this.$set(item, 'key', index)
          })
          this.data = lists
          this.total = res.data.total
        }
        this.$store.state.getMoreDataGet(url, params, response)
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
      },
      // 删除操作
      deleteOperation () {
        let url = '/enum/deleteEnumElements'
        let params = {
          list: this.selectedArrStr
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
    margin-right: 10px;
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
    margin: 0 10px 10px 0;
  }
</style>
