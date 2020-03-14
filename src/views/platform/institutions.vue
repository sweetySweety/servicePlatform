<template>
    <div>
        <div class="title">条件搜索</div>
        <ul class="flex">
            <li class="flex">
                机构代码
                <a-input placeholder="请输入机构代码" style="width:150px ;margin-left:10px;" v-model="org_no"/>
            </li>
            <li class="flex">
                机构名称
                <a-input placeholder="请输入机构名称"  style="width:150px;margin-left:10px;" v-model="org_callname"/>
            </li>
            <a-button icon="search"  style="margin-right:10px;" type="primary" @click="searchbyid">查询</a-button>
        </ul>
        <div class="title" style="margin-top:20px;">所有机构</div>
        <div style="margin-bottom:20px">
            <a-button icon="plus"  style="margin-right:10px;" @click="addOrgmodoal">新增</a-button>
            <a-button icon="edit"  style="margin-right:10px;" @click="openchange" :disabled="ischangeone==0? true:false">修改</a-button>
            <a-button icon="delete"  style="margin-right:10px;" @click="showConfirm" :disabled="ischoose==0?true:false">删除</a-button>
        </div>
        <div >
            <a-table :rowSelection="rowSelection" :columns="columns" :dataSource="data" >
                <a slot="orgId" slot-scope="text" href="javascript:;">{{text}}</a>
            </a-table>
        </div>
         <a-modal
          :title="title"
          v-model="add_visible"
          @ok="addins()"
            okText="保存"
            cancelText="取消"
        >
         <ul>
           <li class="flex" style="margin-bottom:10px;justify-content:flex-end;width:85%;">
             机构代码：  <a-input placeholder="请输入机构代码" style="width:250px ;margin-left:10px;" v-model.number="orgId"/>
           </li>
           <li class="flex" style="margin-bottom:10px;justify-content:flex-end ;width:85%;">
             机构名称：  <a-input placeholder="请输入机构名称" style="width:250px ;margin-left:10px;" v-model="orgName"/>
           </li>
           <li class="flex" style="margin-bottom:10px;justify-content:flex-end ;width:85%;">
             机构分类上级：  <a-input placeholder="请输入机构分类上级" style="width:250px ;margin-left:10px;" v-model="orgAB"/>
           </li>
           <li class="flex" style="margin-bottom:10px;justify-content:flex-end ;width:85%;">
             机构状态：  <a-input placeholder="请输入机构状态" style="width:250px ;margin-left:10px;" v-model="orgStatus"/>
           </li>
           <li class="flex" style="margin-bottom:10px;justify-content:flex-end ;width:85%;">
             机构负责人：  <a-input placeholder="请输入机构负责人" style="width:250px ;margin-left:10px;" v-model="orgResponsibility"/>
           </li>
           <li class="flex" style="margin-bottom:10px;justify-content:flex-end ;width:85%;">
             机构备注：  <a-input placeholder="请输入机构备注" style="width:250px ;margin-left:10px;" v-model="orgRemark"/>
           </li>
         </ul>
        </a-modal>

    </div>
</template>

<script>
import { addOrg,editOrg,msearchOrg,getAllOrg,deleteOrg,isearchOrg,getByID,getByName } from "../../api/interface"

const columns = [{
  title: '机构代码',
  dataIndex: 'orgId',
  scopedSlots: { customRender: 'orgId' },
}, {
  title: '机构名称',
  dataIndex: 'orgName',
}, {
  title: '机构分类上级',
  dataIndex: 'orgAB',
},{
  title: '机构状态',
  dataIndex: 'orgStatus',
},{
  title: '机构负责人',
  dataIndex: 'orgResponsibility',
},{
  title: '机构备注',
  dataIndex: 'orgRemark',
}];
export default {
  data() {
    return {
      data:[],
      columns,
      add_visible:false,
      title:'新增机构',
      ischangeone:0,
      orgId:'',
      orgName:'',
      orgAB:'',
      orgStatus:'',
      orgResponsibility:'',
      orgRemark:'',
      delArray:'',
      //搜索
      org_no:'',
      org_callname:'',
      addclick:0,
      editclick:0,
      ischoose:0
    }
  },
  created(){
     this.allorglist();//获取所有机构列表
  },
 computed: {
    rowSelection() {
      var  self = this;
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
              self.delArray += selectedRows[i].orgId + ',';
          }
          if(selectedRows.length == 1){//这里是获取选中的行的数据（为了修改）
            self.ischangeone = 1;//只选了一个
            self.orgId = selectedRows[0].orgId;
            self.orgName = selectedRows[0].orgName;
            self.orgAB = selectedRows[0].orgAB;
            self.orgStatus = selectedRows[0].orgStatus;
            self.orgResponsibility = selectedRows[0].orgResponsibility;
            self.orgRemark = selectedRows[0].orgRemark;
          }else{
            self.ischangeone = 0;
          }
          console.log(self.delArray);
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
  mounted(){
  },
  methods: {
    showConfirm() {//询问是否删除
      var self = this;
        this.$confirm({
          title: '是否确认要删除?',
          content: '按下确认后，所选内容将在1秒钟后删除',
          okText:'确认',
          cancelText:'取消',
          keyboard:false,
          onOk() {
            self.del();
            return new Promise((resolve, reject) => {
              setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
            }).catch(() => console.log('Oops errors!'));
          },
          onCancel() {},
        });

    },
    del(){//删除所选机构
      var self = this;
      var tmp = self.delArray;
      tmp = tmp.substring(0,tmp.length-1);
      deleteOrg({
            "orgId":tmp
      }).then(res => {
          setTimeout(function(){
            self.allorglist();
          },100)
        }
      )
    },
    openchange(){//打开修改机构的框
      this.title= '修改机构'
      this.add_visible = true;
      this.editclick = 1;
      this.addclick = 0;
    },
    allorglist(){//获取机构列表
      var self = this;
      getAllOrg({
            "pageNo": "1",
            "pageSize" :"10"
      }).then(res => {
            self.data = res.data.rows;
        });
    },
    addOrgmodoal(){//打开新增机构的弹窗
      this.add_visible = true;
       this.title= '新增机构' ;
       this.orgId = '';
       this.orgName = '';
       this.orgAB = '';
       this.orgStatus = '';
       this.orgResponsibility = '';
       this.orgRemark = '';
        this.editclick = 0;
        this.addclick = 1;
    },
    addins(){//点击保存按钮新增机构或者修改按钮
      // getByID({//校验机构id
      //       "orgId":this.orgNo,
      //       "orgName":this.orgName,
      //       "orgAB":this.orgAB,
      //       "orgStatus":this.orgStatus,
      //       "orgResponsibility":this.orgResponsibility,
      //       "orgRemark":this.orgRemark
      //   }).then(res => {
      //     if(res.returnCode == 100){//机构id已经存在
      //         this.$notification.open({
      //           message: '机构id已经存在',
      //           description: '已有机构id，请勿重复添加',
      //           onClick: () => {
      //             console.log('Notification Clicked!');

      //           },
      //         });
      //         localStorage.setItem('idcheck',1);
      //     }else{
      //       localStorage.setItem('idcheck',0)
      //     }
      //   }
      // )

      // getByName({//校验机构名称
      //       "name":this.orgName
      //   }).then(res => {
      //     if(res.returnCode == 100){//机构id已经存在
      //         this.$notification.open({
      //           message: '机构名称已经存在',
      //           description: '已有机构名称，请勿重复添加',
      //           onClick: () => {
      //             console.log('Notification Clicked!');
      //           },
      //         });
      //             localStorage.setItem('namecheck',1);

      //     }else{
      //       localStorage.setItem('namecheck',0)

      //     }
      //   }
      // )
      // setTimeout(function(){
      //   if( localStorage.getItem('idcheck')== 0&& localStorage.getItem('namecheck')==0){
        var self = this;
        if(self.addclick ==1 && self.editclick==0){//如果是新增
           addOrg({
                orgId:self.orgId,
                orgName:self.orgName,
                orgAB:self.orgAB,
                orgStatus:self.orgStatus,
                orgResponsibility:self.orgResponsibility,
                orgRemark:self.orgRemark
            }).then(res => {
              if(res.returnCode==200){
                self.add_visible=false;
                setTimeout(function(){
                    self.allorglist();
                },100)
              }
            });
        }else if(self.addclick ==0 && self.editclick==1){
          editOrg({//如果是编辑
              orgId:self.orgId,
              orgName:self.orgName,
              orgAB:self.orgAB,
              orgStatus:self.orgStatus,
              orgResponsibility:self.orgResponsibility,
              orgRemark:self.orgRemark
          }).then(res=>{
              if(res.returnCode==200){
                self.add_visible=false;
                setTimeout(function(){
                    self.allorglist();
                },100)
              }
          })
        }

      //   }
      // },100)
    },
    searchbyid(){//点击搜索按钮进行查询
      var self = this;
      msearchOrg ({
        orgId:this.org_no,
        orgName:this.org_callname
      }).then(res => {
          console.log(res);
          if(res.returnCode == 200){//查询成功
              let result = res.data
            self.data = result
          }else if(res.returnCode == 404){
            let result = res.data
            self.data = result
          }
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
