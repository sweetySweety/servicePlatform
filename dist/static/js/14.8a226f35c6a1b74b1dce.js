webpackJsonp([14],{kXOl:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("T452"),n=[{title:"文件名称",dataIndex:"fileName",scopedSlots:{customRender:"name"}},{title:"系统名称",dataIndex:"systemName"},{title:"文件大小",dataIndex:"fileSize"},{title:"文件路径",dataIndex:"filePath"},{title:"文件备注",dataIndex:"fileDesc"},{title:"操作",dataIndex:"operation",scopedSlots:{customRender:"operation"}}],s=[],o={components:{ATextarea:a("ufx+").a},data:function(){return{data:s,columns:n,isChange:!0,addModel:!1,title:"",isEdit:0,uploadAction:i.a.baseURL+"/resourceImport/import",downloadAction:i.a.baseURL+"/fileManager/download?fileId=",systemList:[],currentPage:1,pageSize:10,total:10,fileIdStr:"",systemId:"",file:"",fileDesc:""}},computed:{rowSelection:function(){var t=this;this.selectedRowKeys;return{onChange:function(e,a){if(a.length>0){t.isChange=!1;var i=[];a.map(function(t){i.push(t.fileId)}),t.fileIdStr=i.join()}else t.isChange=!0},getCheckboxProps:function(t){return{props:{disabled:"Disabled User"===t.name,name:t.name}}}}}},mounted:function(){this.getSystemList(),this.searchSystemList()},methods:{beforeUpload:function(t,e){return this.file=t,!1},onPageChange:function(t){var e=this.pageSize;this.currentPage=t,this.getLogList(t,e)},onShowSizeChange:function(t,e){console.log(t,e)},showConfirm:function(){var t=this;this.$confirm({title:"是否确认要删除?",content:"按下确认后，所选内容将在1秒钟后删除",okText:"确认",cancelText:"取消",keyboard:!1,onOk:function(){t.deleteSystem()},onCancel:function(){}})},downLoadFile:function(t){var e=document.createElement("a");e.href=this.downloadAction+t.fileId,e.click()},showAddModel:function(){this.title="新增文件",this.addModel=!0,this.isEdit=0,this.emptyAddipt()},emptyAddipt:function(){this.file="",this.systemId="",this.fileDesc=""},saveOperation:function(){this.addSystem()},addSystem:function(){var t=this,e=new FormData;e.append("file",this.file),e.append("fileDesc",this.fileDesc),e.append("systemId",this.systemId);var a=e;this.$store.state.getMoreDataPost("/fileManager/upload",a,function(e){t.addModel=!1,t.searchSystemList()})},deleteSystem:function(){var t=this,e={fileId:this.fileIdStr};this.$store.state.getMoreDataDelete("/fileManager/delete",e,function(e){t.data=e.data})},getSystemList:function(){var t=this;this.$store.state.getMoreDataGet("/system/getAll",{},function(e){t.systemList=e.data})},searchSystemList:function(){var t=this,e={pageNo:this.currentPage,rowNo:this.pageSize};this.$store.state.getMoreDataStringPost("/fileManager/getAll",e,function(e){var a=e.data;t.data=a.row,t.total=a.resultCount})}}},l={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"title"},[t._v("文件管理")]),t._v(" "),a("div",{staticStyle:{"margin-bottom":"20px"}},[a("a-button",{staticStyle:{"margin-right":"10px"},attrs:{icon:"edit"},on:{click:t.showAddModel}},[t._v("新增")]),t._v(" "),a("a-button",{staticStyle:{"margin-right":"10px"},attrs:{icon:"delete",disabled:t.isChange},on:{click:t.showConfirm}},[t._v("删除")])],1),t._v(" "),a("div",[a("a-table",{attrs:{rowSelection:t.rowSelection,pagination:{pageSize:t.pageSize,onShowSizeChange:t.onShowSizeChange,total:t.total,onChange:t.onPageChange},columns:t.columns,dataSource:t.data},scopedSlots:t._u([{key:"operation",fn:function(e,i){return[a("a-button",{attrs:{icon:"download"},on:{click:function(e){return t.downLoadFile(i)}}},[t._v("下载")])]}}])})],1),t._v(" "),a("a-modal",{attrs:{title:t.title,okText:"保存",cancelText:"取消",width:"450px"},on:{ok:t.saveOperation},model:{value:t.addModel,callback:function(e){t.addModel=e},expression:"addModel"}},[a("div",{staticClass:"graybox"},[a("ul",[a("li",{staticClass:"flex",staticStyle:{"margin-bottom":"10px"}},[a("font",{staticClass:"iptTitle"},[t._v("文件：")]),t._v(" "),a("a-upload",{attrs:{name:"file",multiple:!0,action:"uploadAction",beforeUpload:t.beforeUpload}},[a("a-button",[a("a-icon",{attrs:{type:"upload"}}),t._v("选择文件\n          ")],1)],1)],1),t._v(" "),a("li",{staticClass:"flex",staticStyle:{"margin-bottom":"10px"}},[a("font",{staticClass:"iptTitle"},[t._v("系统：")]),t._v(" "),a("a-select",{staticStyle:{width:"250px","margin-left":"10px"},attrs:{defaultValue:""},model:{value:t.systemId,callback:function(e){t.systemId=e},expression:"systemId"}},t._l(t.systemList,function(e){return a("a-select-option",{attrs:{value:e.systemId}},[t._v(t._s(e.systemChineseName))])}),1)],1),t._v(" "),a("li",{staticClass:"flex",staticStyle:{"margin-bottom":"10px"}},[a("font",{staticClass:"iptTitle"},[t._v("文件备注：")]),a("a-textarea",{staticStyle:{width:"250px","margin-left":"10px"},attrs:{placeholder:""},model:{value:t.fileDesc,callback:function(e){t.fileDesc=e},expression:"fileDesc"}})],1)])])])],1)},staticRenderFns:[]};var d=a("VU/8")(o,l,!1,function(t){a("nWVF")},"data-v-e57f61e8",null);e.default=d.exports},nWVF:function(t,e){}});
//# sourceMappingURL=14.8a226f35c6a1b74b1dce.js.map