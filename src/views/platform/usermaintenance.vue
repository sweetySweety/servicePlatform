<template>
  <div>
    <div class="title">条件搜索</div>
    <ul class="flex">
      <li class="flex">
        用户代码
        <a-input placeholder="请输入用户代码" style="width:150px ;margin-left:10px;" v-model="search_id"/>
      </li>
      <li class="flex">
        用户名称
        <a-input placeholder="请输入用户名称"  style="width:150px;margin-left:10px;" v-model="search_name"/>
      </li >
      <li>
        所属机构
        <a-select style="width: 120px;margin-left:10px;"  @change="handlesearchOrgChange" v-model="search_org">
          <!-- <a-select-option v-for="(item,index) in select_valueList" :key="index">{{item.value}}</a-select-option> -->
          <a-select-option  v-for="(item,index) in orglist" :key="index" :value="item.orgId">{{item.orgName}}</a-select-option>
        </a-select>

      </li>
      <li class="flex">
        用户状态
        <a-select style="width: 120px;margin-left:10px;"  @change="handleSearchChange" v-model="search_state">
          <!-- <a-select-option v-for="(item,index) in select_valueList" :key="index">{{item.value}}</a-select-option> -->
          <a-select-option value="0" >正在使用</a-select-option>
          <a-select-option value="1">已经离职</a-select-option>
        </a-select>
        <a-button icon="search"  type="primary" style="margin-right:10px;margin-left:20px;" @click="searchUser">查询</a-button>
        <a-button icon="close" @click="clear">清空</a-button>
      </li>
    </ul>



    <div class="title" style="margin-top:20px;">所有用户</div>

    <div style="margin-bottom:20px">
      <a-button icon="plus"  style="margin-right:10px;"  @click="showModal">新增</a-button>
      <a-button icon="edit"  style="margin-right:10px;"  @click="openchange" :disabled="ischangeone==0? true:false">修改</a-button>
      <a-button icon="delete"  style="margin-right:10px;" @click="userDelete" :disabled="ischoose==0?true:false">删除</a-button>
      <a-button icon="laptop"  style="margin-right:10px;"  @click="changePass" :disabled="ischangepassone==0?true:false">修改密码</a-button>
      <a-button icon="laptop"  style="margin-right:10px;" :disabled="isintpassone==0?true:false" @click="init_pass">初始化密码</a-button>
    </div>
    <a-modal
      :title="title"
      :visible="visible"
      @ok="add_user"
      @cancel="handleCancel"
      okText="保存"
      cancelText="取消"
      width='1000px'
    >
      <div>
        <div class="graybox">
          <ul class="flex" style="width:100%; flex-wrap:wrap">
            <li class="flex" style="width:45%;margin-bottom:10px;justify-content:flex-end ">用户代码    <a-input placeholder="请输入用户代码" style="width:250px ;margin-left:10px;" v-model="user_id"/></li>
            <li  class="flex" style="width:45%;margin-bottom:10px;justify-content:flex-end">用户名称   <a-input placeholder="请输入用户代码" style="width:250px ;margin-left:10px;"  v-model="user_code"/></li>
            <li  class="flex" style="width:45%;margin-bottom:10px;justify-content:flex-end">手机号码   <a-input placeholder="请输入手机号码" style="width:250px ;margin-left:10px;"  v-model="cellphone"/></li>
            <li  class="flex" style="width:45%;margin-bottom:10px;justify-content:flex-end">电话号码   <a-input placeholder="请输入电话号码" style="width:250px ;margin-left:10px;"  v-model="telphone"/></li>
            <li  class="flex" style="width:45%;margin-bottom:10px;justify-content:flex-end">电子邮箱   <a-input placeholder="请输入电子邮箱" style="width:250px ;margin-left:10px;"  v-model="email"/></li>
            <li  class="flex" style="width:45%;margin-bottom:10px;justify-content:flex-end">
              所选机构
              <a-select  style="width: 250px;margin-left:10px;" @change="handleOrgChange" v-model="orgSelect">
                <a-select-option  v-for="(item,index) in orglist" :key="index" :value="item.orgId">{{item.orgName}}</a-select-option>
              </a-select>
            </li>
            <li  class="flex" style="width:45%;margin-bottom:10px;justify-content:flex-end">密码 <a-input placeholder="请输入密码" style="width:250px ;margin-left:10px;"  v-model="password"/></li>
            <li  class="flex" style="width:45%;margin-bottom:10px;justify-content:flex-end">状态
              <a-select defaultValue="" style="width: 250px;margin-left:10px;" @change="handleStateChange" v-model="stateSelect">
                <a-select-option value="0">正在使用</a-select-option>
                <a-select-option value="1">已经离职</a-select-option>
              </a-select>
            </li>
            <li  class="flex" style="width:45%;margin-bottom:10px;justify-content:flex-end">备注<a-input placeholder="请输入备注" style="width:250px ;margin-left:10px;" v-model="remark"/></li>
          </ul>
        </div>
        <div class="graybox">
          <a-table :rowSelection="lrowSelection" :columns="columns_modal" :dataSource="roleList">
            <a slot="name" slot-scope="text" href="javascript:;">{{text}}</a>
          </a-table>
        </div>
      </div>
    </a-modal>
    <a-modal
      title="修改密码"
      v-model="changepass_visible"
      @ok="c_pass"
      okText="保存"
      cancelText="取消"
    >
      <ul>
        <li class="flex" style="margin-bottom:10px;justify-content:flex-end;width:85%;  ">
          旧密码：  <a-input placeholder="请输入旧密码：" style="width:250px ;margin-left:10px;" v-model="old_pass"/>
        </li>
        <li class="flex" style="margin-bottom:10px;justify-content:flex-end ;width:85%; ">
          新密码：  <a-input placeholder="请输入新密码：" style="width:250px ;margin-left:10px;" v-model="new_pass"/>
        </li>
        <li class="flex" style="margin-bottom:10px;justify-content:flex-end ;width:85%;  ">
          确认密码：  <a-input placeholder="请输入确认密码：" style="width:250px ;margin-left:10px;" v-model="com_pass"/>
        </li>
      </ul>
    </a-modal>

    <div >
      <a-table :rowSelection="rowSelection" :columns="columns" :dataSource="data" >
        <a slot="name" slot-scope="text" href="javascript:;">{{text}}</a>
      </a-table>
    </div>

  </div>
</template>

<script>
  import md5 from 'js-md5'
  import { getAllUser,addUser,getAllRole,getAllOrg,deleteUser,editUser, editOrg,searchquery,assignRoles,changePassword,getByPW} from "../../api/interface"

  const columns_modal=[{//新增用户内的表格的表头数据
    title: '角色名',
    dataIndex: 'name',
    scopedSlots: { customRender: 'name' },
  }]

  const columns = [{//新增用户的表格表头
    title: '用户代码',
    dataIndex: 'id',
    scopedSlots: { customRender: 'name' },
  }, {
    title: '用户名称',
    dataIndex: 'name',
  }, {
    title: '手机号码',
    dataIndex: 'phone',
  }, {
    title: '电话号码',
    dataIndex: 'userMobile',
  }, {
    title: '所在系统',
    dataIndex: 'sysId',
  }, {
    title: '所属机构',
    dataIndex: 'orgName',
  }, {
    title: '电子邮箱',
    dataIndex: 'email',
  }, {
    title: '用户状态',
    dataIndex: 'status',
  }, {
    title: '角色',
    dataIndex: 'roleNames',
  }, {
    title: '备注',
    dataIndex: 'remark',
  }];

  export default {
    name: "usertable",
    props: ["item"],
    data() {
      return {
        data:[],
        columns,
        columns_modal,
        ModalText: 'Content of the modal',
        visible: false,
        changepass_visible:false,
        confirmLoading: false,
        //新增用户的几个参数start
        user_id:'',
        user_code:'',
        cellphone:'',
        telphone:'',
        email:'',
        org:'',
        password:'',
        state:'',
        remark:'',
        //新增用户的几个参数end
        ischangeone:0,
        title:'',
        ischangepassone:0,
        isintpassone:0,
        roleList:[],
        orglist:[],
        ischoose:0,
        add_click:0,
        edit_click:0,
        //状态选择绑定
        stateSelect:'',
        //机构选择绑定
        orgSelect:'',
        //搜索框条件
        search_id:'',
        search_name:'',
        search_org:'',
        search_state:'',
        delArray:'',
        addRole:'',
        //修改密码
        old_pass:'',
        new_pass:'',
        com_pass:'',
        choseOneId:'',//选中改的人
        orgin_pass:''
      }
    },
    mounted(){
      this.get_AllUser();
      var self = this;
      getAllRole({//获取角色列表
        pageNo:1,
        pageSize:10
      }).then(res => {
        console.log(res)
        if(res.returnCode==200){
          self.roleList=res.data;
        }
      });
      getAllOrg({//获取机构
        pageNo:1,
        pageSize:10
      }).then(res => {
        console.log(res)
        self.orglist = res.data.rows;
        console.log(self.orglist)
      });
    },
    computed: {
      rowSelection() {//绑定的是外面列表,选择前面的行
        var  self = this;
        const { selectedRowKeys } = this;
        return {
          onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            self.delArray= '';
            if(selectedRows.length == 0){
              self.ischoose = 0;

            }else{
              self.ischoose = 1;
            }
            for(var i in selectedRows){
              self.delArray += selectedRows[i].id + ',';//选中的选项值拼成字符串
            }
            console.log(self.delArray)
            if(selectedRows.length == 1){//如果只选了一个的时候
              this.ischangeone = 1;
              this.ischangepassone = 1;
              this.isintpassone = 1;
              this.user_id = selectedRows[0].id;//id
              this.user_code = selectedRows[0].name;//名称
              this.orgSelect =  selectedRows[0].orgId ; //机构
              //console.log( '现在的机构是'+this.orgSelect )
              this.password = selectedRows[0].password;
              this.cellphone = selectedRows[0].userMobile;
              this.telphone = selectedRows[0].userTel;
              this.email = selectedRows[0].email;
              this.stateSelect =  selectedRows[0].status;
              this.choseOneId = selectedRows[0].id
              // if(selectedRows[0].status=="0"){
              //     this.stateSelect = "正常使用";
              // }else{
              //     this.stateSelect = "已经离职";
              // }
              // this.stateSelect = selectedRows[0].status;
              console.log( '现在的状态是'+this.stateSelect )
              this.remark = selectedRows[0].remark;
            }else{
              this.ischangeone = 0;
              this.ischangepassone = 0;
              this.isintpassone = 0
            }
          },
          getCheckboxProps: record => ({
            props: {
              disabled: record.name === 'Disabled User', // Column configuration not to be checked
              name: record.name,
            }
          }),
        }
      },
      lrowSelection(){//这里的计算方法与修改用户弹窗里面的表格相关联，不要和外面搞混噢
        var  self = this;
        const { selectedRowKeys } = this;
        return {
          onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            self.addRole= '';
            for(var i in selectedRows){
              self.addRole += selectedRows[i].id + ',';//选中的选项值拼成字符串
            }
            console.log(self.addRole)
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
      init_pass(){//初始化密码
        let self = this;
        changePassword({
          userId:self.choseOneId,
          passWord:123456//初始密码
        }).then(res=>{
          if(res.returnCode==200){//密码修改成功
            self.$message.success('初始化密码成功');
            self.changepass_visible = false;
          }
        })
      },
      c_pass(){//点击保存新密码
        let self = this;
        if(self.orgin_pass != self.old_pass){
          self.$message.warning('您输入的密码与旧密码不一致');
        }else{//一致
          //校验新密码
          if(self.new_pass==self.old_pass){
            self.$message.warning('新密码不能和旧密码一样！');
          } else{
            if(self.new_pass!=self.com_pass){
              self.$message.warning('新密码输入不一致！');
            }else{
              changePassword({
                userId:self.choseOneId,
                passWord:self.new_pass
              }).then(res=>{
                if(res.returnCode==200){//密码修改成功
                  self.$message.success('修改密码成功');
                  self.changepass_visible = false;
                }
              })
            }

          }
        }

      },
      searchUser(){
        var self = this;
        searchquery({
          userId:self.search_id,
          name:self.search_name,
          orgId:self.search_org,
          status:self.search_state
        }).then(res => {
          console.log(res);
          if(res.returnCode == 200){//查询成功
            for(var i in res.data){
              if(res.data[i].status==0){
                res.data[i].status = "正在使用";
              }else{
                res.data[i].status = "已经离职";
              }
            }
            self.data  = res.data ;
          }else if(res.returnCode == 404){//查询失败
            self.$message.info('未找到用户信息');
          }
        });
      },
      get_AllUser(){
        var self = this;
        getAllUser({
          pageNo:1,
          rows:10
        }).then(res => {
          console.log(res);
          console.log(self.data,111);
          if(res.returnCode==200){
            for(var i in res.data.rows){
              if(res.data.rows[i].status==0){
                res.data.rows[i].status = "正在使用";
              }else{
                res.data.rows[i].status = "已经离职";
              }
            }
            self.data = res.data.rows;
          }
        });
      },
      clear(){//清空搜索条件
        this.search_id='';
        this.search_name='';
        this.search_state='';
      },
      handleSearchChange(value){
        console.log(`selected ${value}`);
      },
      handleOrgChange(value) {//选中的机构值
        this.org = `${value}`;
      },
      handlesearchOrgChange(value){
        console.log( this.search_org,20313123)
        this.search_org= `${value}`;
      },
      handleStateChange(value){//选中状态值
        this.state = `${value}`;
      },
      openchange(){//打开修改角色的框
        this.title= '修改角色'
        this.visible = true;
        this.edit_click = 1;
        this.add_click = 0;
      },
      edit_User(){//点击保存修改用户
        var self = this;
        editUser({
          id:self.user_id,
          name:self.user_code,
          orgId:self.org,
          password:md5(self.password),
          userMobile:self.cellphone,
          userTel:self.telphone,
          email:self.email,
          status:self.state,
          remark:self.remark
        }).then(res => {
          if(res.returnCode==200){
            self.visible=false;//添加完毕关闭弹窗
            setTimeout(function(){
              self.get_AllUser();
            },100)
          }
        });
      },
      add_user(){//点击保存新增用户
        var self = this;
        var tmp = self.addRole;
        tmp = tmp.substring(0,tmp.length-1);
        if(self.add_click == 1 && self.edit_click == 0){//添加用户
          addUser({
            id:self.user_id,
            name:self.user_code,
            orgId:self.org,
            password:self.password,
            userMobile:self.cellphone,
            userTel:self.telphone,
            email:self.email,
            status:self.state,
            remark:self.remark
          }).then(res => {
            if(res.returnCode==200){
              assignRoles({
                userId:self.user_id,
                roleId:tmp
              }).then(res=>{
                if(res.returnCode==200){

                }
              });

              self.visible=false;//添加完毕关闭弹窗
              setTimeout(function(){
                self.get_AllUser();
              },100)
            }
          });
        }else if(self.add_click == 0 && self.edit_click == 1){//修改用户
          self.edit_User();
        }
      },
      showModal() {
        this.visible = true;
        this.edit_click = 0;
        this.add_click = 1;
        //重置
        this.user_id='';
        this.user_code='';
        this.org='';
        this.password='';
        this.cellphone='';
        this.telphone='';
        this.email='';
        // this.state='';
        this.stateSelect= '';
        this.remark='';
        this.title = '新增角色'
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
      },
      userDelete(){//用户删除方法
        var self = this;
        var tmp = self.delArray;
        tmp = tmp.substring(0,tmp.length-1);//去除字符串最后面的逗号
        deleteUser({
          userId:tmp
        }).then(res=>{
          console.log(res)
          setTimeout(function(){
            getAllUser({
              pageNo:1,
              rows:10
            }).then(res => {
              console.log(res);
              if(res.returnCode==200){
                for(var i in res.data.rows){
                  if(res.data.rows[i].status == 0){
                    res.data.rows[i].status = "正在使用";
                  }else{
                    res.data.rows[i].status = "已经离职";
                  }
                }
                self.data = res.data.rows;

              }
              console.log(self.data,111)
            });
          },1000)
        })
      },
      showConfirm() {//删除
        var self = this;
        this.$confirm({
          title: '提示',
          content: '确定要删除该数据？',
          onOk() {
            self.userDelete();
            return new Promise((resolve, reject) => {
              setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
            }).catch(() => console.log('Oops errors!'));
          },
          onCancel() {},
        });
      },
      changePass(){//打开修改密码的弹窗
        //先清空之前修改的密码数据
        this.old_pass='';
        this.new_pass='';
        this.com_pass='';
        let self = this;
        this.changepass_visible = true;
        getByPW({
          userId:this.choseOneId
        }).then(res=>{
          if(res.returnCode==200){
            self.orgin_pass =  res.data.password;//获取到了选中对象的初始密码
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
