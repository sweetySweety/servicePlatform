<template>
<div> <div style="background-color: #fafafa; padding: 20px;">
    <a-row :gutter="16">
      <a-col :span="8">
        <a-card title="交易属性" :bordered=false>
          <ul>
              <li class="flex">
                <div style="width:100px"> 交易码</div>
                 <a-input type="text" style="width:150px ;margin-left:5px;"></a-input>
              </li>
               <li class="flex">
                 <div style="width:100px">交易名称</div>
                 <a-input type="text" style="width:150px ;margin-left:5px;"></a-input>
              </li>
               <li class="flex">
                <div style="width:100px"> 服务码</div>
                 <a-input type="text" style="width:150px ;margin-left:5px;"></a-input>
              </li>
               <li class="flex">
                 <div style="width:100px">服务名称</div>
                 <a-input type="text" style="width:150px ;margin-left:5px;"></a-input>
              </li>
               <li class="flex">
                <div style="width:100px"> 场景码</div>
                 <a-input type="text" style="width:150px ;margin-left:5px;"></a-input>
              </li>
                 <li class="flex">
                 <div style="width:100px">场景名称</div>
                 <a-input type="text" style="width:150px ;margin-left:5px;"></a-input>
              </li>
                 <li class="flex">
                 <div style="width:100px">调用类型</div>
                 <a-input type="text" style="width:150px ;margin-left:5px;"></a-input>
              </li>
          </ul>
          
        </a-card>
      </a-col>
      <a-col :span="8">
        <a-card title="节点属性" :bordered=false>
          <ul>
               <li class="flex">
                <div style="width:100px">节点类型</div>
                <a-input type="text" style="width:150px ;margin-left:5px;"></a-input>
              </li>
                <li class="flex">
                <div style="width:100px"> 交易属性标识</div>
                <a-input type="text" style="width:150px ;margin-left:5px;"></a-input>
              </li>
                <li class="flex">
                 <div style="width:100px">节点业务分类</div>
                <a-input type="text" style="width:150px ;margin-left:5px;"></a-input>
              </li>
                <li class="flex">
                 <div style="width:100px">节点状态</div>
                <a-input type="text" style="width:150px ;margin-left:5px;"></a-input>
              </li>
              <li>
                  <a-button icon="save"    style="margin-right:10px;">保存</a-button>
              </li>
          </ul>
        </a-card> 
      </a-col>
      <a-col :span="8">
        <a-card title="节点依赖属性" :bordered=false>
            <ul>
               <li class="flex">
                <div style="width:100px">ESB调节方式</div>
                <a-input type="text" style="width:150px ;margin-left:5px;"></a-input>
              </li>
              <li class="flex">
                <div style="width:100px">条件位</div>
                <a-input type="text" style="width:150px ;margin-left:5px;"></a-input>
              </li>
              <li class="flex">
                <div style="width:100px">条件信息</div>
                <a-input type="text" style="width:150px ;margin-left:5px;"></a-input>
              </li>
               <li>
                  <a-button icon="save"    style="margin-right:10px;">保存</a-button>
              </li>
            </ul>
        </a-card>   
      </a-col>
    </a-row>
 
  </div>
         <div class="title" style="margin-top:20px;">相邻节点</div>
            
        <div style="margin-bottom:20px">
            <a-button icon="search"  style="margin-right:10px;">添加</a-button>
            <a-button icon="edit"    style="margin-right:10px;">删除</a-button>
        </div>
        <div >
            <a-table :rowSelection="rowSelection" :columns="columns" :dataSource="data" >
                <a slot="j_id" slot-scope="text" href="javascript:;">{{text}}</a>
            </a-table>
        </div>
</div>
   
  
</template>
<script>
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
export default ({
    data() {
    return {
      data,
      columns,
      visible: false,
    }
  },

    
})
</script>
<style scoped>
.flex{
    display:flex;
    display:-webkit-flex;
}
li{
    list-style: none;
    margin-bottom: 10px;
}
.title{
    font-size: 20px;
    font-weight: bold;
    margin-bottom:20px;
}
</style>