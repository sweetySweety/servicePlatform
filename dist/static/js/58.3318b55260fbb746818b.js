webpackJsonp([58],{"6EOg":function(t,e){},ibFi:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=[{title:"日志类型",dataIndex:"typeStr"},{title:"日志描述",dataIndex:"detail"},{title:"操作用户",dataIndex:"userId"},{title:"日志日期",dataIndex:"time"}],n=[],o={data:function(){return{data:n,columns:i,add_newenglish:!1,fileList:[],select:"y",file:"",uploading:!1,selectedRowKeys:[],pageSize:5,currentPage:1,total:7,selectedArrStr:"",type:1}},computed:{},mounted:function(){var t=this.pageSize;this.getLogList(1,t)},destroyed:function(){},methods:{onChange:function(t){var e=this.pageSize;this.currentPage=t,this.getLogList(t,e)},onShowSizeChange:function(t,e){console.log(t,e)},onSelectChange:function(t){var e=this,a=[];t.map(function(t){a.push(e.data[t].id)}),this.selectedRowKeys=t,this.selectedArrStr=a.join()},getLogList:function(t,e){var a=this,i=this.type,n={pageNumber:t,pageSize:e,type:i};this.$store.state.getMoreDataGet("/log/getFileImportLog",n,function(t){var e=t.data.rows;e.map(function(t,e){a.$set(t,"key",e),t.type===i&&a.$set(t,"typeStr","数据字典导入")}),a.data=e,a.total=t.data.total})},deleteOperation:function(){var t=this,e=this.selectedArrStr;this.$store.state.deleteLogList(e,function(){var e=t.pageSize;t.selectedRowKeys=[],t.getLogList(1,e)})},emptyOperation:function(){var t=this,e=this.type;this.$store.state.emptyLogList(e,function(){var e=t.pageSize;t.getLogList(1,e)})},goTo:function(){this.$router.push({path:"/platform"})},addnew:function(){this.add_newenglish=!0},handleChange:function(t){this.select=t},beforeUpload:function(t,e){return this.file=t,this.fileList=e,!1},handleUpload:function(){var t=new FormData;t.append("file",this.file),t.append("select",this.select);var e=t;this.$store.state.getUploadPost("/mappingImport/fieldImport",e,function(t){},this)}}},s={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"title"},[t._v("导入Excel")]),t._v(" "),a("div",{staticStyle:{display:"-webkit-flex"}},[a("a-upload",{attrs:{name:"file",multiple:!0,action:"http://172.20.10.14:9091/resourceImport/import",beforeUpload:t.beforeUpload}},[a("a-button",[a("a-icon",{attrs:{type:"upload"}}),t._v(" 选择文件\n          ")],1)],1),t._v(" "),a("a-select",{staticStyle:{width:"120px","margin-left":"10px"},attrs:{defaultValue:"覆盖"},on:{change:t.handleChange}},[a("a-select-option",{attrs:{value:"y"}},[t._v("覆盖")]),t._v(" "),a("a-select-option",{attrs:{value:"n"}},[t._v("不覆盖")])],1),t._v(" "),a("a-button",{staticStyle:{"margin-left":"10px"},attrs:{icon:"save",type:"primary",disabled:0===t.fileList.length,loading:t.uploading},on:{click:t.handleUpload}},[t._v("文件上传")])],1),t._v(" "),a("div",{staticClass:"title",staticStyle:{"margin-top":"20px"}},[t._v("导入日志")]),t._v(" "),a("div",{staticStyle:{"margin-bottom":"20px"}},[0==t.selectedRowKeys.length?a("a-button",{staticStyle:{"margin-right":"10px"},attrs:{disabled:"",icon:"delete"},on:{click:t.deleteOperation}},[t._v("删除")]):a("a-button",{staticStyle:{"margin-right":"10px"},attrs:{icon:"delete"},on:{click:t.deleteOperation}},[t._v("删除")]),t._v(" "),a("a-button",{staticStyle:{"margin-right":"10px"},attrs:{icon:"delete"},on:{click:t.emptyOperation}},[t._v("清空")])],1),t._v(" "),a("div",[a("a-table",{attrs:{scroll:{y:200},pagination:{pageSize:t.pageSize,onShowSizeChange:t.onShowSizeChange,total:t.total,onChange:t.onChange},rowSelection:{selectedRowKeys:t.selectedRowKeys,onChange:t.onSelectChange},columns:t.columns,dataSource:t.data}})],1)])},staticRenderFns:[]};var l=a("VU/8")(o,s,!1,function(t){a("6EOg")},"data-v-20904394",null);e.default=l.exports}});
//# sourceMappingURL=58.3318b55260fbb746818b.js.map