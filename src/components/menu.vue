<template><!--这里是顶部导航组件-->
    <div>
        <a-layout-header class="header">
            <div class="logo">服务治理平台</div>
            <a-menu
                theme="dark"
                mode="horizontal"
                :defaultSelectedKeys="items"
                :style="{ lineHeight: '64px' }"
            >
                <a-menu-item key="1" @click="goTopublic">公共信息</a-menu-item>
                <a-menu-item key="2" @click="goTosystem">系统管理</a-menu-item>
                <!-- <a-menu-item ></a-menu-item> -->
                 <a-sub-menu  key="3" @click="goToservicem">
                    <span slot="title" class="submenu-title-wrapper">服务管理</span>
                    <a-menu-item-group>
                        <a-menu-item key="setting:1">服务信息管理</a-menu-item>
                        <a-menu-item key="setting:2">版本管理</a-menu-item>
                        <a-menu-item key="setting:3">服务检索</a-menu-item>
                    </a-menu-item-group>
                </a-sub-menu>
                <a-menu-item key="4" @click="goTotradelinks">交易链路</a-menu-item>
                <a-menu-item key="5" @click="goTostatistic">统计报表</a-menu-item>
                <a-menu-item key="6" @click="goTo">平台管理</a-menu-item>
                <a-menu-item key="7" @click="goTomywork">我的工作台</a-menu-item>
            </a-menu>
        </a-layout-header>
    </div>
</template>

<script>

export default {
    props: ['items'],//接收父组件传的值
    data(){
        return{

        }
    },
    created(){
       console.log(this.selectedKey)
    },
    methods:{
        goTopublic(){//跳转到公共信息
            this.$router.push({ path: "/home" });
            // this.selectedKey = ["1"];
        },
        goTosystem(){//跳转到系统管理
            this.$router.push({ path: "/system" });
            this.selectedKey = ["2"];
        },
        goToservicem(){//跳转到服务管理
            this.$router.push({ path: "/servicemanage" });
            this.selectedKey = ["3"];
        },
        goTotradelinks(){//跳转到交易链路
            this.$router.push({ path: "/transactionLink" });
            this.selectedKey = ["4"];
        },
        goTostatistic(){//跳转到统计报表
            this.$router.push({ path: "/Statistics" });
            this.selectedKey = ["5"];
        },
        goTo(){//跳转到平台管理
            this.$router.push({ path: "/platform" });
            this.selectedKey = ["6"];
        },
        goTomywork(){//跳转到我的工作台
            this.$router.push({ path: "/myworkspace" });
            this.selectedKey = ["7"];
        }
    }

}
</script>
<style scoped>
.ant-tabs-tabpane{
  height: 800px;
  overflow-y: scroll;
}
#components-layout-demo-top-side-2 .logo {
  width: 172px;
    font-size: 24px;
  height: 31px;
  line-height: 31px;
  /* background: rgba(255,255,255,.2); */
  margin: 16px 28px 16px 0;
  color: #fff;
  font-weight: bold;
  float: left;

}
</style>
