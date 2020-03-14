<template>
 <a-layout id="components-layout-demo-top-side-2">
    <a-layout-header class="header">
      <div class="logo" />
      <a-menu
        theme="dark"
        mode="horizontal"
        :defaultSelectedKeys="['2']"
        :style="{ lineHeight: '64px' }"
      >
        <a-menu-item key="1">公共信息</a-menu-item>
        <a-menu-item key="2">系统管理</a-menu-item>
        <a-menu-item key="3">服务管理</a-menu-item>
        <a-menu-item key="4">交易链路</a-menu-item>
        <a-menu-item key="5">统计报表</a-menu-item>
        <a-menu-item key="6">平台管理</a-menu-item>
        <a-menu-item key="7">我的工作台</a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout>
      <a-layout-sider width="200" style="background: #fff">
        <a-menu
          mode="inline"
          :defaultSelectedKeys="['1']"
          :defaultOpenKeys="['sub1']"
          :style="{ height: '100%', borderRight: 0 }"
        >
          <a-sub-menu key="sub1">
              <span slot="title"><a-icon type="user" />权限管理</span>
              <a-menu-item key="1">菜单管理</a-menu-item>
              </a-sub-menu>
          <a-sub-menu key="sub2">
              <span slot="title"><a-icon type="laptop" />用户管理</span>
              <a-menu-item key="2">用户维护</a-menu-item>
              <a-menu-item key="3">角色维护</a-menu-item>
              <a-menu-item key="4">机构管理</a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="sub3">
              <span slot="title"><a-icon type="notification" />日志管理</span>
              <a-menu-item key="5">系统日志</a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="sub4">
              <span slot="title"><a-icon type="notification" />生成类管理</span>
              <a-menu-item key="7">系统日志</a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="sub5">
              <span slot="title"><a-icon type="notification" />ESB管理</span>
              <a-menu-item key="8">系统日志</a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="sub6">
              <span slot="title"><a-icon type="notification" />字段处理办法</span>
          </a-sub-menu>
        </a-menu>
      </a-layout-sider>
      <a-layout style="padding: 0 24px 24px">

        <div style="margin-top:10px;">
          <div :style="{ marginBottom: '16px' }">
            <a-button @click="add">ADD</a-button>
          </div>
          <a-tabs
            hideAdd
            v-model="activeKey"
            type="editable-card"
            @edit="onEdit"
          >
          <a-tab-pane v-for="pane in panes" :tab="pane.title" :key="pane.key" :closable="pane.closable">

          </a-tab-pane>
        </a-tabs>
      </div>
        <!-- <a-layout-content :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px' }"> -->
          <!-- 原先普通展示content -->

        <!-- </a-layout-content> -->
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<script>
export default {

  data () {
    const panes = [ {title: 'Tab 1', content: '', key: '1'},
      { title: 'Tab 2', content: 'Content of Tab 2', key: '2' }
    ]
    return {
      activeKey: panes[0].key,
      panes,
      newTabIndex: 0,
      data,
      filteredInfo: null,
      sortedInfo: null,
      provinceData,
      cityData,
      cities: cityData[provinceData[0]],
      secondCity: cityData[provinceData[0]][0]
    }
  },
  computed: {
    columns () {
      let { sortedInfo, filteredInfo } = this;
      sortedInfo = sortedInfo || {}
      filteredInfo = filteredInfo || {}
      const columns = [{
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        filters: [
          { text: 'Joe', value: 'Joe' },
          { text: 'Jim', value: 'Jim' },
        ],
        filteredValue: filteredInfo.name || null,
        onFilter: (value, record) => record.name.includes(value),
        sorter: (a, b) => a.name.length - b.name.length,
        sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
      }, {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
        sorter: (a, b) => a.age - b.age,
        sortOrder: sortedInfo.columnKey === 'age' && sortedInfo.order,
      }, {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
        filters: [
          { text: 'London', value: 'London' },
          { text: 'New York', value: 'New York' },
        ],
        filteredValue: filteredInfo.address || null,
        onFilter: (value, record) => record.address.includes(value),
        sorter: (a, b) => a.address.length - b.address.length,
        sortOrder: sortedInfo.columnKey === 'address' && sortedInfo.order,
      }];
      return columns;
    }
  },
  methods: {
    onEdit (targetKey, action) {
      this[action](targetKey)
    },
    add () {
      const panes = this.panes
      const activeKey = `newTab${this.newTabIndex++}`
      panes.push({ title: `New Tab ${activeKey}`, content: `Content of new Tab ${activeKey}`, key: activeKey })
      this.panes = panes
      this.activeKey = activeKey
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
    },
     handleProvinceChange(value) {
      this.cities = cityData[value]
      this.secondCity = cityData[value][0]
    },
    handleChange (pagination, filters, sorter) {
      console.log('Various parameters', pagination, filters, sorter);
      this.filteredInfo = filters;
      this.sortedInfo = sorter;
    },
    clearFilters () {
      this.filteredInfo = null;
    },
    clearAll () {
      this.filteredInfo = null;
      this.sortedInfo = null;
    },
    setAgeSort () {
      this.sortedInfo = {
        order: 'descend',
        columnKey: 'age',
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
