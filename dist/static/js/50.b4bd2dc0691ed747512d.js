webpackJsonp([50],{XyW5:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=[{title:"调用方",dataIndex:"consumer"},{title:"提供方",dataIndex:"provider"},{title:"服务场景码",dataIndex:"soId"},{title:"交易码",dataIndex:"ecode"},{title:"服务治理人员",dataIndex:"govPerson"},{title:"服务开发人员",dataIndex:"devPerson"},{title:"当前阶段",dataIndex:"stage"},{title:"交易记录",dataIndex:"info"},{title:"状态",dataIndex:"status"}],a={props:{propshistory:String},data:function(){return{columns:o,peopleDate:[],govDate:[],devDate:"",soIdDate:[],stageDate:[],providerDate:[],govPerson:"",devPerson:"",soId:"",stage:"",provider:"",deleteList:[],deleteModal:!1}},computed:{rowSelection:function(){var e=this;this.selectedRowKeys;return{onChange:function(t,s){console.log("selectedRowKeys: "+t,"selectedRows: ",s);for(var o=0;o<t.length;o++)e.deleteList[o]={id:s[o].ids,role:e.propshistory.userRole,soid:s[o].soId}},getCheckboxProps:function(e){return{props:{disabled:"Disabled User"===e.name,name:e.name}}}}}},mounted:function(){this.getServiceGovAll(),this.getDeveloper(),this.getAllSoId(),this.getProjects(),this.getAllSys(),this.getUserDetail(this.propshistory.userRole,this.propshistory.userName,"history")},methods:{goTo:function(){this.$router.push({path:"/platform"})},getServiceGovAll:function(){var e=this;this.$store.state.getMoreDataGet("/user/getServiceGovAll",{},function(t){e.govDate=t.data})},getDeveloper:function(){var e=this;this.$store.state.getMoreDataGet("/pcc/getDeveloper",{},function(t){e.devDate=t.data})},getAllSoId:function(){var e=this;this.$store.state.getMoreDataGet("/pcc/getAllSoId",{},function(t){e.soIdDate=t.data})},getProjects:function(){var e=this;this.$store.state.getMoreDataGet("/pcc/getProjects",{},function(t){e.stageDate=t.data})},getAllSys:function(){var e=this;this.$store.state.getMoreDataGet("/pcc/getAllSys",{},function(t){e.providerDate=t.data})},getUserDetail:function(e,t,s){var o=this,a={userRole:e,userName:t,flag:s};this.$store.state.getMoreDataGet("/pgm/getUserDetail",a,function(e){o.peopleDate=e.data})},selectPeopleDetailBy:function(e,t,s,o,a,i,r,n,l){var c=this,d={roleName:e,userId:t,userName:s,gov:o,dev:a,soId:i,stage:r,system:n,flag:l};this.$store.state.getMoreDataGet("/pgm/selectPeopleDetailBy",d,function(e){c.peopleDate=e.data})},deleteModalshow:function(){this.deleteModal=!0},deleteByIds:function(){var e=this;if(""!=this.deleteList&&void 0!=this.deleteList){var t=this.deleteList;this.$store.state.getMoreDataPost("/pgm/batchDeleteTask",t,function(t){t.data;e.deleteModal=!1,e.selectPeopleDetailBy(e.propshistory.userRole,e.propshistory.userId,e.propshistory.userName,e.govPerson,e.devPerson,e.soId,e.stage,e.provider,"history")})}else this.$message.warn("请选择用户")},changegovPerson:function(e){this.govPerson=e.name},changedevPerson:function(e){this.devPerson=e},changesoId:function(e){this.soId=e.soId},changestage:function(e){this.stage=e.proState},changeprovider:function(e){this.provider=e.systemChineseName},inquire:function(){this.selectPeopleDetailBy(this.propshistory.userRole,this.propshistory.userId,this.propshistory.userName,this.govPerson,this.devPerson,this.soId,this.stage,this.provider,"history")},empty:function(){this.govPerson="",this.devPerson="",this.soId="",this.stage="",this.provider=""}}},i={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[s("div",{staticClass:"title"},[e._v("查询条件")]),e._v(" "),s("ul",{staticClass:"flex"},[s("li",{staticClass:"flex"},[e._v("\n          服务治理人员\n          "),s("a-select",{staticStyle:{width:"150px","margin-left":"10px"},attrs:{placeholder:"请输入",showSearch:"",optionFilterProp:"children"},on:{change:e.changegovPerson},model:{value:e.govPerson,callback:function(t){e.govPerson=t},expression:"govPerson"}},e._l(e.govDate,function(t){return s("a-select-option",{key:t},[e._v(e._s(t.name))])}),1)],1),e._v(" "),s("li",{staticClass:"flex"},[e._v("\n          服务开发人员\n          "),s("a-select",{staticStyle:{width:"150px","margin-left":"10px"},attrs:{placeholder:"请输入",showSearch:"",optionFilterProp:"children"},on:{change:e.changedevPerson},model:{value:e.devPerson,callback:function(t){e.devPerson=t},expression:"devPerson"}},e._l(e.devDate,function(t){return s("a-select-option",{key:t},[e._v(e._s(t))])}),1)],1),e._v(" "),s("li",{staticClass:"flex"},[e._v("\n          服务场景码\n          "),s("a-select",{staticStyle:{width:"150px","margin-left":"10px"},attrs:{placeholder:"请输入",showSearch:"",optionFilterProp:"children"},on:{change:e.changesoId},model:{value:e.soId,callback:function(t){e.soId=t},expression:"soId"}},e._l(e.soIdDate,function(t){return s("a-select-option",{key:t},[e._v(e._s(t.soId))])}),1)],1),e._v(" "),s("li",{staticClass:"flex"},[e._v("\n          当前状态\n          "),s("a-select",{staticStyle:{width:"150px","margin-left":"10px"},attrs:{placeholder:"请输入",showSearch:"",optionFilterProp:"children"},on:{change:e.changestage},model:{value:e.stage,callback:function(t){e.stage=t},expression:"stage"}},e._l(e.stageDate,function(t){return s("a-select-option",{key:t},[e._v(e._s(t.proState))])}),1)],1),e._v(" "),s("li",{staticClass:"flex"},[e._v("\n          提供方系统\n          "),s("a-select",{staticStyle:{width:"150px","margin-left":"10px"},attrs:{placeholder:"请输入",showSearch:"",optionFilterProp:"children"},on:{change:e.changeprovider},model:{value:e.provider,callback:function(t){e.provider=t},expression:"provider"}},e._l(e.providerDate,function(t){return s("a-select-option",{key:t},[e._v(e._s(t.systemChineseName))])}),1)],1),e._v(" "),s("a-button",{staticStyle:{"margin-right":"10px"},attrs:{icon:"search",type:"primary"},on:{click:e.inquire}},[e._v("查询")]),e._v(" "),s("a-button",{staticStyle:{"margin-right":"10px"},attrs:{icon:"delete",type:"primary"},on:{click:e.empty}},[e._v("重置")])],1),e._v(" "),s("div",{staticClass:"title",staticStyle:{"margin-top":"20px"}},[e._v("资源列表")]),e._v(" "),s("div",{staticStyle:{"margin-bottom":"20px"}},[s("a-button",{staticStyle:{"margin-right":"10px"},attrs:{icon:"delete"},on:{click:e.deleteModalshow}},[e._v("任务删除")]),e._v(" "),s("a-input-search",{staticStyle:{width:"200px"},attrs:{placeholder:"搜索"}})],1),e._v(" "),s("div",[s("a-table",{attrs:{rowSelection:e.rowSelection,columns:e.columns,dataSource:e.peopleDate},scopedSlots:e._u([{key:"name",fn:function(t){return s("a",{attrs:{href:"javascript:;"}},[e._v(e._s(t))])}}])})],1),e._v(" "),s("a-modal",{attrs:{title:"提示",okText:"确认",cancelText:"取消"},on:{ok:e.deleteByIds},model:{value:e.deleteModal,callback:function(t){e.deleteModal=t},expression:"deleteModal"}},[s("div",[e._v("该操作会删除所有相关历史变更记录，您确认要删除吗？")])])],1)},staticRenderFns:[]};var r=s("VU/8")(a,i,!1,function(e){s("aUWG")},"data-v-3cb099f3",null);t.default=r.exports},aUWG:function(e,t){}});
//# sourceMappingURL=50.b4bd2dc0691ed747512d.js.map