<template>
  <div>
    <div class="content_ content_top">
    <div class="title_">条件搜索</div>
      <ul class="flex" style="flex-wrap:wrap">
      <li class="flex">
        元数据名称
        <a-input placeholder="请输入元数据名称" style="width:150px ;margin-left:10px;" v-model="smetadataId"/>
      </li>
      <li class="flex">
        中文名称
        <a-input placeholder="请输入中文名称"  style="width:150px;margin-left:10px;" v-model="schineseName"/>
      </li>
      <li class="flex">
        类别词
        <a-input placeholder="请输入类别词"  style="width:150px;margin-left:10px;" v-model="scategoryWordId"/>
      </li>
      <li class="flex">
        数据项分类
        <a-input placeholder="请输入数据项分类"  style="width:150px;margin-left:10px;" v-model="smetadataAlias"/>
      </li>
      <li class="flex">
        创建人
        <a-input placeholder="请输入创建人"  style="width:150px;margin-left:10px;" v-model="soptUser"/>
      </li>
      <li class="flex">
        创建起始日期
        <a-date-picker @change="onChange"  placeholder="选择日期" style="width:150px;margin-left:10px;"/>
      </li>
      <li class="flex">
        创建结束日期
        <a-date-picker @change="onChange"   placeholder="选择日期" style="width:150px;margin-left:10px;"/>
      </li>
      <a-button icon="search"  style="margin-right:10px;" type="primary" @click="goSearch">查询</a-button>
      <a-button icon="close"  style="margin-right:10px;" @click="emptyIpt">清空</a-button>

    </ul>
    </div>
    <div class="content_ content_bottom">
      <div class="title_">元数据管理</div>

      <div style="margin-bottom:20px">
        <a-button class="operation_btn" icon="plus"  style="margin-right:10px;" @click="addnew">新增</a-button>
        <a-button class="operation_btn" icon="edit"  style="margin-right:10px;"  @click="editnew" :disabled="ischangeone">修改</a-button>
        <a-button class="operation_btn" icon="delete" :disabled="ischangeone" @click="deleteOperation">删除</a-button>
        <a-button class="operation_btn" icon="swap" @click="showServiceModel">关联服务场景</a-button>
        <a-button class="operation_btn" icon="save" @click="openPast">过时数据</a-button>
        <a-button class="operation_btn" icon="save"  @click="openReview">评审元数据</a-button>
        <a-button class="operation_btn" icon="save" @click="expertData">导出XML</a-button>
        <a-button class="operation_btn" icon="save" @click="expertExcel">导出EXCEL</a-button>
      </div>

      <div>
        <div class="scroll_table_border">
          <a-table :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}" :pagination="{
          pageSize: pageSize,
          onShowSizeChange: onShowSizeChange,
          total: total,
          onChange: pageonChange}" :columns="columns" :dataSource="data" ></a-table>
        </div>
      </div>
    </div>
<!--      弹框 start-->
      <a-modal
        :title="title"
        v-model="add_newenglish"
        @ok="click_meta"
        okText="保存"
        cancelText="取消"
      >
        <ul>
          <li class="flex" style="margin-bottom:10px;justify-content:flex-end;width:85%;  ">
            元数据名称  <font color="#ff0000"></font><a-input :disabled="isDisabled" placeholder="请输入元数据名称" style="width:250px ;margin-left:10px;" v-model="metadataId"/>
          </li>
          <li class="flex" style="margin-bottom:10px;justify-content:flex-end ;width:85%; ">
            中文名称  <font color="#ff0000"></font><a-input :disabled="isDisabled" placeholder="请输入中文名称" style="width:250px ;margin-left:10px;"  v-model="chineseName"/>
          </li>
          <li class="flex" style="margin-bottom:10px;justify-content:flex-end ;width:85%;  ">
            英文全称
            <a-input placeholder="请输入英文全称" style="width:250px ;margin-left:10px;" v-model="metadataName"/>
          </li>
          <li class="flex" style="margin-bottom:10px;justify-content:flex-end ;width:85%;  ">
            类别词  <a-select class="add_ipt" defaultValue="请类别词" v-model="categoryWordId">
            <a-select-option v-for="item in categoryWordList" value="item.id">
              {{ item.name }}
            </a-select-option>
          </a-select>
          </li>
          <li class="flex" style="margin-bottom:10px;justify-content:flex-end ;width:85%;  " >
            类型  <a-select class="add_ipt" defaultValue="请选择类型" v-model="type">
            <a-select-option value="1">
              使用
            </a-select-option>
            <a-select-option value="0">
              退役
            </a-select-option>
          </a-select>
          </li>
          <li class="flex" style="margin-bottom:10px;justify-content:flex-end ;width:85%;  ">
            长度  <a-input placeholder="请输入长度" style="width:250px ;margin-left:10px; " v-model="length"/>
          </li>
          <li class="flex" style="margin-bottom:10px;justify-content:flex-end ;width:85%;  ">
            精度  <a-input placeholder="请输入精度" style="width:250px ;margin-left:10px;" v-model="scale"/>
          </li>
          <li class="flex" style="margin-bottom:10px;justify-content:flex-end ;width:85%;  ">
            数据项分类  <a-input placeholder="请输入数据项分类" style="width:250px ;margin-left:10px;" v-model="dataCategory"/>
          </li>
          <li class="flex" style="margin-bottom:10px;justify-content:flex-end ;width:85%;  ">
            状态  <a-select class="add_ipt" defaultValue="请选择状态" v-model="status">
            <a-select-option value="1">
              使用
            </a-select-option>
            <a-select-option value="0">
              退役
            </a-select-option>
          </a-select>
          </li>
          <li class="flex" style="margin-bottom:10px;justify-content:flex-end ;width:85%;  ">
            备注  <a-input placeholder="请输入备注" style="width:250px ;margin-left:10px;" v-model="remark"/>
          </li>
          <li class="flex" style="margin-bottom:10px;justify-content:flex-end ;width:85%;  ">
            默认值  <a-input placeholder="请输入默认值" style="width:250px ;margin-left:10px;" v-model="defaultValue"/>
          </li>
        </ul>
      </a-modal>
<!--    弹框 end-->

    <a-modal class="linkService" :title="linkTitle"
             v-model="linkService" :footer="null">
      <a-tree showLine :defaultExpandedKeys="['0-0-0']" @select="onSelect">
        <a-tree-node key="0-0">
          <span slot="title" style="color: #1890ff">parent 1</span>
          <a-tree-node title="parent 1-0" key="0-0-0">
            <a-tree-node title="leaf" key="0-0-0-0" />
            <a-tree-node title="leaf" key="0-0-0-1" />
            <a-tree-node title="leaf" key="0-0-0-2" />
          </a-tree-node>
          <a-tree-node title="parent 1-1" key="0-0-1">
            <a-tree-node title="leaf" key="0-0-1-0" />
          </a-tree-node>
          <a-tree-node title="parent 1-2" key="0-0-2">
            <a-tree-node title="leaf" key="0-0-2-0" />
            <a-tree-node title="leaf" key="0-0-2-1" />
          </a-tree-node>
        </a-tree-node>
      </a-tree>
    </a-modal>
  </div>
</template>

<script>
  import {metadataList, metadataAdd, metadataEdit} from  "../../../api/interface"

  const columns = [
    {
      title: '元数据名称',
      dataIndex: 'metadataId'
    },{
    title: '中文名称',
    dataIndex: 'chineseName'
  },{
      title: '英文名称',
      dataIndex: 'metadataName'
    }, {
    title: '类别词',
    dataIndex: 'cateword'
  },{
    title: '类型',
    dataIndex: 'metaType'
  },{
    title: '长度',
    dataIndex: 'length'
  },{
    title: '精度',
    dataIndex: 'scale'
  },{
    title: '数据项分类',
    dataIndex: 'dataCategory'
  },{
    title: '状态',
    dataIndex: 'status'
  },{
    title: '操作用户',
    dataIndex: 'optUser'
  },{
    title: '操作时间',
    dataIndex: 'optDate'
  },{
    title: '备注',
    dataIndex: 'remark'
  },{
    title: '默认值',
    dataIndex: 'defaultValue'
  }]
  let data = [
    {
      chineseName: '中文名',
      metadataName: '英文名',
      cateword: '类别词',
      metaType: '类型',
      length: '3',
      scale: '0.2',
      status: '1234',
      optDate: '1234',
      remark: 'jjjjjj',
      defaultValue: '1234',
      metadataId: 'faccdde45667'
    }
  ]
  export default {
    data () {
      return {
        columns,
        data,
        categoryWordList: [], // 类别词集合
        selectedRowKeys: [],
        selectedArrStr: '',
        pageNo: 1,
        pageSize: 5,
        currentPage: 1,
        total: 7,
        title:"新增元数据",
        linkTitle: '关联服务场景',
        add_newenglish:false,
        linkService: false, // 关联服务场景弹窗
        add_click:0,
        edit_click:0,
        //添加或者修改弹窗input绑定
        optUser:'',
        metadataId:'',
        chineseName:'',
        metadataName:'',
        categoryWordId:'',
        type:'',
        length:'',
        scale:'',
        dataCategory:'',
        status:'',
        remark:'',
        defaultValue:'',
        //搜索条件input绑定
        smetadataId:'',
        smetadataName:'',
        schineseName:'',
        smetadataAlias:'',
        sstatus:'',
        sversion:'',
        soptUser:'',
        sstartDate:'',
        sendDate:'',
        scategoryWordId:'',
        sdataCategory:'',
        delArray:'',
        ischangeone: true, // 控制
        dataInfo: {},// 详情
        isDisabled: true // 是否可编辑
      }
    },
    created () {

    },
    mounted () {
      this.emptyIpt() // 清空

      this.metaList() // 展示
    },
    methods: {
      goSearch () { // 搜索
        this.metaList()
      },
      emptyIpt () { // 清空
        this.smetadataName = ''
        this.smetadataId = ''
        this.schineseName = ''
        this.smetadataAlias = ''
        this.sstatus = ''
        this.sversion = ''
        this.soptUser = ''
        this.sstartDate = ''
        this.sendDate = ''
        this.scategoryWordId = ''
        this.sdataCategory = ''
      },
      openPast () { // 触发父组件事件
        this.$emit('goPast', '')
      },
      openReview () { // 触发父组件事件
        this.$emit('goReview', '')
      },
      // 清空弹框输入
      emptyAddIpt () {
        this.optUser = ''
        this.metadataId = ''
        this.chineseName = ''
        this.metadataName = ''
        this.categoryWordId = ''
        this.type = ''
        this.length = ''
        this.scale = ''
        this.dataCategory = ''
        this.status = ''
        this.remark = ''
        this.defaultValue = ''
      },
      addnew () { // 新增
        this.add_newenglish = true
        this.title = '新增元数据'
        this.add_click = 1
        this.edit_click = 0
        this.isDisabled = false

        this.emptyAddIpt()
      },
      editnew () { // 编辑
        let length = this.selectedRowKeys.length
        if (length == 1) {
          this.add_newenglish = true
          this.title = '修改元数据'
          this.add_click = 0
          this.edit_click = 1
          this.isDisabled = true

          this.data.map((item, index) => {
            if(item.metadataId == this.selectedArrStr) {
              this.dataInfo = item
            }
          })
          let info = this.dataInfo
          this.optUser = info.optUser
          this.metadataId = info.metadataId
          this.chineseName = info.chineseName
          this.metadataName = info.metadataName
          this.categoryWordId = info.categoryWordId
          this.type = info.type
          this.length = info.length
          this.scale = info.scale
          this.dataCategory = info.dataCategory
          this.status = info.status
          this.remark = info.remark
          this.defaultValue = info.defaultValue
        } else {
          this.$message.warn('不能同时选中多个数据进行修改')
        }

      },
      click_meta () {
        if(this.add_click == 1 && this.edit_click == 0) {
          this.add_meta()
        }else if(this.add_click == 0 && this.edit_click == 1) {
          this.edit_meta()
        }
      },
      // 树形图选中
      onSelect (selectedKeys, info) {
        console.log('selected', selectedKeys, info);
      },
      //关联服务场景
      showServiceModel () {
        this.linkService = true
      },
      //获取列表
      metaList () {
        let self = this
        metadataList({
          'pageNo': self.currentPage,
          'rowNo': self.pageSize,
          'metadataId': self.smetadataId,
          'metadataName': self.smetadataName,
          'chineseName': self.schineseName,
          'metadataAlias': self.smetadataAlias,
          'status': self.sstatus,
          'version': self.sversion,
          'optUser': self.soptUser,
          'startDate': self.sstartDate,
          'endDate': self.sendDate,
          'categoryWordId': self.scategoryWordId,
          'dataCategory': self.sdataCategory
        }).then(res => {
          if(res.returnCode == 200) {
            console.log(res.data.row)
            this.data = res.data.row
            this.total = res.data.resultCount
          }
        })
      },
      add_meta () {
        var self = this
        metadataAdd({
          'metadataId': self.metadataId,
          'chineseName': self.chineseName,
          'metadataName': self.metadataName,
          'categoryWordId': self.categoryWordId,
          'type': self.type,
          'length': self.length,
          'scale': self.scale,
          'dataCategory': self.dataCategory,
          'status': self.status,
          'remark': self.remark,
          'defaultValue': self.defaultValue
        }).then(res => {
          if(res.returnCode == 200) {
            self.add_newenglish =  false;
            this.metaList()
          }
        })
      },
      edit_meta () {//修改
        metadataEdit({
          'metadataId':self.metadataId,
          'chineseName':self.chineseName,
          'metadataName':self.metadataName,
          'categoryWordId':self.categoryWordId,
          'type':self.type,
          'length':self.length,
          'scale':self.scale,
          'dataCategory':self.dataCategory,
          'status':self.status,
          'remark':self.remark,
          'defaultValue':self.defaultValue
        }).then(res => {
          if(res.returnCode == 200){
            self.add_newenglish =  false;
          }
        })
      },
      // 删除操作
      deleteOperation () {
        let metadataIds = this.selectedArrStr
        let url = '/metadata/deletes'
        let params = {
          metadataIds: metadataIds
        }
        let response = (res) => {
          this.metaList()
        }
        if (metadataIds) {
          this.$store.state.getMoreDataStringPost(url, params, response)
        }
      },
      // 导出数据
      expertData () {
        let url = '/metadata/export'
        let params = {}
        let response = (res) => {
          this.$message.success('导出成功')
        }

        this.$store.state.getMoreDataStringPost(url, params, response)
      },
    // 导出数据
    expertExcel () {
      let url = '/resourceExporter/export'
      let params = {}
      let response = (res) => {
        this.$message.success('导出成功')
      }

      this.$store.state.getMoreDataStringPost(url, params, response)
    },
      handleOk (e) {
        this.ModalText = 'The modal will be closed after two seconds';
        this.confirmLoading = true;
        setTimeout(() => {
          this.visible = false;
          this.confirmLoading = false;
        }, 2000);
      },
      handleCancel (e) {
        console.log('Clicked cancel button');
        this.visible = false
      },
      // 改变日期
      onChange (date, dateString) {
        console.log(date, dateString)
      },
      // 切换分页
      pageonChange (pageNumber) {
        let pageSize = this.pageSize
        this.currentPage = pageNumber
        this.getLogList(pageNumber, pageSize)
      },
      // 改变size
      onShowSizeChange (current, pageSize) {
        console.log(current, pageSize)
      },
      // checkbox操作
      onSelectChange (selectedRowKeys) {
        console.log(selectedRowKeys)
        if(selectedRowKeys.length != 0) {
          this.ischangeone = false
        } else {
          this.ischangeone = true
        }
        let idArr = []
        selectedRowKeys.map((item) => {
          idArr.push(this.data[item].metadataId)
        })
        this.selectedRowKeys = selectedRowKeys
        this.selectedArrStr = idArr.join()
        this.metadataId = this.selectedArrStr
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped type="less">
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

  .table-operations > button {
    margin-right: 8px;
  }
  .operation_btn{
    margin:0 10px 10px 0;
  }
  .add_ipt{
    width:250px;
    margin-left:10px;
  }

</style>

