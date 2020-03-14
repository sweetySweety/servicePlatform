<template>
    <div>
        <div class="title">条件搜索</div>
        <ul class="flex">
          <li class="flex">
                交易码
                <a-input placeholder="" v-model="secode" style="width:150px ;margin-left:10px;"/>
            </li>
                 <li class="flex">
                   交易名称
                <a-input placeholder=""  v-model="sinterfaceName" style="width:150px;margin-left:10px;"/>
            </li>
                 <li class="flex">
                接口功能描述
                <a-input placeholder=""  v-model="sdesc" style="width:150px;margin-left:10px;"/>
            </li>
                 <li class="flex">
                状态
                   <a-select defaultValue="" v-model="sstatus" style="width: 150px;margin-left:10px;">
                     <a-select-option value="http" :key="3">http</a-select-option>
                     <a-select-option value="post" :key="4">post</a-select-option>
                   </a-select>
            </li>
        </ul>
        <ul class="flex">
            <li class="flex">
                接口ID
                <a-input placeholder=""  v-model="sinterfaceId" style="width:150px;margin-left:10px;"/>
            </li>
                 <li class="flex">
                接口标签
                   <a-input placeholder=""  v-model="sinterfaceTag" style="width:150px;margin-left:10px;"/>

            </li>

          <li class="flex">
            报文头
            <a-select defaultValue="" v-model="sheadId" style="width: 150px;margin-left:10px;">
              <a-select-option v-for="item in headList" :value="item.id" >{{ item.text}}</a-select-option>

            </a-select>
          </li>
          <li class="flex">
            通讯协议
            <a-select defaultValue="" v-model="protocolId" style="width: 150px;margin-left:10px;">
              <a-select-option value="http" :key="3">http</a-select-option>
              <a-select-option value="post" :key="4">post</a-select-option>
            </a-select>
          </li>
              <a-button icon="search"  style="margin-right:10px;" @click="searchInterfaceList">查询</a-button>
              <a-button icon="delete"  style="margin-right:10px;" @click="emptyIpt">清空</a-button>
        </ul>


        <div class="title" style="margin-top:20px;">基本信息维护</div>

        <div style="margin-bottom:20px">
            <a-button icon="edit"  style="margin-right:10px;" @click="showAddModel">新增</a-button>
            <a-button icon="edit"  style="margin-right:10px;" :disabled="isChange" @click="showEditModel">修改</a-button>
            <a-button icon="delete"  style="margin-right:10px;" :disabled="isChange" @click="showConfirm">删除</a-button>
            <a-button icon="file"  style="margin-right:10px;"  :disabled="isChange" @click="showBindModel">绑定报文头</a-button>
            <a-button icon="file"  style="margin-right:10px;" @click="goNewspaper">导出</a-button>
            <a-button icon="file"  style="margin-right:10px;" @click="goSystemInfoList">历史版本</a-button>
            <a-button icon="file"  style="margin-right:10px;" @click="goAgreementManage">接口历史记录</a-button>
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
        :title="title_bind"
        v-model="is_showBindModel"
        @ok="saveBind"
        okText="保存"
        cancelText="取消"
        width='450px'
      >
        <div class="graybox">
          <ul>

            <li  class="flex"  style="margin-bottom:10px;"><font class="iptTitle">接口ID：</font><a-input disabled="true" placeholder="" style="width:250px ;margin-left:10px;"  v-model="interfaceIdStr"/></li>
            <li  class="flex"  style="margin-bottom:10px;"><font class="iptTitle">报文头：</font>
              <a-select defaultValue="" style="width:250px ;margin-left:10px;"  v-model="status">
                <a-select-option value="0">修订</a-select-option>
              </a-select>
            </li>
          </ul>
        </div>
      </a-modal>
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
            <li  class="flex"  style="margin-bottom:10px;"><font class="iptTitle">交易名称：</font><a-input placeholder="" style="width:250px ;margin-left:10px;"  v-model="interfaceName"/></li>
            <li  class="flex"  style="margin-bottom:10px;"><font class="iptTitle">交易码：</font><a-input placeholder="" style="width:250px ;margin-left:10px;"  v-model="ecode"/></li>
            <li  class="flex"  style="margin-bottom:10px;"><font class="iptTitle">状态：</font>
              <a-select defaultValue="" style="width:250px ;margin-left:10px;"  v-model="status">
                <a-select-option value="0">修订</a-select-option>
                <a-select-option value="1">已发布</a-select-option>
              </a-select>
            </li>
            <li  class="flex"  style="margin-bottom:10px;"><font class="iptTitle">调用关系：</font>
              <a-select defaultValue="" style="width:250px ;margin-left:10px;"  v-model="type">
                <a-select-option value="1">提供方</a-select-option>
                <a-select-option value="0">消费方</a-select-option>
              </a-select>
            </li>
            <li  class="flex"  style="margin-bottom:10px;"><font class="iptTitle">是否标准：</font>
              <a-select defaultValue="" style="width:250px ;margin-left:10px;"  v-model="isStandard">
                <a-select-option value="1">是</a-select-option>
                <a-select-option value="0">否</a-select-option>
              </a-select>
            </li>
            <li  class="flex"  style="margin-bottom:10px;"><font class="iptTitle">接口协议：</font>
              <a-select defaultValue="" style="width:250px ;margin-left:10px;"  v-model="protocolId">
                <a-select-option value="http">http</a-select-option>
                <a-select-option value="post">post</a-select-option>
              </a-select>
            </li>
            <li  class="flex"  style="margin-bottom:10px;"><font class="iptTitle">接口功能描述：</font>
              <a-textarea style="width:250px ;margin-left:10px;" v-model="desc">

              </a-textarea>
            </li>
          </ul>
        </div>
      </a-modal>
    </div>
</template>

<script>
import ATextarea from 'ant-design-vue/es/input/TextArea'
const columns = [{
  title: '接口id',
  dataIndex: 'interfaceId',
}, {
  title: '交易码',
  dataIndex: 'ecode',
}, {
  title: '交易名称',
  dataIndex: 'interfaceName',
},{
  title: '接口功能描述',
  dataIndex: 'desc',
}, {
  title: '报文头',
  dataIndex: 'protocolName',
},{
  title: '接口协议',
  dataIndex: 'protocolName',
},{
  title: '状态',
  dataIndex: 'status',
},{
  title: '版本号',
  dataIndex: 'version.code',
},{
    title:'修订时间',
    dataIndex: 'optDate',
},{
    title:'更新用户',
    dataIndex: 'optUser',
}];
const data = [];
export default {
  components: {ATextarea},
  props:['sendSystemId'],
  data() {
    return {
        data,
      columns,
      isChange: true,
      addModel: false,
      title:'',
      title_bind: '绑定报文头',
      is_showBindModel: false,
      isEdit:0,
      currentPage: 1,
      pageSize: 10,
      total: 10,
      headList: [],
      // searchipt
      sinterfaceId: '',
      sdesc: '',
      sinterfaceTag: '',
      sheadId: '',
      sprotocolId: '',
      sstatus: '',
      sinterfaceName: '',
      secode: '',
      // searchipt end
      interType: 0, //接口类型 消费1 或 提供0
      listsystemId: this.sendSystemId,
      interfaceIdStr:'',
      interfaceName: '',
      ecode: '',
      desc: '',
      status:'',
      systemId: '',
      protocolName: '',
      serviceInvoke: '',
      isStandard: '',
      type: '',
      protocolId: ''
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
            this.interfaceIdStr = selectedRows[0].interfaceId;
            this.interfaceName = selectedRows[0].interfaceName;
            this.ecode = selectedRows[0].ecode;
            this.desc = selectedRows[0].desc;
            this.isStandard = selectedRows[0].isStandard;
            this.type = selectedRows[0].type;
            this.protocolId = selectedRows[0].protocolId;
            this.status = selectedRows[0].status;

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
    //this.getHeadList();
    this.searchInterfaceList();
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
      this.currentPage = pageNumber
      this.searchInterfaceList()
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
          _self.deleteInterface();
        },
        onCancel() {},
      });
    },
    // 显示新增model
    showAddModel(){
      this.title = '新增接口';
      this.addModel = true;
      this.isEdit = 0;
      this.emptyAddipt()
    },
    // 显示编辑model
    showEditModel(){
      this.title = '修改接口';
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
      this.interfaceIdStr = '';
      this.interfaceName = '';
      this.ecode = '';
      this.desc = '';
      this.systemId = '';
      this.isStandard = '';
      this.type = '';
      this.protocolId = '';
      this.status = '';
    },
    // 清空搜索输入框
    emptyIpt(){
      this.sinterfaceId = '';
      this.sdesc = '';
      this.sinterfaceTag = '';
      this.sheadId = '';
      this.sprotocolId = '';
      this.sstatus = '';
      this.sinterfaceName = '';
      this.secode = '';
    },
    // 新增接口
    addSystem(){
      let serviceInvoke = [{
        ecode: this.ecode,
        isStandard: this.isStandard,
        type: this.type,
        systemId: this.listsystemId,
        protocolId: this.protocolId
      }];
      let url = '/interface/add';
      let params = {
        interfaceName: this.interfaceName,
        ecode: this.ecode,
        desc: this.desc,
        systemId: this.listsystemId,
        isStandard: this.isStandard,
        type: this.type,
        status: this.status,
        protocolId: this.protocolId,
        serviceInvoke: serviceInvoke
      };
      let response = (res) => {
        this.addModel = false;
        this.searchInterfaceList()
      };

      this.$store.state.getMoreDataPost(url,params,response);
    },
    // 新增接口
    editSystem(){
      let url = '/interface/update';
      let params = {
        interfaceId: this.interfaceIdStr,
        interfaceName: this.interfaceName,
        ecode: this.ecode,
        desc: this.desc,
        systemId: this.listsystemId,
        isStandard: this.isStandard,
        status: this.status,
        type: this.type,
        protocolId: this.protocolId,
        serviceInvoke: [{
          ecode: this.ecode,
          isStandard: this.isStandard,
          type: this.type,
          systemId: this.listsystemId,
          protocolId: this.protocolId
        }]
      };
      let response = (res) => {
        this.addModel = false;
        this.searchInterfaceList()
      };

      this.$store.state.getMoreDataPost(url,params,response);
    },
    showBindModel(){
      this.is_showBindModel = true;
    },
    saveBind(){
      this.bindHeadMsg();
    },
    // 绑定报文头
    bindHeadMsg(){
      let url = '/interface/headRelate';
      let params = {
        interfaceId: this.interfaceIdStr,
        headIds: this.headIds
      };
      let response = (res) => {

      };

      this.$store.state.getMoreDataGet(url,params,response);
    },
    // 删除接口
    deleteInterface(){
      let url = '/interface/delete';
      let params = {
        interfaceId: this.interfaceIdStr
      };
      let response = (res) => {
        this.searchInterfaceList()
      };

      this.$store.state.getMoreDataDelete(url,params,response);
    },
    // 获取接口列表
    searchInterfaceList(){
      let url = '/interface/getAllInterface';
      let params = {
        pageNo: this.currentPage,
        rowNo: this.pageSize,
        interfaceId: this.sinterfaceId,
        systemId: this.listsystemId,
        interType: this.interType,
        desc: this.sdesc,
        interfaceTag: this.sinterfaceTag,
        headId: this.sheadId,
        protocolId: this.sprotocolId,
        status: this.sstatus,
        interfaceName: this.sinterfaceName,
        ecode: this.secode
      };
      let response = (res) => {
        let obj = res.data;
        this.data = obj.row;
        this.total = obj.resultCount;
      };

      this.$store.state.getMoreDataPost(url,params,response)
    }
  }
  //versionHis/judgeVersionPre
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
