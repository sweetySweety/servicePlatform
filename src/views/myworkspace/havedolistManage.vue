<template>
  <div>
    <div class="title" style="margin-top:20px;">已办任务列表</div>

    <div style="margin-bottom:20px">
      <a-row type="flex" justify="space-between">
        <a-col :span="16"><a-button icon="delete"  style="margin-right:10px;" @click="showDeleteConfirm">删除</a-button>
          <a-button icon="search"  style="margin-right:10px;">查看流程</a-button>
          <a-button icon="search"  style="margin-right:10px;">新查看流程</a-button>
          <a-button icon="search"  style="margin-right:10px;"  @click="openInfo">查看详情</a-button></a-col>
        <a-col :span="8" style="text-align: right">
          <a-button disabled="true"  style="margin-right:10px; background:green; color:#fff;">已完成的流程</a-button>
          <a-button disabled="true"style="margin-right:10px; background:red; color:#fff;">未完成的流程</a-button>
        </a-col>
      </a-row>


    </div>
    <div >
      <a-table :rowClassName="rowColor" :rowSelection="rowSelection" :columns="columns" :dataSource="data" :pagination="{
          pageSize: pageSize,
          onShowSizeChange: onShowSizeChange,
          total: total,
          onChange: onChange}">
        <a slot="name" slot-scope="text" href="javascript:;">{{text}}</a>
      </a-table>
    </div>

  </div>
</template>

<script>

  import ARow from 'ant-design-vue/es/grid/Row'
  import ACol from 'ant-design-vue/es/grid/Col'
  const columns = [{
    title: '任务ID',
    dataIndex: 'id',
  }, {
    title: '任务名称',
    dataIndex: 'name',
  }, {
    title: '交易码',
    dataIndex: 'ecode',
  },{
    title: '接口名称',
    dataIndex: 'interName',
  },{
    title: '接口ID',
    dataIndex: 'interfaceId',
  },{
    title: '所属系统',
    dataIndex: 'systemId',
  },{
    title: '服务场景码',
    dataIndex: 'serviceId',
  }
    ,{
      title: '处理人',
      dataIndex: 'assignee',
    }
    ,{
      title: '优先级',
      dataIndex: 'priority',
    },{
      title: '创建时间',
      dataIndex: 'createTime',
    }
    ,{
      title: '描述',
      dataIndex: 'desc',
    }
  ];
  const data = [{
    id: '1',
    name: 'John Brown',
    ecode: 32,
    isEnd: 1,
    address: 'serviceId',
  }, {
    id: '2',
    name: 'John Brown',
    ecode: 32,
    isEnd: 0,
    address: 'serviceId',
  }, {
    id: '3',
    name: 'John Brown',
    ecode: 32,
    isEnd: 1,
    address: 'serviceId',
  }];
  export default {
    components: {ACol, ARow},
    data() {
      return {
        data,
        columns,
        selectedIds:'',
        showDistributionMsg: false,
        selectedPersonId: '',
        pageSize: 5,
        currentPage: 1,
        total: 7
      }
    },
    computed: {
      rowSelection() {
        const { selectedRowKeys } = this;
        return {
          onChange: (selectedRowKeys, selectedRows) => {
            console.log('selectedRowKeys:', selectedRowKeys, 'selectedRows: ', selectedRows);
            let idArr = []
            selectedRows.map((item) =>{
              idArr.push(item.key)
            })
            this.selectedIds = idArr.join();

            console.log(this.selectedIds)
          },
          getCheckboxProps: record => ({
            props: {
              disabled: record.name === 'Disabled User', // Column configuration not to be checked
              name: record.name,
            }
          }),
        }
      }
    },
    methods: {
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
      rowColor (record, index) {
        console.log(record, index)
        if(record.isEnd == 1){
          return 'greenBg'
        }else{
          return 'redBg'
        }
      },
      // 获取列表
      getList () {
        let url = '/process/finishTask';
        let params = {
          pageNo: this.currentPage,
          rowNo: this.pageSize
        };
        let response = (res) => {
          this.data = res.data;
        };

        this.$store.state.getMoreDataPost(url,params,response)
      },
      openInfo(){// 触发父组件事件
        this.$emit('goInfo', '')
      },
      // 分配操作
      handleDistribution () {
        this.showDistributionMsg = false;

        let url = '';
        let params = {};
        let response = () => {

        };

        this.$store.state.getMoreDataStringPost(url,params,response)
      },
      // 删除提醒
      showDeleteConfirm() {
        let ids = this.selectedIds
        if(ids){
          this.$confirm({
            title: '提醒',
            content: '确定要删除该待办事宜吗？',
            okText: '确定',
            okType: '',
            cancelText: '取消',
            onOk() {
              this.handleDelete()
            },
            onCancel() {
              console.log('Cancel');
            },
          });
        }else{
          this.$message.info('您未选中任何操作项');
        }
      },
      // 删除操作
      handleDelete(){
        let url = '/process/delete';
        let params = {
          taskId: this.selectedIds
        };
        let response = () => {

        };

        this.$store.state.getMoreDataStringPost(url,params,response)
      }
    },
    mounted () {
      this.getList();
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .redBg{
    background: red;
  }
  .greenBg{
    background: green;
  }
</style>
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
