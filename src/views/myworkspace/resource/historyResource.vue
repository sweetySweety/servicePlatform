<template>
    <div>
      <div class="title">查询条件</div>
      <ul class="flex">
          <li class="flex">
              服务治理人员
              <a-select placeholder="请输入" showSearch optionFilterProp="children" v-model="govPerson" style="width:150px;margin-left:10px;" @change="changegovPerson">
                <a-select-option v-for="gov in govDate" :key="gov">{{gov.name}}</a-select-option>
              </a-select>
          </li>
          <li class="flex">
              服务开发人员
              <a-select placeholder="请输入" showSearch optionFilterProp="children" v-model="devPerson" style="width:150px;margin-left:10px;" @change="changedevPerson">
                <a-select-option v-for="devPerson in devDate" :key="devPerson">{{devPerson}}</a-select-option>
              </a-select>
          </li>
          <li class="flex">
              服务场景码
              <a-select placeholder="请输入" showSearch optionFilterProp="children" v-model="soId" style="width:150px;margin-left:10px;" @change="changesoId">
                <a-select-option v-for="soIdlist in soIdDate" :key="soIdlist">{{soIdlist.soId}}</a-select-option>
              </a-select>
          </li>
          <li class="flex">
              当前状态
              <a-select placeholder="请输入" showSearch optionFilterProp="children" v-model="stage" style="width:150px;margin-left:10px;" @change="changestage">
                <a-select-option v-for="stagelist in stageDate" :key="stagelist">{{stagelist.proState}}</a-select-option>
              </a-select>
          </li>
          <li class="flex">
              提供方系统
              <a-select placeholder="请输入" showSearch optionFilterProp="children" v-model="provider" style="width:150px;margin-left:10px;" @change="changeprovider">
                <a-select-option v-for="providerlist in providerDate" :key="providerlist">{{providerlist.systemChineseName}}</a-select-option>
              </a-select>
          </li>
          <a-button icon="search"  style="margin-right:10px;" type="primary" @click="inquire">查询</a-button>
          <a-button icon="delete"  style="margin-right:10px;" type="primary" @click="empty">重置</a-button>
      </ul> 
      <div class="title" style="margin-top:20px;">资源列表</div>  
      <div style="margin-bottom:20px">
        <a-button icon="delete"  style="margin-right:10px;" @click="deleteModalshow">任务删除</a-button>
        <a-input-search placeholder="搜索" style="width: 200px"/>
      </div> 
      <div>
          <a-table :rowSelection="rowSelection" :columns="columns" :dataSource="peopleDate" >
              <a slot="name" slot-scope="text" href="javascript:;">{{text}}</a>
          </a-table>
      </div> 
      <a-modal
      title="提示"
      v-model="deleteModal"
      @ok="deleteByIds"
      okText="确认"
      cancelText="取消"
    >
      <div>该操作会删除所有相关历史变更记录，您确认要删除吗？</div>
    </a-modal>
    </div>
</template>

<script>
const columns = [{
  title: '调用方',
  dataIndex: 'consumer',
}, {
  title: '提供方',
  dataIndex: 'provider',
}, {
  title: '服务场景码',
  dataIndex: 'soId',
},{
  title: '交易码',
  dataIndex: 'ecode',
},{
  title: '服务治理人员',
  dataIndex: 'govPerson',
},{
  title: '服务开发人员',
  dataIndex: 'devPerson',
},{
  title: '当前阶段',
  dataIndex: 'stage',
},{
  title: '交易记录',
  dataIndex: 'info',
},{
  title: '状态',
  dataIndex: 'status',
}];
export default {
  props: {
      propshistory: String 
  },
  data() {
    return {
      columns,
      peopleDate:[],
      govDate:[],
      devDate:"",
      soIdDate:[],
      stageDate:[],
      providerDate:[],
      govPerson:"",
      devPerson:"",
      soId:"",
      stage:"",
      provider:"",
      deleteList:[],
      deleteModal:false,
    }
  },
 computed: {
    rowSelection() {
      const { selectedRowKeys } = this;
      return {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
          for(let i = 0; i<selectedRowKeys.length; i++){
            this.deleteList[i] = {
              id:selectedRows[i].ids,
              role:this.propshistory.userRole,
              soid:selectedRows[i].soId,
            }
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
      this.getServiceGovAll()
      this.getDeveloper()
      this.getAllSoId()
      this.getProjects()
      this.getAllSys()
      this.getUserDetail(this.propshistory.userRole,this.propshistory.userName,"history")
 },
  methods: {
    goTo(){
          this.$router.push({ path: "/platform" });
    },
    //获取所有服务治理人员
    getServiceGovAll(){
      let url = '/user/getServiceGovAll'
      let params = {}
      let response = (res) => {
        this.govDate = res.data
      }
      this.$store.state.getMoreDataGet(url, params, response)
    },
    //获取所有服务开发人员
    getDeveloper(){
      let url = '/pcc/getDeveloper'
      let params = {}
      let response = (res) => {
        this.devDate = res.data
      }
      this.$store.state.getMoreDataGet(url, params, response)
    },
    //获取服务场景码
    getAllSoId(){
      let url = '/pcc/getAllSoId'
      let params = {}
      let response = (res) => {
        this.soIdDate = res.data
      }
      this.$store.state.getMoreDataGet(url, params, response)
    },
    //获取项目状态
    getProjects(){
      let url = '/pcc/getProjects'
      let params = {}
      let response = (res) => {
        this.stageDate = res.data
      }
      this.$store.state.getMoreDataGet(url, params, response)
    },
    //获取提供方系统
    getAllSys(){
      let url = '/pcc/getAllSys'
      let params = {}
      let response = (res) => {
        this.providerDate = res.data
      }
      this.$store.state.getMoreDataGet(url, params, response)
    },
    //资源管理详细查询
    getUserDetail (userRole,userName,flag) {
      let url = '/pgm/getUserDetail'
      let params = {
        userRole: userRole,
        userName: userName,
        flag: flag
      }
      let response = (res) => {
        this.peopleDate = res.data
      }
      this.$store.state.getMoreDataGet(url, params, response)
    },
    //资源管理详细条件查询
    selectPeopleDetailBy (roleName,userId,userName,gov,dev,soId,stage,system,flag) {
      let url = '/pgm/selectPeopleDetailBy'
      let params = {
        roleName: roleName,
        userId: userId,
        userName: userName,
        gov: gov,
        dev: dev,
        soId:soId,
        stage:stage,
        system:system,
        flag:flag
      }
      let response = (res) => {
        this.peopleDate = res.data
      }
      this.$store.state.getMoreDataGet(url, params, response)
    },
    deleteModalshow(){
      this.deleteModal = true
    },
    //删除
    deleteByIds(){
      if(this.deleteList==""||this.deleteList==undefined){
        this.$message.warn('请选择用户')
        return
      }
      let url = '/pgm/batchDeleteTask'
      let params = this.deleteList
      let response = (res) => {
        let result = res.data
        this.deleteModal = false
        this.selectPeopleDetailBy(this.propshistory.userRole,this.propshistory.userId,this.propshistory.userName,this.govPerson,this.devPerson,this.soId,this.stage,this.provider,"history")
      }
      this.$store.state.getMoreDataPost(url, params, response)
    },
    changegovPerson(e){
      this.govPerson = e.name
    },
    changedevPerson(e){
      this.devPerson = e
    },
    changesoId(e){
      this.soId = e.soId
    },
    changestage(e){
      this.stage = e.proState
    },
    changeprovider(e){
      this.provider = e.systemChineseName
    },
    //搜索
    inquire(){
       this.selectPeopleDetailBy(this.propshistory.userRole,this.propshistory.userId,this.propshistory.userName,this.govPerson,this.devPerson,this.soId,this.stage,this.provider,"history") 
    },
    // 清空操作
    empty() {
      this.govPerson = ""
      this.devPerson = ""
      this.soId = ""
      this.stage = ""
      this.provider = ""
    },
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
