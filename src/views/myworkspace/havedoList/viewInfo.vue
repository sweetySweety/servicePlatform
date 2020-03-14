<template>
  <div>
    <div class="title" style="margin-top:20px;">任务详情</div>
    <div>
      <a-table :rowSelection="rowSelection" :columns="columns" :dataSource="data" >
        <a slot="name" slot-scope="text" href="javascript:;">{{text}}</a>
      </a-table>
    </div>
    <a-modal title="分配" okText="分配" cancelText="取消" v-model="showDistributionMsg" @ok="handleDistribution">
      <a-form>
        <a-form-item label="下节点处理人" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          <a-select
            v-decorator="[
          '下节点处理人',
          { rules: [{ required: true, message: 'Please select your gender!' }] },
        ]"
            placeholder="Select a option and change input text above"
            v-model="selectedPersonId"
          >
            <a-select-option value="male">
              male
            </a-select-option>
            <a-select-option value="female">
              female
            </a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
const columns = [{
  title: '任务ID',
  dataIndex: 'name',
  scopedSlots: { customRender: 'name' },
}, {
  title: '任务名称',
  dataIndex: 'age',
}, {
  title: '交易码',
  dataIndex: 'address',
},{
  title: '交易名称',
  dataIndex: 'address2',
},{
  title: '接口ID',
  dataIndex: 'address3',
},{
  title: '所属系统',
  dataIndex: 'address4',
},{
  title: '服务场景码',
  dataIndex: 'address5',
}
,{
  title: '处理人',
  dataIndex: 'address6',
}
,{
  title: '优先级',
  dataIndex: 'address7',
},{
  title: '创建时间',
  dataIndex: 'address9',
}
,{
  title: '描述',
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
  key: '4',
  name: 'Joe Black',
  age: 32,
  address: '测试测试k',
}];
export default {

  data() {
    return {
        data,
      columns,
      selectedIds:'',
      showDistributionMsg: false,
      selectedPersonId: ''
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
    goTo(){
          this.$router.push({ path: "/platform" });
    },
    // 显示分配弹框
    showDistribution(){
      this.showDistributionMsg = true;
    },
    // 分配操作
    handleDistribution () {
      this.showDistributionMsg = false;
      console.log(this.selectedPersonId)
      let url = '';
      let params = {};
      let response = () => {

      };

      this.$store.state.getMoreDataStringPost(url,params,response)
    }
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
