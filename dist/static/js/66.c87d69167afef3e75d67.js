webpackJsonp([66],{FBXq:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=[{title:"服务代码",dataIndex:"s_num",scopedSlots:{customRender:"s_num"}},{title:"服务名称",dataIndex:"s_name"},{title:"服务场景",dataIndex:"s_sence"},{title:"服务场景名称",dataIndex:"s_sencename"},{title:"场景描述",dataIndex:"s_sencedescribe"},{title:"修订类型",dataIndex:"changecate"},,{title:"版本号",dataIndex:"version"}],s=[{s_num:"40130000001",s_name:"客户风险管理信息查询",s_sence:"01",s_sencename:"风险等级匹配结果查询",s_sencedescribe:"本场景用于查询对公或个人客户的风险等级与理财产品是否匹配。",changecate:"修改",version:"1.1.0"}],i={data:function(){return{data:s,columns:n,add_newenglish:!1}},computed:{},destroyed:function(){console.log("我已经离开了！")},methods:{goTo:function(){this.$router.push({path:"/platform"})},addnew:function(){this.add_newenglish=!0},handleOk:function(t){var e=this;this.ModalText="The modal will be closed after two seconds",this.confirmLoading=!0,setTimeout(function(){e.visible=!1,e.confirmLoading=!1},2e3)},handleCancel:function(t){console.log("Clicked cancel button"),this.visible=!1}}},l={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"title"},[t._v("版本信息")]),t._v(" "),a("ul",{staticClass:"flex",staticStyle:{"flex-wrap":"wrap"}},[a("li",{staticClass:"flex"},[t._v("\n            版本描述\n            "),a("a-input",{staticStyle:{width:"150px","margin-left":"10px"},attrs:{placeholder:"请输入服务代码"}})],1),t._v(" "),a("li",{staticClass:"flex"},[t._v("\n             服务代码\t\n            "),a("a-input",{staticStyle:{width:"150px","margin-left":"10px"},attrs:{placeholder:"请输入中文名称"}})],1),t._v(" "),a("li",{staticClass:"flex"},[t._v("\n            服务名称\n            "),a("a-input",{staticStyle:{width:"150px","margin-left":"10px"},attrs:{placeholder:"请输入类别词"}})],1),t._v(" "),a("li",{staticClass:"flex"},[t._v("\n           场景代码\t\n            "),a("a-input",{staticStyle:{width:"150px","margin-left":"10px"},attrs:{placeholder:"请输入数据项分类"}})],1),t._v(" "),a("li",{staticClass:"flex"},[t._v("\n            场景名称\n            "),a("a-input",{staticStyle:{width:"150px","margin-left":"10px"},attrs:{placeholder:"请输入创建人"}})],1),t._v(" "),a("a-button",{staticStyle:{"margin-right":"10px"},attrs:{icon:"search",type:"primary"}},[t._v("查询")]),t._v(" "),a("a-button",{staticStyle:{"margin-right":"10px"},attrs:{icon:"delete",type:"primary"}},[t._v("清空")])],1),t._v(" "),a("div",{staticClass:"title",staticStyle:{"margin-top":"20px"}},[t._v("工作项发布清单(服务定义)")]),t._v(" "),a("div",{staticStyle:{"margin-bottom":"20px"}}),t._v(" "),a("div",[a("a-table",{attrs:{columns:t.columns,dataSource:t.data},scopedSlots:t._u([{key:"s_num",fn:function(e){return a("a",{attrs:{href:"javascript:;"}},[t._v(t._s(e))])}}])})],1)])},staticRenderFns:[]};var c=a("VU/8")(i,l,!1,function(t){a("UtWr")},"data-v-037f9069",null);e.default=c.exports},UtWr:function(t,e){}});
//# sourceMappingURL=66.c87d69167afef3e75d67.js.map