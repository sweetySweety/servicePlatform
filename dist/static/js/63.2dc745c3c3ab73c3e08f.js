webpackJsonp([63],{"3WIe":function(e,t){},"p2+C":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("zIkb"),o=a("jxFY"),i={data:function(){var e=[{title:"首页服务检测",content:"首页内容",key:"/transactionLink"}];return{activeClass:-1,activeKey:e[0].key,panes:e,newTabIndex:0,systemList:[{name:"加密平台"},{name:"理财销售系统"},{name:"生物识别系统"},{name:"信用卡前置系统"},{name:"综合管理平台"},{name:"IC卡系统"},{name:"客服信息管理"}]}},components:{headshow:n.a,conditioSearch:o.a},mounted:function(){localStorage.removeItem("search"),localStorage.removeItem("protect"),localStorage.removeItem("preview")},methods:{onSearch:function(e){console.log(e)},pointAdd:function(){},pointprotect:function(e){if(console.log(e),null==localStorage.protect||0==localStorage.protect){var t=this.panes,a="/transactionLink/preserve";t.push({title:"节点维护",content:"Content of new Tab "+a,key:a}),this.panes=t,this.activeKey=a,this.$router.push(a),localStorage.protect=a}else this.activeKey=localStorage.protect,this.$router.push(localStorage.protect)},preview:function(){if(null==localStorage.preview||0==localStorage.preview){var e=this.panes,t="/transactionLink/preview";e.push({title:"预览",content:"Content of new Tab "+t,key:t}),this.panes=e,this.activeKey=t,this.$router.push(t),localStorage.preview=t,console.log("创建预览成功")}else this.activeKey=localStorage.preview,this.$router.push(localStorage.preview)},getitem:function(e,t){if(this.activeClass=e,null==localStorage.search||0==localStorage.search){var a=this.panes,n="/transactionLink/search";a.push({title:t,content:"Content of new Tab "+n,key:n}),this.panes=a,this.activeKey=n,this.$router.push(n),localStorage.search=n}else this.activeKey=localStorage.search,this.$router.push(localStorage.search)},goTopublic:function(){this.$router.push({path:"/"})},onEdit:function(e,t){this[t](e)},onChange:function(e){this.$router.push(e)},remove:function(e){var t=this.activeKey,a=void 0;this.panes.forEach(function(t,n){t.key===e&&(a=n-1)});var n=this.panes.filter(function(t){return t.key!==e});a>=0&&t===e&&(t=n[a].key),this.panes=n,this.activeKey=t}}},s={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("a-layout",{attrs:{id:"components-layout-demo-top-side-2"}},[a("headshow",{attrs:{items:["4"]}}),e._v(" "),a("a-layout",[a("a-layout-sider",{staticStyle:{background:"#fff"},attrs:{width:"250"}},[a("a-input-search",{staticStyle:{width:"230px",margin:"10px"},attrs:{placeholder:"input search text"},on:{search:e.onSearch}}),e._v(" "),a("ul",{staticClass:"systemListname"},e._l(e.systemList,function(t,n){return a("li",{key:n,class:e.activeClass==n?"active":"",on:{click:function(a){return e.getitem(n,t.name)}}},[a("a-icon",{attrs:{type:"desktop"}}),e._v(e._s(t.name))],1)}),0)],1),e._v(" "),a("a-tabs",{style:{padding:"24px",margin:0,minHeight:"280px",width:"100%"},attrs:{type:"editable-card",hideAdd:""},on:{edit:e.onEdit,change:e.onChange},model:{value:e.activeKey,callback:function(t){e.activeKey=t},expression:"activeKey"}},e._l(e.panes,function(t){return a("a-tab-pane",{key:t.key,attrs:{tab:t.title,closable:t.closable}},["/transactionLink"==t.key?a("conditioSearch"):a("keep-alive",[a("div"),e._v(" "),a("router-view",{on:{createP:e.pointprotect}})],1)],1)}),1)],1)],1)},staticRenderFns:[]};var r=a("VU/8")(i,s,!1,function(e){a("3WIe")},"data-v-09e3b68a",null);t.default=r.exports}});
//# sourceMappingURL=63.2dc745c3c3ab73c3e08f.js.map