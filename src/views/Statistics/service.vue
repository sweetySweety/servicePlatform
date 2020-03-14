<template>
    <div>
      <a-tabs defaultActiveKey="1" @change="callback">
        <a-tab-pane tab="系统服务统计" key="1">
          <div class="title">条件搜索</div>
            <ul class="flex">
                <li class="flex">
                    系统编号 
                    <a-input placeholder="请输入机构代码" v-model="systemId" style="width:150px ;margin-left:10px;"/>
                </li>
                <li class="flex">
                    系统名称
                    <a-select placeholder="请输入机构名称" v-model="systemChineseName" style="width:150px ;margin-left:10px;" @change="systemDataChange">
                      <a-select-option v-for="systemName in systemData" :key="systemName.sysId" @click="systemDataClick(systemName.chineseName)">{{systemName.chineseName}}</a-select-option>
                    </a-select>
                </li>
                <li class="flex">
                    服务类型
                    <a-select placeholder="请输入服务类型" v-model="typename" style="width:150px;margin-left:10px;" @change="ststemTypeChange">
                      <a-select-option  :key="1">调用方</a-select-option>
                      <a-select-option  :key="0">提供方</a-select-option>
                    </a-select>
                </li>
                  <a-button icon="search"  style="margin-right:10px;" type="primary"  @click="inquire">查询</a-button>
                  <a-button icon="delete"  style="margin-right:10px;" type="primary"  @click="empty">清空</a-button>
            </ul>  
            <div class="title" style="margin-top:20px;">操作视图</div>
            <div style="margin-bottom:20px">
                <a-button icon="download"  style="margin-right:10px;" @click="expertData">导出excel</a-button>
            </div>
            <div >
                <a-table :rowSelection="rowSelection" :columns="columns" :dataSource="data" >
                    <a slot="name" slot-scope="text" href="javascript:;">{{text}}</a>
                </a-table>
            </div>
        </a-tab-pane>
        <a-tab-pane tab="服务类统计" key="2">
          <div>
              <a-table :columns="columns1" :dataSource="data1">
                  <a slot="name" slot-scope="text" href="javascript:;">{{text}}</a>
              </a-table>
          </div>
        </a-tab-pane>
      </a-tabs>

        
    </div>
</template>

<script>
//系统复用率
const columns = [{
  title: '系统编码',
  dataIndex: 'systemId',
}, {
  title: '系统名称',
  dataIndex: 'systemChineseName',
}, {
  title: '类型',
  dataIndex: 'type',
},{
  title: '服务数',
  dataIndex: 'serviceNum',
}];
const columns1 = [
  {
    title: '服务类',
    dataIndex: 'text',
    width:"25%"
  },
  {
    title: '服务类编码',
    dataIndex: 'id',
  },
  {
    title: '关联服务数',
    dataIndex: 'append2',
  }
];
export default {
  data() {
    return {
        data:[],//系统复用率
        data1:[],//服务复用率
        systemData:[],//系统信息
        systemId:"",//系统编号
        type:"",//系统类型
        systemChineseName:"",//系统名称
        cnname:"",
        typename:"",
        columns,
        columns1,
    }
  },
 computed: {
    rowSelection() {
      const { selectedRowKeys } = this;
      return {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
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
 mounted(){
   //查询系统复用率
   this.systemReuseRate(1,1,null,null,null);
   //查询全部信息
   this.getSystemAll();
   //查询服务复用率
   this.serviceReuseRate();
 },
  methods: {
    goTo(){
          this.$router.push({ path: "/platform" });
    },
    //查询系统复用率
    systemReuseRate (pageNo,rowNo,systemId,type,systemName) {
      let url = '/statistics/systemReuseRate'
      let params = {
        pageNo: pageNo,
        rowNo: rowNo,
        systemId: systemId,
        type: type,
        systemName: systemName,
      }
      let response = (res) => {
        let lists = res.data.row
        lists.map((item, index) => {
          this.$set(item, 'key', index)
        })
        this.data = lists
      }
      this.$store.state.getMoreDataGet(url, params, response)
    },
    //查询全部信息
    getSystemAll () {
      let url = '/system/getSystemAlls'
      let params = {
        
      }
      let response = (res) => {
        let lists = res.data 
        lists.map((item, index) => {
          this.$set(item, 'key', index)
        })
        this.systemData = lists
      }
      this.$store.state.getMoreDataGet(url, params, response)
    },
    systemDataChange(value) {
      this.systemId = value
    },
    ststemTypeChange(value) {
      this.type = value
    },
    systemDataClick(value){
      this.cnname = value
    },
    //搜索
    inquire(){
       this.systemReuseRate (1,1,this.systemId,this.type,this.cnname) 
    },
    // 清空操作
    empty () {
      this.systemId = ""
      this.type = ""
      this.typename = ""
      this.systemChineseName = ""
      this.cnname = ""
    },
    // 导出数据
      expertData () {
        let url = '/excelExporter/exportSystemReuserate'
        let params = {"listVO":[{
            "systemId":"302030",
            "systemChineseName":"统一支付",
            "type":"0",
            "resueOperationNum":"1",
            "operationNum":"1",
            "operationInvokeNum":"1",
            "serviceNum":"1",
            "operationReleaseNum":"1",
            "serviceReleaseNum":"1",
            "useNum":"1",
            "reuseRate":"1",
            "sum":"1"
          }]
        }
        let response = (res) => {
          this.$message.success('导出成功')
        }

        this.$store.state.getMoreDataGet(url, params, response)
      },
      //查询服务复用率
    serviceReuseRate () {
      let url = '/statistics/serviceReuseRate'
      let params = {}
      let response = (res) => {
        let lists = res.data
        this.data1 = lists
      }
      this.$store.state.getMoreDataGet(url, params, response)
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
.ant-tabs-tabpane-active{border: 0}
</style>
