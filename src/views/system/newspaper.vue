<template>
  <div>
    <div class="title">报文头管理</div>

    <div style="margin-bottom:20px">
      <a-button icon="edit" class="operation_btn"  style="margin-right:10px;" @click="showAddModel">新增</a-button>
      <a-button icon="edit"  class="operation_btn" :disabled="isChange" @click="showEditModel">修改</a-button>
      <a-button icon="delete"  class="operation_btn" :disabled="isChange" @click="showConfirm">删除</a-button>
      <a-button icon="setting"  class="operation_btn"  @click="searchheadMsgList">刷新</a-button>
      <a-button icon="folder"  class="operation_btn" :disabled="isChange" @click="pushHeadMsg">发布</a-button>
      <a-button icon="file"  class="operation_btn" :disabled="isChange" @click="goNewspaperHistory">报文头历史</a-button>
      <a-button icon="file"  class="operation_btn" :disabled="isChange" @click="goNewspaperEditHistory">报文头修订记录</a-button>
    </div>
    <div>
      <a-table :rowSelection="rowSelection" :pagination="{
          pageSize: pageSize,
          onShowSizeChange: onShowSizeChange,
          total: total,
          onChange: onPageChange}" :customRow="customClick" :columns="columns" :dataSource="data" >

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
          <li  class="flex"  style="margin-bottom:10px;"><font class="iptTitle">报文头名称：</font><a-input placeholder="" style="width:250px ;margin-left:10px;"  v-model="headName"/></li>
          <li  class="flex"  style="margin-bottom:10px;"><font class="iptTitle">报文头备注：</font><a-input placeholder="" style="width:250px ;margin-left:10px;"  v-model="headDesc"/></li>
          <li  class="flex"  style="margin-bottom:10px;"><font class="iptTitle">报文头描述：</font><a-input placeholder="" style="width:250px ;margin-left:10px;"  v-model="headRemark"/></li>
        </ul>
      </div>
    </a-modal>
  </div>
</template>

<script>
  const columns = [{
    title: '报文头名称',
    dataIndex: 'headName'
  }, {
    title: '报文头描述',
    dataIndex: 'headDesc',
  }, {
    title: '备注',
    dataIndex: 'headRemark',
  },{
    title: '版本号',
    dataIndex: 'version.code',
  },{
    title: '状态',
    dataIndex: 'status',
  }];
  const data = [];
  export default {

    data() {

      return {
        data,
        columns,
        // 双击事件
        customClick: record => ({
          on: { // 事件
            click: () => {
              this.goServicemess();
            },
          },
        }),
        isChange: true,
        addModel: false,
        title:'',
        isEdit:0,
        // searchipt
        currentPage: 1,
        pageSize: 10,
        total: 10,
        headIdStr:'',
        // searchipt end
        headName: '', //报文头名称
        headDesc:'', //报文头描述
        headRemark:''//报文头备注

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
              this.headIdStr = selectedRows[0].headId;
              this.headDesc = selectedRows[0].headDesc;
              this.headName = selectedRows[0].headName;
              this.headRemark = selectedRows[0].headRemark;

            }else{
              this.isChange = true
            }
          },
          getCheckboxProps: record => ({
            props: {
              disabled: record.name === 'Disabled User', // Column configuration not to be checked
              name: record.name,
            }
          })
        }
      }
    },
    mounted(){
      //this.getheadMsgList();
      this.searchheadMsgList();
    },
    methods: {
      // 获取Id
      getHeadId(){
        this.$emit('getHeadId',this.headIdStr)
      },
      // 去历史记录
      goNewspaperHistory(){
        this.getHeadId();
        this.$emit('goNewspaperHistory','');
      },
      // 去修订历史记录
      goNewspaperEditHistory(){
        this.getHeadId();
        this.$emit('goNewspaperEditHistory','');
      },
      // 切换分页
      onPageChange (pageNumber) {
        this.currentPage = pageNumber
        this.searchheadMsgList();
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
            _self.deleteheadMsg();
          },
          onCancel() {},
        });
      },
      // 显示新增model
      showAddModel(){
        this.title = '新增报文头';
        this.addModel = true;
        this.isEdit = 0;
        this.emptyAddipt()
      },
      // 显示编辑model
      showEditModel(){
        this.title = '修改报文头';
        this.addModel = true;
        this.isEdit = 1;
      },
      //发布报文头
      pushHeadMsg(){
        let url = '/interfaceHead/headModifPush';
        let params = {
          headId: this.headIdStr
        };
        let response = (res) => {
          this.addModel = false;
          this.searchheadMsgList();
        };

        this.$store.state.getMoreDataGet(url,params,response);
      },
      //保存操作
      saveOperation(){
        let isEdit = this.isEdit;

        if(isEdit == 1){
          this.editheadMsg();
        }else{
          this.addheadMsg();
        }
      },
      // 清空新增输入框
      emptyAddipt(){
        this.headIdStr = '';
        this.headName = '';
        this.headDesc = '';
        this.headRemark = '';
      },
      addheadMsg(){
        let url = '/interfaceHead/add';
        let params = {
          headName : this.headName,
          headDesc : this.headDesc,
          headRemark : this.headRemark
        };
        let response = (res) => {
          this.addModel = false;
          this.searchheadMsgList();
        };

        this.$store.state.getMoreDataPost(url,params,response);
      },
      editheadMsg(){
        let url = '/interfaceHead/update';
        let params = {
          headId: this.headIdStr,
          headName: this.headName,
          headDesc: this.headDesc,
          headRemark: this.headRemark
        };
        let response = (res) => {
          this.addModel = false;
          this.searchheadMsgList();
        };

        this.$store.state.getMoreDataPost(url,params,response);
      },
      // 删除系统
      deleteheadMsg(){
        let url = '/interfaceHead/delete';
        let params = {
          headId: this.headIdStr
        };
        let response = (res) => {
          this.searchheadMsgList();
        };

        this.$store.state.getMoreDataDelete(url,params,response);
      },

      // 获取报文头列表
      searchheadMsgList(){
        let url = '/headManager/getAll';
        let params = {
          pageNo: this.currentPage,
          rowNo: this.pageSize
        };
        let response = (res) => {
          let obj = res.data;
          obj.row.map((item) => {
            let status = item.status
            switch (status) {
              case 1:
                item.status = '已发布';
                break
              case 0:
                item.status = '修订';
                break
              default:
                item.status = '';
            }
          })
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
  .operation_btn{
    margin: 0 10px 10px 0;
  }
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
