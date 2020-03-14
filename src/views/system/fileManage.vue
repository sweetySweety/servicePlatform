<template>
    <div>
      <div class="title">文件管理</div>

        <div style="margin-bottom:20px">
            <a-button icon="edit"  style="margin-right:10px;" @click="showAddModel">新增</a-button>
            <a-button icon="delete"  style="margin-right:10px;" :disabled="isChange" @click="showConfirm">删除</a-button>
        </div>
        <div>
            <a-table :rowSelection="rowSelection" :pagination="{
          pageSize: pageSize,
          onShowSizeChange: onShowSizeChange,
          total: total,
          onChange: onPageChange}" :columns="columns" :dataSource="data" >
              <template slot="operation" slot-scope="text, record">
                <a-button icon="download" @click="downLoadFile(record)">下载</a-button>
              </template>
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
            <li  class="flex"  style="margin-bottom:10px;"><font class="iptTitle">文件：</font>
              <a-upload name="file" :multiple="true" action="uploadAction" :beforeUpload="beforeUpload">
              <a-button>
                <a-icon type="upload" />选择文件
              </a-button>
            </a-upload>
            </li>
            <li  class="flex"  style="margin-bottom:10px;"><font class="iptTitle">系统：</font>
              <a-select defaultValue="" style="width:250px ;margin-left:10px;"  v-model="systemId">
              <a-select-option :value="item.systemId" v-for="item in systemList">{{ item.systemChineseName}}</a-select-option>
              </a-select></li>
            <li  class="flex"  style="margin-bottom:10px;"><font class="iptTitle">文件备注：</font><a-textarea placeholder="" style="width:250px ;margin-left:10px;"  v-model="fileDesc"/></li>
          </ul>
        </div>
      </a-modal>
    </div>
</template>

<script>
  import config from '../../../src/api/config'
  import ATextarea from 'ant-design-vue/es/input/TextArea'
const columns = [{
  title: '文件名称',
  dataIndex: 'fileName',
  scopedSlots: { customRender: 'name' },
}, {
  title: '系统名称',
  dataIndex: 'systemName',
}, {
  title: '文件大小',
  dataIndex: 'fileSize',
},{
  title: '文件路径',
  dataIndex: 'filePath',
},{
  title: '文件备注',
  dataIndex: 'fileDesc',
},{
  title: '操作',
  dataIndex: 'operation',
  scopedSlots: { customRender: 'operation' }
  //scopedSlots: { customRender: '下载' },
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
      uploadAction: config.baseURL + '/resourceImport/import',
      downloadAction: config.baseURL + '/fileManager/download?fileId=',
      systemList: [],
      // searchipt
      currentPage: 1,
      pageSize: 10,
      total: 10,
      // searchipt end
      fileIdStr:'',
      systemId: '',
      file:'',
      fileDesc:''
    }
  },
 computed: {
    rowSelection() {
      const { selectedRowKeys } = this;
      return {
        onChange: (selectedRowKeys, selectedRows) => {
          //console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
          if(selectedRows.length > 0){
            this.isChange = false
            let arr = [];
            selectedRows.map((item) => {
              arr.push(item.fileId)
            })
            this.fileIdStr = arr.join();
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
    this.getSystemList();
    this.searchSystemList()
  },
  methods: {
    // 获取file
    beforeUpload (file, fileList) {
      this.file = file
      return false
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
    downLoadFile(record){
      let a = document.createElement('a')
      a.href = this.downloadAction+record.fileId
      a.click();
    },
    // 显示新增model
    showAddModel(){
      this.title = '新增文件';
      this.addModel = true;
      this.isEdit = 0;
      this.emptyAddipt()
    },
    emptyAddipt(){
      this.file = '';
      this.systemId = '';
      this.fileDesc = '';
    },
    //保存新增
    saveOperation(){
      this.addSystem();
    },
    // 新增文件
    addSystem(){
      let url = '/fileManager/upload';
      let fd = new FormData()
      fd.append('file', this.file);
      fd.append('fileDesc', this.fileDesc);
      fd.append('systemId', this.systemId);
      let params = fd;
      let response = (res) => {
        this.addModel = false;
        this.searchSystemList();
      };

      this.$store.state.getMoreDataPost(url,params,response);
    },
    // 删除文件
    deleteSystem(){
      let url = '/fileManager/delete';
      let params = {
        fileId: this.fileIdStr
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
        this.systemList = res.data
      };

      this.$store.state.getMoreDataGet(url,params,response);
    },
    // 获取文件列表
    searchSystemList(){
      let url = '/fileManager/getAll';
      let params = {
        pageNo: this.currentPage,
        rowNo: this.pageSize
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
