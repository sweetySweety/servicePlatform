<template><!--这里是版本管理导航组件-->
    <div>
         <a-layout-sider width="250" style="background: #fff">
        <a-menu
          theme="light"
          mode="inline"
          :defaultOpenKeys="['sub1','sub2']"
          :style="{ height: '100%', borderRight: 0 }"
        >
            <a-sub-menu key="sub1">
                <span slot="title"><a-icon type="user" />服务版本管理</span>
                <a-menu-item key="1">版本发布</a-menu-item>
                <a-menu-item key="2">版本历史</a-menu-item>
                <a-menu-item key="3">基线制作</a-menu-item>
                <a-menu-item key="4">基线历史</a-menu-item>
            </a-sub-menu>
            <a-sub-menu key="sub2">
                 <a-menu-item key="5">接口版本管理</a-menu-item>
            </a-sub-menu>
        </a-menu>
      </a-layout-sider>
    </div>  
</template>

<script>

export default {

    data(){
        return{
          
        }
    },
   
    methods:{
      
    }
    
}
</script>
<style scoped>
</style>