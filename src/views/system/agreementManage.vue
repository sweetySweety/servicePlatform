<template>
    <div>
      <div class="title">条件搜索</div>
      <ul class="flex">
        <li class="flex">
          协议名称
          <a-input placeholder="" v-model="protocolName" style="width:150px ;margin-left:10px;"/>
        </li>
        <a-button icon="search"  style="margin-right:10px;"  @click="searchSystemList">查询</a-button>
        <a-button icon="file"  style="margin-right:10px;"  @click="emptyIpt">清空</a-button>
      </ul>
      <div class="title" style="margin-top: 20px">协议基本信息维护</div>

        <div style="margin-bottom:20px">
            <a-button icon="plus"  style="margin-right:10px;" @click="showAddModel">新增</a-button>
            <a-button icon="edit"  style="margin-right:10px;" :disabled="isChange" @click="showEditModel">编辑</a-button>
            <a-button icon="delete"  style="margin-right:10px;" :disabled="isChange" @click="showConfirm">删除</a-button>
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
            <li  class="flex"  style="margin-bottom:10px;"><font class="iptTitle">协议名称：</font><a-input placeholder="" style="width:250px ;margin-left:10px;"  v-model="aprotocolName"/></li>
            <li  class="flex"  style="margin-bottom:10px;"><font class="iptTitle">通讯协议：</font><a-input placeholder="" style="width:250px ;margin-left:10px;"  v-model="commuProtocol"/></li>
            <li  class="flex"  style="margin-bottom:10px;"><font class="iptTitle">报文格式：</font><a-input placeholder="" style="width:250px ;margin-left:10px;"  v-model="msgType"/></li>
            <li  class="flex"  style="margin-bottom:10px;"><font class="iptTitle">协议编码：</font>
              <a-input placeholder="" style="width:250px ;margin-left:10px;"  v-model="encoding"/>
            </li>
            <li  class="flex"  style="margin-bottom:10px;"><font class="iptTitle">超时时间：</font><a-input placeholder="" style="width:250px ;margin-left:10px;"  v-model="timeout"/></li>
            <li  class="flex"  style="margin-bottom:10px;"><font class="iptTitle">加密：</font><a-select defaultValue="" style="width:250px ;margin-left:10px;"  v-model="isEncrypt">
              <a-select-option value="1">加密</a-select-option>
              <a-select-option value="0">不加密</a-select-option>
            </a-select>
            </li>
            <li  class="flex"  style="margin-bottom:10px;"><font class="iptTitle">同步：</font>
              <a-select defaultValue="" style="width:250px ;margin-left:10px;"  v-model="isSync">
                <a-select-option value="1">同步</a-select-option>
                <a-select-option value="2">不同步</a-select-option>
              </a-select>
            </li>
            <li  class="flex"  style="margin-bottom:10px;"><font class="iptTitle">链接：</font>
              <a-select defaultValue="" style="width:250px ;margin-left:10px;"  v-model="isLongCon">
                <a-select-option value="1">短连接</a-select-option>
                <a-select-option value="0">长连接</a-select-option>
              </a-select>
            </li>
            <li  class="flex"  style="margin-bottom:10px;"><font class="iptTitle">备注说明：</font><a-input placeholder="" style="width:250px ;margin-left:10px;"  v-model="remark"/></li>
            <li  class="flex"  style="margin-bottom:10px;"><font class="iptTitle">报文模板：</font><a-textarea placeholder="" style="width:250px ;margin-left:10px;"  v-model="msgTemplate"/></li>
            <li  class="flex"  style="margin-bottom:10px;"><font class="iptTitle">生成类：</font><a-select defaultValue="" style="width:250px ;margin-left:10px;"  v-model="generatorId">
              <a-select-option value="0">短连接</a-select-option>
              <a-select-option value="1">长连接</a-select-option>
            </a-select></li>
          </ul>
        </div>
      </a-modal>
    </div>
</template>

<script>
import ATextarea from 'ant-design-vue/es/input/TextArea'
const columns = [{
  title: '协议名称',
  dataIndex: 'protocolName',
  scopedSlots: { customRender: 'name' },
}, {
  title: '通讯协议',
  dataIndex: 'commuProtocol',
}, {
  title: '报文格式',
  dataIndex: 'msgType',
},{
  title: '协议编码',
  dataIndex: 'encoding',
},{
  title: '绑定系统',
  dataIndex: 'systemInformation',
},{
  title: '超时时间',
  dataIndex: 'timeout',
}, {
  title: '是否加密',
  dataIndex: 'isEncrypt',
},{
  title: '是否同步',
  dataIndex: 'isSync',
},{
  title: '链接',
  dataIndex: 'isLongCon',
}];
const data = [];
export default {
  components: {ATextarea},
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
      protocolName:'',
      // searchipt end
      protocolId: '',   // 协议ID
      aprotocolName:'', // 协议名称
      commuProtocol:'', // 通讯协议
      isEncrypt:'', // 加密 1加密，0不加密
      isSync:'', // 同步 1同步，2不同步
      isLongCon:'', // 链接   1长链接，0短链接
      remark:'',  //备注说明
      encoding:'', //协议编码
      msgType:'', //报文格式
      timeout:'', // 超时时间
      succCode:'', // 成功代码
      errorCode:'', //错误代码
      msgTemplate:'', //报文模板
      msgTemplateId:'',
      generatorId:'' // 生成类  /generator/getAll  value:id  text:name

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
            this.systemIdStr = selectedRows[0].protocolName;
            this.protocolId = selectedRows[0].protocolId;
            this.aprotocolName = selectedRows[0].protocolName;
            this.isEncrypt = selectedRows[0].isEncrypt;
            this.isSync = selectedRows[0].isSync;
            this.remark = selectedRows[0].remark;
            this.encoding = selectedRows[0].encoding;
            this.msgType = selectedRows[0].msgType;
            this.timeout = selectedRows[0].timeout;
            this.msgTemplate = selectedRows[0].msgTemplate.templateContent;
            this.generatorId = selectedRows[0].generatorId;
            this.msgTemplateId = selectedRows[0].msgTemplateId;

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
      this.title = '新增协议';
      this.addModel = true;
      this.isEdit = 0;
      this.emptyAddipt()
    },
    // 显示编辑model
    showEditModel(){
      this.title = '修改协议';
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
      this.protocolId = '';
      this.aprotocolName = '';
      this.isEncrypt = '';
      this.isSync = '';
      this.remark = '';
      this.encoding = '';
      this.msgType = '';
      this.timeout = '';
      this.msgTemplate = '';
      this.generatorId = '';
    },
    // 清空搜索输入框
    emptyIpt(){
      this.protocolName = '';
    },
    addSystem(){
      let url = '/protocol/add';
      let params = {
        protocolId: this.protocolId,   // 协议ID
        protocolName: this.aprotocolName, // 协议名称
        commuProtocol: this.commuProtocol, // 通讯协议
        isEncrypt: this.isEncrypt, // 加密 1加密，0不加密
        isSync: this.isSync, // 同步 1同步，2不同步
        isLongCon: this.isLongCon, // 链接   1长链接，0短链接
        remark: this.remark,  //备注说明
        encoding:this.encoding, //协议编码
        msgType:this.msgType, //报文格式
        timeout:this.timeout, // 超时时间
        msgTemplate:{
          templateContent: this.msgTemplate
        }, //报文模板
        generatorId: this.generatorId // 生成类  /generator/getAll  value:id  text:name
      };
      let response = (res) => {
        this.addModel = false;
        this.searchSystemList();
      };

      this.$store.state.getMoreDataPost(url,params,response,this);
    },
    editSystem(){
      let url = '/protocol/update';
      let params = {
        protocolId: this.protocolId,   // 协议ID
        protocolName: this.aprotocolName, // 协议名称
        commuProtocol: this.commuProtocol, // 通讯协议
        isEncrypt: this.isEncrypt, // 加密 1加密，0不加密
        isSync: this.isSync, // 同步 1同步，2不同步
        isLongCon: this.isLongCon, // 链接   1长链接，0短链接
        remark: this.remark,  //备注说明
        encoding:this.encoding, //协议编码
        msgType:this.msgType, //报文格式
        timeout:this.timeout, // 超时时间
        msgTemplateId: this.msgTemplateId,
        msgTemplate:{
          templateContent: this.msgTemplate
        }, //报文模板
        generatorId: this.generatorId // 生成类  /generator/getAll  value:id  text:name
      };
      let response = (res) => {
        this.addModel = false;
        this.searchSystemList();
      };

      this.$store.state.getMoreDataPost(url,params,response);
    },
    // 删除系统
    deleteSystem(){
      let url = '/protocol/delete';
      let params = {
        protocolName: this.systemIdStr
      };
      let response = (res) => {
        this.data = res.data
      };

      this.$store.state.getMoreDataDelete(url,params,response);
    },

    // 获取列表
    searchSystemList(){
      let url = '/protocol/getAll';
      let params = {
        pageNo: this.currentPage,
        rowNo: this.pageSize,
        protocolName: this.protocolName
      };
      let response = (res) => {
        let obj = res.data;
        this.data = obj.row;
        this.total = obj.resultCount;
      };

      this.$store.state.getMoreDataStringPost(url,params,response)
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
