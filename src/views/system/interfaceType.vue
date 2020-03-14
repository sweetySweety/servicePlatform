<template>
    <div>
        <div class="title">条件搜索</div>
        <ul class="flex">
            <li class="flex">
                系统ID
                <a-input placeholder="" v-model="systemId" style="width:150px ;margin-left:10px;"/>
            </li>
                 <li class="flex">
                中文名称
                <a-input placeholder=""  v-model="systemChineseName" style="width:150px;margin-left:10px;"/>
            </li>
                 <li class="flex">
                系统简称
                <a-input placeholder=""  v-model="systemAb" style="width:150px;margin-left:10px;"/>
            </li>
                 <li class="flex">
                负责人
                <a-input placeholder=""  v-model="principal" style="width:150px;margin-left:10px;"/>
            </li>
        </ul>
        <ul class="flex">
            <li class="flex">
                系统描述
                <a-input placeholder=""  v-model="systemDesc" style="width:150px;margin-left:10px;"/>
            </li>
                 <li class="flex">
                系统协议
                   <a-select defaultValue="" v-model="protocolName" style="width: 150px;margin-left:10px;">
                     <a-select-option value="http" :key="3">http</a-select-option>
                     <a-select-option value="post" :key="4">post</a-select-option>
                   </a-select>

            </li>
<!--            <li class="flex">-->
<!--                负责人2-->
<!--                <a-input placeholder=""  style="width:150px;margin-left:10px;"/>-->
<!--            </li>-->
              <a-button icon="search"  style="margin-right:10px;" type="primary" @click="searchSystemList">查询</a-button>
              <a-button icon="search"  style="margin-right:10px;" type="primary" @click="emptyIpt">清空</a-button>
        </ul>


        <div class="title" style="margin-top:20px;">系统基本信息维护</div>

        <div style="margin-bottom:20px">
            <a-button icon="edit"  style="margin-right:10px;" @click="showAddModel">新增</a-button>
            <a-button icon="edit"  style="margin-right:10px;" :disabled="isChange" @click="showEditModel">修改</a-button>
            <a-button icon="delete"  style="margin-right:10px;" :disabled="isChange" @click="showConfirm">删除</a-button>
            <a-button icon="file"  style="margin-right:10px;"  @click="goFileManage">文件管理</a-button>
            <a-button icon="file"  style="margin-right:10px;" @click="goNewspaper">报文头管理</a-button>
            <a-button icon="file"  style="margin-right:10px;" @click="goSystemInfoList">系统详细信息管理</a-button>
            <a-button icon="file"  style="margin-right:10px;" @click="goAgreementManage">协议管理</a-button>
        </div>
        <div>
            <a-table :rowSelection="rowSelection" :pagination="{
          pageSize: pageSize,
          onShowSizeChange: onShowSizeChange,
          total: total,
          onChange: onPageChange}" :columns="columns" :dataSource="data" >

            </a-table>
        </div>

      <a-modal
        :title="title"
        v-model="addModel"
        @ok="saveOperation"
        okText="保存"
        cancelText="取消"
        width='450px'
      >
        <div class="graybox">
          <ul>
            <li  class="flex"  style="margin-bottom:10px;"><font class="iptTitle">系统ID：</font><a-input placeholder="" style="width:250px ;margin-left:10px;"  v-model="asystemId"/></li>
            <li  class="flex"  style="margin-bottom:10px;"><font class="iptTitle">系统简称：</font><a-input placeholder="" style="width:250px ;margin-left:10px;"  v-model="asystemAb"/></li>
            <li  class="flex"  style="margin-bottom:10px;"><font class="iptTitle">系统中文名称：</font><a-input placeholder="" style="width:250px ;margin-left:10px;"  v-model="asystemChineseName"/></li>
            <li  class="flex"  style="margin-bottom:10px;"><font class="iptTitle">系统详细信息：</font>
              <a-select defaultValue="" style="width:250px ;margin-left:10px;"  v-model="asystemInfomation">
                <a-select-option value="http">http</a-select-option>
                <a-select-option value="post">post</a-select-option>
              </a-select>
            </li>
            <li  class="flex"  style="margin-bottom:10px;"><font class="iptTitle">业务范围：</font><a-input placeholder="" style="width:250px ;margin-left:10px;"  v-model="aworkRange"/></li>
            <li  class="flex"  style="margin-bottom:10px;"><font class="iptTitle">系统描述：</font><a-input placeholder="" style="width:250px ;margin-left:10px;"  v-model="asystemDesc"/></li>
            <li  class="flex"  style="margin-bottom:10px;"><font class="iptTitle">负责人：</font>
              <a-select defaultValue="" style="width:250px ;margin-left:10px;"  v-model="aprincipal">
                <a-select-option value="http">http</a-select-option>
                <a-select-option value="post">post</a-select-option>
              </a-select>
            </li>
          </ul>
        </div>
      </a-modal>
    </div>
</template>

<script>
const columns = [{
  title: '系统ID',
  dataIndex: 'systemId',
  scopedSlots: { customRender: 'name' },
}, {
  title: '系统简称',
  dataIndex: 'systemAb',
}, {
  title: '系统中文名称',
  dataIndex: 'systemChineseName',
},{
  title: '系统协议',
  dataIndex: 'protocolName',
},{
  title: '系统详细信息',
  dataIndex: 'systemInformation',
},{
  title: '负责人',
  dataIndex: 'principal',
},{
    title:'系统描述',
    dataIndex: 'systemDesc',
},{
    title:'业务范围',
    dataIndex: 'workRange',
}];
const data = [];
export default {

  data() {

    return {
        data,
      columns,
      isChange: true,
      addModel: false,
      title:'',
      isEdit:0,
      // searchipt
      currentPage: 1,
      pageSize: 10,
      total: 10,
      isVague: 'y',
      systemId: '',
      systemChineseName: '',
      systemAb: '',
      principal: '',
      systemDesc: '',
      protocolName: '',
      systemIdStr:'',
      // searchipt end
      asystemId: '',
      asystemChineseName: '',
      asystemAb: '',
      aprincipal: '',
      asystemDesc: '',
      aprotocolName: '',
      aworkRange:'',
      asystemInfomation:''
    }
  },
 computed: {
    rowSelection() {
      const { selectedRowKeys } = this;
      return {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
          if(selectedRows.length == 1){
            this.isChange = false
            this.systemIdStr = selectedRows[0].systemId;
            this.asystemId = selectedRows[0].systemId;
            this.asystemChineseName = selectedRows[0].systemChineseName;
            this.asystemAb = selectedRows[0].systemAb;
            this.aprincipal = selectedRows[0].principal;
            this.asystemDesc = selectedRows[0].systemDesc;
            this.aprotocolName = selectedRows[0].protocolName;
            this.aworkRange = selectedRows[0].workRange;
            this.asystemInfomation = selectedRows[0].systemInfomation;
          }else{
            this.isChange = true
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
    //this.getSystemList();
    this.searchSystemList()
  },
  methods: {
    // 去报文头管理
    goNewspaper(){
      this.$emit('goNewspaper','');
    },
    // 协议管理
    goAgreementManage(){
      this.$emit('goAgreementManage','');
    },
    // 文件管理页面
    goFileManage(){
      this.$emit('goFileManage','');
    },
    goSystemInfoList(){
      this.$emit('goSystemInfoList','');
    },
    // 切换分页
    onPageChange (pageNumber) {
      let pageSize = this.pageSize
      this.currentPage = pageNumber
      this.getLogList(pageNumber, pageSize)
    },
    // 改变size
    onShowSizeChange (current, pageSize) {
      console.log(current, pageSize)
    },
    // 删除提示
    showConfirm(){
      let _self = this;
      this.$confirm({
        title: '是否确认要删除?',
        content: '按下确认后，所选内容将在1秒钟后删除',
        okText:'确认',
        cancelText:'取消',
        keyboard:false,
        onOk () {
          _self.deleteSystem();
        },
        onCancel() {},
      });
    },
    // 显示新增model
    showAddModel(){
      this.title = '新增系统';
      this.addModel = true;
      this.isEdit = 0;
      this.emptyAddipt()
    },
    // 显示编辑model
    showEditModel(){
      this.title = '修改系统';
      this.addModel = true;
      this.isEdit = 1;
    },
    saveOperation(){
      let isEdit = this.isEdit;

      if(isEdit == 1){
        this.editSystem();
      }else{
        this.addSystem();
      }
    },
    // 清空新增输入框
    emptyAddipt(){
      this.asystemId = '';
      this.asystemChineseName = '';
      this.asystemAb = '';
      this.aprincipal = '';
      this.asystemDesc = '';
      this.aprotocolName = '';
      this.aworkRange = '';
      this.asystemInfomation = '';
    },
    // 清空搜索输入框
    emptyIpt(){
      this.systemId = '';
      this.systemChineseName = '';
      this.systemAb = '';
      this.principal = '';
      this.systemDesc = '';
      this.protocolName = '';
    },
    addSystem(){
      let url = '/system/add';
      let params = {
        systemId: this.asystemId,
        systemAb: this.asystemAb,
        systemChineseName: this.asystemChineseName,
        systemDesc: this.asystemDesc,
        workRange: this.aworkRange,
        principal: this.aprincipal,
        SystemDesc: this.asystemDesc
      };
      let response = (res) => {
        this.addModel = false;
        this.searchSystemList();
      };

      this.$store.state.getMoreDataPost(url,params,response);
    },
    editSystem(){
      let url = '/system/modify';
      let params = {
        systemId: this.asystemId,
        systemAb: this.asystemAb,
        systemChineseName: this.asystemChineseName,
        systemInfomation: this.asystemInfomation,
        workRange: this.aworkRange,
        principal: this.aprincipal,
        SystemDesc: this.asystemDesc
      };
      let response = (res) => {
        this.addModel = false;
        this.searchSystemList();
      };

      this.$store.state.getMoreDataPost(url,params,response);
    },
    // 删除系统
    deleteSystem(){
      let url = '/system/delete';
      let params = {
        systemId: this.systemIdStr
      };
      let response = (res) => {
        this.data = res.data
      };

      this.$store.state.getMoreDataDelete(url,params,response);
    },
    // 获取列表
    getSystemList(){
      let url = '/system/getAll';
      let params = {};
      let response = (res) => {
        this.data = res.data
      };

      this.$store.state.getMoreDataGet(url,params,response);
    },
    // 获取列表
    searchSystemList(){
      let url = '/system/query';
      let params = {
        pageNo: this.currentPage,
        rowNo: this.pageSize,
        isVague: this.isVague,
        systemId: this.systemId,
        systemChineseName: this.systemChineseName,
        systemAb: this.systemAb,
        principal: this.principal,
        systemDesc: this.systemDesc,
        protocolName: this.protocolName,
      };
      let response = (res) => {
        let obj = res.data;
        this.data = obj.row;
        this.total = obj.resultCount;
      };

      this.$store.state.getMoreDataPost(url,params,response)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .iptTitle{
    width: 100px;
  }
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
