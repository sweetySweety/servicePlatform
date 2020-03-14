<template>
    <div>


        <div class="title" style="margin-top:20px;">流程模板</div>

        <div style="margin-bottom:20px">
            <a-button icon="edit"  style="margin-right:10px;" @click="handleOpen">部署</a-button>
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
  title: '流程模板',
  dataIndex: 'name',
},
];
const data = [{
  key: '1',
  name: 'dddee'
}, {
  key: '2',
  name: 'dddee'

}, {
  key: '3',
  name: 'dddee'

}, {
  key: '4',
  name: 'dddee'
}];
export default {

  data() {

    return {
        data,
      columns,
      selectedIds: ''
    }
  },
 computed: {
    rowSelection() {
      return {
        onChange: (selectedRowKeys, selectedRows) => {
          let idArr = []
          selectedRows.map((item) =>{
            idArr.push(item.key)
          })
          this.selectedIds = idArr.join();
        },
        getCheckboxProps: record => ({
          props: {
            disabled: record.name === 'Disabled User', // Column configuration not to be checked
            name: record.name
          }
        }),
      }
    }
 },
  methods: {
    // 获取列表
    getList () {
      let url = '';
      let params = {};
      let response = () => {

      };

      this.$store.state.getMoreDataGet(url,params,response)
    },
    // 部署操作
    handleOpen () {
      let url = '/process/list';
      let params = {
        processName: this.selectedIds
      };
      let response = (res) => {
        this.data = res.rows
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
