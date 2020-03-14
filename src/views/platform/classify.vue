<template>
    <div>
        <div class="title" style="margin-top:20px;">所有生成类</div>

        <div style="margin-bottom:20px">
            <a-button icon="edit"  style="margin-right:10px;" @click="open_add">新增</a-button>
            <a-button icon="edit"  style="margin-right:10px;" :disabled="isDisabled" @click="show_edit">修改</a-button>
            <a-button icon="delete"  style="margin-right:10px;" :disabled="isDisabled" @click="showConfirm">删除</a-button>
        </div>
        <div >
            <a-table :rowSelection="rowSelection" :columns="columns" :dataSource="data" >
                <a slot="name" slot-scope="text" href="javascript:;">{{text}}</a>
            </a-table>
        </div>
         <a-modal
            :title="title"
             v-model="add_visible"
            @ok="add_Generator"
            okText="保存"
              keyboard:false
            cancelText="取消"
            width='450px'
            >
            <div>
              <div class="graybox">
                  <ul >
                    <li  class="flex"  style="margin-bottom:10px;justify-content:flex-end;width:85%;">拆租包模式<a-input placeholder="请输入拆租包模式" style="width:250px ;margin-left:10px;"  v-model="name"/></li>
                    <li  class="flex"  style="margin-bottom:10px;justify-content:flex-end;width:85%;">描述<a-input placeholder="请输入描述" style="width:250px ;margin-left:10px;"  v-model="desc"/></li>
                    <li  class="flex"  style="margin-bottom:10px;justify-content:flex-end;width:85%;">生成器类型<a-input placeholder="请输入角色描述" style="width:250px ;margin-left:10px;"  v-model="classf"/></li>
                    <li  class="flex"  style="margin-bottom:10px;justify-content:flex-end;width:85%;">
                      类路径
                      <a-input placeholder="请输入角色描述" style="width:250px ;margin-left:10px;"  v-model="path"/>
                    </li>
                  </ul>
              </div>
            </div>
        </a-modal>

      <a-modal
        :title="title"
        v-model="edit_visible"
        @ok="edit_generator"
        okText="保存"
        keyboard:false
        cancelText="取消"
        width='450px'
      >
        <div>
          <div class="graybox">
            <ul >
              <li  class="flex"  style="margin-bottom:10px;justify-content:flex-end;width:85%;">拆租包模式<a-input placeholder="请输入拆租包模式" style="width:250px ;margin-left:10px;"  v-model="name"/></li>
              <li  class="flex"  style="margin-bottom:10px;justify-content:flex-end;width:85%;">描述<a-input placeholder="请输入描述" style="width:250px ;margin-left:10px;"  v-model="desc"/></li>
              <li  class="flex"  style="margin-bottom:10px;justify-content:flex-end;width:85%;">生成器类型<a-input placeholder="请输入角色描述" style="width:250px ;margin-left:10px;"  v-model="classf"/></li>
              <li  class="flex"  style="margin-bottom:10px;justify-content:flex-end;width:85%;">
                类路径
                <a-input placeholder="请输入角色描述" style="width:250px ;margin-left:10px;"  v-model="path"/>
              </li>
            </ul>
          </div>
        </div>
      </a-modal>
    </div>
</template>

<script>

import { addGenerator , getGeneratorList} from "../../api/interface"

const columns = [{
  title: '拆租包模式',
  dataIndex: 'name',
  scopedSlots: { customRender: 'name' },
}, {
  title: '描述',
  dataIndex: 'desc',
}, {
  title: '生成器类型',
  dataIndex: 'generatorType',
},{
  title: '类路径',
  dataIndex: 'implementsClazz',
}];

export default {

  data() {
    return {
      data:[],
      columns,
      // name:'',
      // desc:'',
      // generatorType:'',
      // implementsClazz:'',
      title:'新增生成类',
      add_visible:false,
      edit_visible:false,
      name:'',
      type:'',
      desc:'',
      classf:'',
      path:'',
      isDisabled: true,
      idarrStr:'',
      idStr:[],
      info:{}
    }
  },
  mounted(){
    this.get_Generator ();
  },
 computed: {
    rowSelection() {
      const { selectedRowKeys } = this;
      return {
        onChange: (selectedRowKeys, selectedRows) => {
          //console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
          let idarr = []
          selectedRowKeys.map((item) => {
            idarr.push(this.data[item].id)
          })
          let idStr = idarr.join()
          this.idarrStr = idStr
          this.idStr = idarr
          if(selectedRowKeys){
            this.isDisabled = false;
          }
          if(selectedRowKeys.length == 1){
            this.info = selectedRows[0]
            let self = this.info
            this.name =  self.name;
            this.desc = self.desc;
            this.classf = self.generatorType;
            this.path = self.implementsClazz;
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
  methods: {
    show_edit(){
      if(this.idStr.length == 1){
        this.title = '修改生成类'
        this.edit_visible = true
      }else{
        this.$message.warn('不能同时选中多个进行编辑')
      }
    },
    open_add(){
      this.empty_ipt();
        this.add_visible = true;
        this.title = '新增生成类';
    },
    get_Generator(){
      var self = this;
      getGeneratorList(undefined).then(res=>{
        if(res.returnCode==200){
          self.data = res.data;
        }
      });
    },
    // 删除生成类
    deleteClassify(){
      let url = '/generator/delete';
      let params = {
        generatorId: this.idarrStr
      };
      let response = (res) => {
        this.get_Generator();
      };

      this.$store.state.getMoreDataDelete(url, params, response)
    },
    showConfirm() {//询问是否删除
      var self = this;
      this.$confirm({
        title: '是否确认要删除?',
        content: '按下确认后，所选内容将在1秒钟后删除',
        okText:'确认',
        cancelText:'取消',
        keyboard:false,
        onOk() {
          self.deleteClassify();
        },
        onCancel() {},
      });
    },
    add_Generator(){
      var self = this;
      addGenerator({
        name: self.name,
        desc: self.desc,
        generatorType: self.classf,
        implementsClazz: self.path
      }).then(res=>{
        if(res.returnCode==200){//添加成功
          self.add_visible = false;
        }
        this.empty_ipt()
        this.get_Generator();
      })
    },
    empty_ipt(){
      this.name = '';
      this.desc = '';
      this.classf = '';
      this.path = '';
    },
    edit_generator(){
      let url = '/generator/modify';
      let params = {
        name: self.name,
        desc: self.desc,
        generatorType: self.classf,
        implementsClazz: self.path
      };
      let response = (res) => {
        this.get_Generator()
        this.empty_ipt()
        this.edit_visible = false
      };

      this.$store.state.getMoreDataPost(url, params, response)
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
