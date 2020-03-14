<template>
    <div>
        <div class="title">条件搜索</div>
        <ul class="flex">
            <li class="flex">
                中文名称
                <a-input placeholder="请输入中文名称" style="width:150px ;margin-left:10px;" v-model="searchCnName"/>
            </li>
            <li class="flex">
                名称
                <a-input placeholder="请输入名称"  style="width:150px;margin-left:10px;" v-model="searchName"/>
            </li>
             <li class="flex">
                说明
                <a-input placeholder="请输入说明"  style="width:150px;margin-left:10px;" v-model="searchdesc"/>
            </li>
              <a-button icon="search"  style="margin-right:10px;" type="primary" @click="getAllattr">查询</a-button>
        </ul>


        <div class="title" style="margin-top:20px;">字段处理办法</div>

        <div style="margin-bottom:20px">
            <a-button icon="plus"  style="margin-right:10px;" @click="open">新增</a-button>
            <a-button icon="edit"  style="margin-right:10px;" @click="edit" :disabled="ischangeone==0? true:false">修改</a-button>
            <a-button icon="delete"  style="margin-right:10px;" @click="showConfirm" :disabled="ischoose==0?true:false">删除</a-button>
        </div>
        <div >
            <a-table :pagination="{
          pageSize: pageSize,
          onShowSizeChange: onShowSizeChange,
          total: total,
          onChange: onChange}" :rowSelection="rowSelection" :columns="columns" :dataSource="data" >
               <!-- <editable-cell :text="text" @change="onCellChange(record.key, 'name', $event)"/> -->
                <!-- <a slot="name" slot-scope="text" href="javascript:;">{{text}}</a> -->
              <a slot="name" slot-scope="text" href="javascript:;">{{text}}</a>

              <span slot="action" slot-scope="text,record">
                <a href="javascript:;" @click="addParams(record.id)" >[添加参数]</a>
                <a-divider type="vertical" />
                <a href="javascript:;" @click="editParams(record.id)">[修改参数]</a>
              </span>
            </a-table>
        </div>
    <!--这里是添加字段参数的弹窗-->
          <a-modal
          title="添加参数"
          v-model="addnewParams"
          @ok="saveAttr"
          okText="保存"
          cancelText="取消"
        >
         <ul>
           <li class="flex" style="margin-bottom:10px;justify-content:flex-end;width:85%;">
             参数名称：  <a-input placeholder="请输入参数名称" style="width:250px ;margin-left:10px;0 " v-model="parmName"/>
           </li>
           <li class="flex" style="margin-bottom:10px;justify-content:flex-end ;width:85%; ">
             默认值： <a-input placeholder="请输入默认值" style="width:250px ;margin-left:10px;" v-model="defaultValue"/>
           </li>
           <li class="flex" style="margin-bottom:10px;justify-content:flex-end ;width:85%;">
             序号：  <a-input placeholder="请输入序号" style="width:250px ;margin-left:10px;" v-model="xNo"/>
           </li>
            <li class="flex" style="margin-bottom:10px;justify-content:flex-end ;width:85%;">
             描述：  <a-input placeholder="请输入描述" style="width:250px ;margin-left:10px;" v-model="paramDesc"/>
           </li>
         </ul>
        </a-modal>


    <!--这里是添加字段的弹窗-->

          <a-modal
          :title="title"
          v-model="add_visible"
          @ok="save"
          okText="保存"
          cancelText="取消"
        >
         <ul>
           <li class="flex" style="margin-bottom:10px;justify-content:flex-end;width:85%;">
             中文名称：  <a-input placeholder="请输入中文名称" style="width:250px ;margin-left:10px;0 " v-model="chineseName"/>
           </li>
           <li class="flex" style="margin-bottom:10px;justify-content:flex-end ;width:85%; ">
             名称：  <a-input placeholder="请输入名称" style="width:250px ;margin-left:10px;" v-model="name"/>
           </li>
           <li class="flex" style="margin-bottom:10px;justify-content:flex-end ;width:85%;  ">
             描述：  <a-input placeholder="请输入描述" style="width:250px ;margin-left:10px;" v-model="desc"/>
           </li>

         </ul>
        </a-modal>

        <a-modal
          title="参数列表"
          v-model="attrPshow"
          :footer="null"
        >

          <div style="margin-bottom:10px;">
            <a-button icon="close" @click="delParams">删除</a-button>

          </div>
           <a-table :rowSelection="rowSelection" :columns="attrColumns" :dataSource="attrData" >
              <a slot="attrParamName" slot-scope="text" href="javascript:;">{{text}}</a>
            </a-table>
        </a-modal>
    </div>
</template>

<script>

import {addAttr,findAttr,attFuncParam,deleteAttr,getParams} from "../../api/interface"
// import EditableCell from './EditableCell'
const columns = [{
  title: '中文名称',
  dataIndex: 'funcName',
  scopedSlots: { customRender: 'funcName' },
}, {
  title: '名称',
  dataIndex: 'name',
}, {
  title: '参数',
  dataIndex: 'params',
},{
  title: '说明',
  dataIndex: 'des',
},{
  title: '操作',
  key: 'action',
  scopedSlots: { customRender: 'action' },
}];

const attrColumns = [{
  title: '参数名称',
  dataIndex: 'attrParamName',
  scopedSlots: { customRender: 'attrParamName' },
},{
  title: '默认值',
  dataIndex: 'defaultValue',
},
{
  title: '排序',
  dataIndex: 'no',
},
{
  title: '说明',
  dataIndex: 'explain',
}
]

export default {
  data() {
    return {
      data:[],//表格数据
      attrData:[],//字段表格数据
      columns,
      attrColumns,
      title:'',
      add_visible:false,//控制弹窗显示的变量
      chineseName:'',
      name:'',
      desc:'',
      attrPshow:false,
      //查询绑定
      searchCnName:'',
      searchName:'',
      searchdesc:'',
      ischangeone:0,
      ischoose:0,
      delArray:'',
      addnewParams:false,//新增字段弹窗控制
      //增添字段对应值
      parmName:'',
      defaultValue:'',
      xNo:'',
      paramDesc:'',
      attFunctionId:'',
      pageSize: 5,
      currentPage: 1,
      total: 7,
      isEdit: 0
    }
  },
  //  components: {
  //   EditableCell,
  // },
  created(){
    this.getAllattr()
  },
 computed: {
    rowSelection() {
      var self = this;
      const { selectedRowKeys } = this;
      return {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
          if(selectedRows.length == 0){
            self.ischoose = 0;
          }else{
            self.ischoose = 1;
          }
           self.delArray= '';
          for(var i in selectedRows){
              self.delArray += selectedRows[i].id + ',';//选中的选项值拼成字符串
          }
          console.log(self.delArray)
          if(selectedRows.length == 1){//如果只选了一个的时候
              this.ischangeone = 1;
              // this.id = selectedRows[0].id;
              // this.name = selectedRows[0].name;
              self.chineseName = selectedRows[0].funcName
              self.name=selectedRows[0].name
              self.desc=selectedRows[0].des
          }else{
            this.ischangeone = 0;
          }

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
      this.getLogList(pageNumber, pageSize)
    },
    // 改变size
    onShowSizeChange (current, pageSize) {
      console.log(current, pageSize)
    },
    // 显示新增弹窗
    open(){
      let self = this;
      this.add_visible = true;
      self.chineseName=''
      self.name=''
      self.desc=''
      this.isEdit = 0
      this.title = '新增字段'
    },
    getAllattr(){
      var self = this;
      findAttr({
        pageNo:this.currentPage,
        pageSize:this.pageSize,
        name:self.searchCnName,
        funcName:self.searchName,
        des:self.searchdesc
      }).then(res=>{
          if(res.returnCode==200){
            self.data = res.data.rows;
            self.total = res.data.total
          }
      })
    },
    // 获取参数列表
    getAllattrParams(id){
      var self = this;
      getParams({
        attFunctionId:id
      }).then(res=>{
          if(res.returnCode==200){
            self.attrData = res.data;
          }
      })
    },
    edit(){
      this.add_visible = true;
      this.title = '修改字段';
      this.isEdit = 1
    },
    // 打开添加字段参数弹窗
    addParams(id){
      this.addnewParams = true;
      this.parmName = '';
      this.defaultValue = '';
      this.xNo = '';
      this.paramDesc = '';
      this.attFunctionId = id;
      this.title = '新增参数';
    },
    editParams(id){
      this.attrPshow = true;
      this.title = '修改参数';
      this.getAllattrParams(id);
    },
    // 删除参数
    delParams(){
      var self = this;
      var tmp = self.delArray;
      tmp = tmp.substring(0,tmp.length-1);//去除字符串最后面的逗号
      let url = '/attFuncParam/deletes';
      let params = {attFuncParamIds:tmp};
      let response = (res) => {
        //获取参数列表
        this.getAllattrParams(tmp)
      };

      this.$store.state.getMoreDataDelete(url,params,response)

    },
    saveAttr(){//添加参数
      var self =this;
      attFuncParam({//添加参数方法
        name:this.parmName,
        defaultValue:this.defaultValue,
        seq:this.xNo,
        funcId:this.attFunctionId
      }).then(res=>{
        if(res.returnCode == 200){//添加成功
          //更新下表格
          self.addnewParams = false;
          self.getAllattr();
          //self.getAllattrParams(this.attFunctionId)
        }
      })
    },
    //修改字段
    editSubmit(){
      let self = this;
      let tmp = self.delArray;
      tmp = tmp.substring(0,tmp.length-1);//去除字符串最后面的逗号
      let url = '/attFunction/modify';
      let params = {
        'id': tmp,
        "name":this.name,
        "funcName":this.chineseName,
        "des":this.desc
      };
      let response = (res) =>{
        self.add_visible = false;

        self.getAllattr();
      };

      this.$store.state.getMoreDataPost(url,params,response)
    },
    // 新增或者修改
    save(){
      let isEdit = this.isEdit;
      if(isEdit == 0){
        let self =this;
        addAttr({//添加字段方法
          name:self.name,
          funcName:self.chineseName,
          des:self.desc
          //attFunction:JSON.stringify(attrJson)
        }).then(res=>{
          if(res.returnCode==200){//添加成功
            //更新下表格
            self.add_visible = false;

            self.getAllattr();
          }
        })
      } else {
        this.editSubmit();
      }

    },

    attrDelete(){//用户删除方法
      var self = this;
      var tmp = self.delArray;
      tmp = tmp.substring(0,tmp.length-1);//去除字符串最后面的逗号
      deleteAttr({
        functionIds:tmp
      }).then(res=>{
          console.log(res)
          setTimeout(function(){
              self.getAllattr();
          },1000)
      })
    },
     showConfirm() {//删除
      var self = this;
      this.$confirm({
        title: '提示',
        content: '确定要删除选中数据？',
        onOk() {
          self.attrDelete();
          return new Promise((resolve, reject) => {
            setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
          }).catch(() => console.log('Oops errors!'));
        },
        onCancel() {},
      });
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
