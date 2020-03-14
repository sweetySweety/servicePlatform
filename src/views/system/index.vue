<template>
  <a-layout id="components-layout-demo-top-side-2">
    <headshow :items="['2']"></headshow>
    <a-layout>
      <a-layout-sider width="250"
                      style="background: #f0f0f0;padding:10px;">
        <a-input-search style="margin-bottom: 8px"
                        placeholder="Search"
                        @change="ontChange" />
        <a-tree @expand="onExpand"
                :expandedKeys="expandedKeys"
                :autoExpandParent="autoExpandParent"
                :treeData="systemList"
                @select="gosystem"
                @rightClick="showMenu">
        </a-tree>
      </a-layout-sider>

      <a-tabs :style="{ padding: '24px', margin: 0, minHeight: '280px',width:'100%'}"
              v-model="activeKey"
              type="editable-card"
              @edit="onEdit"
              @change=" onChange"
              hideAdd>
        <a-tab-pane v-for="pane in panes"
                    :tab="pane.title"
                    :key="pane.key"
                    :closable="pane.closable"
                    style="overflow-y:scroll; maxHeight:'100px">
          <conditioSearch @goNewspaper="goNewspaper"
                          @goAgreementManage="goAgreementManage"
                          @goSystemInfoList="goSystemInfoList"
                          @goFileManage="goFileManage"
                          v-if="pane.key=='/system/system'"></conditioSearch>
          <keep-alive v-else>

            <router-view @goNewspaperHistory="goNewspaperHistory"
                         @goNewspaperEditHistory="goNewspaperEditHistory"
                         @goServicemess="goServicemess"
                         @goSinfoSumit="goSinfoSumit"
                         @getHeadId="getHeadId"
                         :headId="headId"
                         :sendSystemId="sendSystemId"></router-view>

          </keep-alive>
        </a-tab-pane>
      </a-tabs>

    </a-layout>
  </a-layout>
</template>

<script>
import headshow from '../../components/menu.vue'
import conditioSearch from '../system/system'
const x = 3
const y = 2
const z = 1
const gData = []

// import { getOrgTree, getServiceList } from '@/api/manage'
export default {

  data () {
    const panes = [
      { title: '系统管理', content: '', key: '/system/system' }
    ]
    return {
      openKeys: ['key-01'],
      activeKey: panes[0].key,
      panes,
      newTabIndex: 0,
      expandedKeys: [],
      searchValue: '',
      autoExpandParent: true,
      gData,
      systemList: [],
      headId: '', // 报文头Id
      sendSystemId: '' // 传到子组件的systemId
    }
  },
  components: {
    headshow,
    conditioSearch
  },
  mounted () {
    this.getSystemList()
  },
  methods: {
    showMenu () {

    },
    getHeadId (id) {
      this.headId = id// 报文头Id
    },
    goServicemess () {
      let panes = this.panes
      let activeKey = `/system/servicemess`
      let isSave = 0 // 是否存在此tab 0 不存在 1存在
      panes.map((item, index) => {
        if (item.key == activeKey) {
          isSave = 1
        }
      })
      if (isSave == 1) {
        this.activeKey = activeKey
        this.$router.push(activeKey)
      } else {
        panes.push({ title: 'DTS业务报文头', content: `Content of new Tab ${activeKey}`, key: activeKey })
        this.panes = panes
        this.activeKey = activeKey
        this.$router.push(activeKey)
      }
    },
    // 报文头修订历史记录
    goNewspaperEditHistory () {
      let panes = this.panes
      let activeKey = `/system/newspaperEditHistory`
      let isSave = 0 // 是否存在此tab 0 不存在 1存在
      panes.map((item, index) => {
        if (item.key == activeKey) {
          isSave = 1
        }
      })
      if (isSave == 1) {
        this.activeKey = activeKey
        this.$router.push(activeKey)
      } else {
        panes.push({ title: '报文头修订记录', content: `Content of new Tab ${activeKey}`, key: activeKey })
        this.panes = panes
        this.activeKey = activeKey
        this.$router.push(activeKey)
      }
    },
    // 报文头历史记录
    goNewspaperHistory () {
      let panes = this.panes
      let activeKey = `/system/newspaperHistory`
      let isSave = 0 // 是否存在此tab 0 不存在 1存在
      panes.map((item, index) => {
        if (item.key == activeKey) {
          isSave = 1
        }
      })
      if (isSave == 1) {
        this.activeKey = activeKey
        this.$router.push(activeKey)
      } else {
        panes.push({ title: '报文头历史', content: `Content of new Tab ${activeKey}`, key: activeKey })
        this.panes = panes
        this.activeKey = activeKey
        this.$router.push(activeKey)
      }
    },
    // 去协议管理
    goAgreementManage () {
      let panes = this.panes
      let activeKey = `/system/agreementManage`
      let isSave = 0 // 是否存在此tab 0 不存在 1存在
      panes.map((item, index) => {
        if (item.key == activeKey) {
          isSave = 1
        }
      })
      if (isSave == 1) {
        this.activeKey = activeKey
        this.$router.push(activeKey)
      } else {
        panes.push({ title: '协议管理', content: `Content of new Tab ${activeKey}`, key: activeKey })
        this.panes = panes
        this.activeKey = activeKey
        this.$router.push(activeKey)
      }
    },
    // 去系统信息提交审核
    goSinfoSumit () {
      let panes = this.panes
      let activeKey = `/system/systemInfoSubmit`
      let isSave = 0 // 是否存在此tab 0 不存在 1存在
      panes.map((item, index) => {
        if (item.key == activeKey) {
          isSave = 1
        }
      })
      if (isSave == 1) {
        this.activeKey = activeKey
        this.$router.push(activeKey)
      } else {
        panes.push({ title: '提交审核', content: `Content of new Tab ${activeKey}`, key: activeKey })
        this.panes = panes
        this.activeKey = activeKey
        this.$router.push(activeKey)
      }
    },
    // 去报文头管理
    goNewspaper () {
      let panes = this.panes
      let activeKey = `/system/newspaper`
      let isSave = 0 // 是否存在此tab 0 不存在 1存在
      panes.map((item, index) => {
        if (item.key == activeKey) {
          isSave = 1
        }
      })
      if (isSave == 1) {
        this.activeKey = activeKey
        this.$router.push(activeKey)
      } else {
        panes.push({ title: '报文头管理', content: `Content of new Tab ${activeKey}`, key: activeKey })
        this.panes = panes
        this.activeKey = activeKey
        this.$router.push(activeKey)
      }
    },
    //  去系统信息管理
    goSystemInfoList () {
      let panes = this.panes
      let activeKey = `/system/systemInfoList`
      let isSave = 0 // 是否存在此tab 0 不存在 1存在
      panes.map((item, index) => {
        if (item.key == activeKey) {
          isSave = 1
        }
      })
      if (isSave == 1) {
        this.activeKey = activeKey
        this.$router.push(activeKey)
      } else {
        panes.push({ title: '系统信息详情管理', content: `Content of new Tab ${activeKey}`, key: activeKey })
        this.panes = panes
        this.activeKey = activeKey
        this.$router.push(activeKey)
      }
    },
    // 去文件管理
    goFileManage () {
      let panes = this.panes
      let activeKey = `/system/fileManage`
      let isSave = 0 // 是否存在此tab 0 不存在 1存在
      panes.map((item, index) => {
        if (item.key == activeKey) {
          isSave = 1
        }
      })
      if (isSave == 1) {
        this.activeKey = activeKey
        this.$router.push(activeKey)
      } else {
        panes.push({ title: '文件管理', content: `Content of new Tab ${activeKey}`, key: activeKey })
        this.panes = panes
        this.activeKey = activeKey
        this.$router.push(activeKey)
      }
    },
    gosystem (selectedKeys, info) {
      // debugger
      let thisTable = info.selectedNodes[0].data.props
      this.sendSystemId = thisTable.systemId

      // console.log('selected', selectedKeys, info);
      let title = thisTable.text
      let isIN
      if (title) {
        isIN = title.substring(title.length - 2)
      }

      if (isIN == '接口') {
        if (title.length > 2) {
          if (title == '消费方接口') {
            let panes = this.panes
            let activeKey = `/system/interfaceType`
            let isSave = 0 // 是否存在此tab 0 不存在 1存在
            panes.map((item, index) => {
              if (item.key == activeKey) {
                isSave = 1
              }
            })
            if (isSave == 1) {
              this.activeKey = activeKey
              this.$router.push(activeKey)
            } else {
              panes.push({ title: title, content: `Content of new Tab ${activeKey}`, key: activeKey })
              this.panes = panes
              this.activeKey = activeKey
              this.$router.push(activeKey)
            }
          } else if (title == '提供方接口') {
            let panes = this.panes
            let activeKey = `/system/interfaceTypeOffer`
            let isSave = 0 // 是否存在此tab 0 不存在 1存在
            panes.map((item, index) => {
              if (item.key == activeKey) {
                isSave = 1
              }
            })
            if (isSave == 1) {
              this.activeKey = activeKey
              this.$router.push(activeKey)
            } else {
              panes.push({ title: title, content: `Content of new Tab ${activeKey}`, key: activeKey })
              this.panes = panes
              this.activeKey = activeKey
              this.$router.push(activeKey)
            }
          } else {
            let panes = this.panes
            let activeKey = `/system/interface`
            let isSave = 0 // 是否存在此tab 0 不存在 1存在
            panes.map((item, index) => {
              if (item.key == activeKey) {
                isSave = 1
              }
            })
            if (isSave == 1) {
              this.activeKey = activeKey
              this.$router.push(activeKey)
            } else {
              panes.push({ title: title, content: `Content of new Tab ${activeKey}`, key: activeKey })
              this.panes = panes
              this.activeKey = activeKey
              this.$router.push(activeKey)
            }
          }
        }
      } else {
        if (title == '报文头') {
          let panes = this.panes
          let activeKey = `/system/system`
          let isSave = 0 // 是否存在此tab 0 不存在 1存在
          panes.map((item, index) => {
            if (item.key == activeKey) {
              isSave = 1
            }
          })
          if (isSave == 1) {
            this.activeKey = activeKey
            this.$router.push(activeKey)
          } else {
            panes.push({ title: title, content: `Content of new Tab ${activeKey}`, key: activeKey })
            this.panes = panes
            this.activeKey = activeKey
            this.$router.push(activeKey)
          }
        } else if (title == '系统') {
          let panes = this.panes
          let activeKey = `/system/system`
          let isSave = 0 // 是否存在此tab 0 不存在 1存在
          panes.map((item, index) => {
            if (item.key == activeKey) {
              isSave = 1
            }
          })
          if (isSave == 1) {
            this.activeKey = activeKey
            this.$router.push(activeKey)
          } else {
            panes.push({ title: '系统管理', content: `Content of new Tab ${activeKey}`, key: activeKey })
            this.panes = panes
            this.activeKey = activeKey
            this.$router.push(activeKey)
          }
        } else if (title.indexOf('测试') > -1) {
          let panes = this.panes
          let activeKey = `/system/interface`
          let isSave = 0 // 是否存在此tab 0 不存在 1存在
          panes.map((item, index) => {
            if (item.key == activeKey) {
              isSave = 1
            }
          })
          if (isSave == 1) {
            this.activeKey = activeKey
            this.$router.push(activeKey)
          } else {
            panes.push({ title: title, content: `Content of new Tab ${activeKey}`, key: activeKey })
            this.panes = panes
            this.activeKey = activeKey
            this.$router.push(activeKey)
          }
        }
      }
    },
    remove (targetKey) {
      let activeKey = this.activeKey
      let lastIndex
      this.panes.forEach((pane, i) => {
        if (pane.key === targetKey) {
          lastIndex = i - 1
        }
      })
      const panes = this.panes.filter(pane => pane.key !== targetKey)
      if (lastIndex >= 0 && activeKey === targetKey) {
        activeKey = panes[lastIndex].key
      }
      this.panes = panes
      this.activeKey = activeKey
      this.$router.push(activeKey)
    },
    onExpand (expandedKeys) {
      this.expandedKeys = expandedKeys
      this.autoExpandParent = false
    },
    ontChange (e) {
      const value = e.target.value
      const expandedKeys = dataList.map((item) => {
        if (item.key.indexOf(value) > -1) {
          return getParentKey(item.key, gData)
        }
        return null
      }).filter((item, i, self) => item && self.indexOf(item) === i)
      Object.assign(this, {
        expandedKeys,
        searchValue: value,
        autoExpandParent: true
      })
    },
    onChange (activeKey) {
      // console.log(activeKey,33333333333333,pagePath)
      this.$router.push(activeKey)
    },

    goenglish () {
      if (localStorage.eng == null || localStorage.eng == 0) {
        const panes = this.panes
        const activeKey = `/public/english`
        // const pagePath =  `/platform/rolemaintenance`;
        panes.push({ title: `英文单词及缩写管理`, content: `Content of new Tab ${activeKey}`, key: activeKey })
        this.panes = panes
        this.activeKey = activeKey
        this.$router.push(activeKey)
        localStorage.eng = activeKey
      } else {
        this.activeKey = localStorage.eng
        this.$router.push(localStorage.eng)
      }
    },
    onEdit (targetKey, action) {
      this[action](targetKey)
    },

    // 获取系统列表
    getSystemList () {
      let url = '/interface/getLeftTree'
      let params = {
        // systemIds: 'all'
      }
      let response = (res) => {
        console.log(res)
        let obj = res.data
        obj.map((item) => {
          // this.$set(item,'children',[])
          this.$set(item, 'title', item.text)
          this.$set(item, 'key', item.id)
          let children = item.children
          if (children != null) {
            children.map((item) => {
              this.$set(item, 'title', item.text)
              this.$set(item, 'key', item.id)
              let systemId = item.id

              this.getInterfaceList(systemId, obj)

              // item.children = [{'title':'接口',children:[]}]
            })
          }
        })
        this.systemList = obj
        console.log(this.systemList)
      }

      this.$store.state.getMoreDataGet(url, params, response)
    },

    // 获取接口列表
    getInterfaceList (systemId, obj) {
      let url = '/interface/getLeftTree/subtree/system'
      let params = {
        systemId: systemId
      }
      let response = (res) => {
        let objres = res.data
        objres.map((item) => {
          this.$set(item, 'title', item.text)
          this.$set(item, 'key', item.id)
          this.$set(item, 'systemId', systemId)

          let children = item.children
          if (children != null) {
            children.map((item) => {
              this.$set(item, 'title', item.text)
              this.$set(item, 'key', item.id)
              this.$set(item, 'systemId', systemId)
              let interchildren = item.children
              if (interchildren != null) {
                interchildren.map((item) => {
                  this.$set(item, 'title', item.text)
                  this.$set(item, 'key', item.id)
                  this.$set(item, 'systemId', systemId)
                })
              }
            })
          }
        })

        obj.map((item) => {
          // this.$set(item,'children',[])
          let children = item.children
          if (children != null) {
            children.map((item) => {
              if (systemId == item.id) {
                item.children = objres
              }
            })
          }
        })
      }

      this.$store.state.getMoreDataGet(url, params, response)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.table-operations {
  margin-bottom: 16px;
}

.table-operations > button {
  margin-right: 8px;
}
</style>
