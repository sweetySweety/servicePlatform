webpackJsonp([8,21],{QwVa:function(t,e){},cGnh:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=[{title:"系统ID",dataIndex:"systemId",scopedSlots:{customRender:"name"}},{title:"系统简称",dataIndex:"systemAb"},{title:"系统中文名称",dataIndex:"systemChineseName"},{title:"系统协议",dataIndex:"protocolName"},{title:"系统详细信息",dataIndex:"systemInformation"},{title:"负责人",dataIndex:"principal"},{title:"系统描述",dataIndex:"systemDesc"},{title:"业务范围",dataIndex:"workRange"}],i=[],n={data:function(){return{data:i,columns:a,isChange:!0,addModel:!1,title:"",isEdit:0,currentPage:1,pageSize:10,total:10,isVague:"y",systemId:"",systemChineseName:"",systemAb:"",principal:"",systemDesc:"",protocolName:"",systemIdStr:"",asystemId:"",asystemChineseName:"",asystemAb:"",aprincipal:"",asystemDesc:"",aprotocolName:"",aworkRange:"",asystemInfomation:""}},computed:{rowSelection:function(){var t=this;this.selectedRowKeys;return{onChange:function(e,s){console.log("selectedRowKeys: "+e,"selectedRows: ",s),1==s.length?(t.isChange=!1,t.systemIdStr=s[0].systemId,t.asystemId=s[0].systemId,t.asystemChineseName=s[0].systemChineseName,t.asystemAb=s[0].systemAb,t.aprincipal=s[0].principal,t.asystemDesc=s[0].systemDesc,t.aprotocolName=s[0].protocolName,t.aworkRange=s[0].workRange,t.asystemInfomation=s[0].systemInfomation):t.isChange=!0},getCheckboxProps:function(t){return{props:{disabled:"Disabled User"===t.name,name:t.name}}}}}},mounted:function(){this.searchSystemList()},methods:{goNewspaper:function(){this.$emit("goNewspaper","")},goAgreementManage:function(){this.$emit("goAgreementManage","")},goFileManage:function(){this.$emit("goFileManage","")},goSystemInfoList:function(){this.$emit("goSystemInfoList","")},onPageChange:function(t){this.currentPage=t,this.searchSystemList()},onShowSizeChange:function(t,e){console.log(t,e)},showConfirm:function(){var t=this;this.$confirm({title:"是否确认要删除?",content:"按下确认后，所选内容将在1秒钟后删除",okText:"确认",cancelText:"取消",keyboard:!1,onOk:function(){t.deleteSystem()},onCancel:function(){}})},showAddModel:function(){this.title="新增系统",this.addModel=!0,this.isEdit=0,this.emptyAddipt()},showEditModel:function(){this.title="修改系统",this.addModel=!0,this.isEdit=1},saveOperation:function(){1==this.isEdit?this.editSystem():this.addSystem()},emptyAddipt:function(){this.asystemId="",this.asystemChineseName="",this.asystemAb="",this.aprincipal="",this.asystemDesc="",this.aprotocolName="",this.aworkRange="",this.asystemInfomation=""},emptyIpt:function(){this.systemId="",this.systemChineseName="",this.systemAb="",this.principal="",this.systemDesc="",this.protocolName=""},addSystem:function(){var t=this,e={systemId:this.asystemId,systemAb:this.asystemAb,systemChineseName:this.asystemChineseName,systemDesc:this.asystemDesc,workRange:this.aworkRange,principal:this.aprincipal,SystemDesc:this.asystemDesc};this.$store.state.getMoreDataPost("/system/add",e,function(e){t.addModel=!1,t.searchSystemList()})},editSystem:function(){var t=this,e={systemId:this.asystemId,systemAb:this.asystemAb,systemChineseName:this.asystemChineseName,systemInfomation:this.asystemInfomation,workRange:this.aworkRange,principal:this.aprincipal,SystemDesc:this.asystemDesc};this.$store.state.getMoreDataPost("/system/modify",e,function(e){t.addModel=!1,t.searchSystemList()})},deleteSystem:function(){var t=this,e={systemId:this.systemIdStr};this.$store.state.getMoreDataDelete("/system/delete",e,function(e){t.data=e.data})},getSystemList:function(){var t=this;this.$store.state.getMoreDataGet("/system/getAll",{},function(e){t.data=e.data})},searchSystemList:function(){var t=this,e={pageNo:this.currentPage,rowNo:this.pageSize,isVague:this.isVague,systemId:this.systemId,systemChineseName:this.systemChineseName,systemAb:this.systemAb,principal:this.principal,systemDesc:this.systemDesc,protocolName:this.protocolName};this.$store.state.getMoreDataPost("/system/query",e,function(e){var s=e.data;t.data=s.row,t.total=s.resultCount})}}},o={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("div",{staticClass:"title"},[t._v("条件搜索")]),t._v(" "),s("ul",{staticClass:"flex"},[s("li",{staticClass:"flex"},[t._v("\n      系统ID\n      "),s("a-input",{staticStyle:{width:"150px","margin-left":"10px"},attrs:{placeholder:""},model:{value:t.systemId,callback:function(e){t.systemId=e},expression:"systemId"}})],1),t._v(" "),s("li",{staticClass:"flex"},[t._v("\n      中文名称\n      "),s("a-input",{staticStyle:{width:"150px","margin-left":"10px"},attrs:{placeholder:""},model:{value:t.systemChineseName,callback:function(e){t.systemChineseName=e},expression:"systemChineseName"}})],1),t._v(" "),s("li",{staticClass:"flex"},[t._v("\n      系统简称\n      "),s("a-input",{staticStyle:{width:"150px","margin-left":"10px"},attrs:{placeholder:""},model:{value:t.systemAb,callback:function(e){t.systemAb=e},expression:"systemAb"}})],1),t._v(" "),s("li",{staticClass:"flex"},[t._v("\n      负责人\n      "),s("a-input",{staticStyle:{width:"150px","margin-left":"10px"},attrs:{placeholder:""},model:{value:t.principal,callback:function(e){t.principal=e},expression:"principal"}})],1)]),t._v(" "),s("ul",{staticClass:"flex"},[s("li",{staticClass:"flex"},[t._v("\n      系统描述\n      "),s("a-input",{staticStyle:{width:"150px","margin-left":"10px"},attrs:{placeholder:""},model:{value:t.systemDesc,callback:function(e){t.systemDesc=e},expression:"systemDesc"}})],1),t._v(" "),s("li",{staticClass:"flex"},[t._v("\n      系统协议\n      "),s("a-select",{staticStyle:{width:"150px","margin-left":"10px"},attrs:{defaultValue:""},model:{value:t.protocolName,callback:function(e){t.protocolName=e},expression:"protocolName"}},[s("a-select-option",{key:3,attrs:{value:"http"}},[t._v("http")]),t._v(" "),s("a-select-option",{key:4,attrs:{value:"post"}},[t._v("post")])],1)],1),t._v(" "),s("a-button",{staticStyle:{"margin-right":"10px"},attrs:{icon:"search",type:"primary"},on:{click:t.searchSystemList}},[t._v("查询")]),t._v(" "),s("a-button",{staticStyle:{"margin-right":"10px"},attrs:{icon:"search",type:"primary"},on:{click:t.emptyIpt}},[t._v("清空")])],1),t._v(" "),s("div",{staticClass:"title",staticStyle:{"margin-top":"20px"}},[t._v("系统基本信息维护")]),t._v(" "),s("div",{staticStyle:{"margin-bottom":"20px"}},[s("a-button",{staticStyle:{"margin-right":"10px"},attrs:{icon:"edit"},on:{click:t.showAddModel}},[t._v("新增")]),t._v(" "),s("a-button",{staticStyle:{"margin-right":"10px"},attrs:{icon:"edit",disabled:t.isChange},on:{click:t.showEditModel}},[t._v("修改")]),t._v(" "),s("a-button",{staticStyle:{"margin-right":"10px"},attrs:{icon:"delete",disabled:t.isChange},on:{click:t.showConfirm}},[t._v("删除")]),t._v(" "),s("a-button",{staticStyle:{"margin-right":"10px"},attrs:{icon:"file"},on:{click:t.goFileManage}},[t._v("文件管理")]),t._v(" "),s("a-button",{staticStyle:{"margin-right":"10px"},attrs:{icon:"file"},on:{click:t.goNewspaper}},[t._v("报文头管理")]),t._v(" "),s("a-button",{staticStyle:{"margin-right":"10px"},attrs:{icon:"file"},on:{click:t.goSystemInfoList}},[t._v("系统详细信息管理")]),t._v(" "),s("a-button",{staticStyle:{"margin-right":"10px"},attrs:{icon:"file"},on:{click:t.goAgreementManage}},[t._v("协议管理")])],1),t._v(" "),s("div",[s("a-table",{attrs:{rowSelection:t.rowSelection,pagination:{pageSize:t.pageSize,onShowSizeChange:t.onShowSizeChange,total:t.total,onChange:t.onPageChange},columns:t.columns,dataSource:t.data}})],1),t._v(" "),s("a-modal",{attrs:{title:t.title,okText:"保存",cancelText:"取消",width:"450px"},on:{ok:t.saveOperation},model:{value:t.addModel,callback:function(e){t.addModel=e},expression:"addModel"}},[s("div",{staticClass:"graybox"},[s("ul",[s("li",{staticClass:"flex",staticStyle:{"margin-bottom":"10px"}},[s("font",{staticClass:"iptTitle"},[t._v("系统ID：")]),t._v(" "),s("a-input",{staticStyle:{width:"250px","margin-left":"10px"},attrs:{placeholder:""},model:{value:t.asystemId,callback:function(e){t.asystemId=e},expression:"asystemId"}})],1),t._v(" "),s("li",{staticClass:"flex",staticStyle:{"margin-bottom":"10px"}},[s("font",{staticClass:"iptTitle"},[t._v("系统简称：")]),t._v(" "),s("a-input",{staticStyle:{width:"250px","margin-left":"10px"},attrs:{placeholder:""},model:{value:t.asystemAb,callback:function(e){t.asystemAb=e},expression:"asystemAb"}})],1),t._v(" "),s("li",{staticClass:"flex",staticStyle:{"margin-bottom":"10px"}},[s("font",{staticClass:"iptTitle"},[t._v("系统中文名称：")]),t._v(" "),s("a-input",{staticStyle:{width:"250px","margin-left":"10px"},attrs:{placeholder:""},model:{value:t.asystemChineseName,callback:function(e){t.asystemChineseName=e},expression:"asystemChineseName"}})],1),t._v(" "),s("li",{staticClass:"flex",staticStyle:{"margin-bottom":"10px"}},[s("font",{staticClass:"iptTitle"},[t._v("系统详细信息：")]),t._v(" "),s("a-select",{staticStyle:{width:"250px","margin-left":"10px"},attrs:{defaultValue:""},model:{value:t.asystemInfomation,callback:function(e){t.asystemInfomation=e},expression:"asystemInfomation"}},[s("a-select-option",{attrs:{value:"http"}},[t._v("http")]),t._v(" "),s("a-select-option",{attrs:{value:"post"}},[t._v("post")])],1)],1),t._v(" "),s("li",{staticClass:"flex",staticStyle:{"margin-bottom":"10px"}},[s("font",{staticClass:"iptTitle"},[t._v("业务范围：")]),t._v(" "),s("a-input",{staticStyle:{width:"250px","margin-left":"10px"},attrs:{placeholder:""},model:{value:t.aworkRange,callback:function(e){t.aworkRange=e},expression:"aworkRange"}})],1),t._v(" "),s("li",{staticClass:"flex",staticStyle:{"margin-bottom":"10px"}},[s("font",{staticClass:"iptTitle"},[t._v("系统描述：")]),t._v(" "),s("a-input",{staticStyle:{width:"250px","margin-left":"10px"},attrs:{placeholder:""},model:{value:t.asystemDesc,callback:function(e){t.asystemDesc=e},expression:"asystemDesc"}})],1),t._v(" "),s("li",{staticClass:"flex",staticStyle:{"margin-bottom":"10px"}},[s("font",{staticClass:"iptTitle"},[t._v("负责人：")]),t._v(" "),s("a-select",{staticStyle:{width:"250px","margin-left":"10px"},attrs:{defaultValue:""},model:{value:t.aprincipal,callback:function(e){t.aprincipal=e},expression:"aprincipal"}},[s("a-select-option",{attrs:{value:"http"}},[t._v("http")]),t._v(" "),s("a-select-option",{attrs:{value:"post"}},[t._v("post")])],1)],1)])])])],1)},staticRenderFns:[]};var c=s("VU/8")(n,o,!1,function(t){s("QwVa")},"data-v-b6efe82a",null);e.default=c.exports},iHGW:function(t,e){},jeNv:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s("woOf"),i=s.n(a),n=s("zIkb"),o=s("cGnh"),c=[],r={data:function(){var t=[{title:"系统管理",content:"",key:"/system/system"}];return{openKeys:["key-01"],activeKey:t[0].key,panes:t,newTabIndex:0,expandedKeys:[],searchValue:"",autoExpandParent:!0,gData:c,systemList:[],headId:"",sendSystemId:""}},components:{headshow:n.a,conditioSearch:o.default},mounted:function(){this.getSystemList()},methods:{showMenu:function(){},getHeadId:function(t){this.headId=t},goServicemess:function(){var t=this.panes,e="/system/servicemess",s=0;t.map(function(t,a){t.key==e&&(s=1)}),1==s?(this.activeKey=e,this.$router.push(e)):(t.push({title:"DTS业务报文头",content:"Content of new Tab "+e,key:e}),this.panes=t,this.activeKey=e,this.$router.push(e))},goNewspaperEditHistory:function(){var t=this.panes,e="/system/newspaperEditHistory",s=0;t.map(function(t,a){t.key==e&&(s=1)}),1==s?(this.activeKey=e,this.$router.push(e)):(t.push({title:"报文头修订记录",content:"Content of new Tab "+e,key:e}),this.panes=t,this.activeKey=e,this.$router.push(e))},goNewspaperHistory:function(){var t=this.panes,e="/system/newspaperHistory",s=0;t.map(function(t,a){t.key==e&&(s=1)}),1==s?(this.activeKey=e,this.$router.push(e)):(t.push({title:"报文头历史",content:"Content of new Tab "+e,key:e}),this.panes=t,this.activeKey=e,this.$router.push(e))},goAgreementManage:function(){var t=this.panes,e="/system/agreementManage",s=0;t.map(function(t,a){t.key==e&&(s=1)}),1==s?(this.activeKey=e,this.$router.push(e)):(t.push({title:"协议管理",content:"Content of new Tab "+e,key:e}),this.panes=t,this.activeKey=e,this.$router.push(e))},goSinfoSumit:function(){var t=this.panes,e="/system/systemInfoSubmit",s=0;t.map(function(t,a){t.key==e&&(s=1)}),1==s?(this.activeKey=e,this.$router.push(e)):(t.push({title:"提交审核",content:"Content of new Tab "+e,key:e}),this.panes=t,this.activeKey=e,this.$router.push(e))},goNewspaper:function(){var t=this.panes,e="/system/newspaper",s=0;t.map(function(t,a){t.key==e&&(s=1)}),1==s?(this.activeKey=e,this.$router.push(e)):(t.push({title:"报文头管理",content:"Content of new Tab "+e,key:e}),this.panes=t,this.activeKey=e,this.$router.push(e))},goSystemInfoList:function(){var t=this.panes,e="/system/systemInfoList",s=0;t.map(function(t,a){t.key==e&&(s=1)}),1==s?(this.activeKey=e,this.$router.push(e)):(t.push({title:"系统信息详情管理",content:"Content of new Tab "+e,key:e}),this.panes=t,this.activeKey=e,this.$router.push(e))},goFileManage:function(){var t=this.panes,e="/system/fileManage",s=0;t.map(function(t,a){t.key==e&&(s=1)}),1==s?(this.activeKey=e,this.$router.push(e)):(t.push({title:"文件管理",content:"Content of new Tab "+e,key:e}),this.panes=t,this.activeKey=e,this.$router.push(e))},gosystem:function(t,e){var s=e.selectedNodes[0].data.props;this.sendSystemId=s.systemId;var a=s.text,i=void 0;if(a&&(i=a.substring(a.length-2)),"接口"==i){if(a.length>2)if("消费方接口"==a){var n=this.panes,o="/system/interfaceType",c=0;n.map(function(t,e){t.key==o&&(c=1)}),1==c?(this.activeKey=o,this.$router.push(o)):(n.push({title:a,content:"Content of new Tab "+o,key:o}),this.panes=n,this.activeKey=o,this.$router.push(o))}else if("提供方接口"==a){var r=this.panes,l="/system/interfaceTypeOffer",h=0;r.map(function(t,e){t.key==l&&(h=1)}),1==h?(this.activeKey=l,this.$router.push(l)):(r.push({title:a,content:"Content of new Tab "+l,key:l}),this.panes=r,this.activeKey=l,this.$router.push(l))}else{var p=this.panes,m="/system/interface",y=0;p.map(function(t,e){t.key==m&&(y=1)}),1==y?(this.activeKey=m,this.$router.push(m)):(p.push({title:a,content:"Content of new Tab "+m,key:m}),this.panes=p,this.activeKey=m,this.$router.push(m))}}else if("报文头"==a){var u=this.panes,d="/system/system",f=0;u.map(function(t,e){t.key==d&&(f=1)}),1==f?(this.activeKey=d,this.$router.push(d)):(u.push({title:a,content:"Content of new Tab "+d,key:d}),this.panes=u,this.activeKey=d,this.$router.push(d))}else if("系统"==a){var g=this.panes,v="/system/system",x=0;g.map(function(t,e){t.key==v&&(x=1)}),1==x?(this.activeKey=v,this.$router.push(v)):(g.push({title:"系统管理",content:"Content of new Tab "+v,key:v}),this.panes=g,this.activeKey=v,this.$router.push(v))}else if(a.indexOf("测试")>-1){var S=this.panes,k="/system/interface",b=0;S.map(function(t,e){t.key==k&&(b=1)}),1==b?(this.activeKey=k,this.$router.push(k)):(S.push({title:a,content:"Content of new Tab "+k,key:k}),this.panes=S,this.activeKey=k,this.$router.push(k))}},remove:function(t){var e=this.activeKey,s=void 0;this.panes.forEach(function(e,a){e.key===t&&(s=a-1)});var a=this.panes.filter(function(e){return e.key!==t});s>=0&&e===t&&(e=a[s].key),this.panes=a,this.activeKey=e,this.$router.push(e)},onExpand:function(t){this.expandedKeys=t,this.autoExpandParent=!1},ontChange:function(t){var e=t.target.value,s=dataList.map(function(t){return t.key.indexOf(e)>-1?getParentKey(t.key,c):null}).filter(function(t,e,s){return t&&s.indexOf(t)===e});i()(this,{expandedKeys:s,searchValue:e,autoExpandParent:!0})},onChange:function(t){this.$router.push(t)},goenglish:function(){if(null==localStorage.eng||0==localStorage.eng){var t=this.panes,e="/public/english";t.push({title:"英文单词及缩写管理",content:"Content of new Tab "+e,key:e}),this.panes=t,this.activeKey=e,this.$router.push(e),localStorage.eng=e}else this.activeKey=localStorage.eng,this.$router.push(localStorage.eng)},onEdit:function(t,e){this[e](t)},getSystemList:function(){var t=this;this.$store.state.getMoreDataGet("/interface/getLeftTree",{},function(e){console.log(e);var s=e.data;s.map(function(e){t.$set(e,"title",e.text),t.$set(e,"key",e.id);var a=e.children;null!=a&&a.map(function(e){t.$set(e,"title",e.text),t.$set(e,"key",e.id);var a=e.id;t.getInterfaceList(a,s)})}),t.systemList=s,console.log(t.systemList)})},getInterfaceList:function(t,e){var s=this,a={systemId:t};this.$store.state.getMoreDataGet("/interface/getLeftTree/subtree/system",a,function(a){var i=a.data;i.map(function(e){s.$set(e,"title",e.text),s.$set(e,"key",e.id),s.$set(e,"systemId",t);var a=e.children;null!=a&&a.map(function(e){s.$set(e,"title",e.text),s.$set(e,"key",e.id),s.$set(e,"systemId",t);var a=e.children;null!=a&&a.map(function(e){s.$set(e,"title",e.text),s.$set(e,"key",e.id),s.$set(e,"systemId",t)})})}),e.map(function(e){var s=e.children;null!=s&&s.map(function(e){t==e.id&&(e.children=i)})})})}}},l={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("a-layout",{attrs:{id:"components-layout-demo-top-side-2"}},[s("headshow",{attrs:{items:["2"]}}),t._v(" "),s("a-layout",[s("a-layout-sider",{staticStyle:{background:"#f0f0f0",padding:"10px"},attrs:{width:"250"}},[s("a-input-search",{staticStyle:{"margin-bottom":"8px"},attrs:{placeholder:"Search"},on:{change:t.ontChange}}),t._v(" "),s("a-tree",{attrs:{expandedKeys:t.expandedKeys,autoExpandParent:t.autoExpandParent,treeData:t.systemList},on:{expand:t.onExpand,select:t.gosystem,rightClick:t.showMenu}})],1),t._v(" "),s("a-tabs",{style:{padding:"24px",margin:0,minHeight:"280px",width:"100%"},attrs:{type:"editable-card",hideAdd:""},on:{edit:t.onEdit,change:t.onChange},model:{value:t.activeKey,callback:function(e){t.activeKey=e},expression:"activeKey"}},t._l(t.panes,function(e){return s("a-tab-pane",{key:e.key,staticStyle:{"overflow-y":"scroll",maxHeight:"'100px"},attrs:{tab:e.title,closable:e.closable}},["/system/system"==e.key?s("conditioSearch",{on:{goNewspaper:t.goNewspaper,goAgreementManage:t.goAgreementManage,goSystemInfoList:t.goSystemInfoList,goFileManage:t.goFileManage}}):s("keep-alive",[s("router-view",{attrs:{headId:t.headId,sendSystemId:t.sendSystemId},on:{goNewspaperHistory:t.goNewspaperHistory,goNewspaperEditHistory:t.goNewspaperEditHistory,goServicemess:t.goServicemess,goSinfoSumit:t.goSinfoSumit,getHeadId:t.getHeadId}})],1)],1)}),1)],1)],1)},staticRenderFns:[]};var h=s("VU/8")(r,l,!1,function(t){s("iHGW")},"data-v-4dfee4d6",null);e.default=h.exports}});
//# sourceMappingURL=8.066ff7988b18be629c91.js.map