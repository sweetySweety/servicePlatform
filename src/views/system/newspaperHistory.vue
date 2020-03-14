<template>
  <div>
    <div class="title">报文头历史</div>
    <div>
      <a-table :pagination="{
          pageSize: pageSize,
          onShowSizeChange: onShowSizeChange,
          total: total,
          onChange: onPageChange}" :customRow="customClick" :columns="columns" :dataSource="data" >
        <template slot="operation" slot-scope="text, record">
          <a-button icon="download" @click="idaHistory(record)">idaHis</a-button>
          <a-button icon="download" @click="idaThan(record)">ida对比</a-button>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script>
  const columns = [{
    title: '报文头名称',
    dataIndex: 'headName'
  }, {
    title: '报文头描述',
    dataIndex: 'headDesc',
  }, {
    title: '报文头备注',
    dataIndex: 'headRemark',
  },{
    title: '版本号',
    dataIndex: 'version.code',
  },{
    title: '状态',
    dataIndex: 'status',
  },{
    title: '操作',
    dataIndex: 'operation',
    scopedSlots: { customRender: 'operation' }
  }];
  const data = [];
  export default {
    props:['headId'],
    data() {
      return {
        data,
        columns,
        currentPage: 1,
        pageSize: 10,
        total: 10,
        headId: this.headId
      }
    },
    mounted(){
      this.searchheadMsgList();
    },
    methods: {
      // 切换分页
      onPageChange (pageNumber) {
        this.currentPage = pageNumber
        this.searchheadMsgList();
      },
      // 改变size
      onShowSizeChange (current, pageSize) {
        console.log(current, pageSize)
      },
      // 导出记录
      expertHeadMsg(record){
        let url = '/excelExporter/exportHeadModifRecord';
        let params = {
          headId: record.headId
        };
        let response = (res) => {
          this.searchheadMsgList();
        };

        this.$store.state.getMoreDataPost(url,params,response);
      },
      // 历史弹窗
      idaHistory(record){
        let url = '/idaHis/headIdaHisTree';
        let params = {
          headId: record.headId
        };
        let response = (res) => {
          let obj = res.data;

        };

        this.$store.state.getMoreDataStringPost(url,params,response)
      },
      // 对比弹窗
      idaThan(record){
        let url = '/version/getHeadIdaDiff';
        let params = {
          type: record.versionId,
          versionId: record.versionId,
          autoId1: record.versionId,
          autoId2: record.versionId
        };
        let response = (res) => {
          let obj = res.data;

        };

        this.$store.state.getMoreDataStringPost(url,params,response)
      },
      // 获取报文头历史列表
      searchheadMsgList(){
        let url = '/interfaceHeadHis/history';
        let params = {
          headId: this.headId
        };
        let response = (res) => {
          let obj = res.data;
          this.data = obj.row;
          this.total = obj.resultCount;
        };

        this.$store.state.getMoreDataStringPost(url,params,response)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .operation_btn{
    margin: 0 10px 10px 0;
  }
  .iptTitle{
    width: 100px;
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
