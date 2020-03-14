<template>
  <div>
    <div class="content_ content_top">
      <div class="title_">条件搜索</div>
      <a-row type="flex" justify="start" align="middle">
        <a-col :span="4" class="flex">
          <div class="data_title">元数据名称</div>
          <a-input class="data_ipt" v-model="metadataId"></a-input>
        </a-col>
        <a-col :span="4" class="flex">
          <div class="data_title">中文名称</div>
          <a-input class="data_ipt" v-model="chineseName"></a-input>
        </a-col>
        <a-col :span="4" class="flex">
          <div class="data_title">类别词</div>
          <a-input class="data_ipt" v-model="categoryWordId"></a-input>
        </a-col>
        <a-col :span="4" class="flex">
          <div class="data_title">创建人</div>
          <a-input class="data_ipt" v-model="optUser"></a-input>
        </a-col>
        <a-col :span="6" class="ali_right">
          <a-button icon="search" @click="goSearch">搜索</a-button>
          <a-button icon="close" @click="emptyIpt">清空</a-button>
        </a-col>
      </a-row>
    </div>

    <div class="content_ content_bottom">
      <div class="title_">待审核的元数据</div>

      <div class="scroll_table_border">
        <a-table :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}" :pagination="{
          pageSize: pageSize,
          onShowSizeChange: onShowSizeChange,
          total: total,
          onChange: onChange}" :columns="columns" :dataSource="data" ></a-table>
      </div>
      <div>
        <a-button icon="check" :disabled="canClick" @click="verifyPass">审核通过</a-button>
        <a-button icon="close" :disabled="canClick" @click="verifyFail">审核不通过</a-button>
      </div>
    </div>
  </div>
</template>

<script>
  import '../../../api/interface'
  const columns = [{
    title: '元数据名称',
    dataIndex: 'metadataId'
  }, {
    title: '中文名称',
    dataIndex: 'chineseName'
  }, {
    title: '英文全称',
    dataIndex: 'metadataName'
  },{
    title: '类别词',
    dataIndex: 'cateword'
  },{
    title: '类型',
    dataIndex: 'metaType'
  },{
    title: '长度',
    dataIndex: 'length'
  },{
    title: '精度',
    dataIndex: 'scale'
  },{
    title: '数据项分类',
    dataIndex: 'dataCategory'
  },{
    title: '状态',
    dataIndex: 'status'
  },{
    title: '操作用户',
    dataIndex: 'optUser'
  },{
    title: '操作时间',
    dataIndex: 'optDate'
  },{
    title: '备注',
    dataIndex: 'remark'
  },{
    title: '默认值',
    dataIndex: 'defaultValue'
  }];

  let data = [
    {
      optUser: '1234',
      optDate: '1234',
      remark: 'jjjjjjjjjjjjjjjjdxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
      defaultValue: '1234'
    }
  ]

  export default {
    name: 'dataReview',
    data () {
      return {
        data,
        columns,
        selectedRowKeys: [],
        selectedArrStr: '',
        pageSize: 5,
        currentPage: 1,
        total: 7,
        state: '',
        auditRemark: '',
        // 搜索字段
        metadataId: '',
        metadataName: '',
        chineseName: '',
        metadataAlias: '',
        status: '',
        version: '',
        optUser: '',
        startDate: '',
        endDate: '',
        categoryWordId: '',
        dataCategory: '',
        isVague: '',
        canClick: true // 是否可点击
      }
    },
    mounted () {
      this.getList()
      // this.data.map((item, index) => {
      //   this.$set(item, 'key', index)
      // })
    },
    methods: {
      // 通过审核
      verifyPass () {
        this.state = 1
        this.verifyOperation()
      },
      verifyOperation () {
        let url = '/metadataAudit/auditSave'
        let params = {
          state: this.state,
          auditRemark: this.auditRemark,
          metadataIds: this.selectedArrStr
        }
        let response = (res) => {
          this.$message.success('操作成功')
        }
        this.$store.state.getMoreDataStringPost(url, params, response)
      },
      // 未通过审核
      verifyFail () {
        this.state = 2
        this.verifyOperation()
      },
      // 搜索功能
      goSearch () {
        this.getList()
      },
      // 清空搜索框
      emptyIpt () {
        this.metadataId = ''
        this.chineseName = ''
        this.categoryWordId = ''
        this.optUser = ''
      },
      // 获取列表
      getList () {
        let url = '/metadataAudit/query'
        let params = {
          pageNo: this.currentPage,
          rowNo: this.pageSize,
          metadataId: this.metadataId,
          categoryWordId: this.categoryWordId,
          optUser: this.optUser,
          chineseName: this.chineseName
          //metadataName: this.metadataName,
          // metadataAlias: this.metadataAlias,
          // status: this.status,
          // version: this.version,
          // startDate: this.startDate,
          // endDate: this.endDate,
          // dataCategory: this.dataCategory,
          // isVague: this.isVague
        }
        let response = (res) => {
          // console.log(res.data.rows)
          let lists = res.data.row
          lists.map((item, index) => {
            this.$set(item, 'key', index)
          })
          this.data = lists
          this.total = res.data.resultCount
        }
        this.$store.state.getMoreDataPost(url, params, response)
      },
      // 切换分页
      onChange (pageNumber) {
        //let pageSize = this.pageSize
        this.currentPage = pageNumber
        this.getLogList()
      },
      // 改变size
      onShowSizeChange (current, pageSize) {
        this.pageSize = pageSize
      },
      // checkbox操作
      onSelectChange (selectedRowKeys) {
        let idArr = []
        selectedRowKeys.map((item) => {
          idArr.push(this.data[item].metadataId)
        })
        this.selectedRowKeys = selectedRowKeys
        this.selectedArrStr = idArr.join()

        if (selectedRowKeys.length) {
          this.canClick = false
        } else {
          this.canClick = true
        }
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
  .title_{
    padding-bottom: 15px;
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
    width: 50%;
  }
  .data_ipt{
    width: 50%;
    margin-right: 10px;
  }
</style>
