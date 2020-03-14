<template>
  <div>

    <ul class="flex">
      <li class="flex">
        接口标签
        <a-input placeholder="请输入机构代码"
                 style="width:250px ;margin:0 10px 0 10px;" />
      </li>
      <li>
        <a-button icon="save"
                  style="margin-right:10px;"
                  @click="saveinterfacetag">保存</a-button>
        <a-button icon="edit"
                  style="margin-right:10px;"
                  @click="versionHistory">版本历史</a-button>
      </li>
    </ul>
    <div class="title"
         style="margin-top:20px;">基本信息</div>
    <a-table :columns="infocolumns"
             :dataSource="infodata"
             :pagination="false">

    </a-table>

    <div class="title"
         style="margin-top:20px;">接口定义信息</div>
    <div style="margin-bottom:20px">
      <a-button icon="delete"
                style="margin-right:10px;"
                @click="showDelfirm">删除</a-button>
      <a-button icon="save"
                style="margin-right:10px;">保存</a-button>
      <a-button icon="arrow-up"
                style="margin-right:10px;"
                :disabled="isChangeOne"
                @click="moveUp">上移</a-button>
      <a-button icon="arrow-down"
                style="margin-right:10px;"
                :disabled="isChangeOne"
                @click="moveDown">下移</a-button>

      <a-button icon="folder"
                style="margin-right:10px;"
                @click="commitauditing">提交审核</a-button>
      <a-button icon="folder-open"
                style="margin-right:10px;"
                @click="auditing">审核</a-button>
      <a-button icon="file"
                style="margin-right:10px;"
                @click="publish">发布</a-button>
      <a-button icon="edit"
                style="margin-right:10px;"
                @click="com_amendment">强制修订</a-button>
      <a-button icon="plus"
                style="margin-right:10px;"
                @click="showServiceModel">关联服务场景</a-button>
    </div>
    <div>
      <a-table :columns="columns"
               :dataSource="data"
               :pagination="true"
               :rowSelection="rowSelection">
        <!-- <template v-for="col in ['structName', 'structAlias', 'metaType','length','required','remark',]"
                  :slot="col"
                  slot-scope="text, record, index">
          <span :key="col">
            <a-input v-if="record.editable"
                     style="width: 100px"
                     :value="text"
                     @change="e => handleChange(e.target.value, record.key, col)" />
            <template v-else>{{text}}</template>
          </span>
        </template> -->
        <template slot="operation"
                  slot-scope="text, record, index">
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

    <!-- 提交审核 -->
    <a-modal title="提交审核"
             v-model="commit_auditing_visible"
             okText="提交审核"
             cancelText="取消"
             @ok="commitCheck">
      <li class="flex"
          style="margin-bottom:10px;justify-content:flex-end;width:85%;  ">
        通知ESB：
        <a-select class="add_ipt"
                  defaultValue=""
                  v-model="esbuser"
                  @change="choseUser"
                  style="width:250px ;margin-left:10px;">
          <a-select-option v-for="(esbuser,index) in esbuserData"
                           :key="index"
                           :value="esbuser.id">{{esbuser.name}}</a-select-option>
        </a-select>
      </li>
      <li class="flex"
          style="margin-bottom:10px;justify-content:flex-end ;width:85%;  ">
        优先级：
        <a-select class="add_ipt"
                  defaultValue="请选择类型"
                  v-model="Priority"
                  @change="checkLevel"
                  style="width:250px ;margin-left:10px;">
          <a-select-option value="2">
            高
          </a-select-option>
          <a-select-option value="1">
            中
          </a-select-option>
          <a-select-option value="0">
            低
          </a-select-option>
        </a-select>
      </li>
      <li class="flex"
          style="margin-bottom:10px;justify-content:flex-end;width:85%;  ">
        备注说明：
        <a-textarea placeholder=""
                    style="width:250px ;margin-left:10px;"
                    v-model="checkremarks" />
      </li>
    </a-modal>
    <!-- 审核 -->
    <a-modal title="审核"
             v-model="auditing_visible"
             okText="审核通过"
             cancelText="驳回"
             @ok="handleOk"
             @cancel="handleCancel">
      <li class="flex"
          style="margin-bottom:10px;justify-content:flex-end;width:85%;  ">
        审核意见：
        <a-textarea placeholder=""
                    style="width:250px ;margin-left:10px;"
                    v-model="auditing_advice" />
      </li>
    </a-modal>
    <!-- 版本发布 -->
    <a-modal title="版本发布"
             v-model="publish_visible"
             okText="发布"
             cancelText="取消"
             @ok="publishinterface">
      <li class="flex"
          style="margin-bottom:10px;justify-content:flex-end;width:85%;  ">
        接口名称：
        <span style="width:250px ;margin-left:10px;">{{interfaceName}}</span>
      </li>
      <li class="flex"
          style="margin-bottom:10px;justify-content:flex-end;width:85%;  ">
        版本号：
        <span style="width:250px ;margin-left:10px;">{{versionCode}}</span>
      </li>
      <li class="flex"
          style="margin-bottom:10px;justify-content:flex-end;width:85%;  ">
        发布说明：
        <a-input placeholder=""
                 style="width:250px ;margin-left:10px;"
                 v-model="publishdetail" />
      </li>
      <li class="flex"
          style="margin-bottom:10px;justify-content:flex-end;width:85%;  ">
        通知ESB：
        <a-select class="add_ipt"
                  defaultValue=""
                  v-model="publishuser"
                  @change="chosepublishUser"
                  style="width:250px ;margin-left:10px;">
          <a-select-option v-for="(esbuser,index) in esbuserData"
                           :key="index"
                           :value="esbuser.id">{{esbuser.name}}</a-select-option>
        </a-select>
      </li>
    </a-modal>
    <a-modal title="强制修订"
             v-model="com_amendment_visible"
             okText="确定">
      <li class="flex"
          style="margin-bottom:10px;justify-content:flex-end;width:85%;  ">
        该接口已经是修订状态！
      </li>
    </a-modal>
    <!-- 关联服务场景 -->
    <a-modal class="linkService"
             v-model="linkService"
             :footer="null">
      <a-tree showLine
              :defaultExpandedKeys="['0-0-0']"
              @select="onSelect">
        <a-tree-node key="0-0">
          <span slot="title"
                style="color: #1890ff">parent 1</span>
          <a-tree-node title="parent 1-0"
                       key="0-0-0">
            <a-tree-node title="leaf"
                         key="0-0-0-0" />
            <a-tree-node title="leaf"
                         key="0-0-0-1" />
            <a-tree-node title="leaf"
                         key="0-0-0-2" />
          </a-tree-node>
          <a-tree-node title="parent 1-1"
                       key="0-0-1">
            <a-tree-node title="leaf"
                         key="0-0-1-0" />
          </a-tree-node>
          <a-tree-node title="parent 1-2"
                       key="0-0-2">
            <a-tree-node title="leaf"
                         key="0-0-2-0" />
            <a-tree-node title="leaf"
                         key="0-0-2-1" />
          </a-tree-node>
        </a-tree-node>
      </a-tree>
    </a-modal>
  </div>
</template>

<script>
const infocolumns = [
  {
    title: '交易码',
    dataIndex: 'ecode',
    scopedSlots: { customRender: 'ecode' }
  }, {
    title: '交易名称',
    dataIndex: 'interfaceName',
    scopedSlots: { customRender: 'interfaceName' }
  }, {
    title: '交易状态',
    dataIndex: 'status',
    scopedSlots: { customRender: 'status' }
  }, {
    title: '报文头',
    dataIndex: 'name',
    scopedSlots: { customRender: 'name' }
  }, {
    title: '功能描述',
    dataIndex: 'desc',
    scopedSlots: { customRender: 'desc' }
  }, {
    title: '版本号',
    dataIndex: 'versionId',
    scopedSlots: { customRender: 'versionId' }
  }, {
    title: '更新时间',
    dataIndex: 'optDate',
    scopedSlots: { customRender: 'optDate' }
  }, {
    title: '更新用户',
    dataIndex: 'optUser',
    scopedSlots: { customRender: 'optUser' }
  }
]

const infodata = []
const columns = [{
  title: '字段名称',
  dataIndex: 'structName',
  scopedSlots: { customRender: 'structName' }
}, {
  title: '字段别名',
  dataIndex: 'structAlias',
  scopedSlots: { customRender: 'structAlias' }
}, {
  title: '类型',
  dataIndex: 'metaType',
  scopedSlots: { customRender: 'metaType' }
},
{
  title: '长度',
  dataIndex: 'length',
  scopedSlots: { customRender: 'length' }
}, {
  title: '是否必输',
  dataIndex: 'required',
  scopedSlots: { customRender: 'required' }
}, {
  title: '备注',
  dataIndex: 'remark',
  scopedSlots: { customRender: 'remark' }
}, {
  title: '属性',
  dataIndex: '',
  scopedSlots: { customRender: '' }
}, {
  title: '操作',
  dataIndex: 'operation',
  key: 'operation',
  scopedSlots: { customRender: 'operation' }
}]

const data = []
const allTagData = []
export default {

  data () {
    const panes = [
      { title: '系统管理', content: '', key: '/system/system' }
    ]
    return {
      data,
      columns,
      infocolumns,
      infodata,
      allTagData,
      panes: '',
      isChangeOne: true,
      interfaceName: '',
      interfaceStatus: '',
      versionCode: '',
      selectedId: '',
      rowSelection: {
        onSelect: (record, selected, selectedRows) => {
          this.selectedId = record.id
          this.isChangeOne = false
        },
        type: 'radio'
      },
      auditing_advice: '',
      checkresult: 'true',
      esbuser: '',
      esbuserData: [],
      checkremarks: '',
      userID: '',
      esbUserId: '',
      Priority: '',
      publishdetail: '',
      publishuserid: '',
      publishuser: '',
      auditing_visible: false,
      commit_auditing_visible: false,
      com_amendment_visible: false,
      publish_visible: false,
      linkService: false
    }
  },
  computed: {
    // rowSelection () {
    //   const { selectedRowKeys } = this
    //   return {
    //     onChange: (selectedRowKeys, selectedRows) => {
    //       this.selectedId = selectedRows[0].id
    //       console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
    //     },
    //     getCheckboxProps: record => ({
    //       props: {
    //         disabled: record.name === 'Disabled User', // Column configuration not to be checked
    //         name: record.name
    //       }
    //     })
    //   }
    // }
  },
  mounted () {
    this.getTagsForInterface()
    this.getInterInfo()
    this.getInterList()
  },
  methods: {
    // 保存接口标签
    saveinterfacetag () {
      let url = '/tag/interface'
      let params = {
        interfaceId: 'UPP0001',
        Tag: this.allTagData
      }
      let response = (res) => {
        console.log('保存所有标签========' + res.data)
      }

      this.$store.state.getMoreDataPost(url, params, response)
    },
    // 版本历史
    versionHistory () {
      // this.$emit('goFileManage', '')

      let panes = this.panes
      let activeKey = `/system/interfaceTagHistory`
      let isSave = 0 // 是否存在此tab 0 不存在 1存在
      // panes.map((item, index) => {
      //   if (item.key == activeKey) {
      //     isSave = 1
      //   }
      // })
      if (isSave == 1) {
        this.activeKey = activeKey
        this.$router.push(activeKey)
      } else {
        // panes.push({ title: `接口发布历史`, content: `Content of new Tab ${activeKey}`, key: activeKey })
        this.panes = panes
        this.activeKey = activeKey
        this.$router.push(activeKey)
      }
    },
    // 查询接口的所有标签
    getTagsForInterface () {
      let url = '/tag/getTagsForInterface'
      let params = {
        interfaceId: 'UPP0001'
      }
      let response = (res) => {
        this.allTagData = res.data
      }

      this.$store.state.getMoreDataGet(url, params, response)
    },
    getInterInfo () {
      let url = '/interface/getInterById'

      let params = {
        interfaceId: 'UPP0001'
      }
      let response = (res) => {
        this.infodata.push(res.data)
        this.interfaceName = res.data.interfaceName
        this.versionCode = res.data.version.code
        this.interfaceStatus = res.data.status
      }

      this.$store.state.getMoreDataGet(url, params, response)
    },
    getInterList () {
      // let url = '/interface/getInterById'
      let url = '/ida/getInterfaces'

      let params = {
        interfaceId: 'UPP0001'
      }
      let response = (res) => {
        let newdata = []
        for (var i in res.data.rowNo) {
          newdata.push(res.data.rowNo[i])
        }
        this.data = newdata
      }

      this.$store.state.getMoreDataGet(url, params, response)
    },
    // 删除提示
    showDelfirm () {
      let _self = this
      this.$confirm({
        title: '是否确认要删除?',
        // content: '按下确认后，所选内容将在1秒钟后删除',
        okText: '确认',
        cancelText: '取消',
        keyboard: false,
        onOk () {
          _self.deleteinter()
        },
        onCancel () { }
      })
    },
    deleteinter () {
      let url = '/ida/delete'
      let params = {
        ids: this.selectedId
      }
      let response = (res) => {
        if (res.returnCode === 200) {
          this.getInterList()
        }
      }

      this.$store.state.getMoreDataDelete(url, params, response)
    },
    moveUp () {
      let url = '/ida/moveUp'
      let params = {
        id: this.selectedId
      }
      let response = (res) => {
        if (res.returnCode === 200) {
          this.getInterList()
        }
      }
      this.$store.state.getMoreDataGet(url, params, response)
    },
    moveDown () {
      let url = '/ida/moveDown'
      let params = {
        id: this.selectedId
      }
      let response = (res) => {
        if (res.returnCode === 200) {
          this.getInterList()
        }
      }
      this.$store.state.getMoreDataGet(url, params, response)
    },
    // 审核
    interfaceCheck () {
      let url = '/interface/interfaceCheck'
      let params = {
        interfaceId: 'UPP0001',
        checkOpinion: this.auditing_advice,
        checkResult: this.checkresult
      }
      let response = (res) => {
      }
      this.$store.state.getMoreDataPost(url, params, response)
    },
    handleOk () {
      this.checkresult = 'true'
      this.interfaceCheck()
    },
    handleCancel () {
      this.checkresult = 'false'
      this.interfaceCheck()
    },
    // 弹出审核
    auditing () {
      this.auditing_visible = true
    },
    choseUser (value) {
      this.esbUserId = `${value}`
    },
    checkLevel (value) {
      this.Priority = `${value}`
    },
    // 提交审核
    commitCheck () {
      let url = '/interface/submitInterfaceCheck'
      let params = {
        interfaceId: 'UPP0001', // 接口id
        esbUserId: this.esbUserId, // 用户id
        priority: this.Priority, // 优先级 √
        remark: this.checkremarks // 备注
      }
      let response = (res) => {
        this.esbuserData = res.data
      }
      this.$store.state.getMoreDataPost(url, params, response)
    },
    // 弹出提交审核
    commitauditing () {
      this.commit_auditing_visible = true
      let url = '/user/getServiceGovAll'
      let params = {
      }
      let response = (res) => {
        this.esbuserData = res.data
      }
      this.$store.state.getMoreDataGet(url, params, response)
    },
    chosepublishUser (value) {
      this.publishuserid = `${value}`
    },
    // 发布
    publishinterface () {
      let url = '/interface/interfaceRelease'
      let params = {
        interfaceIds: 'UPP0001',
        versionDesc: this.publishdetail,
        userId: this.publishuserid
      }
      let response = (res) => {
        this.esbuserData = res.data
      }
      this.$store.state.getMoreDataPost(url, params, response)
    },
    // 弹出发布
    publish () {
      if (this.interfaceStatus === '3') {
        this.publish_visible = true
        let url = '/user/getServiceGovAll'
        let params = {

        }
        let response = (res) => {
          this.esbuserData = res.data
        }
        this.$store.state.getMoreDataGet(url, params, response)
      } else {
        // 该接口已是修订状态
        this.$confirm({
          title: '发布',
          content: '接口状态为审核通过才可发布',
          okText: '确认',
          cancelText: '取消'
        })
      }
    },
    // 强制修订
    com_amendment () {
      if (this.interfaceStatus === '0') {
        // 该接口已是修订状态
        this.$confirm({
          title: '强制修订',
          content: '该接口已是修订状态',
          okText: '确认',
          cancelText: '取消'
        })
      } else {
        let url = '/interface/revise'
        let params = {
          interfaceIds: 'UPP0001'
        }
        let response = (res) => {
          console.log(res)
        }
        this.$store.state.getMoreDataPost(url, params, response)
      }
    },
    // 关联服务场景
    showServiceModel () {
      this.linkService = true
      let url = '/operation/getByInterfaceId'
      let params = {
        interfaceIds: 'UPP0001'
      }
      let response = (res) => {
        console.log(res)
      }
      this.$store.state.getMoreDataPost(url, params, response)
    },
    // 树形图选中
    onSelect (selectedKeys, info) {
      console.log('selected', selectedKeys, info)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
}
.flex {
  display: flex;
  display: -webkit-flex;
  align-items: center;
}
ul {
  list-style: none;
  padding: 0;
}
li {
  margin-right: 10px;
}
#components-layout-demo-top-side-2 .logo {
  width: 120px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
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
