<template>
    <div>
        <div class="title">条件搜索</div>
        <ul class="flex">
            <li class="flex">
                词汇中文名称
                <a-input placeholder="请输入词汇中文名称" style="width:150px ;margin-left:10px;"  v-model="sChineseName"/>
            </li>
            <li class="flex">
                词汇英文名称
                <a-input placeholder="请输入词汇英文名称"  style="width:150px;margin-left:10px;" v-model="sEnglish"/>
            </li>
             <li class="flex">
                词汇英文缩写
                <a-input placeholder="请输入词汇英文名称"  style="width:150px;margin-left:10px;" v-model="sAB"/>
            </li>
              <a-button icon="search"  style="margin-right:10px;" type="primary" @click="search">查询</a-button>
              <a-button icon="close"  style="margin-right:10px;" @click="clear">清空</a-button>

        </ul>
        <div class="title" style="margin-top:20px;">所有单词</div>
        <div style="margin-bottom:20px">
            <a-button icon="plus"  style="margin-right:10px;" @click="addnew">新增</a-button>
            <a-button icon="edit"  style="margin-right:10px;"  @click="editnew" :disabled="ischangeone==0? true:false">修改</a-button>
            <a-button icon="delete"  style="margin-right:10px;" @click="delnew" :disabled="ischangeone==0? true:false">删除</a-button>
        </div>
          <a-modal
          :title="title"
          v-model="add_newenglish"
          @ok="click_eng"
            okText="保存"
            cancelText="取消"
        >
         <ul>
           <li class="flex" style="margin-bottom:10px;justify-content:flex-end;width:85%;  ">
             英文单词：  <a-input placeholder="请输入英文单词：" style="width:250px ;margin-left:10px;" v-model="engName"/>
           </li>
           <li class="flex" style="margin-bottom:10px;justify-content:flex-end ;width:85%; ">
            单词缩写：  <a-input placeholder="请输入单词缩写：" style="width:250px ;margin-left:10px;" v-model="suoName"/>
           </li>
           <li class="flex" style="margin-bottom:10px;justify-content:flex-end ;width:85%;  ">
             单词中文：  <a-input placeholder="请输入单词中文：" style="width:250px ;margin-left:10px;" v-model="CNName"/>
           </li>
           <li class="flex" style="margin-bottom:10px;justify-content:flex-end ;width:85%;  ">
             单词备注：  <a-input placeholder="请输入单词备注：" style="width:250px ;margin-left:10px;" v-model="Nameremark"/>
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
import { englishWord , englishWordAdd , englishWordEdit,englishWordDel } from  "../../api/interface"
import { setTimeout } from 'timers';
const columns = [{
  title: '英文单词',
  dataIndex: 'englishWord',
  scopedSlots: { customRender: 'englishWord' },
}, {
  title: '单词缩写',
  dataIndex: 'wordAb',
}, {
  title: '单词中文',
  dataIndex: 'chineseWord',
},{
  title: '单词备注',
  dataIndex: 'remark',
},{
  title: '操作用户',
  dataIndex: 'optUser',
},{
  title: '操作日期',
  dataIndex: 'optDate',
}];

export default {
  data() {
    return {
      data:[],
      columns,
      title:'新增英文单词',
      add_newenglish:false,//控制新增和修改弹窗
      englishWord:'',
      wordAb:'',
      chineseWord:'',
      engName:'',
      suoName:'',
      CNName:'',
      Nameremark:'',
      ischangeone:0,//控制
      delArray:'',
      add_click:0,
      edit_click:0,
      choseId:'',
      sChineseName:'',
      sEnglish:'',
      sAB:''
    }
  },
  created(){
      this.getList();
  },
 computed: {
    rowSelection() {
      let self = this;
      const { selectedRowKeys } = this;
      return {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
          self.delArray= '';
          for(var i in selectedRows){
              self.delArray += selectedRows[i].id + ',';//选中的选项值拼成字符串
          }
          console.log(self.delArray)
          if(selectedRows.length == 1){//如果只选了一个的时候,填充修改
            this.ischangeone = 1;
            this.engName = selectedRows[0].englishWord;
            this.suoName = selectedRows[0].wordAb;
            this.CNName = selectedRows[0].chineseWord;
            this.Nameremark = selectedRows[0].remark;
            this.choseId = selectedRows[0].id;
          }else{
            this.ischangeone = 0;
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
    delnew () {
      var self = this;
      this.$confirm({
        title: '是否确认要删除?',
        content: '按下确认后，所选内容将在1秒钟后删除',
        okText:'确认',
        cancelText:'取消',
        keyboard:false,
        onOk () {
          self.del();
          return new Promise((resolve, reject) => {
            setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
          }).catch(() => console.log('Oops errors!'));
          },
        onCancel() {},
        });
    },
    search () {
      this.getList();
    },
    clear () {
      this.sEnglish = '';
      this.sAB = '';
      this.sChineseName = '';
      this.getList();
    },
    getList () { // 获取单词
      var self = this

      englishWord({
        pageNo: 1,
        rowNo: 10,
        englishWord: self.sEnglish,
        wordAb: self.sAB,
        chineseWord: self.sChineseName
      }).then(res => {
        if (res.returnCode === 200) { // 成功获取单词列表
          //console.log(pageNo)
          self.data = res.data.row
        }
      })
    },
    addEng () {
        var self = this;
        englishWordAdd({
          'englishWord':self.engName,
          'wordAb':self.suoName,
          'chineseWord':self.CNName,
          'remark':self.Nameremark,
        }).then(res=>{
          if(res.returnCode==200){//新增成功
              self.add_newenglish =  false;
              self.getList();
          }
        })
    },
    editEng(){
     var self = this;
        englishWordEdit({
           'id':self.choseId,
          'englishWord':self.engName,
          'wordAb':self.suoName,
          'chineseWord':self.CNName,
          'remark':self.Nameremark,
        }).then(res=>{
          if(res.returnCode==200){//新增成功
              self.add_newenglish =  false;
              self.getList();
          }
        })
    },
    del(){
      var self = this;
      var tmp = self.delArray;
      tmp = tmp.substring(0,tmp.length-1);
        englishWordDel({
          englishWordId:tmp
        }).then(res=>{
          if(res.returnCode==200){
            setTimeout(function(){
              self.getList();
            },100)
          }
        })
    },
    addnew(){//添加/修改单词弹窗
        this.engName = '';
        this.suoName= '';
        this.CNName ='';
        this.remark = '';
        this.add_newenglish =  true;
        this.title = '添加英文单词';
        this.edit_click = 0;
        this.add_click = 1;
    },
    editnew(){
        this.add_newenglish = true;
        this.title = '修改英文单词';
        this.edit_click=1;
        this.add_click=0;
    },
    click_eng(){//添加修改点击保存
      if(this.add_click==1&&this.edit_click==0){
          this.addEng();
      }else if(this.add_click==0&&this.edit_click==1){
          this.editEng();
      }
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
