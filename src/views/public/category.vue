<template>
    <div>
        <div class="title">条件搜索</div>
        <ul class="flex">
            <li class="flex">
                
                类别词中文名称	 
                <a-input placeholder="请输入类别词中文名称" style="width:150px ;margin-left:10px;" v-model="senglishWord"/>
            </li>
            <li class="flex">
                词汇英文名称	
                <a-input placeholder="请输入类别词英文名称"  style="width:150px;margin-left:10px;" v-model="sesglisgAb"/>
            </li>
             <li class="flex">
                 中文名称
                <a-input placeholder="请输入备注"  style="width:150px;margin-left:10px;" v-model="schineseWord"/>
            </li>
              <a-button icon="search"  style="margin-right:10px;" type="primary" @click="search">查询</a-button>
              <a-button icon="close"  style="margin-right:10px;" @click="clear">清空</a-button>

        </ul>  


        <div class="title" style="margin-top:20px;">所有类别词</div>
        
        <div style="margin-bottom:20px">
            <a-button icon="plus"  style="margin-right:10px;" @click="addnew">新增</a-button>
            <a-button icon="edit"  style="margin-right:10px;" @click="openEdit" :disabled="ischangeone==0? true:false">修改</a-button>
            <a-button icon="delete"  style="margin-right:10px;" @click="showConfirm" :disabled="ischangeone==0?true:false">删除</a-button>
        </div>
          <a-modal
          :title="title"
          v-model="add_newenglish"
          @ok="click_categoryWord"
            okText="保存"
            cancelText="取消"
        >
         <ul>
           <li class="flex" style="margin-bottom:10px;justify-content:flex-end;width:85%;  ">
             中文名称：  <a-input placeholder="请输入中文名称：" style="width:250px ;margin-left:10px;" v-model="chineseWord"/>

           </li>
           <li class="flex" style="margin-bottom:10px;justify-content:flex-end ;width:85%; ">
            英文全称：  <a-input placeholder="请输入英文全称：" style="width:250px ;margin-left:10px;" v-model="esglisgAb"/>
           </li>
           <li class="flex" style="margin-bottom:10px;justify-content:flex-end ;width:85%;  ">
             英文缩写：  <a-input placeholder="请输入英文缩写：" style="width:250px ;margin-left:10px;" v-model="englishWord"/>
           </li>
           <li class="flex" style="margin-bottom:10px;justify-content:flex-end ;width:85%;  ">
             备注：  <a-input placeholder="请输入备注：" style="width:250px ;margin-left:10px;" v-model="remark"/>
           </li>
         </ul>
        </a-modal>
        <div >
            <a-table  :columns="columns" :dataSource="data" :rowSelection="rowSelection" >
                <a slot="name" slot-scope="text" href="javascript:;">{{text}}</a>
            </a-table>
        </div>
    </div>
</template>

<script>

import { categoryWord , categoryWordAdd  ,categoryWordEdit , categoryWordDel} from  "../../api/interface"

const columns = [{
  title: '中文名称',
  dataIndex: 'chineseWord',
  scopedSlots: { customRender: 'chineseWord' },
}, {
  title: '英文全称',
  dataIndex: 'englishWord',
}, {
  title: '英文缩写',
  dataIndex: 'esglisgAb',
},{
  title: '备注',
  dataIndex: 'remark',
},{
  title: '修订人',
  dataIndex: 'optUser',
},{
  title: '修订时间',
  dataIndex: 'optDate',
}];

export default {
  data() {
    return {
      data:[],
      columns,
      title:'新增类别词',
      add_newenglish:false,
      //弹窗内input绑定
      englishWord:'',
      esglisgAb:'',
      chineseWord:'',
      remark:'',
      //搜索input绑定
      senglishWord:'',
      sesglisgAb:'',
      schineseWord:'',
      ischangeone:0,//是否只选择了一行数据，0为不是，1是
      // ischoose:0,//
      delArray:'',
      add_click:0,
      edit_click:0,
      choseId:''
    }
  },
  created(){//刚创建时候
    this.senglishWord='';
    this.sesglisgAb='';
    this.schineseWord='';
    this.showcategoryWor();
  },
  computed: {
    rowSelection() {
      var self = this;
      const { selectedRowKeys } = this;
      return {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
          // if(selectedRows.length == 0){
          //   self.ischoose = 0;
          // }else{
          //   self.ischoose = 1;
          // }
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
          self.delArray= '';
          for(var i in selectedRows){
              self.delArray += selectedRows[i].id + ',';//选中的选项值拼成字符串
          }
          console.log(self.delArray)
          if(selectedRows.length == 1){//如果只选了一个的时候
            this.ischangeone = 1;
            this.choseId = selectedRows[0].id;
            this.englishWord=selectedRows[0].englishWord;
            this.esglisgAb=selectedRows[0].esglisgAb;
            this.chineseWord=selectedRows[0].chineseWord;
            this.remark=selectedRows[0].remark
            // this.id = selectedRows[0].id;
            // this.name = selectedRows[0].name;
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
  destroyed: function () {
    // console.log("我已经离开了!");
  },
  methods: {
    search(){
        this.showcategoryWor();
    },
    clear(){//清空搜索条件
        this.senglishWord='';
        this.sesglisgAb='';
        this.schineseWord='';
    },
    //展示类别词列表的方法(搜索)
    showcategoryWor(){
      var self = this;
      categoryWord({
        'pageNo':1,
        'rowNo':10,
        'englishWord':self.senglishWord,
        'esglisgAb':self.sesglisgAb,
        'chineseWord':self.schineseWord,
      }).then(res=>{
        if(res.returnCode==200){//新增成功
            self.data  = res.data.row;
        }
      })
    },
    //展示列表方法
    AddcategoryWord(){
        var self = this;
        categoryWordAdd({
          'englishWord':self.englishWord,
          'esglisgAb':self.esglisgAb,
          'chineseWord':self.chineseWord,
          'remark':self.remark,
        }).then(res=>{
          if(res.returnCode==200){//新增成功
              // self.getList();
              this.add_newenglish =  false;
              setTimeout(function(){
                  self.senglishWord='';
                  self.sesglisgAb='';
                  self.schineseWord='';
                  self.showcategoryWor();
              },100)
          }
        })
    },
    editcategoryWord(){//修改类别词方法
      var self = this;
      categoryWordEdit({
          'id':self.choseId,
          'englishWord':self.englishWord,
          'esglisgAb':self.esglisgAb,
          'chineseWord':self.chineseWord,
          'remark':self.remark
      }).then(res=>{
           if(res.returnCode==200){//修改成功
              // self.getList();
              this.add_newenglish =  false;
              setTimeout(function(){
                   self.senglishWord='';
                  self.sesglisgAb='';
                  self.schineseWord='';
                  self.showcategoryWor();
              },100)
          }
      })
    },
    click_categoryWord(){//新增/修改类别词
      var self = this;
      if(self.add_click == 1 && self.edit_click == 0){//新增
        self.AddcategoryWord();
      }else if(self.add_click == 0 && self.edit_click == 1){//修改
        self.editcategoryWord();
      }
    },
    openEdit(){//打开修改弹窗
      this.add_newenglish =  true;
      this.title = '修改类别词',
      this.add_click = 0;
      this.edit_click =1;
    },
    
    addnew(){//打开新增弹窗
        this.add_newenglish =  true;
        this.title = '新增类别词';
        this.englishWord = '';
        this.esglisgAb = '';
        this.chineseWord = '';
        this.remark = '';
        this.add_click = 1;
        this.edit_click = 0;
    },
    // 打开删除弹窗
    showConfirm() {//询问是否删除
      var self = this;
        this.$confirm({
          title: '是否确认要删除?',
          content: '按下确认后，所选内容将在1秒钟后删除',
          okText:'确认',
          cancelText:'取消',
          keyboard:false,
          onOk() {
            self.delWord();
            return new Promise((resolve, reject) => {
              setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
            }).catch(() => console.log('Oops errors!'));
          },
          onCancel() {},
        });
     
    },
    delWord(){//删除类别词
     var self = this;
      var tmp = self.delArray;
      tmp = tmp.substring(0,tmp.length-1);
      categoryWordDel({
        'categoryWordId':tmp
      }).then(res=>{
        setTimeout(function(){
               self.senglishWord='';
              self.sesglisgAb='';
              self.schineseWord='';
              self.showcategoryWor();
          },100)
      });
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
