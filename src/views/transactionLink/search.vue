<template>
    <div>
        <a-modal
      title="导入调用关系"
      v-model="visible"
      @ok="handleOk"
    >
      <div>
        导入excel
        
      </div>
    </a-modal>
        <div class="title">条件搜索</div>
        <ul class="flex">
            <li class="flex">
                接口ID
                <a-input placeholder="请输入接口ID" style="width:150px ;margin-left:10px;"/>
            </li>
            <li class="flex">
                交易名称
                <a-input placeholder="请输入交易名称"  style="width:150px;margin-left:10px;"/>
            </li >
            <li class="flex">
                服务码
                <a-input placeholder="请输入服务码"  style="width:150px;margin-left:10px;"/>
            </li>
             <li class="flex">
                服务名称
                <a-input placeholder="请输入服务名称"  style="width:150px;margin-left:10px;"/>
            </li>
            <a-button icon="search"  style="margin-right:10px; margin-left:20px;" type="primary">搜索</a-button>
        </ul>  


        <div class="title" style="margin-top:20px;">交易节点</div>
            
        <div style="margin-bottom:20px">
            <a-button icon="search"  style="margin-right:10px;" @click="preview">预览</a-button>
            <a-button icon="edit"    style="margin-right:10px;">血缘分析</a-button>
            <a-button icon="delete"  style="margin-right:10px;">导出调用关系</a-button>
            <a-button icon="laptop"  style="margin-right:10px;" @click="showModal">导入调用关系</a-button>
            <a-button icon="laptop"  style="margin-right:10px;" @click="preserve">节点维护</a-button>
        </div>
        <div >
            <a-table :rowSelection="rowSelection" :columns="columns" :dataSource="data" >
                <a slot="j_id" slot-scope="text" href="javascript:;">{{text}}</a>
            </a-table>
        </div>
        <a-modal 
         title="预览节点"
          width='1100px'
         :visible="vfd_show"
          keyboard:false
          footer:false
        >
             <vfd></vfd>
        </a-modal>
 
    </div>
</template>

<script>

    import vfd from 'vfd'

const columns = [
  {
    title: '接口ID',
    dataIndex: 'j_id',
    scopedSlots: { customRender: 'j_id' },
  }, 
  {
    title: '交易代码',
    dataIndex: 'j_code',
  }, 
  {
    title: '交易名称',
    dataIndex: 'j_name',
  },
  {
    title: '服务码',
    dataIndex: 's_num',
  },
  {
    title: '服务名称',
    dataIndex: 's_name',
  },
  {
    title: '场景码',
    dataIndex: 'v_num',
  },
  {
    title: '场景名称',
    dataIndex: 'v_name',
  },
  {
    title: '调用类型',
    dataIndex: 'u_cate',
  }
];
const data = [{
  key: '1',
  j_id: 'EPP0001',
  j_code:'E150',
  j_name:'生成MAC',
  s_num:'60120000002',
  s_name:'安全验证信息管理',
  v_num:'01',
  v_name:'生成MAC',
  u_cate:'	调用类型 ',
  // j_cate:''

},{
  key: '2',
  j_id: 'EPP0002',
  j_code:'E112',
  j_name:'导入对称密钥',
  s_num:'60120000002',
  s_name:'安全验证信息管理',
  v_num:'01',
  v_name:'生成MAC',
  u_cate:'	调用类型 ',
  // j_cate:''

}];
export default {
  data() {
    return {
      data,
      columns,
      visible: false,
      vfd_show:false
    }
  },
  components:{
        vfd
  },
 computed: {
    rowSelection() {
      const { selectedRowKeys } = this;
      return {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        // getCheckboxProps: record => ({
        //   props: {
        //     disabled: record.name === 'Disabled User', // Column configuration not to be checked
        //     name: record.name,  
        //   }
        // }),
      }
    }
 },
  methods: {
    showModal(){
      this.visible = true
    },
    handleOk(e) {
      console.log(e);
      this.visible = false
    },
    preserve(){
      console.log('节点维护');
      this.$emit('createP','我要创建一个东西')
    },
    preview(){
      console.log('预览');
      // this.$emit('createV','我要创建一个东西
      this.vfd_show = true;
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
