<template>
    <div>
      <a-row type="flex">
        <a-col :span="6">
          <div id="myChart_sum" :style="currentStyle"></div>
        </a-col>
        <a-col :span="6">
          <div id="myChart_spend" :style="currentStyle"></div>
        </a-col>
        <a-col :span="6">
          <div id="myChart_provide" :style="currentStyle"></div>
        </a-col>
        <a-col :span="6">
          <div id="myChart_service" :style="lastStyle"></div>
        </a-col>
      </a-row>

      <div class="content">
        <a-row type="flex">
          <a-col :span="12">
            <a-row type="flex">
              <a-col :span="8">人员列表</a-col>
              <a-col :span="16">
                <a-radio-group v-model="size" style="margin-bottom: 16px">
                  <a-radio-button value="small">开发人员</a-radio-button>
                  <a-radio-button value="default">服务治理人员</a-radio-button>
                  <a-radio-button value="large">服务治理组长</a-radio-button>
                </a-radio-group>
              </a-col>
            </a-row>
            <a-table :columns="columns" :dataSource="data" :pagination="{
          pageSize: pageSize,
          onShowSizeChange: onShowSizeChange,
          total: total,
          onChange: onChange}">
              <a slot="name" slot-scope="text" href="javascript:;">{{text}}</a>
            </a-table>
          </a-col>
          <a-col :span="12">
            <div style="margin: 0 auto;" id="myChart_serviceStatus" :style="serviceStyle"></div>
          </a-col>
        </a-row>
      </div>
    </div>
</template>

<script>
const columns = [{
  title: '用户名称',
  dataIndex: 'name'
}, {
  title: '用户ID',
  dataIndex: 'age',
}, {
  title: '用户角色',
  dataIndex: 'address',
},{
  title: '当前任务总数',
  dataIndex: 'address2',
},{
  title: '本周完成数',
  dataIndex: 'address3',
},{
  title: '历史完成数',
  dataIndex: 'address4',
},{
  title: '操作',
  dataIndex: 'address5',
}
];
const data = [{
  key: '1',
  name: 'John Brown',
  age: 32,
  address: '测试测试k',
}, {
  key: '2',
  name: 'Jim Green',
  age: 42,
  address: '测试测试k',
}, {
  key: '3',
  name: 'Joe Black',
  age: 32,
  address: '测试测试k',
}, {
  key: '4',
  name: 'Joe Black',
  age: 32,
  address: '测试测试k',
}];
export default {

  data() {
    return {
        data,
      columns,
      myChartSum: [
        {value: 200, name:'总系统数',itemStyle: {
            color: '#87CEFA'
          }
        }
      ],
      myChartProvide: [
        {value: 200, name:'提供方系统数',itemStyle: {
            color: '#87CEFA'
          }
        }
      ],
      serviceSum: 30,
      serviceCount: 20,
      myChartSpend: [{value: 200, name:'消费方系统数',itemStyle: {
          color: '#87CEFA'
        }
      }],
      currentStyle: {
        width: '240px',
        height: '250px'
      },
      lastStyle: {
        width: '340px',
        height: '250px'
      },
      serviceStyle:  {
        width: '470px',
        height: '350px'
      },
      size: '',
      pageSize: 5,
      currentPage: 1,
      total: 7,
      personList:[
        {name: '人员列表'},
        {name: '服务治理人员'},
        {name: '人员列表'}
      ],
      checked1: false,
      checked2: false,
      checked3: false,
    }
  },
  mounted () {
    this.myChartCount();
    this.getUserList();
  },
  methods: {
    callback(val) {
      if (val = '') {
        this.getRoleUserList();
      }else if (val = '') {
        this.getRoleUserList();
      }else if (val = '') {
        this.getRoleUserList();
      }
    },
    // 切换分页
    onChange (pageNumber) {
      let pageSize = this.pageSize
      this.currentPage = pageNumber
      this.getUserList();
    },
    // 改变size
    onShowSizeChange (current, pageSize) {
      console.log(current, pageSize)
    },
    getSum(){
      let url = '/dataMain/getServiceColumn';
      let params = {};
      let response = (res) =>{
        let sum = res.ServiceSum
        this.myChartSum = [
          {value: sum, name:'总系统数',itemStyle: {
              color: '#87CEFA'
            }
          }
        ]
      };

      this.$store.state.getMoreDataGet(url,params, response)
    },
    getProvide(){
      let url = '/dataMain/getServiceColumn';
      let params = {};
      let response = (res) =>{
        let sum = res.ProvideSum
        this.myChartProvide = [
          {value: sum, name:'提供方系统数',itemStyle: {
              color: '#87CEFA'
            }
          }
        ]
      };

      this.$store.state.getMoreDataGet(url, params, response)
    },
    getServiceSum(){
      let url = '/dataMain/getProduceColumn';
      let params = {};
      let response = (res) =>{
        this.serviceSum = res.Sum
        this.serviceCount = res.ProduceSum
      };

      this.$store.state.getMoreDataGet(url, params, response)
    },
    getSpend(){
      let url = '/dataMain/getConsumeColumn';
      let params = {};
      let response = (res) =>{
        let sum = res.ConsumeSum
        this.myChartSum = [
          {value: sum, name:'消费方系统数',itemStyle: {
              color: '#87CEFA'
            }
          }
        ]
      };

      this.$store.state.getMoreDataGet(url, params, response)
    },
    getUserList () {
      let url = '/dataMain/getUser';
      let params = {};
      let response = (res) =>{
        let sum = res.ConsumeSum
        this.myChartSum = [
          {value: sum, name:'消费方系统数',itemStyle: {
              color: '#87CEFA'
            }
          }
        ]
      };

      this.$store.state.getMoreDataGet(url, params, response)
    },
    getRoleUserList () {
      let url = '/dataMain/getUserAndRole';
      let params = {};
      let response = (res) =>{
        let sum = res.ConsumeSum

      };

      this.$store.state.getMoreDataGet(url, params, response)
    },
    myChartCount () {
      console.log('this.myChartSum')
      let myChart_sum = this.$echarts.init(document.getElementById('myChart_sum'))
      let myChart_spend = this.$echarts.init(document.getElementById('myChart_spend'))
      let myChart_provide = this.$echarts.init(document.getElementById('myChart_provide'))
      let myChart_service = this.$echarts.init(document.getElementById('myChart_service'))
      let myChart_serviceStatus = this.$echarts.init(document.getElementById('myChart_serviceStatus'))
      this.getSum();
      this.getProvide();
      this.getSpend();
      this.getServiceSum();
      // 绘制图表
      myChart_sum.setOption({
        title: {
          text: '总系统数',
          x: 'center'
        },
        tooltip: {},
        series: [{
          type: 'pie',
          data: this.myChartSum
        }]
      });
      myChart_spend.setOption({
        title: {
          text: '消费方系统数' ,
          x: 'center'
        },
        tooltip: {},
        series: [{
          type: 'pie',
          data: this.myChartSpend
        }]
      });
      myChart_provide.setOption({
        title: {
          text: '提供方系统数',
          x: 'center'
        },
        tooltip: {},
        series: [{
          name: '销量',
          type: 'pie',
          data: this.myChartProvide
        }]
      });

      myChart_service.setOption({
        title: {
          text: '已上线服务数/总服务数',
          x: 'left'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          right: 10,
          data: ['已上线服务数', '总服务数']
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              {value: this.serviceCount, name: '已上线服务数'},
              {value: this.serviceSum, name: '总服务数'},
            ]
          }
        ]
      });

      myChart_serviceStatus.setOption({
        title: {
          text: '服务状态统计',
          x: 'left'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          right: 10,
          data: ['开发', 'sit审核', 'sit', 'uat', '准生产审核','准生产','上线审核','待上线','已上线']
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              {value: 335, name: '开发'},
              {value: 310, name: 'sit审核'},
              {value: 234, name: 'sit'},
              {value: 135, name: '视频广告'},
              {value: 1548, name: 'uat'},
              {value: 1548, name: '准生产审核'},
              {value: 1548, name: '准生产'},
              {value: 1548, name: '上线审核'},
              {value: 1548, name: '待上线'},
              {value: 1548, name: '已上线'}
            ]
          }
        ]
      })

    }
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .content{
    margin: 20px 0 0 0;
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
