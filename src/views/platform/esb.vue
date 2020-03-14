<template>
    <div>

        <div class="title" style="margin-top:20px;">所有ESB应用服务器</div>

        <div style="margin-bottom:20px">
            <a-button icon="plus"  style="margin-right:10px;" @click="open">新增</a-button>
            <a-button icon="edit"  style="margin-right:10px;" @click="edit" :disabled="ischangeone==0? true:false">修改</a-button>
            <a-button icon="delete"  style="margin-right:10px;" @click="showConfirm" :disabled="ischoose==0? true:false">删除</a-button>
        </div>
        <div >
            <a-table :rowSelection="rowSelection" :columns="columns" :dataSource="data" >
                <a slot="name" slot-scope="text" href="javascript:;">{{text}}</a>
            </a-table>
        </div>

          <a-modal
          :title="title"
          v-model="add_visible"
          @ok="addesb_Server"
          okText="保存"
          cancelText="取消"
        >
         <ul>
           <li class="flex" style="margin-bottom:10px;justify-content:flex-end;width:85%;  ">
             服务器名称：  <a-input placeholder="请输入服务器名称" style="width:250px ;margin-left:10px;0 " v-model="serverName"/>
           </li>
           <li class="flex" style="margin-bottom:10px;justify-content:flex-end ;width:85%; ">
            服务器IP：  <a-input placeholder="请输入服务器IP" style="width:250px ;margin-left:10px;" v-model="serverIp"/>
           </li>
           <li class="flex" style="margin-bottom:10px;justify-content:flex-end ;width:85%;  ">
             服务器用户：  <a-input placeholder="请输入服务器用户" style="width:250px ;margin-left:10px;" v-model="userName"/>
           </li>
            <li class="flex" style="margin-bottom:10px;justify-content:flex-end ;width:85%;  ">
             用户密码： <a-input placeholder="请输入用户密码" style="width:250px ;margin-left:10px;" v-model="userPsw"/>
           </li>
            <li class="flex" style="margin-bottom:10px;justify-content:flex-end ;width:85%;  ">
             in端路径：  <a-input placeholder="请输入in端路径" style="width:250px ;margin-left:10px;" v-model="inConfigPath"/>
           </li>
            <li class="flex" style="margin-bottom:10px;justify-content:flex-end ;width:85%;  ">
             out端路径：  <a-input placeholder="请输入out端路径" style="width:250px ;margin-left:10px;" v-model="outConfigPath"/>
           </li>
           <li class="flex" style="margin-bottom:10px;justify-content:flex-end ;width:85%;  ">
             备注：  <a-input placeholder="请输入备注" style="width:250px ;margin-left:10px;" v-model="remark"/>
           </li>
         </ul>
        </a-modal>
    </div>
</template>

<script>

import { getServerList ,addesbServer ,delesbServer } from "../../api/interface"

const columns = [{
  title: '服务器名称',
  dataIndex: 'serverName',
  scopedSlots: { customRender: 'serverName' },
}, {
  title: 'IP地址',
  dataIndex: 'serverIp',
}, {
  title: '用户',
  dataIndex: 'userName',
},{
  title: 'in端路径',
  dataIndex: 'inConfigPath',
},{
  title: 'out端路径',
  dataIndex: 'outConfigPath',
},{
  title: '状态',
  dataIndex: 'state',
},{
  title: '备注',
  dataIndex: 'remark',
}];

export default {

  data() {

    return {
        title:'新增服务器',
        data:[],//表格数据
        columns,
        add_visible:false,//控制弹窗显示的变量
        serverName:"",
        serverIp:"",
        userName:"",
        userPsw:"",
        inConfigPath:"",
        outConfigPath:"",
        remark:"",
        ischoose:0,
        delArray:'',
        ischangeone:0,
        isEdit: 0
    }
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
              self.delArray += selectedRows[i].serverId + ',';
          }
           if(selectedRows.length == 1){//这里是获取选中的行的数据（为了修改）
            self.ischangeone = 1;//只选了一个
            self.serverName = selectedRows[0].serverName;
            self.serverIp = selectedRows[0].serverIp;
            self.userName = selectedRows[0].userName;
            self.userPsw = selectedRows[0].userPsw;
            self.inConfigPath = selectedRows[0].inConfigPath;
            self.outConfigPath = selectedRows[0].outConfigPath;
            self.remark = selectedRows[0].remark;
          }else{
            self.ischangeone = 0;
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
 created(){
     this.getServer_List();
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
            self.delesb_Server();
            return new Promise((resolve, reject) => {
              setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
            }).catch(() => console.log('Oops errors!'));
          },
          onCancel() {},
        });
    },
    open(){
      this.isEdit = 0;
        this.add_visible = true;
        this.title="新增服务器";
        serverName="";
        serverIp="";
        userName="";
        userPsw="";
        inConfigPath="";
        outConfigPath="";
        remark="";
    },
    edit(){
        this.isEdit = 1;
        this.add_visible = true;
        this.title="修改服务器";
    },
    empty_ipt(){
        let self = this;
      self.serverName = '';
      self.serverIp = '';
      self.userName = '';
      self.userPsw = '';
      self.inConfigPath = '';
      self.outConfigPath = '';
      self.remark = '';
    },
    addesb_Server(){
        var self = this;
        if(this.isEdit == 1){
          this.edit_esb()
        }else{
          addesbServer({//添加服务器
            serverName:self.serverName,
            serverIp:self.serverIp,
            userName:self.userName,
            userPsw:self.userPsw,
            inConfigPath:self.inConfigPath,
            outConfigPath:self.outConfigPath,
            remark:self.remark
          }).then(res=>{
            if(res.returnCode == 200){
              self.add_visible = false;
              self.getServer_List();
              this.empty_ipt()
            }

          });
        }

    },
    edit_esb(){
      let self = this;
      let tmp = self.delArray;
      tmp = tmp.substring(0,tmp.length-1);
       let url = '/esbServer/saveEdit';
       let params = {
         serverId: tmp,
         serverName:self.serverName,
         serverIp:self.serverIp,
         userName:self.userName,
         userPsw:self.userPsw,
         inConfigPath:self.inConfigPath,
         outConfigPath:self.outConfigPath,
         remark:self.remark
       };
       let response = (res) =>{
         self.add_visible = false;
         self.getServer_List();
         this.empty_ipt()
       };

       this.$store.state.getMoreDataPost(url,params,response)
    },
    delesb_Server(){//根据id删除服务器,支持批量删除
        var self = this;
        var tmp = self.delArray;
        tmp = tmp.substring(0,tmp.length-1);
        delesbServer({
            serverId:tmp
        }).then(res=>{
            if(res.returnCode==200){//删除成功
                self.getServer_List();// 再更新下列表
            }
        });
    },
    getServer_List(){
        getServerList().then(res=>{
            this.data =  res.data
        });
    },
    save(){
      var attrJson = [
        {
         "name":this.name,
          "funcName":this.chineseName,
          "des":this.desc,
        }
      ];

      addAttr({
        name:this.name,
        funcName:this.chineseName,
        des:this.desc,
        attFunction:attrJson
      }).then(res=>{
        if(res.returnCode==200){//添加成功
          //更新下表格
        }
      })
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
