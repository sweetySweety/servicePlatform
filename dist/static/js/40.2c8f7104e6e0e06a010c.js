webpackJsonp([40],{"8FcH":function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=[{title:"系统ID",dataIndex:"systemId",scopedSlots:{customRender:"name"}},{title:"系统简称",dataIndex:"systemAb"},{title:"系统中文名称",dataIndex:"systemChineseName"},{title:"系统协议",dataIndex:"protocolName"},{title:"系统详细信息",dataIndex:"systemInformation"},{title:"负责人",dataIndex:"principal"},{title:"系统描述",dataIndex:"systemDesc"},{title:"业务范围",dataIndex:"workRange"}],i=[],n={data:function(){return{data:i,columns:a,isChange:!0,addModel:!1,title:"",isEdit:0,currentPage:1,pageSize:10,total:10,isVague:"y",systemId:"",systemChineseName:"",systemAb:"",principal:"",systemDesc:"",protocolName:"",systemIdStr:"",asystemId:"",asystemChineseName:"",asystemAb:"",aprincipal:"",asystemDesc:"",aprotocolName:"",aworkRange:"",asystemInfomation:""}},computed:{rowSelection:function(){var t=this;this.selectedRowKeys;return{onChange:function(e,s){console.log("selectedRowKeys: "+e,"selectedRows: ",s),1==s.length?(t.isChange=!1,t.systemIdStr=s[0].systemId,t.asystemId=s[0].systemId,t.asystemChineseName=s[0].systemChineseName,t.asystemAb=s[0].systemAb,t.aprincipal=s[0].principal,t.asystemDesc=s[0].systemDesc,t.aprotocolName=s[0].protocolName,t.aworkRange=s[0].workRange,t.asystemInfomation=s[0].systemInfomation):t.isChange=!0},getCheckboxProps:function(t){return{props:{disabled:"Disabled User"===t.name,name:t.name}}}}}},mounted:function(){this.searchSystemList()},methods:{goNewspaper:function(){this.$emit("goNewspaper","")},goAgreementManage:function(){this.$emit("goAgreementManage","")},goFileManage:function(){this.$emit("goFileManage","")},goSystemInfoList:function(){this.$emit("goSystemInfoList","")},onPageChange:function(t){var e=this.pageSize;this.currentPage=t,this.getLogList(t,e)},onShowSizeChange:function(t,e){console.log(t,e)},showConfirm:function(){var t=this;this.$confirm({title:"是否确认要删除?",content:"按下确认后，所选内容将在1秒钟后删除",okText:"确认",cancelText:"取消",keyboard:!1,onOk:function(){t.deleteSystem()},onCancel:function(){}})},showAddModel:function(){this.title="新增系统",this.addModel=!0,this.isEdit=0,this.emptyAddipt()},showEditModel:function(){this.title="修改系统",this.addModel=!0,this.isEdit=1},saveOperation:function(){1==this.isEdit?this.editSystem():this.addSystem()},emptyAddipt:function(){this.asystemId="",this.asystemChineseName="",this.asystemAb="",this.aprincipal="",this.asystemDesc="",this.aprotocolName="",this.aworkRange="",this.asystemInfomation=""},emptyIpt:function(){this.systemId="",this.systemChineseName="",this.systemAb="",this.principal="",this.systemDesc="",this.protocolName=""},addSystem:function(){var t=this,e={systemId:this.asystemId,systemAb:this.asystemAb,systemChineseName:this.asystemChineseName,systemDesc:this.asystemDesc,workRange:this.aworkRange,principal:this.aprincipal,SystemDesc:this.asystemDesc};this.$store.state.getMoreDataPost("/system/add",e,function(e){t.addModel=!1,t.searchSystemList()})},editSystem:function(){var t=this,e={systemId:this.asystemId,systemAb:this.asystemAb,systemChineseName:this.asystemChineseName,systemInfomation:this.asystemInfomation,workRange:this.aworkRange,principal:this.aprincipal,SystemDesc:this.asystemDesc};this.$store.state.getMoreDataPost("/system/modify",e,function(e){t.addModel=!1,t.searchSystemList()})},deleteSystem:function(){var t=this,e={systemId:this.systemIdStr};this.$store.state.getMoreDataDelete("/system/delete",e,function(e){t.data=e.data})},getSystemList:function(){var t=this;this.$store.state.getMoreDataGet("/system/getAll",{},function(e){t.data=e.data})},searchSystemList:function(){var t=this,e={pageNo:this.currentPage,rowNo:this.pageSize,isVague:this.isVague,systemId:this.systemId,systemChineseName:this.systemChineseName,systemAb:this.systemAb,principal:this.principal,systemDesc:this.systemDesc,protocolName:this.protocolName};this.$store.state.getMoreDataPost("/system/query",e,function(e){var s=e.data;t.data=s.row,t.total=s.resultCount})}}},o={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("div",{staticClass:"title"},[t._v("条件搜索")]),t._v(" "),s("ul",{staticClass:"flex"},[s("li",{staticClass:"flex"},[t._v("\n                系统ID\n                "),s("a-input",{staticStyle:{width:"150px","margin-left":"10px"},attrs:{placeholder:""},model:{value:t.systemId,callback:function(e){t.systemId=e},expression:"systemId"}})],1),t._v(" "),s("li",{staticClass:"flex"},[t._v("\n                中文名称\n                "),s("a-input",{staticStyle:{width:"150px","margin-left":"10px"},attrs:{placeholder:""},model:{value:t.systemChineseName,callback:function(e){t.systemChineseName=e},expression:"systemChineseName"}})],1),t._v(" "),s("li",{staticClass:"flex"},[t._v("\n                系统简称\n                "),s("a-input",{staticStyle:{width:"150px","margin-left":"10px"},attrs:{placeholder:""},model:{value:t.systemAb,callback:function(e){t.systemAb=e},expression:"systemAb"}})],1),t._v(" "),s("li",{staticClass:"flex"},[t._v("\n                负责人\n                "),s("a-input",{staticStyle:{width:"150px","margin-left":"10px"},attrs:{placeholder:""},model:{value:t.principal,callback:function(e){t.principal=e},expression:"principal"}})],1)]),t._v(" "),s("ul",{staticClass:"flex"},[s("li",{staticClass:"flex"},[t._v("\n                系统描述\n                "),s("a-input",{staticStyle:{width:"150px","margin-left":"10px"},attrs:{placeholder:""},model:{value:t.systemDesc,callback:function(e){t.systemDesc=e},expression:"systemDesc"}})],1),t._v(" "),s("li",{staticClass:"flex"},[t._v("\n                系统协议\n                   "),s("a-select",{staticStyle:{width:"150px","margin-left":"10px"},attrs:{defaultValue:""},model:{value:t.protocolName,callback:function(e){t.protocolName=e},expression:"protocolName"}},[s("a-select-option",{key:3,attrs:{value:"http"}},[t._v("http")]),t._v(" "),s("a-select-option",{key:4,attrs:{value:"post"}},[t._v("post")])],1)],1),t._v(" "),s("a-button",{staticStyle:{"margin-right":"10px"},attrs:{icon:"search",type:"primary"},on:{click:t.searchSystemList}},[t._v("查询")]),t._v(" "),s("a-button",{staticStyle:{"margin-right":"10px"},attrs:{icon:"search",type:"primary"},on:{click:t.emptyIpt}},[t._v("清空")])],1),t._v(" "),s("div",{staticClass:"title",staticStyle:{"margin-top":"20px"}},[t._v("系统基本信息维护")]),t._v(" "),s("div",{staticStyle:{"margin-bottom":"20px"}},[s("a-button",{staticStyle:{"margin-right":"10px"},attrs:{icon:"edit"},on:{click:t.showAddModel}},[t._v("新增")]),t._v(" "),s("a-button",{staticStyle:{"margin-right":"10px"},attrs:{icon:"edit",disabled:t.isChange},on:{click:t.showEditModel}},[t._v("修改")]),t._v(" "),s("a-button",{staticStyle:{"margin-right":"10px"},attrs:{icon:"delete",disabled:t.isChange},on:{click:t.showConfirm}},[t._v("删除")]),t._v(" "),s("a-button",{staticStyle:{"margin-right":"10px"},attrs:{icon:"file"},on:{click:t.goFileManage}},[t._v("文件管理")]),t._v(" "),s("a-button",{staticStyle:{"margin-right":"10px"},attrs:{icon:"file"},on:{click:t.goNewspaper}},[t._v("报文头管理")]),t._v(" "),s("a-button",{staticStyle:{"margin-right":"10px"},attrs:{icon:"file"},on:{click:t.goSystemInfoList}},[t._v("系统详细信息管理")]),t._v(" "),s("a-button",{staticStyle:{"margin-right":"10px"},attrs:{icon:"file"},on:{click:t.goAgreementManage}},[t._v("协议管理")])],1),t._v(" "),s("div",[s("a-table",{attrs:{rowSelection:t.rowSelection,pagination:{pageSize:t.pageSize,onShowSizeChange:t.onShowSizeChange,total:t.total,onChange:t.onPageChange},columns:t.columns,dataSource:t.data}})],1),t._v(" "),s("a-modal",{attrs:{title:t.title,okText:"保存",cancelText:"取消",width:"450px"},on:{ok:t.saveOperation},model:{value:t.addModel,callback:function(e){t.addModel=e},expression:"addModel"}},[s("div",{staticClass:"graybox"},[s("ul",[s("li",{staticClass:"flex",staticStyle:{"margin-bottom":"10px"}},[s("font",{staticClass:"iptTitle"},[t._v("系统ID：")]),s("a-input",{staticStyle:{width:"250px","margin-left":"10px"},attrs:{placeholder:""},model:{value:t.asystemId,callback:function(e){t.asystemId=e},expression:"asystemId"}})],1),t._v(" "),s("li",{staticClass:"flex",staticStyle:{"margin-bottom":"10px"}},[s("font",{staticClass:"iptTitle"},[t._v("系统简称：")]),s("a-input",{staticStyle:{width:"250px","margin-left":"10px"},attrs:{placeholder:""},model:{value:t.asystemAb,callback:function(e){t.asystemAb=e},expression:"asystemAb"}})],1),t._v(" "),s("li",{staticClass:"flex",staticStyle:{"margin-bottom":"10px"}},[s("font",{staticClass:"iptTitle"},[t._v("系统中文名称：")]),s("a-input",{staticStyle:{width:"250px","margin-left":"10px"},attrs:{placeholder:""},model:{value:t.asystemChineseName,callback:function(e){t.asystemChineseName=e},expression:"asystemChineseName"}})],1),t._v(" "),s("li",{staticClass:"flex",staticStyle:{"margin-bottom":"10px"}},[s("font",{staticClass:"iptTitle"},[t._v("系统详细信息：")]),t._v(" "),s("a-select",{staticStyle:{width:"250px","margin-left":"10px"},attrs:{defaultValue:""},model:{value:t.asystemInfomation,callback:function(e){t.asystemInfomation=e},expression:"asystemInfomation"}},[s("a-select-option",{attrs:{value:"http"}},[t._v("http")]),t._v(" "),s("a-select-option",{attrs:{value:"post"}},[t._v("post")])],1)],1),t._v(" "),s("li",{staticClass:"flex",staticStyle:{"margin-bottom":"10px"}},[s("font",{staticClass:"iptTitle"},[t._v("业务范围：")]),s("a-input",{staticStyle:{width:"250px","margin-left":"10px"},attrs:{placeholder:""},model:{value:t.aworkRange,callback:function(e){t.aworkRange=e},expression:"aworkRange"}})],1),t._v(" "),s("li",{staticClass:"flex",staticStyle:{"margin-bottom":"10px"}},[s("font",{staticClass:"iptTitle"},[t._v("系统描述：")]),s("a-input",{staticStyle:{width:"250px","margin-left":"10px"},attrs:{placeholder:""},model:{value:t.asystemDesc,callback:function(e){t.asystemDesc=e},expression:"asystemDesc"}})],1),t._v(" "),s("li",{staticClass:"flex",staticStyle:{"margin-bottom":"10px"}},[s("font",{staticClass:"iptTitle"},[t._v("负责人：")]),t._v(" "),s("a-select",{staticStyle:{width:"250px","margin-left":"10px"},attrs:{defaultValue:""},model:{value:t.aprincipal,callback:function(e){t.aprincipal=e},expression:"aprincipal"}},[s("a-select-option",{attrs:{value:"http"}},[t._v("http")]),t._v(" "),s("a-select-option",{attrs:{value:"post"}},[t._v("post")])],1)],1)])])])],1)},staticRenderFns:[]};var l=s("VU/8")(n,o,!1,function(t){s("iT79")},"data-v-5305efea",null);e.default=l.exports},iT79:function(t,e){}});
//# sourceMappingURL=40.2c8f7104e6e0e06a010c.js.map