<template>
    <div>
        <div class="title">版本信息</div>
        <ul class="flex" style="flex-wrap:wrap">
            <li class="flex">
                基线版本号
                <a-input placeholder="请输入服务代码" style="width:150px ;margin-left:10px;"/>
            </li>
            <li class="flex">
                 版本描述		
                <a-input placeholder="请输入中文名称"  style="width:150px;margin-left:10px;"/>
            </li>
             <li class="flex">
                服务名称
                <a-input placeholder="请输入类别词"  style="width:150px;margin-left:10px;"/>
            </li>
            <li class="flex">
               场景代码	
                <a-input placeholder="请输入数据项分类"  style="width:150px;margin-left:10px;"/>
            </li>
            <li class="flex">
                场景名称
                <a-input placeholder="请输入创建人"  style="width:150px;margin-left:10px;"/>
            </li>
            
            
              <a-button icon="search"  style="margin-right:10px;" type="primary">查询</a-button>
              <a-button icon="delete"  style="margin-right:10px;" type="primary">清空</a-button>


        </ul>  


        <div class="title" style="margin-top:20px;">工作项发布清单(服务定义)</div>
        
        <div style="margin-bottom:20px">
           
        </div>
    
        <div >
            <a-table  :columns="columns" :dataSource="data" >
                <a slot="s_num" slot-scope="text" href="javascript:;">{{text}}</a>
            </a-table>
        </div>
    </div>
</template>

<script>
const columns = [{
  title: '服务代码',
  dataIndex: 's_num',
  scopedSlots: { customRender: 's_num' },
}, {
  title: '服务名称',
  dataIndex: 's_name',
}, {
  title: '服务场景',
  dataIndex: 's_sence',
},{
  title: '服务场景名称',
  dataIndex: 's_sencename',
},{
  title: '修订类型',
  dataIndex: 's_sencedescribe',
},{
  title: '发布用户',
  dataIndex: 'letuser',
},{
  title: '发布时间',
  dataIndex: 'lettime',
},
{
  title: '发布说明',
  dataIndex: 'letexplain',
},

{
  title: '版本号',
  dataIndex: 'version',
}];
const data = [{
  s_num: '50120000002',
  s_name: '通用短信发送管理',
  s_sence: '01',
  s_sencename: '通用短信发送',
  s_sencedescribe:'本场景用于查询对公或个人客户的风险等级与理财产品是否匹配。',
  letuser:'yaofana',
  lettime:'2019-09-04 16:13:51',
  letexplain:' 同意!',
  version:'1.1.0'
},{
  s_num: '20130000001',
  s_name: '客户签约信息查询',
  s_sence: '01',
  s_sencename: '商户签约信息查询',
  s_sencedescribe:'本场景用于查询对公或个人客户的风险等级与理财产品是否匹配。',
  letuser:'lirongg',
  lettime:'2019-09-04 16:13:51',
  letexplain:' 同意!',
  version:'1.1.0'
}];
export default {

  data() {

    return {
        data,
      columns,
      add_newenglish:false
    }
  },
 computed: {
    // rowSelection() {
    //   const { selectedRowKeys } = this;
    //   return {
    //     onChange: (selectedRowKeys, selectedRows) => {
    //       console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    //     },
    //     getCheckboxProps: record => ({
    //       props: {
    //         disabled: record.name === 'Disabled User', // Column configuration not to be checked
    //         name: record.name,
    //       }
    //     }),
    //   }
    // }
 },
  destroyed: function () {
           console.log("我已经离开了！");
 },
  methods: {
    goTo(){
          this.$router.push({ path: "/platform" });
    },
    addnew(){
        this.add_newenglish =  true;
    },
      handleOk(e) {
      this.ModalText = 'The modal will be closed after two seconds';
      this.confirmLoading = true;
      setTimeout(() => {
        this.visible = false;
        this.confirmLoading = false;
      }, 2000);
    },
    handleCancel(e) {
      console.log('Clicked cancel button');
      this.visible = false
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
    margin-bottom: 10px;
}

.table-operations {
  margin-bottom: 16px;
}

.table-operations > button {
  margin-right: 8px;
}
</style>
