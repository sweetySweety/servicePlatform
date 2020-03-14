<template>
    <div>
         <div class="title">条件搜索</div>
           <ul class="flex">
            <li class="flex">
                <div style="width:80px;">服务代码 </div>
                <a-input placeholder="请输入机构代码" style="width:150px ;margin-left:10px;"/>
            </li>
            <li class="flex">
                <div style="width:80px;">服务名称</div>
                <a-input placeholder="请输入机构名称"  style="width:150px;margin-left:10px;"/>
            </li>
            <li class="flex">
                <div style="width:80px;">场景代码	</div>
                <a-input placeholder="请输入机构名称"  style="width:150px;margin-left:10px;"/>
            </li>
           </ul>
        <ul class="flex">
              <li class="flex">
                <div style="width:80px;">场景名称</div>
                <a-input placeholder="请输入机构名称"  style="width:150px;margin-left:10px;"/>
            </li>
            <li class="flex">
                <div style="width:80px;">消费者</div>
                <a-input placeholder="请输入机构名称"  style="width:150px;margin-left:10px;"/>
            </li>
                 <li class="flex">
                <div style="width:80px;">	提供者</div>
                <a-input placeholder="请输入机构名称"  style="width:150px;margin-left:10px;"/>
            </li>


        </ul>
        <ul class="flex">
             <li class="flex">
                <div style="width:80px;">场景状态</div>
                <a-input placeholder="请输入机构名称"  style="width:150px;margin-left:10px;"/>
            </li>
              <li class="flex">
                	<div style="width:80px;">关联协议</div>
                <a-input placeholder="请输入机构名称"  style="width:150px;margin-left:10px;"/>
            </li>
              <li class="flex">
                	<div style="width:80px;">交易码</div>
                <a-input placeholder="请输入机构名称"  style="width:150px;margin-left:10px;"/>
            </li>
        </ul>
        <ul class="flex">
              <a-button icon="search"  style="margin-right:10px;" type="primary">查询</a-button>
              <a-button icon="search"  style="margin-right:10px;" type="primary">清空</a-button>
        </ul>
         <div class="title" style="margin-top:20px;">所有机构</div>

        <div style="margin-bottom:20px">
            <a-button icon="edit"    style="margin-right:10px;">导出EXCEL</a-button>
            <a-button icon="delete"  style="margin-right:10px;">导出PDF</a-button>
            <a-button icon="save"    style="margin-right:10px;">导出配置</a-button>
            <a-button icon="save"    style="margin-right:10px;">详细信息</a-button>
            <a-button icon="save"    style="margin-right:10px;">关联服务场景</a-button>
            <a-button icon="save"    style="margin-right:10px;">查询次数</a-button>
            <a-button icon="save"    style="margin-right:10px;">历史查询服务</a-button>
        </div>
         <div >
            <a-table :rowSelection="rowSelection" :columns="columns" :dataSource="data" >
                <a slot="number" slot-scope="text" href="javascript:;">{{text}}</a>
            </a-table>
        </div>

    </div>

</template>
<script>
    const columns = [{
            title: '服务代码',
            dataIndex: 'number',
            scopedSlots: { customRender: 'number' },
        },
        {
            title: '服务名称',
            dataIndex: 's_name',
        },
        {
            title: '场景代码',
            dataIndex: 'v_number',
        },
        {
            title: '场景名称',
            dataIndex: 'v_name',
        },
        {
            title: '调用方',
            dataIndex: 'user',
        },
        {
            title: '调用方协议',
            dataIndex: 'user_text',
        },
        {
            title: '提供方',
            dataIndex: 'provider',
        },
        {
            title: '提供方协议',
            dataIndex: 'provider_text',
        },
        {
            title: '版本号',
            dataIndex: 'version',
        },
        {
            title: '更新时间',
            dataIndex: 'updata_time',
        },
        {
            title: '更新用户',
            dataIndex: 'updata_user',
        },
        {
            title: '状态',
            dataIndex: 'state',
        }
    ];
    const data = [
        {
            key: '1',
            number: '20130000001',
            s_name: '客户签约查询',
            v_number: '01',
            v_name:'商户签约信息查询',
            user:'外联开放平台',
            user_text:'',
            provider:'银企直连系统',
            provider_text:'',
            version:'1.1.0',
            updata_time:'2019-09-02 18:44:03',
            updata_user:'lirongg',
            state:'已上线'
        },
        {
            key: '2',
            number: '20220000001',
            s_name: '对公协议管理',
            v_number: '01',
            v_name:'本场景用于对公客户接入银企业',
            user:'外联开放平台',
            user_text:'',
            provider:'银企直连系统',
            provider_text:'',
            version:'1.1.0',
            updata_time:'2019-09-02 18:44:03',
            updata_user:'lirongg',
            state:'服务定义'
        },
        {
            key: '3',
            number: '30033900001',
            s_name: '测试服务',
            v_number: '01',
            v_name:'测试服务',
            user:'外联开放平台',
            user_text:'',
            provider:'银企直连系统',
            provider_text:'',
            version:'1.1.0',
            updata_time:'2019-09-02 18:44:03',
            updata_user:'lirongg',
            state:'已上线'
        },
        {
            key: '4',
            number: '20130000001',
            s_name: '客户签约查询',
            v_number: '01',
            v_name:'商户签约信息查询',
            user:'外联开放平台',
            user_text:'',
            provider:'银企直连系统',
            provider_text:'',
            version:'1.1.0',
            updata_time:'2019-09-02 18:44:03',
            updata_user:'lirongg',
            state:'已上线'
        }
    ];

    export default({
        data () {
            return {
                data,
                columns
            }
        },
        computed: {
            rowSelection() {
                const { selectedRowKeys } = this;
                return {
                    onChange: (selectedRowKeys, selectedRows) => {
                        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                    },
                    getCheckboxProps: record => ({
                        props: {
                            // disabled: record.name === 'Disabled User', // Column configuration not to be checked
                            // name: record.name,
                        }
                    }),
                }
            }
        }
    });
</script>
<style scoped>
.title{
    font-size: 20px;
    font-weight: bold;
    margin-bottom:20px;
}
.flex{
    display: flex;
    display:-webkit-flex;
    align-items: center;
}
ul{
    list-style: none;
    padding:0;
}
li{
    margin-right: 10px;
}
</style>
