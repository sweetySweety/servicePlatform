<template>
  <div>
    <div class="title">报文头修订记录</div>
    <div>
      <a-table :pagination="{
          pageSize: pageSize,
          onShowSizeChange: onShowSizeChange,
          total: total,
          onChange: onPageChange}" :customRow="customClick" :columns="columns" :dataSource="data" >
        <template slot="operation" slot-scope="text, record">
          <a-button icon="download" @click="expertHeadMsg(record)">导出</a-button>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script>
  const columns = [{
    title: '当前版本号',
    dataIndex: 'headName'
  }, {
    title: '先前版本号',
    dataIndex: 'headDesc',
  }, {
    title: '修改时间',
    dataIndex: 'headRemark',
  },{
    title: '修订记录',
    dataIndex: 'version.code',
  },{
    title: '操作用户',
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

      // 获取报文头列表
      searchheadMsgList(){
        let url = '/version/getModifRecord';
        let params = {
          headId: this.headId
        };
        let response = (res) => {

          let obj = res.data;
          this.data = obj.row;
          this.total = obj.resultCount;
          console.log(obj.row)
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
