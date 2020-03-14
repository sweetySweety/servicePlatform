<template>
    <div>
      <div class="title">查询条件</div>
          <ul class="flex">
              <li class="flex">
                  用户名称 
                  <a-select placeholder="请输入" showSearch optionFilterProp="children" v-model="userName" style="width:150px;margin-left:10px;" @change="changeName">
                    <a-select-option v-for="userName in userDate" :key="userName">{{userName}}</a-select-option>
                  </a-select>
              </li>
              <li class="flex">
                  用户Id
                  <a-select placeholder="请输入" showSearch optionFilterProp="children" v-model="userId" style="width:150px;margin-left:10px;" @change="changeId">
                    <a-select-option v-for="(userName,userId) in userDate" :key="userId">{{userId}}</a-select-option>
                  </a-select>
              </li>
              <li class="flex">
                  用户角色
                  <a-select placeholder="请输入" showSearch optionFilterProp="children" v-model="userRole" style="width:150px;margin-left:10px;" @change="changeRole">
                    <a-select-option v-for="userRole in allRoles" :key="userRole">{{userRole}}</a-select-option>
                  </a-select>
              </li>
                <a-button icon="search"  style="margin-right:10px;" type="primary" @click="inquire">查询</a-button>
                <a-button icon="delete"  style="margin-right:10px;" type="primary" @click="empty">重置</a-button>
                
          </ul>  
          <div class="title" style="margin-top:20px;">资源列表</div> 
          <div style="margin-bottom:20px">
              <a-button icon="plus"  style="margin-right:10px;" @click="openHistory(userDetail.userName,userDetail.userId,userDetail.userRole)">历史任务</a-button>
              <a-button icon="plus"  style="margin-right:10px;" @click="openCurrent(userDetail.userName,userDetail.userId,userDetail.userRole)">当前任务</a-button>
              <a-input-search placeholder="搜索" style="width: 200px"/>
          </div>
          <div>
              <a-table :rowSelection="rowSelection" :columns="columns" :dataSource="allUserRoles" >
                <a slot="name" slot-scope="text" href="javascript:;">{{text}}</a>
              </a-table>
          </div>
    </div>
</template>

<script>
const columns = [{
  title: '用户名称',
  dataIndex: 'userName',
}, {
  title: '用户ID',
  dataIndex: 'userId',
}, {
  title: '用户角色',
  dataIndex: 'userRole',
},{
  title: '当前任务总数',
  dataIndex: 'total',
},{
  title: '本周完成数',
  dataIndex: 'weekTotal',
},{
  title: '历史完成数',
  dataIndex: 'hisTotal',
}];

export default {

  data() {
    return {
      allUserRoles:[],
      columns,
      userDetail:"",//查看历史任务数据
      rowSelection:{
        type:'radio',
        onSelect: (selectedRowKeys, selectedRows) => {
          console.log(selectedRowKeys)
          this.userDetail=selectedRowKeys
        },
      },
      userDate:[],
      allRoles:[],
      userName:"",
      userId:"",
      userRole:"",   
    }
  },
 computed: {
    // rowSelection() {
    //   const { selectedRowKeys } = this;
    //   return {
    //     onChange: (selectedRowKeys, selectedRows) => {
    //       console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    //       this.userDetail = selectedRows[0];
    //     },
    //     getCheckboxProps: record => ({
    //       props: {
    //         disabled: record.name === 'Disabled User', // Column configuration not to be checked
    //         name: record.name,
    //       }
    //     }),
    //   }
    // },
 },
 mounted(){
   //获取用户
   this.getSomeUser();
   //获取所有角色
   this.getAllRoles();
   //获取用户角色信息
   this.selectUserBy("","","");
 },
  methods: {
    goTo(){
          this.$router.push({ path: "/platform" });
    },
    //获取用户
    getSomeUser () {
      let url = '/user/getSomeUser'
      let params = {}
      let response = (res) => {
        this.userDate = res.data
      }
      this.$store.state.getMoreDataGet(url, params, response)
    },
    //获取所有角色
    getAllRoles () {
      let url = '/role/getAllRoles'
      let params = {}
      let response = (res) => {
        this.allRoles = res.data
      }
      this.$store.state.getMoreDataGet(url, params, response)
    },
    changeName(e){
      this.userName = e
    },
     changeId(e){
      this.userId = e
    },
     changeRole(e){
      this.userRole = e
    },
    //搜索
    inquire(){
       this.selectUserBy(this.userName,this.userId,this.userRole) 
    },
    // 清空操作
    empty () {
      this.userName = ""
      this.userId = ""
      this.userRole = ""
    },
    
    //获取所有角色信息
    selectUserBy (userName,userId,userRole) {
      let url = '/pgm/selectUserBy'
      let params = {
        userName:userName,
        userId:userId,
        userRole:userRole
      }
      let response = (res) => {
        let lists = res.data
        lists.map((item, index) => {
          this.$set(item, 'key', index)
        })
        this.allUserRoles = lists
      }
      this.$store.state.getMoreDataGet(url, params, response)
    },
    //触发父组件事件
    openHistory(userName,userId,userRole){
      if(this.userDetail==""||this.userDetail==undefined){
        this.$message.warn('请选择用户')
        return
      }
      let data = {
        userName: userName,
        userId: userId,
        userRole: userRole
      };
      this.$emit('goHistory', data)
    },
    //触发父组件事件
    openCurrent(userName,userId,userRole){
      if(this.userDetail==""||this.userDetail==undefined){
        this.$message.warn('请选择用户')
        return
      }
        let data = {
          userName: userName,
          userId: userId,
          userRole: userRole
        };
        this.$emit('goCurrent', data)
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
