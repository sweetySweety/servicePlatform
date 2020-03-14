<template>
  <div>
    <div class="content_ content_top">
      <div class="title_">枚举映射</div>
    <ul class="flex" style="flex-wrap:wrap">
      <li class="flex">
        主代码名称
        <a-input placeholder="请输入名称" v-model="enumName" class="search_ipt"/>
      </li>
      <li class="flex">
        从代码名称
        <a-input placeholder="请输入中文名称"  v-model="slaveName" class="search_ipt"/>
      </li>
    </ul>
    </div>

    <div class="content_ content_bottom">
      <div class="title_">枚举映射</div>

      <div style="margin-bottom:20px">
        <a-button icon="delete"  style="margin-right:10px;" @click="deleteLink" :disabled="ischangeone">删除映射关系</a-button>
        <a-button icon="save"  style="margin-right:10px;" @click="saveLink" :disabled="ischangeone">保存映射关系</a-button>
        <a-button icon="edit"  style="margin-right:10px;" @click="changeLink" :disabled="ischangeone">改变映射方向</a-button>
      </div>

      <div>
        <a-table :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}" :columns="columns" :dataSource="data"></a-table>
      </div>
    </div>

    <a-modal
      title="新增公共代码"
      v-model="add_newData"
      @ok="handleOk"
      okText="保存"
      cancelText="取消"
    >
      <ul>
        <li class="flex" style="margin-bottom:10px;justify-content:flex-end ;width:85%; ">
          代码名称：  <a-input placeholder="" v-model="dataName" class="add_ipt"/>

        </li>
        <li class="flex" style="margin-bottom:10px;justify-content:flex-end ;width:85%; ">
          中文名称：  <a-input placeholder="请输入单词缩写" v-model="dataRemark" class="add_ipt"/>
        </li>
        <li class="flex" style="margin-bottom:10px;justify-content:flex-end ;width:85%;  ">
          是否标准代码：
          <a-select class="add_ipt" defaultValue="" v-model="dataIsStandard">
            <a-select-option value="1">
              是
            </a-select-option>
            <a-select-option value="0">
              否
            </a-select-option>
          </a-select>
        </li>
        <li class="flex" style="margin-bottom:10px;justify-content:flex-end ;width:85%;  ">
          是否主代码： <a-select class="add_ipt" defaultValue="" v-model="dataIsMaster">
          <a-select-option value="1">
            是
          </a-select-option>
          <a-select-option value="0">
            否
          </a-select-option>
        </a-select>
        </li>
        <li class="flex" style="margin-bottom:10px;justify-content:flex-end ;width:85%;  ">
          数据来源：  <a-input placeholder="请输入单词备注：" v-model="dataSource" class="add_ipt"/>
        </li>
        <li class="flex" style="margin-bottom:10px;justify-content:flex-end ;width:85%;  ">
          代码状态：
          <a-select class="add_ipt" defaultValue="" v-model="dataStatus">
            <a-select-option value="1">
              使用
            </a-select-option>
            <a-select-option value="0">
              退役
            </a-select-option>
          </a-select>
        </li>
      </ul>
    </a-modal>
  </div>
</template>

<script>
  const columns = [
    {
      title: '主代码名称',
      dataIndex: 'name'
    }, {
      title: '主代码枚举名称',
      dataIndex: 'isStandard'
    }, {
      title: '从代码枚举名称',
      dataIndex: 'isMaster'
    }
  ]

  let data = [
    {
      detail: '1234',
      typeStr: '1234',
      userId: 'jjjjjjjjjjjjjjjjdxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
      time: '1234'
    }
  ]

  export default {
    props: [
      'enumId', // 主代码
      'slaveId' // 从代码

    ],
    data () {
      return {
        data,
        columns,
        add_newData: false,
        selectedRowKeys: [],
        selectedArrStr: '',
        message: '',
        ischangeone: false, // 控制
        // 新增公共代码 start
        dataName: '',
        dataIsStandard: '',
        dataIsMaster: '',
        dataSource: '',
        dataStatus: '',
        dataVersion: '',
        dataRemark: '',
        dataProcessId: '',
        currentenumId: this.enumId,
        currentslaveId: this.slaveId,
        // 新增公共代码 end
        // search 参数 start
        enumName: '', // 主代码
        slaveName: '' // 从代码
        // search 参数 end
      }
    },
    mounted () {
      this.getDataList()

      this.getDataInfo(this.currentenumId)
      this.getDataInfo(this.currentslaveId)
    },
    computed: {

    },
    destroyed () {

    },
    methods: {
      // 获取详情
      getDataInfo (id) {
        let url = '/enum/getEnumByMasterId'
        let params = {
          id: id
        }
        let response = (res) => {
          let enumId = this.currentenumId
          let obj = res.data
          if(id === enumId) {
            this.enumName = obj.name
          } else {
            this.slaveName = obj.name
          }


        }
        this.$store.state.getMoreDataStringPost(url, params, response)
      },
      openManage () { // 触发父组件事件
        let length = this.selectedRowKeys.length

        if(length == 1) {
          this.$emit('goManage', '')
          this.getEnumId()
        } else {
          this.$message.warn('不能同时选中多个数据进行修改')
        }
      },
      // 获取选中的id
      getEnumId () {
        this.$emit('getEnumId', this.selectedArrStr)
      },
      addnew () { // 新增窗口
        this.add_newData = true
      },
      // 搜索
      goSearch () {
        this.getDataList()
      },
      // 获取映射列表
      getDataList () {
        let url = '/enum/getElementMappingSToM'
        let params = {
          masterId: this.currentenumId,
          slaveId: this.currentslaveId
        }
        let response = (res) => {
          this.data = res.data.row
        }
        this.$store.state.getMoreDataGet(url, params, response)
      },

      // 保存映射关系
      saveLink () {
        let url = '/enum/saveElementMapping'
        let params = {
          SLAVEID: this.currentslaveId,
          REMARK: this.slaveName
        }
        let response = (res) => {
          this.getDataList()
        }
        this.$store.state.getMoreDataPost(url, params, response)
      },
      // 删除操作
      deleteLink () {
        let url = '/enum/deleteElementsMapping'
        let params = {
          SLAVEID: this.currentslaveId,
          MASTERID: this.currentenumId
        }
        let response = (res) => {
          this.getDataList()
        }
        this.$store.state.getMoreDataDelete(url, params, response)
      },
      // 改变映射关系
      changeLink () {
        let url = '/enum/getMasterElements'
        let params = {
          SLAVEID: this.currentslaveId,
          MASTERID: this.currentenumId
        }
        let response = (res) => {
          this.getDataList()
        }
        this.$store.state.getMoreDataPost(url, params, response)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
  .add_ipt{
    width:250px;
    margin-left:10px;
  }
  .search_ipt{
    width:150px;
    margin-left:10px;
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

  .table-operations > button {
    margin-right: 8px;
  }
</style>

