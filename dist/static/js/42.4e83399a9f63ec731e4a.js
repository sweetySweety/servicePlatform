webpackJsonp([42],{JVid:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=[{title:"任务ID",dataIndex:"name",scopedSlots:{customRender:"name"}},{title:"任务名称",dataIndex:"age"},{title:"交易码",dataIndex:"address"},{title:"交易名称",dataIndex:"address2"},{title:"接口ID",dataIndex:"address3"},{title:"所属系统",dataIndex:"address4"},{title:"服务场景码",dataIndex:"address5"},{title:"处理人",dataIndex:"address6"},{title:"优先级",dataIndex:"address7"},{title:"创建时间",dataIndex:"address9"},{title:"描述",dataIndex:"address8"}],n=[{key:"1",name:"John Brown",age:32,address:"测试测试k"},{key:"2",name:"Jim Green",age:42,address:"测试测试k"},{key:"3",name:"Joe Black",age:32,address:"测试测试k"},{key:"4",name:"Joe Black",age:32,address:"测试测试k"}],o={data:function(){return{data:n,columns:a,selectedIds:"",showDistributionMsg:!1,selectedPersonId:""}},computed:{rowSelection:function(){var e=this;this.selectedRowKeys;return{onChange:function(t,s){console.log("selectedRowKeys:",t,"selectedRows: ",s);var a=[];s.map(function(e){a.push(e.key)}),e.selectedIds=a.join(),console.log(e.selectedIds)},getCheckboxProps:function(e){return{props:{disabled:"Disabled User"===e.name,name:e.name}}}}}},methods:{goTo:function(){this.$router.push({path:"/platform"})},showDistribution:function(){this.showDistributionMsg=!0},handleDistribution:function(){this.showDistributionMsg=!1,console.log(this.selectedPersonId);this.$store.state.getMoreDataStringPost("",{},function(){})}}},d={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[s("div",{staticClass:"title",staticStyle:{"margin-top":"20px"}},[e._v("任务详情")]),e._v(" "),s("div",[s("a-table",{attrs:{rowSelection:e.rowSelection,columns:e.columns,dataSource:e.data},scopedSlots:e._u([{key:"name",fn:function(t){return s("a",{attrs:{href:"javascript:;"}},[e._v(e._s(t))])}}])})],1),e._v(" "),s("a-modal",{attrs:{title:"分配",okText:"分配",cancelText:"取消"},on:{ok:e.handleDistribution},model:{value:e.showDistributionMsg,callback:function(t){e.showDistributionMsg=t},expression:"showDistributionMsg"}},[s("a-form",[s("a-form-item",{attrs:{label:"下节点处理人","label-col":{span:5},"wrapper-col":{span:12}}},[s("a-select",{directives:[{name:"decorator",rawName:"v-decorator",value:["下节点处理人",{rules:[{required:!0,message:"Please select your gender!"}]}],expression:"[\n        '下节点处理人',\n        { rules: [{ required: true, message: 'Please select your gender!' }] },\n      ]"}],attrs:{placeholder:"Select a option and change input text above"},model:{value:e.selectedPersonId,callback:function(t){e.selectedPersonId=t},expression:"selectedPersonId"}},[s("a-select-option",{attrs:{value:"male"}},[e._v("\n            male\n          ")]),e._v(" "),s("a-select-option",{attrs:{value:"female"}},[e._v("\n            female\n          ")])],1)],1)],1)],1)],1)},staticRenderFns:[]};var r=s("VU/8")(o,d,!1,function(e){s("ezxe")},"data-v-4db5d606",null);t.default=r.exports},ezxe:function(e,t){}});
//# sourceMappingURL=42.4e83399a9f63ec731e4a.js.map