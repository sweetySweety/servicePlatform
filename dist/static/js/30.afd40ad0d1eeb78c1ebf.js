webpackJsonp([30],{G1yg:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("T452"),o=[{title:"日志类型",dataIndex:"typeStr"},{title:"日志描述",dataIndex:"detail"},{title:"操作用户",dataIndex:"userId"},{title:"日志日期",dataIndex:"time"}],i=[],l={components:{ATextarea:a("ufx+").a},data:function(){return{data:i,columns:o,uploadAction:s.a.baseURL+"/resourceImport/import",add_newenglish:!1,file:"",systemEName:"",systemCName:"",isRemould:"",RemouldDesc:"",deployArchite:"",DhandlingCapacity:"",ThandlingCapacity:"",isPIN:"",isEncryption:"",Encode:"",isFile:"",FileSize:"",Unit:"",communicationProtocol:"",interactiveMode:"",connectMode:"",messageType:"",outtime:"",connectNum:"",SeqnoLength:"",SeqnoDesc:"",isUnify:"",CommunicateDesc:"",isExplain:"",esbUser:"",systemList:[],protocolList:[],pageSize:5,currentPage:1,total:7,selectedRowKeys:[],selectedArrStr:"",type:9}},mounted:function(){this.getLogList(1,this.pageSize),this.getSystemList()},watch:{systemId:function(){var t=this.systemId;this.getProtocolList(t)}},destroyed:function(){},methods:{onChange:function(t){var e=this.pageSize;this.currentPage=t,this.getLogList(t,e)},onShowSizeChange:function(t,e){console.log(t,e)},onSelectChange:function(t){var e=this,a=[];t.map(function(t){a.push(e.data[t].id)}),this.selectedRowKeys=t,this.selectedArrStr=a.join()},beforeUpload:function(t,e){return this.file=t,!1},handleRegister:function(){var t=new FormData;t.append("file",this.file),t.append("systemEName",this.systemEName),t.append("systemCName",this.systemCName),t.append("isRemould",this.isRemould),t.append("RemouldDesc",this.RemouldDesc),t.append("deployArchite",this.deployArchite),t.append("esbUser",this.esbUser),t.append("DhandlingCapacity",this.DhandlingCapacity),t.append("ThandlingCapacity",this.ThandlingCapacity),t.append("isPIN",this.isPIN),t.append("isEncryption",this.isEncryption),t.append("Encode",this.Encode),t.append("isFile",this.isFile),t.append("TFileSize",this.FileSize),t.append("Unit",this.Unit),t.append("communicationProtocol",this.communicationProtocol),t.append("interactiveMode",this.interactiveMode),t.append("connectMode",this.connectMode),t.append("messageType",this.messageType),t.append("outtime",this.outtime),t.append("connectNum",this.connectNum),t.append("SeqnoLength",this.SeqnoLength),t.append("SeqnoDesc",this.SeqnoDesc),t.append("isUnify",this.isUnify),t.append("CommunicateDesc",this.CommunicateDesc),t.append("isExplain",this.isExplain);var e=t;this.$store.state.getUploadPost("/application/systemcollect",e,function(t){},this)},getSystemList:function(){var t=this;this.$store.state.getMoreDataGet("/system/getAll",{},function(e){t.systemList=e.data})},getProtocolList:function(t){var e=this,a={systemId:t};this.$store.state.getMoreDataStringPost("/protocol/getSystemProtocol",a,function(t){e.protocolList=t.data})},getLogList:function(t,e){var a=this,s=this.type,o={pageNo:t,rowNo:e};this.$store.state.getMoreDataStringPost("/application/getSystemRegisterLog",o,function(t){var e=t.data.row;e.map(function(t,e){a.$set(t,"key",e),t.type===s&&a.$set(t,"typeStr","系统申请导入")}),a.data=e,a.total=t.data.resultCount})},deleteOperation:function(){var t=this,e=this.selectedArrStr;this.$store.state.deleteLogList(e,function(){var e=t.pageSize;t.selectedRowKeys=[],t.getLogList(1,e)})},emptyOperation:function(){var t=this,e=this.type;this.$store.state.emptyLogList(e,function(){var e=t.pageSize;t.getLogList(1,e)})}}},c={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"title"},[t._v("填写系统接入申请单")]),t._v(" "),a("div",[a("a-upload",{attrs:{name:"file",multiple:!0,action:"uploadAction",beforeUpload:t.beforeUpload}},[a("a-button",[a("a-icon",{attrs:{type:"upload"}}),t._v("选择文件\n      ")],1)],1)],1),t._v(" "),a("div",{staticStyle:{"margin-top":"20px"}},[a("a-row",[a("a-col",{staticClass:"flex",attrs:{span:6}},[a("div",{staticClass:"ename"},[t._v("系统中文名称")]),t._v(" "),a("a-input",{staticStyle:{width:"150px"},attrs:{placeholder:"请输入元数据名称"},model:{value:t.systemCName,callback:function(e){t.systemCName=e},expression:"systemCName"}})],1),t._v(" "),a("a-col",{staticClass:"flex",attrs:{span:6}},[a("div",{staticClass:"ename"},[t._v(" 系统英文名称")]),t._v(" "),a("a-input",{staticStyle:{width:"150px"},attrs:{placeholder:"请输入中文名称"},model:{value:t.systemEName,callback:function(e){t.systemEName=e},expression:"systemEName"}})],1),t._v(" "),a("a-col",{staticClass:"flex",attrs:{span:6}},[a("div",{staticClass:"ename"},[t._v("系统能否改造")]),t._v(" "),a("a-select",{staticClass:"submit_select",model:{value:t.isRemould,callback:function(e){t.isRemould=e},expression:"isRemould"}},t._l(t.protocolList,function(e){return a("a-select-option",{key:e.protocolId,attrs:{value:e.protocolId}},[t._v(t._s(e.protocolName))])}),1)],1),t._v(" "),a("a-col",{staticClass:"flex",attrs:{span:6}},[a("div",{staticClass:"ename"},[t._v("改造说明\t")]),t._v(" "),a("a-input",{staticStyle:{width:"150px"},attrs:{placeholder:"请输入数据项分类"},model:{value:t.RemouldDesc,callback:function(e){t.RemouldDesc=e},expression:"RemouldDesc"}})],1)],1),t._v(" "),a("a-row",[a("a-col",{staticClass:"flex",attrs:{span:6}},[a("div",{staticClass:"ename"},[t._v("系统部署架构")]),t._v(" "),a("a-select",{staticClass:"submit_select",model:{value:t.deployArchite,callback:function(e){t.deployArchite=e},expression:"deployArchite"}},t._l(t.protocolList,function(e){return a("a-select-option",{key:e.protocolId,attrs:{value:e.protocolId}},[t._v(t._s(e.protocolName))])}),1)],1),t._v(" "),a("a-col",{staticClass:"flex",attrs:{span:6}},[a("div",{staticClass:"ename"},[t._v("系统设计日均交易吞吐量（万笔）")]),t._v(" "),a("a-input",{staticStyle:{width:"150px"},attrs:{placeholder:"请输入创建人"},model:{value:t.DhandlingCapacity,callback:function(e){t.DhandlingCapacity=e},expression:"DhandlingCapacity"}})],1),t._v(" "),a("a-col",{staticClass:"flex",attrs:{span:6}},[a("div",{staticClass:"ename"},[t._v("系统当前实际日均交易吞吐量（万笔）")]),t._v(" "),a("a-input",{staticStyle:{width:"150px"},attrs:{placeholder:"请输入创建人"},model:{value:t.ThandlingCapacity,callback:function(e){t.ThandlingCapacity=e},expression:"ThandlingCapacity"}})],1)],1),t._v(" "),a("a-row",[a("a-col",{staticClass:"flex",attrs:{span:6}},[a("div",{staticClass:"ename"},[t._v("是否PIN字段处理")]),t._v(" "),a("a-select",{staticClass:"submit_select",model:{value:t.isPIN,callback:function(e){t.isPIN=e},expression:"isPIN"}},t._l(t.protocolList,function(e){return a("a-select-option",{key:e.protocolId,attrs:{value:e.protocolId}},[t._v(t._s(e.protocolName))])}),1)],1),t._v(" "),a("a-col",{staticClass:"flex",attrs:{span:6}},[a("div",{staticClass:"ename"},[t._v("是否需要加密报文信息")]),t._v(" "),a("a-select",{staticClass:"submit_select",model:{value:t.isEncryption,callback:function(e){t.isEncryption=e},expression:"isEncryption"}},t._l(t.protocolList,function(e){return a("a-select-option",{key:e.protocolId,attrs:{value:e.protocolId}},[t._v(t._s(e.protocolName))])}),1)],1),t._v(" "),a("a-col",{staticClass:"flex",attrs:{span:6}},[a("div",{staticClass:"ename"},[t._v("编码格式")]),t._v(" "),a("a-input",{staticStyle:{width:"150px"},attrs:{placeholder:"请输入创建人"},model:{value:t.Encode,callback:function(e){t.Encode=e},expression:"Encode"}})],1)],1),t._v(" "),a("ul",{staticClass:"flex",staticStyle:{"flex-wrap":"wrap"}},[a("a-col",{staticClass:"flex",attrs:{span:6}},[a("div",{staticClass:"ename"},[t._v("交易附件需求")]),t._v(" "),a("a-select",{staticClass:"submit_select",model:{value:t.isFile,callback:function(e){t.isFile=e},expression:"isFile"}},t._l(t.protocolList,function(e){return a("a-select-option",{key:e.protocolId,attrs:{value:e.protocolId}},[t._v(t._s(e.protocolName))])}),1)],1),t._v(" "),a("a-col",{staticClass:"flex",attrs:{span:6}},[a("div",{staticClass:"ename"},[t._v("\t附件大小 ")]),t._v(" "),a("a-input",{staticStyle:{width:"150px"},attrs:{placeholder:"请输入创建人"},model:{value:t.FileSize,callback:function(e){t.FileSize=e},expression:"FileSize"}})],1),t._v(" "),a("a-col",{staticClass:"flex",attrs:{span:6}},[a("div",{staticClass:"ename"},[t._v("\t单位")]),t._v(" "),a("a-select",{staticClass:"submit_select",model:{value:t.Unit,callback:function(e){t.Unit=e},expression:"Unit"}},t._l(t.protocolList,function(e){return a("a-select-option",{key:e.protocolId,attrs:{value:e.protocolId}},[t._v(t._s(e.protocolName))])}),1)],1)],1),t._v(" "),a("ul",{staticClass:"flex",staticStyle:{"flex-wrap":"wrap"}},[a("a-col",{staticClass:"flex",attrs:{span:6}},[a("div",{staticClass:"ename"},[t._v("通讯协议/中间件")]),t._v(" "),a("a-select",{staticClass:"submit_select",model:{value:t.communicationProtocol,callback:function(e){t.communicationProtocol=e},expression:"communicationProtocol"}},t._l(t.protocolList,function(e){return a("a-select-option",{key:e.protocolId,attrs:{value:e.protocolId}},[t._v(t._s(e.protocolName))])}),1)],1),t._v(" "),a("a-col",{staticClass:"flex",attrs:{span:6}},[a("div",{staticClass:"ename"},[t._v("同步模式/异步模式")]),t._v(" "),a("a-select",{staticClass:"submit_select",model:{value:t.interactiveMode,callback:function(e){t.interactiveMode=e},expression:"interactiveMode"}},t._l(t.protocolList,function(e){return a("a-select-option",{key:e.protocolId,attrs:{value:e.protocolId}},[t._v(t._s(e.protocolName))])}),1)],1),t._v(" "),a("a-col",{staticClass:"flex",attrs:{span:6}},[a("div",{staticClass:"ename"},[t._v("连接方式")]),t._v(" "),a("a-select",{staticClass:"submit_select",model:{value:t.connectMode,callback:function(e){t.connectMode=e},expression:"connectMode"}},t._l(t.protocolList,function(e){return a("a-select-option",{key:e.protocolId,attrs:{value:e.protocolId}},[t._v(t._s(e.protocolName))])}),1)],1)],1),t._v(" "),a("ul",{staticClass:"flex",staticStyle:{"flex-wrap":"wrap"}},[a("a-col",{staticClass:"flex",attrs:{span:6}},[a("div",{staticClass:"ename"},[t._v("\t报文格式")]),t._v(" "),a("a-input",{staticStyle:{width:"150px"},attrs:{placeholder:"请输入创建人"},model:{value:t.messageType,callback:function(e){t.messageType=e},expression:"messageType"}})],1),t._v(" "),a("a-col",{staticClass:"flex",attrs:{span:6}},[a("div",{staticClass:"ename"},[t._v("\t系统超时时间（秒）")]),t._v(" "),a("a-input",{staticStyle:{width:"150px"},attrs:{placeholder:"请输入创建人"},model:{value:t.outtime,callback:function(e){t.outtime=e},expression:"outtime"}})],1),t._v(" "),a("a-col",{staticClass:"flex",attrs:{span:6}},[a("div",{staticClass:"ename"},[t._v("\t系统最大连接数")]),t._v(" "),a("a-input",{staticStyle:{width:"150px"},attrs:{placeholder:"请输入创建人"},model:{value:t.connectNum,callback:function(e){t.connectNum=e},expression:"connectNum"}})],1)],1),t._v(" "),a("ul",{staticClass:"flex",staticStyle:{"flex-wrap":"wrap"}},[a("a-col",{staticClass:"flex",attrs:{span:6}},[a("div",{staticClass:"ename"},[t._v("\t流水号长度")]),t._v(" "),a("a-input",{staticStyle:{width:"150px"},attrs:{placeholder:"请输入创建人"},model:{value:t.SeqnoLength,callback:function(e){t.SeqnoLength=e},expression:"SeqnoLength"}})],1),t._v(" "),a("a-col",{staticClass:"flex",attrs:{span:6}},[a("div",{staticClass:"ename"},[t._v("\t流水号范围区间")]),t._v(" "),a("a-input",{staticStyle:{width:"150px"},attrs:{placeholder:"请输入创建人"},model:{value:t.SeqnoDesc,callback:function(e){t.SeqnoDesc=e},expression:"SeqnoDesc"}})],1),t._v(" "),a("a-col",{staticClass:"flex",attrs:{span:6}},[a("div",{staticClass:"ename"},[t._v("通讯方式是否统一")]),t._v(" "),a("a-select",{staticClass:"submit_select",model:{value:t.isUnify,callback:function(e){t.isUnify=e},expression:"isUnify"}},t._l(t.protocolList,function(e){return a("a-select-option",{key:e.protocolId,attrs:{value:e.protocolId}},[t._v(t._s(e.protocolName))])}),1)],1)],1),t._v(" "),a("ul",{staticClass:"flex",staticStyle:{"flex-wrap":"wrap"}},[a("a-col",{staticClass:"flex",attrs:{span:6}},[a("div",{staticClass:"ename"},[t._v("  特殊方式说明")]),t._v(" "),a("a-input",{staticStyle:{width:"150px"},attrs:{placeholder:"请输入创建人"},model:{value:t.CommunicateDesc,callback:function(e){t.CommunicateDesc=e},expression:"CommunicateDesc"}})],1),t._v(" "),a("a-col",{staticClass:"flex",attrs:{span:6}},[a("div",{staticClass:"ename"},[t._v("\t是否宣贯")]),t._v(" "),a("a-select",{staticClass:"submit_select",model:{value:t.isExplain,callback:function(e){t.isExplain=e},expression:"isExplain"}},t._l(t.protocolList,function(e){return a("a-select-option",{key:e.protocolId,attrs:{value:e.protocolId}},[t._v(t._s(e.protocolName))])}),1)],1),t._v(" "),a("a-col",{staticClass:"flex",attrs:{span:6}},[a("div",{staticClass:"ename"},[t._v("通知ESB")]),t._v(" "),a("a-select",{staticClass:"submit_select",model:{value:t.esbUser,callback:function(e){t.esbUser=e},expression:"esbUser"}},t._l(t.protocolList,function(e){return a("a-select-option",{key:e.protocolId,attrs:{value:e.protocolId}},[t._v(t._s(e.protocolName))])}),1)],1)],1),t._v(" "),a("a-row",[a("a-button",{attrs:{icon:"save",type:"primary"},on:{click:t.handleRegister}},[t._v("提交")])],1)],1),t._v(" "),a("div",{staticClass:"title",staticStyle:{"margin-top":"20px"}},[t._v("导入日志")]),t._v(" "),a("div",{staticStyle:{"margin-bottom":"20px"}},[a("a-button",{staticStyle:{"margin-right":"10px"},attrs:{icon:"delete"},on:{click:t.deleteOperation}},[t._v("删除")]),t._v(" "),a("a-button",{staticStyle:{"margin-right":"10px"},attrs:{icon:"delete"},on:{click:t.emptyOperation}},[t._v("清空")])],1),t._v(" "),a("div",{staticClass:"scroll_table_border"},[a("a-table",{attrs:{rowSelection:{selectedRowKeys:t.selectedRowKeys,onChange:t.onSelectChange},pagination:{pageSize:t.pageSize,onShowSizeChange:t.onShowSizeChange,total:t.total,onChange:t.onChange},columns:t.columns,dataSource:t.data}})],1)])},staticRenderFns:[]};var n=a("VU/8")(l,c,!1,function(t){a("zj3O")},"data-v-74a18fc4",null);e.default=n.exports},zj3O:function(t,e){}});
//# sourceMappingURL=30.afd40ad0d1eeb78c1ebf.js.map