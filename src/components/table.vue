<template>
    <div>
        <a-row style="margin-bottom:10px;" >
            <a-col :span="6"><a-input-search
            placeholder="input search text"
            style="width: 200px"
            @search="onSearch"
          />  </a-col>
            <a-col :span="6"></a-col>
            <a-col :span="6"></a-col>
            <a-col :span="6"></a-col>
          </a-row>
           <a-row style="margin-bottom:10px;">
            <a-col :span="8"  style="display:flex;align-items:center"> 服务代码
              <div style="margin-left:10px;">
                <a-select :defaultValue="provinceData[0]" style="width: 120px" @change="handleProvinceChange">
                  <a-select-option v-for="province in provinceData" :key="province">{{province}}</a-select-option>
                </a-select>
                <a-select v-model="secondCity" style="width: 120px">
                  <a-select-option v-for="city in cities" :key="city">{{city}}</a-select-option>
                </a-select>
              </div>
            </a-col>
             <a-col :span="8"  style="display:flex;align-items:center"> 服务代码
              <div style="margin-left:10px;">
                <a-select :defaultValue="provinceData[0]" style="width: 120px" @change="handleProvinceChange">
                  <a-select-option v-for="province in provinceData" :key="province">{{province}}</a-select-option>
                </a-select>
                <a-select v-model="secondCity" style="width: 120px">
                  <a-select-option v-for="city in cities" :key="city">{{city}}</a-select-option>
                </a-select>
              </div>
            </a-col>
          </a-row>
          <a-row  style="margin-bottom:10px;">
             <a-col :span="8"  style="display:flex;align-items:center"> 服务代码
              <div style="margin-left:10px;">
                <a-select :defaultValue="provinceData[0]" style="width: 120px" @change="handleProvinceChange">
                  <a-select-option v-for="province in provinceData" :key="province">{{province}}</a-select-option>
                </a-select>
                <a-select v-model="secondCity" style="width: 120px">
                  <a-select-option v-for="city in cities" :key="city">{{city}}</a-select-option>
                </a-select>
              </div>
            </a-col>
            <a-col :span="8"  style="display:flex;align-items:center"> 服务代码
              <div style="margin-left:10px;">
                <a-select :defaultValue="provinceData[0]" style="width: 120px" @change="handleProvinceChange">
                  <a-select-option v-for="province in provinceData" :key="province">{{province}}</a-select-option>
                </a-select>
                <a-select v-model="secondCity" style="width: 120px">
                  <a-select-option v-for="city in cities" :key="city">{{city}}</a-select-option>
                </a-select>
              </div>
            </a-col>
          </a-row>

           <a-row  style="margin-bottom:10px;">
             <a-col :span="8"  style="display:flex;align-items:center"> 服务代码
              <div style="margin-left:10px;">
                <a-select :defaultValue="provinceData[0]" style="width: 120px" @change="handleProvinceChange">
                  <a-select-option v-for="province in provinceData" :key="province">{{province}}</a-select-option>
                </a-select>
                <a-select v-model="secondCity" style="width: 120px">
                  <a-select-option v-for="city in cities" :key="city">{{city}}</a-select-option>
                </a-select>
              </div>
            </a-col>
            <a-col :span="8"  style="display:flex;align-items:center"> 服务代码
              <div style="margin-left:10px;">
                <a-select :defaultValue="provinceData[0]" style="width: 120px" @change="handleProvinceChange">
                  <a-select-option v-for="province in provinceData" :key="province">{{province}}</a-select-option>
                </a-select>
                <a-select v-model="secondCity" style="width: 120px">
                  <a-select-option v-for="city in cities" :key="city">{{city}}</a-select-option>
                </a-select>
              </div>
            </a-col>
            <a-col :span="6">  <a-button type="primary" icon="search">Search</a-button></a-col>
          </a-row>
             <br /><br />
          <div>
            <div class="table-operations">
              <a-button @click="setAgeSort">Sort age</a-button>
              <a-button @click="clearFilters">Clear filters</a-button>
              <a-button @click="clearAll">Clear filters and sorters</a-button>
            </div>
            <a-table :columns="columns" :dataSource="data" @change="handleChange" />
          </div>
          </div>
</template>
<script>
// import tablecontent from "./table";
const provinceData = ['Zhejiang', 'Jiangsu'];
const cityData = {
  Zhejiang: ['Hangzhou', 'Ningbo', 'Wenzhou'],
  Jiangsu: ['Nanjing', 'Suzhou', 'Zhenjiang'],
};
const data = [{
  key: '1',
  name: 'John Brown',
  age: 32,
  address: 'New York No. 1 Lake Park',
}, {
  key: '2',
  name: 'Jim Green',
  age: 42,
  address: 'London No. 1 Lake Park',
}, {
  key: '3',
  name: 'Joe Black',
  age: 32,
  address: 'Sidney No. 1 Lake Park',
}, {
  key: '4',
  name: 'Jim Red',
  age: 32,
  address: 'London No. 2 Lake Park',
}];

export default {
    data() {
    return {
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
    columns() {
      let { sortedInfo, filteredInfo } = this;
      sortedInfo = sortedInfo || {};
      filteredInfo = filteredInfo || {};
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
