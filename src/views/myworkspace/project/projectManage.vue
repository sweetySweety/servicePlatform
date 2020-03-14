<template>
    <div>
        <div class="title">查询条件</div>
        <ul class="flex">
            <li class="flex">
                项目名称
                <a-select placeholder="请输入" showSearch optionFilterProp="children" v-model="projectName" style="width:250px;margin-left:10px;" @change="changeName">
                    <a-select-option v-for="system in systemDate" :key="system.projectName">{{system.projectName}}</a-select-option>
                </a-select>
            </li>
            <li class="flex">
                <a-button icon="search" type="primary" style="margin-right:10px;" @click="inquire">查询</a-button>
                <a-button icon="delete" type="primary" style="margin-right:10px;" @click="empty">重置</a-button>
            </li>
        </ul>
        <div class="title" style="margin-top:20px;">项目管理列表</div>
        <div style="margin-bottom:20px;display:flex;justify-content:space-between;">
            <div class="flex">
                <a-button icon="plus"  style="margin-right:10px;" @click="addProjectModal">新增项目</a-button>
                <a-button icon="edit"  style="margin-right:10px;" @click="whProjectModal">维护项目</a-button>
                <a-button icon="search"  style="margin-right:10px;" @click="checkSystem">查看系统</a-button>
                <a-button icon="edit"  style="margin-right:10px;" @click="plProjectModal">批量维护</a-button>
                <a-button icon="search"  style="margin-right:10px;" @click="viewlogModal">查看日志</a-button>
            </div>
             <a-input-search
              placeholder="搜索"
              style="width: 200px"
            />

        </div>
        <div >
            <a-table :rowSelection="rowSelection" :columns="columns" :dataSource="data" >
                <a slot="name" slot-scope="text" href="javascript:;">{{text}}</a>
            </a-table>
        </div>
        <!-- 新增项目begin -->
        <a-modal title="新增项目" v-model="add_project" @ok="addProject" okText="保存" cancelText="取消">
            <ul>
                <li class="flex" style="margin-bottom:10px;justify-content:flex-end;width:85%;">
                    项目类型  <font color="#ff0000"></font>
                    <a-select style="width:250px ;margin-left:10px;" v-model="project.projectAttr" defaultValue="请选择类型" @change="changeprojectAttr">
                        <a-select-option value="0">
                        新起
                        </a-select-option>
                        <a-select-option value="1">
                        维护
                        </a-select-option>
                    </a-select>
                </li>
                <li class="flex" style="margin-bottom:10px;justify-content:flex-end ;width:85%; ">
                    项目编号 <font color="#ff0000"></font>
                    <a-input placeholder="可以为空" v-model="project.projectNum" style="width:250px ;margin-left:10px;"/>
                </li>
                <li class="flex" style="margin-bottom:10px;justify-content:flex-end ;width:85%; ">
                    项目名称 <font color="#ff0000"></font>
                    <a-input v-model="project.projectName" style="width:250px ;margin-left:10px;"/>
                </li>
                <li class="flex" style="margin-bottom:10px;justify-content:flex-end ;width:85%; ">
                    内部序号 <font color="#ff0000"></font>
                    <a-input v-model="project.inSideNum" placeholder="可以先不填" style="width:250px ;margin-left:10px;"/>
                </li>
                <li class="flex" style="margin-bottom:10px;justify-content:flex-end ;width:85%; ">
                    项目发起人 <font color="#ff0000"></font>
                    <a-input v-model="project.projectSponsor" style="width:250px ;margin-left:10px;"/>
                </li>
                <li class="flex" style="margin-bottom:10px;justify-content:flex-end ;width:85%; ">
                    项目联系人 <font color="#ff0000"></font>
                    <a-input v-model="project.projectLeader" style="width:250px ;margin-left:10px;"/>
                </li>
                <li class="flex" style="margin-bottom:10px;justify-content:flex-end ;width:85%; ">
                    计划UAT时间 <font color="#ff0000"></font>
                    <a-date-picker  @change="uatTime" placeholder="选择日期" style="width:250px ;margin-left:10px;"/>
                </li>
                <li class="flex" style="margin-bottom:10px;justify-content:flex-end ;width:85%; ">
                    计划上线时间 <font color="#ff0000"></font>
                    <a-date-picker  @change="onlineTime" placeholder="选择日期" style="width:250px ;margin-left:10px;"/>
                </li>
                <li class="flex" style="margin-bottom:10px;justify-content:flex-end ;width:85%; ">
                    相关材料SVN路径 <font color="#ff0000"></font>
                    <a-textarea v-model="project.svnAddress" style="width:250px ;margin-left:10px;"></a-textarea>
                </li>
                <li class="flex" style="margin-bottom:10px;justify-content:flex-end ;width:85%; ">
                    需求描述 <font color="#ff0000"></font>
                    <a-textarea v-model="project.projectDesc" style="width:250px ;margin-left:10px;"></a-textarea>
                </li>
                <li class="flex" style="margin-bottom:10px;justify-content:flex-end ;width:85%; ">
                    备注 <font color="#ff0000"></font>
                    <a-textarea v-model="project.projectRemark" style="width:250px ;margin-left:10px;"></a-textarea>
                </li>
            </ul>
        </a-modal>
        <!-- 新增项目end -->
        <!-- 维护项目begin -->
        <a-modal title="维护项目" v-model="wh_project" @ok="whProject" okText="保存" cancelText="取消">
            <ul>
                <li class="flex" style="margin-bottom:10px;width:85%; ">
                     <font color="#ff0000">*注：录入的时候均面向提供方</font>
                </li>
                <li class="flex" style="margin-bottom:10px;justify-content:flex-end;width:85%;">
                    是否标准  <font color="#ff0000"></font>
                    <a-select style="width:250px ;margin-left:10px;" v-model="tc.isStandard" defaultValue="请选择" @change="changeisStandard">
                        <a-select-option value="0">
                        标准
                        </a-select-option>
                        <a-select-option value="1">
                        非标准
                        </a-select-option>
                    </a-select>
                </li>
                <li class="flex" style="margin-bottom:10px;justify-content:flex-end ;width:85%; ">
                    服务场景描述<font color="#ff0000"></font>
                    <a-input v-model="tc.serDesc" style="width:250px ;margin-left:10px;"/>
                </li>
                <li class="flex" style="margin-bottom:10px;justify-content:flex-end ;width:85%; ">
                    消费方交易码 <font color="#ff0000"></font>
                    <a-input v-model="tc.consumerEreturnCode" style="width:250px ;margin-left:10px;"/>
                </li>
                <li class="flex" style="margin-bottom:10px;justify-content:flex-end ;width:85%; ">
                    消费方系统简称 <font color="#ff0000"></font>
                    <a-input v-model="tc.consumerSystem" style="width:250px ;margin-left:10px;"/>
                </li>
                <li class="flex" style="margin-bottom:10px;justify-content:flex-end ;width:85%; ">
                    提供方交易码 <font color="#ff0000"></font>
                    <a-input v-model="tc.providerEreturnCode" style="width:250px ;margin-left:10px;"/>
                </li>
                <li class="flex" style="margin-bottom:10px;justify-content:flex-end ;width:85%; ">
                    提供方系统简称 <font color="#ff0000"></font>
                    <a-input v-model="tc.providerSystem" style="width:250px ;margin-left:10px;"/>
                </li>
                <li class="flex" style="margin-bottom:10px;justify-content:flex-end ;width:85%; ">
                    服务类型 <font color="#ff0000"></font>
                    <a-select style="width:250px ;margin-left:10px;" v-model="tc.serType" defaultValue="请选择" @change="changeserType">
                        <a-select-option value="0">
                        新增
                        </a-select-option>
                        <a-select-option value="1">
                        复用
                        </a-select-option>
                        <a-select-option value="2">
                        修改
                        </a-select-option>
                    </a-select>
                </li>
                <li class="flex" style="margin-bottom:10px;justify-content:flex-end ;width:85%; ">
                    服务治理负责人 <font color="#ff0000"></font>
                    <a-input v-model="tc.govPerson" style="width:250px ;margin-left:10px;"/>
                </li>
                <li class="flex" style="margin-bottom:10px;justify-content:flex-end ;width:85%; ">
                    关联服务场景码 <font color="#ff0000"></font>
                    <a-input v-model="tc.soId" placeholder="历史交易不支持录入" disabled="disabled" style="width:250px ;margin-left:10px;"/>
                </li>
                <li class="flex" style="margin-bottom:10px;justify-content:flex-end ;width:85%; ">
                    备注 <font color="#ff0000"></font>
                    <a-textarea v-model="tc.remark" style="width:250px ;margin-left:10px;"></a-textarea>
                </li>
            </ul>
        </a-modal>
        <!-- 新增项目end -->
        <!-- 批量维护begin -->
        <a-modal title="批量维护" v-model="pl_project" @ok="plProject" okText="确认" cancelText="取消">
            <div class="title">请选择要导入的Excel文件：</div>
            <div style="display:flex;display:-webkit-flex">
            <a-upload name="file" :multiple="true">
                <a-button> <a-icon type="upload"/> 上传文件 </a-button>
            </a-upload>
            </div>
        </a-modal>
        <!-- 批量维护end -->
        <!-- 查看日志begin -->
        <a-modal title="日志查看" v-model="view_log" @ok="deleteLog" okText="清除日志" cancelText="取消">
            <div >
                <a-table :columns="columnsLog" :dataSource="dataLog" >
                    <a slot="name" slot-scope="text" href="javascript:;">{{text}}</a>
                </a-table>
            </div>
        </a-modal>
        <!-- 查看日志end -->
    </div>
</template>

<script>
const columns = [{
  title: '项目名称',
  dataIndex: 'proName',
  scopedSlots: { customRender: 'proName' },
}, {
  title: '内部序号',
  dataIndex: 'insideNum',
}, {
  title: '项目发起人',
  dataIndex: 'proSponsor',
},{
  title: '项目联系人',
  dataIndex: 'proLeader',
},{
  title: '项目状态',
  dataIndex: 'proState',
},{
  title: '项目属性',
  dataIndex: 'proAttr',
},{
  title: '计划上线时间',
  dataIndex: 'planOnline',
},{
  title: '操作',
  dataIndex: '',
}];
const columnsLog = [{
  title: '操作人',
  dataIndex: 'userId',
}, {
  title: '异常',
  dataIndex: 'detail',
}];
export default {
  data() {
    return {
        data:[],
        dataLog:[],
        columns,
        columnsLog,
        systemDate:[],
        projectName:"",
        add_project:false,
        wh_project:false,
        pl_project:false,
        view_log:false,
        systemDetail:"",
        rowSelection:{
            type:'radio',
            onSelect: (selectedRowKeys, selectedRows) => {
            console.log(selectedRowKeys)
            this.systemDetail=selectedRowKeys
            },
        },
        //新增项目字段begin
        project:{
            projectAttr:"",
            projectNum:"",
            projectName:"",
            projectSponsor:"",
            projectLeader:"",
            planUatTime:"",
            planOnlineTime:"",
            svnAddress:"",
            projectDesc:"",
            projectRemark:"",
            inSideNum:"",
        }, 
        //新增项目字段end
        //维护项目字段begin
        tc:{
            isStandard:"",
            serDesc:"",
            consumerEreturnCode:"",
            consumerSystem:"",
            providerEreturnCode:"",
            providerSystem:"",
            serType:"",
            govPerson:"",
            soId:"",
            remark:"",
        }, 
        //维护项目字段end
    }
  },
 computed: {
   
 },
 mounted(){
   //查询任务量
   this.getAllProjects();
   //查询系统名
   this.getProjectName("");
 },
  methods: {
    goTo(){
          this.$router.push({ path: "/platform" });
    },
    //查询任务量
    getAllProjects () {
      let url = '/pgm/getAllProjects'
      let params = {}
      let response = (res) => {
        let lists = res.data
        lists.map((item, index) => {
          this.$set(item, 'key', index)
        })
        this.data = lists
      }
      this.$store.state.getMoreDataGet(url, params, response)
    },
    //查询系统名
    getProjectName(projectName){
        let url = '/pcc/getProjectName'
        let params = {
            projectName:projectName
        }
        let response = (res) => {
            let lists = res.data
            lists.map((item, index) => {
            this.$set(item, 'key', index)
            })
            this.systemDate = lists
        }
        this.$store.state.getMoreDataGet(url, params, response)
    },
    //根据系统名查询
    selectProjectNameBy(projectName,starTtime,endTime){
        let url = '/pgm/selectProjectNameBy'
        let params = {
            projectName:projectName,
            starTtime:starTtime,
            endTime:endTime
        }
        let response = (res) => {
            let lists = res.data
            lists.map((item, index) => {
            this.$set(item, 'key', index)
            })
            this.data = lists
        }
        this.$store.state.getMoreDataGet(url, params, response)
    },
    changeName(e){
        this.projectName = e
    },
    changeprojectAttr(e){
        this.project.projectAttr = e
    },
    changeisStandard(e){
        this.tc.isStandard = e
    },
    changeserType(e){
        this.tc.serType = e
    },
    //搜索
    inquire(){
       this.selectProjectNameBy(this.projectName,"","") 
    },
    // 清空操作
    empty() {
      this.projectName = ""
    },
    //开始日期
    uatTime(e){
      this.project.planUatTime = new Date(e).getFullYear()+"-"+Number(new Date(e).getMonth()+1)+"-"+new Date(e).getDate()
    },
    //结束日期
    onlineTime(e){
      this.project.planOnlineTime = new Date(e).getFullYear()+"-"+Number(new Date(e).getMonth()+1)+"-"+new Date(e).getDate()
    },
    checkSystem(){
        //触发父组件事件
      this.$emit('goDetail', "")
    },
    //新增项目模态框
    addProjectModal(){
        this.add_project = true
    },
    //维护项目模态框
    whProjectModal(){
        if(this.systemDetail==""||this.systemDetail==undefined){
            this.$message.warn('请选择需要维护的项目')
            return
        }
        this.wh_project = true
    },
    //批量维护模态框
    plProjectModal(){
        this.pl_project = true
    },
     //查看日志模态框
    viewlogModal(){
        this.view_log = true
        this.getAllLogs();
    },
    //确认新增项目
    addProject(){
        if(this.project.projectAttr==""){
            this.$message.warn("请选择项目类型")
            return
        }
        if(this.project.projectName==""){
            this.$message.warn("项目名称不能为空")
            return
        }
        if(this.project.projectSponsor==""){
            this.$message.warn("项目发起人不能为空")
            return
        }
        let url = '/pgm/addProject'
        let params = this.project
        let response = (res) => {
            this.getAllProjects()
            this.add_project = false

        }
        this.$store.state.getMoreDataPost(url, params, response) 
    },
    //确认维护项目
    whProject(){
        if(this.tc.isStandard==""){
            this.$message.warn("请选择是否标准")
            return
        }
        if(this.tc.serType==""){
            this.$message.warn("请选择服务类型")
            return
        }
        if(this.tc.providerSystem==""){
            this.$message.warn("提供方服务简称不能为空")
            return
        }
        let url = '/pgm/maintenanceProject?proName=proName:'+this.systemDetail.proName
        let params = this.tc
        console.log(params)
        let response = (res) => {
            this.wh_project = false

        }
        this.$store.state.getMoreDataPost(url, params, response) 
    },
    //批量维护
    plProject(){

    },
    //查看日志
    getAllLogs(){
        let url = '/pgm/getAllLogs'
        let params = {}
        let response = (res) => {
            let lists = res.data
            lists.map((item, index) => {
            this.$set(item, 'key', index)
            })
            this.dataLog = lists
        }
        this.$store.state.getMoreDataGet(url, params, response)
    },
    //删除日志
    deleteLog(){
        let url = '/pgm/delLogs'
        let params = {}
        let response = (res) => {
           this.getAllLogs();
        }
        this.$store.state.getMoreDataDelete(url, params, response)
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
