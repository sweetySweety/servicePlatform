<template>
    <div>
        <div class="title">条件搜索</div>
        <ul class="flex">
            <li class="flex">
                系统ID 
                <a-input placeholder="请输入机构代码" style="width:150px ;margin-left:10px;"/>
            </li>
                 <li class="flex">
                中文名称
                <a-input placeholder="请输入机构名称"  style="width:150px;margin-left:10px;"/>
            </li>
                 <li class="flex">
                系统简称
                <a-input placeholder="请输入机构名称"  style="width:150px;margin-left:10px;"/>
            </li>
                 <li class="flex">
                负责人1
                <a-input placeholder="请输入机构名称"  style="width:150px;margin-left:10px;"/>
            </li>
        </ul>
        <ul class="flex">
            <li class="flex">
                系统描述
                <a-input placeholder="请输入机构名称"  style="width:150px;margin-left:10px;"/>
            </li>
                 <li class="flex">
                系统协议
                <a-input placeholder="请输入机构名称"  style="width:150px;margin-left:10px;"/>
            </li>
            <li class="flex">
                负责人2
                <a-input placeholder="请输入机构名称"  style="width:150px;margin-left:10px;"/>
            </li>
              <a-button icon="search"  style="margin-right:10px;" type="primary">查询</a-button>
              <a-button icon="search"  style="margin-right:10px;" type="primary">清空</a-button>
        </ul>  


        <div class="title" style="margin-top:20px;">系统基本信息维护</div>
        
        <div style="margin-bottom:20px">
            <a-button icon="edit"  style="margin-right:10px;">新增</a-button>
            <a-button icon="edit"  style="margin-right:10px;">修改</a-button>
            <a-button icon="delete"  style="margin-right:10px;">删除</a-button>
            <a-button icon="file"  style="margin-right:10px;">文件管理</a-button>
            <a-button icon="file"  style="margin-right:10px;">报文头管理</a-button>
            <a-button icon="file"  style="margin-right:10px;">系统详细信息管理</a-button>
            <a-button icon="file"  style="margin-right:10px;">协议管理</a-button>
        </div>
        <div >
            <a-table :rowSelection="rowSelection" :columns="columns" :dataSource="data" >
                <a slot="name" slot-scope="text" href="javascript:;">{{text}}</a>
            </a-table>
        </div>
    </div>
</template>

<script>
const columns = [{
  title: '协议名称',
  dataIndex: 'name',
  scopedSlots: { customRender: 'name' },
}, {
  title: '通讯协议',
  dataIndex: 'age',
}, {
  title: '报文类型',
  dataIndex: 'address',
},{
  title: '协议编码',
  dataIndex: 'address2',
},{
  title: '超时时间',
  dataIndex: 'address3',
},{
  title: '加密',
  dataIndex: 'address4',
},{
    title:'同步',
    dataIndex: 'address5',
},{
    title:'链接',
    dataIndex: 'address6',
},{
    title:'备注',
    dataIndex: 'address7',
},{
    title:'生成类',
    dataIndex: 'address8',
}
];
const data = [{
  key: '1',
  name: 'John Brown',
  age: 32,
  address: '测试测试k',
}, {
  key: '2',
  name: 'Jim Green',
  age: 42,
  address: '测试测试k',
}, {
  key: '3',
  name: 'Joe Black',
  age: 32,
  address: '测试测试k',
}, {
  key: '3',
  name: 'Joe Black',
  age: 32,
  address: '测试测试k',
}];
export default {

  data() {

    return {
        data,
      columns,
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
  methods: {
    goTo(){
          this.$router.push({ path: "/platform" });
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
</style>
