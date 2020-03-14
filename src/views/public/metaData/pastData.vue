<template>
  <div>
    <div class="content_ content_top">
      <div class="title_">条件搜索</div>
      <a-row type="flex" justify="start" align="middle">
        <a-col :span="5" class="flex">
          <div class="data_title">元数据名称</div>
          <a-input class="data_ipt" v-model="dataName"></a-input>
        </a-col>
        <a-col :span="5" class="flex">
          <div class="data_title">中文名称</div>
          <a-input class="data_ipt" v-model="chineseName"></a-input>
        </a-col>
        <a-col :span="5" class="flex">
          <div class="data_title">类别词</div>
          <a-input class="data_ipt" v-model="dataWord"></a-input>
        </a-col>
        <a-col :span="5" class="flex">
          <div class="data_title">创建人</div>
          <a-input class="data_ipt" v-model="user"></a-input>
        </a-col>
      </a-row>
      <a-row style="margin-top: 10px" type="flex" justify="start" align="middle">
        <a-col :span="5" class="flex">
          <div class="data_title">创建起始日期</div>
          <a-date-picker class="data_ipt" @change="startonChange"  placeholder="选择日期" />
        </a-col>
        <a-col :span="5" class="flex">
          <div class="data_title">创建结束日期</div>
          <a-date-picker class="data_ipt" @change="endonChange"  placeholder="选择日期" />
        </a-col>
        <a-col :span="6" class="ali_right">
          <a-button icon="search" @click="goSearch">搜索</a-button>
          <a-button icon="close" @click="emptyIpt">清空</a-button>
        </a-col>
      </a-row>
    </div>

    <div class="content_ content_bottom">
      <div class="title_">过时元数据</div>

      <div class="scroll_table_border">
        <a-table :pagination="{
          pageSize: pageSize,
          onShowSizeChange: onShowSizeChange,
          total: total,
          onChange: onChange}" :columns="columns" :dataSource="data" ></a-table>
<!--        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"-->
      </div>

    </div>
  </div>
</template>

<script>
  import '../../../api/interface'
  import ARow from 'ant-design-vue/es/grid/Row'
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
    components: {ARow},
    data () {
      return {
        data,
        columns,
        selectedRowKeys: [],
        selectedArrStr: '',
        pageSize: 5,
        currentPage: 1,
        total: 7,
        dataName: '',
        chineseName: '',
        dataWord: '',
        user: '',
        endDate: '',
        startDate: ''
      }
    },
    mounted () {
      let pageNo = this.currentPage
      let pageSize = this.pageSize
      this.getList(pageNo, pageSize)
    },
    methods: {
      // 搜索功能
      goSearch () {
        let pageNo = this.currentPage
        let pageSize = this.pageSize
        this.getList(pageNo, pageSize)
      },
      emptyIpt () {
        this.dataName = ''
        this.chineseName = ''
        this.dataWord = ''
        this.user = ''
        this.endDate = ''
        this.startDate = ''
      },
      startonChange (date, dateString) {
        this.startDate = dateString
      },
      endonChange (date, dateString) {
        this.endDate = dateString
      },
      // 获取列表
      getList (pageNo, pageSize) {
        let self = this
        let url = '/metadataHis/query'
        let params = {
          'pageNo': pageNo,
          'rowNo': pageSize,
          'metadataId': '',
          'metadataName': self.dataName,
          'chineseName': self.chineseName,
          'metadataAlias': '',
          'status': '',
          'version': '',
          'optUser': self.user,
          'startDate': self.startDate,
          'endDate': self.endDate,
          'categoryWordId': self.dataWord,
          'dataCategory': ''
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
        let pageSize = this.pageSize
        this.currentPage = pageNumber
        this.getList(pageNumber, pageSize)
      },
      // 改变size
      onShowSizeChange (current, pageSize) {
        console.log(current, pageSize)
      },
      // checkbox操作
      onSelectChange (selectedRowKeys) {
        let idArr = []
        selectedRowKeys.map((item) => {
          idArr.push(this.data[item].metadataId)
        })
        this.selectedRowKeys = selectedRowKeys
        this.selectedArrStr = idArr.join()
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
