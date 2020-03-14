<template>
    <div>
      <div class="content_ content_top">
        <div class="title_">报文头信息</div>
        <ul class="flex" style="flex-wrap:wrap">
            <li class="flex">
                报文头名称
                <a-input placeholder="" v-model="name" :disabled="true" style="width:150px ;margin-left:10px;"/>
            </li>
            <li class="flex">
                 备注
                <a-input placeholder="" v-model="note"  :disabled="true" style="width:250px;margin-left:10px;"/>
            </li>
             <li class="flex">
                描述
                <a-input placeholder=""  v-model="spec" :disabled="true" style="width:150px;margin-left:10px;"/>
            </li>
        </ul>
      </div>


      <div class="content_ content_bottom">
<!--        <div class="title_">报文头信息</div>-->
        <div style="margin-bottom:20px">
            <a-button icon="edit"  style="margin-right:10px;" :disabled="isChangeOne" @click="moveUp">上移</a-button>

            <a-button icon="edit"  style="margin-right:10px;" :disabled="isChangeOne" @click="moveDown">下移</a-button>

<!--            <a-button icon="delete"  style="margin-right:10px;" @click="saveOperation">保存</a-button>-->
            <a-button icon="delete"  style="margin-right:10px;" :disabled="isChangeOne" @click="deleteOperation">删除</a-button>

        </div>

        <div>
<!--          <a-table :rowSelection="rowSelection"  :columns="columns" :dataSource="data"/>-->
          <a-table

            :columns="columns"
            :dataSource="data"
            :pagination="false"
            :rowSelection="rowSelection"
          >
            <template
              v-for="col in ['text', 'append1', 'append2','append4','append5','append6',]"
              :slot="col"
              slot-scope="text, record, index"
            >
              <span :key="col">
                <a-input
                  v-if="record.editable"
                  style="width: 100px"
                  :value="text"
                  @change="e => handleChange(e.target.value, record.key, col)"
                />
                <template v-else
                >{{text}}</template
                >
              </span>
            </template>
            <template slot="operation" slot-scope="text, record, index">
              <div class="editable-row-operations">
        <span v-if="record.editable">
          <a @click="() => save(record,record.key)">保存</a>
<!--          <a-popconfirm title="Sure to cancel?" @confirm="() => cancel(record.key)">-->
<!--            <a>Cancel</a>-->
<!--          </a-popconfirm>-->
        </span>
                <span v-else>
          <a @click="() => edit(record.key)">编辑</a>
        </span>
              </div>
            </template>

<!--            <span slot="operation" slot-scope="text" class="table-operation">-->
<!--              <a href="javascript:;">编辑</a>-->
<!--              <a-dropdown>-->
<!--          <a-menu slot="overlay">-->
<!--            <a-menu-item @click="getAction">-->
<!--              Action 1-->
<!--            </a-menu-item>-->
<!--            <a-menu-item>-->
<!--              Action 2-->
<!--            </a-menu-item>-->
<!--          </a-menu>-->

<!--          <a href="javascript:;"> 更多操作 <a-icon type="down" /> </a>-->
<!--        </a-dropdown>-->
<!--      </span>-->
          </a-table>
        </div>

      </div>
        <a-modal
          title="新增英文单词"
          v-model="add_newenglish"
          @ok="handleOk"
          okText="保存"
          cancelText="取消"
        >
          <ul>
            <li class="flex" style="margin-bottom:10px;justify-content:flex-end;width:85%;  ">
              英文单词：  <a-input placeholder="请输入英文单词：" style="width:250px ;margin-left:10px;"/>

            </li>
            <li class="flex" style="margin-bottom:10px;justify-content:flex-end ;width:85%; ">
              单词缩写：  <a-input placeholder="请输入单词缩写：" style="width:250px ;margin-left:10px;"/>
            </li>
            <li class="flex" style="margin-bottom:10px;justify-content:flex-end ;width:85%;  ">
              单词中文：  <a-input placeholder="请输入    单词中文：" style="width:250px ;margin-left:10px;"/>
            </li>
            <li class="flex" style="margin-bottom:10px;justify-content:flex-end ;width:85%;  ">
              单词备注：  <a-input placeholder="请输入单词备注：" style="width:250px ;margin-left:10px;"/>
            </li>
          </ul>
        </a-modal>
    </div>
</template>

<script>
const columns = [{
  title: '字段名',
  dataIndex: 'text',
  scopedSlots: { customRender: 'text' }
}, {
  title: '字段别名',
  dataIndex: 'append1',
  scopedSlots: { customRender: 'append1' }
}, {
  title: '类型/长度',
  dataIndex: 'append2',
  scopedSlots: { customRender: 'append2' }
}, {
  title: '元数据',
  dataIndex: 'append4',
  scopedSlots: { customRender: 'append4' }
}, {
  title: '是否必输',
  dataIndex: 'append5',
  scopedSlots: { customRender: 'append5' }
}, {
  title: '备注',
  dataIndex: 'append6',
  scopedSlots: { customRender: 'append6' }
},{
  title: '操作',
  dataIndex: 'operation',
  key: 'operation',
  scopedSlots: { customRender: 'operation' },
}]
const data = [

  ]



export default {

  data () {
    return {
      data,
      columns,
      rowSelection:{
        onChange: (selectedRowKeys, selectedRows) => {
          //console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
          if(selectedRows.length == 1){
            this.isChangeOne = false
            this.selectedId = selectedRows[0].id
          }else{
            this.isChangeOne = true
          }
        },
        type: 'checkbox'
      },
      customClick: record => ({
        on: { // 事件
          click: () => {
            //this.selectedId = record.id
            //console.log(this.selectedId)
          },
        },
      }),
      selectedId: '',
      add_newenglish: false,
      selectedRowKeys: [],
      selectedArrStr: '',
      isChangeOne: true,
      dataObj: {},
      headId: '',
      name: '',
      note: '',
      spec: ''
    }
  },
  mounted () {
    this.getInfo()
  },
  destroyed: function () {

  },
  methods: {
    callbackMethods(){
      // do something
    },
    otherMethods(){
      // do something
    },
    handleChange(value, key, column) {
      const newData = [...this.data];
      const target = newData.filter(item => key === item.key)[0];
      if (target) {
        target[column] = value;
        this.data = newData;
      }
    },
    edit(key) {
      console.log(key)
      const newData = [...this.data];
      const target = newData.filter(item => key === item.key)[0];
      if (target) {
        target.editable = true;
        this.data = newData;
      }
    },
    save(record,key) {
      const newData = [...this.data];
      const target = newData.filter(item => key === item.key)[0];
      //console.log(record)
      //console.log(newData)
      if (target) {
        delete target.editable;
        this.data = newData;
        //this.cacheData = newData.map(item => ({ ...item }));
        this.saveSubmit(newData)
      }

    },
    saveSubmit(sdas){
      let url = '/sda/commonSaveSDA';
      let params = {
        headId: this.headId,
        sdas: sdas
      };
      let response = () => {
        this.getTreeList()
      };

      this.$store.state.getMoreDataPost(url,params,response)
    },

    handleOk () {

    },
    getAction (item){
      console.log(item)
    },
    getInfo () {
      let url = '/interfaceHead/getCommonHead'
      let params = {}
      let response = (res) => {
        let obj = res.data
        this.headId = obj.headId
        this.name = obj.headName
        this.note = obj.headRemark
        this.spec = obj.headDesc

        this.getTreeList()
      }

      this.$store.state.getMoreDataGet(url, params, response)
    },
    // 获取报文头树状列表
    getTreeList () {
      let url = '/sda/getSDATreeByHeadId'
      let params = {
        headId: this.headId
      }
      let response = (res) => {
        let lists = res.data
        lists.map((item, index) => {
          this.$set(item, 'key', item.id);
          item.children.map((item, index) =>{
            this.$set(item, 'key', item.id);
          })
        })
        this.data = lists
        console.log(this.data)
      }

      this.$store.state.getMoreDataStringPost(url, params, response)
    },
    // 上移
    moveUp () {
      let url = '/sda/moveUp'
      let params = {
        id: this.selectedId
      }
      let response = (res) => {
        this.$message.success('上移成功')
        this.getTreeList()
      }

      this.$store.state.getMoreDataStringPost(url, params, response)
    },
    // 下移
    moveDown () {
      let url = '/sda/moveDown'
      let params = {
        id: this.selectedId
      }
      let response = (res) => {
        this.$message.success('下移成功')
        this.getTreeList()
      }

      this.$store.state.getMoreDataStringPost(url, params, response)
    },
    saveOperation () {
      let url = 'sda/commonSaveSDA'
      let params = {
        sdas: this.dataObj
      }
      let response = (res) => {

      }

      this.$store.state.getMoreDataPost(url, params, response)
    },
    //删除
    deleteOperation(){
      let url = '/sda/deleteSvcSda'
      let params = {
        delIds: this.selectedId
      }
      let response = (res) => {
        //this.$message.success('下移成功')
        this.getTreeList()
      }

      this.$store.state.getMoreDataStringPost(url, params, response)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .content_{
    border: 1px solid #cccccc;
    border-radius: 4px;
    padding: 10px;
    margin-bottom: 20px;
  }
  .title_{
    padding-bottom: 15px;
    margin-bottom: 10px;
    border-bottom: 1px solid #cccccc;
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
    margin-bottom: 10px;
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
  .ant-table table{
    text-align: left;
  }

.table-operations > button {
  margin-right: 8px;
}
</style>
