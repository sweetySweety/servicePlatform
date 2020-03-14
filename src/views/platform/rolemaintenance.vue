<template>
    <div>
        <div class="title">条件搜索</div>
        <ul class="flex">
            <li class="flex">
                角色代码
                <a-input placeholder="请输入角色代码" style="width:150px ;margin-left:10px;" v-model="roleId"/>
            </li>
            <li class="flex">
                角色名称
                <a-input placeholder="请输入角色名称"  style="width:150px;margin-left:10px;" v-model="roleName"/>
            </li >
            <li class="flex">
                角色描述
                <a-input placeholder="请输入角色描述"  style="width:150px;margin-left:10px;" v-model="roleRemark"/>
            </li>
            <a-button icon="search"  style="margin-right:10px; margin-left:20px;" type="primary" @click="searchRole">搜索角色</a-button>
            <a-button icon="close" @click="emptyIpt">清空</a-button>
        </ul>


        <div class="title" style="margin-top:20px;">所有角色</div>

        <div style="margin-bottom:20px">
            <a-button icon="plus"  style="margin-right:10px;" @click="add_open">新增</a-button>
            <a-button icon="edit"  style="margin-right:10px;"  @click="openchange" :disabled="ischangeone==0? true:false">修改</a-button>
            <a-button icon="delete"  style="margin-right:10px;" @click="showConfirm()" :disabled="ischoose==0?true:false">删除</a-button>
            <a-button icon="laptop"  style="margin-right:10px;" :disabled="ischangeone==0?true:false">权限分配</a-button>
        </div>
        <div >
            <a-table :rowSelection="rowSelection" :columns="columns" :dataSource="data" :pagination="{
          pageSize: pageSize,
          onShowSizeChange: onShowSizeChange,
          total: total,
          onChange: onpageChange}">
                <a slot="id" slot-scope="text" href="javascript:;">{{text}}</a>
            </a-table>
        </div>
        <a-modal
            :title="title"
             v-model="add_visible"
            @ok="roleAdd"
            okText="保存"
              keyboard:false
            cancelText="取消"
            width='450px'
            >
            <div>
              <div class="graybox">
                  <ul>
                    <li  class="flex"  style="margin-bottom:10px;">角色代码<a-input placeholder="请输入角色代码" style="width:250px ;margin-left:10px;"  v-model="id"/></li>
                    <li  class="flex"  style="margin-bottom:10px;">角色名称<a-input placeholder="请输入角色名称" style="width:250px ;margin-left:10px;"  v-model="name"/></li>
                    <li  class="flex"  style="margin-bottom:10px;">角色描述<a-input placeholder="请输入角色描述" style="width:250px ;margin-left:10px;"  v-model="remark"/></li>
                  </ul>
              </div>
            </div>
        </a-modal>
    </div>
</template>

<script>
import { getAllRole,addRole,delRole} from "../../api/interface"
const columns = [{
  title: '角色代码',
  dataIndex: 'id',
  scopedSlots: { customRender: 'id' },
}, {
  title: '角色名称',
  dataIndex: 'name',
}, {
  title: '角色号码',
  dataIndex: 'remark',
}];

export default {
  data() {
    return {
      columns,
      data:[],
      id:'',
      name:'',
      remark:'',
      add_visible: false,
      delArray:'',
      ischangeone:0,
      title:'新增角色',
      ischoose:0,
      pageSize: 5,
      currentPage: 1,
      total: 7,
      roleId: '',
      roleName: '',
      roleRemark: ''

    }
  },
 computed: {
    rowSelection() {//表格选择计算属性
      var  self = this;
      const { selectedRowKeys } = this;
      return {
        onChange: (selectedRowKeys, selectedRows) => {//点击选择框
          if(selectedRows.length == 0){
            self.ischoose = 0;
          }else{
            self.ischoose = 1;
          }
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
          self.delArray= '';
          for(var i in selectedRows){
              self.delArray += selectedRows[i].id + ',';//选中的选项值拼成字符串
          }
          console.log(self.delArray)
          if(selectedRows.length == 1){//如果只选了一个的时候
              this.ischangeone = 1;
              this.id = selectedRows[0].id;
              this.name = selectedRows[0].name;
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
 mounted(){
   var self = this;
    getAllRole({
        pageNo: this.currentPage,
        rowNo : this.pageSize
      }).then(res => {
      if(res.returnCode==200){
          self.data = res.data.row;
          self.total = res.data.resultCount
      }
    });
 },
  methods: {//具体方法
    emptyIpt(){
      this.roleName = '';
      this.roleId = '';
      this.roleRemark = '';
    },
    // 切换分页
    onpageChange (pageNumber) {
      let pageSize = this.pageSize
      this.currentPage = pageNumber
      this.getAllRole(pageNumber, pageSize)
    },
    // 改变size
    onShowSizeChange (current, pageSize) {
      console.log(current, pageSize)
    },
   openchange(){//打开修改角色的框
      this.title= '修改角色'
      this.add_visible = true;
    },
    showConfirm() {//询问是否删除
      var self = this;
        self.$confirm({
          title: '是否确认要删除?',
          content: '按下确认后，所选内容将在1秒钟后删除',
          okText:'确认',
          cancelText:'取消',
            keyboard:false,
          onOk() {
            self.roleDelete();//确认删除
            return new Promise((resolve, reject) => {
              setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
            }).catch(() => console.log('Oops errors!'));
          },
          onCancel() {},
        });


    },
    add_open(){//打开新增角色弹窗
      this.add_visible = true;
      this.id = '';
      this.name = '';
      this.remark = ''
    },
    roleDelete(){
      var self = this;
      var tmp = self.delArray;
      tmp = tmp.substring(0,tmp.length-1);
      delRole({
        roleId:tmp
      }).then(res=>{
          console.log(res)
          setTimeout(function(){
            getAllRole({
              pageNo: '1',
              pageSize :'10'
            }).then(res => {
                self.data = res.data;//更新数据
            });
          },1000)
      })
    },
    roleAdd(){//点击保存新增角色
      var self = this;
      addRole({
        id:self.id,
        name:self.name,
        remark:self.remark
      }).then(res => {
        if(res.returnCode==200){
            self.add_visible=false;//添加完毕关闭弹窗
            setTimeout(function(){
              getAllRole({
                pageNo: '1',
                pageSize :'10'
              }).then(res => {
                  self.data = res.data;//更新数据
              });
            },100)
        }
      });
    },
    searchRole(){
      let url = '/role/query';
      let params = {
        roleId: this.roleId,
        name: this.roleName,
        remark: this.roleRemark
      };
      let response = (res) => {
        this.data = res.data
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
