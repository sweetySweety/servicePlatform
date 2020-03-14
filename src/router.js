import Vue from 'vue'
import Router from 'vue-router'
import home from './views/home/index.vue'
import login from './views/login/login.vue'
Vue.use(Router)

const router = new Router({
  mode: 'hash',
  base: '/',
  routes: [
    {
      path:'/',
      name: 'login', // 登录
      component: login
    },
    {
      path: '/home',
      name: 'home', // 公共平台
      component: home,
      children: [{
        path: '/',
        name: 'public',
        component: () => import('./views/public/index.vue'),
        children: [
          {
            path: '/public/english',
            component: () => import('./views/public/english.vue') // 英文单词及缩写管理
          },
          {
            path: '/public/category',
            component: () => import('./views/public/category.vue')// 类别词管理
          },
          {
            path: '/public/metadata',
            component: () => import('./views/public/metadata.vue'), // 元数据管理
            children: [
              {
                path: '/pastData',
                component: () => import('./views/public/metaData/pastData.vue') // 过时元数据
              },{
                path: '/reviewData',
                component: () => import('./views/public/metaData/reviewData.vue') // 评审元数据
              }]
          },
          {
            path: '/public/publicm',
            component: () => import('./views/public/publicm.vue'), // 公共代代码管理
            children: [
              {
                path: '/publicDataManage',
                component: () => import('./views/public/publicData/publicDataManage.vue') // 公共代码维护
              },
              {
                path: '/fromDataManage',
                component: () => import('./views/public/publicData/fromDataManage.vue') // 从代码维护
              },
              {
                path: '/representation',
                component: () => import('./views/public/publicData/representation.vue') // 枚举映射
              },
              {
                path: '/masterDataManage',
                component: () => import('./views/public/publicData/masterDataManage.vue') // 主代码代码维护
              }
            ]
          },
          {
            path: '/public/datadictionary', // 数据字典
            component: () => import('./views/public/datadictionary.vue')
          }, {
            path: '/public/fieldmapping', // 字段映射
            component: () => import('./views/public/fieldmapping.vue')
          }, {
            path: '/public/orgininterface', // 原始接口
            component: () => import('./views/public/orgininterface.vue')
          }, {
            path: '/public/messageheader', // 报文头导入
            component: () => import('./views/public/messageheader.vue')
          }, {
            path: '/public/registered', // 注册申请
            component: () => import('./views/public/registered.vue')
          }, {
            path: '/public/systemconnect',
            component: () => import('./views/public/systemconnect.vue')// 系统接入申请
          }, {
            path: '/public/retired',
            component: () => import('./views/public/retired.vue')// 系统退役
          },
          {
            path: '/public/change',
            component: () => import('./views/public/change.vue')// 变更申请
          }, {
            path: '/public/use',
            component: () => import('./views/public/use.vue')// 变更申请
          }, {
            path: '/public/servicemess',
            component: () => import('./views/public/servicemess.vue')// 报文头
          }

        ]
      }]
    },

    {
      path: '/platform',
      name: 'platform',
      component: () => import('./views/platform/index.vue'), // ******平台管理********//
      children: [
        {
          path: 'menu',
          component: () => import('./views/platform/menu.vue')// 用户维护
        },
        {
          path: 'usermaintenance',
          component: () => import('./views/platform/usermaintenance.vue') // 用户维护
        },
        {
          path: 'rolemaintenance',
          component: () => import('./views/platform/rolemaintenance.vue')// 角色维护
        },
        {
          path: 'institutions',
          component: () => import('./views/platform/institutions.vue')// 机构管理
        },

        {
          path: 'note',
          component: () => import('./views/platform/note.vue')// 日志管理
        },
        {
          path: 'classify',
          component: () => import('./views/platform/classify.vue')// 生成类管理
        },
        {
          path: 'esb',
          component: () => import('./views/platform/esb.vue')// esb管理
        },
        {
          path: 'word',
          component: () => import('./views/platform/word.vue')// 字段处理管理
        }
      ]
    }, {
      path: '/Statistics',
      name: 'Statistics',
      component: () => import('./views/Statistics/index.vue'), // ******统计报表********//
      children: [
        {
          path: 'repeat',
          component: () => import('./views/Statistics/repeat.vue')// 复用率统计
        }, {
          path: 'leout',
          component: () => import('./views/Statistics/leout.vue')// 发布统计
        }, {
          path: 'service',
          component: () => import('./views/Statistics/service.vue')// 服务数统计
        }
      ]
    },
    {
      path: '/system',
      name: 'system',
      component: () => import('./views/system/index.vue'), // ******系统管理********//
      children: [
        {
          path: 'newspaperHistory',
          component: () => import('./views/system/newspaperHistory.vue') // 报文头历史
        },
        {
          path: 'newspaperEditHistory',
          component: () => import('./views/system/newspaperEditHistory.vue') // 报文头修订历史
        },
        {
          path: 'agreementManage',
          component: () => import('./views/system/agreementManage.vue') // 协议管理
        },
        {
          path: 'systemInfoSubmit',
          component: () => import('./views/system/systemInfoSubmit.vue') // 系统信息详情提交审核
        },
        {
          path: 'systemInfoList',
          component: () => import('./views/system/systemInfoList.vue') // 系统信息详情管理
        },
        {
          path: 'fileManage',
          component: () => import('./views/system/fileManage.vue') // 文件管理
        },
        {
          path: 'system',
          component: () => import('./views/system/system.vue') // 系统页面
        },
        {
          path: 'interfaceType',
          component: () => import('./views/system/interfaceType.vue') // 消费方接口
        },
        {
          path: 'interfaceTypeOffer',
          component: () => import('./views/system/interfaceTypeOffer.vue') // 提供方接口
        },
        {
          path: 'interface',
          component: () => import('./views/system/interface.vue')// 接口页面
        },
        {
          path: 'newspaper',
          component: () => import('./views/system/newspaper.vue')// 报文头页面
        },
        {
          path: 'servicemess',
          component: () => import('./views/system/servicemess.vue')// 报文头详情
        }
      ]
    },
    {
      path: '/myworkspace',
      name: 'myworkspace',
      component: () => import('./views/myworkspace/index.vue'), // ******我的工作台********//
      children: [
        {
          path: 'resource',
          component: () => import('./views/myworkspace/resource.vue'),// 资源管理页面
          children: [
            {
              path: '/currentResource',
              component: () => import('./views/myworkspace/resource/currentResource.vue') // 当前任务详情
            },{
              path: '/historyResource',
              component: () => import('./views/myworkspace/resource/historyResource.vue') // 历史任务详情
            }
          ]
        }, {
          path: 'project',
          component: () => import('./views/myworkspace/project.vue'),// 项目管理页面
          children: [
            {
              path: '/detailProject',
              component: () => import('./views/myworkspace/project/detailProject.vue') // 系统详情
            }
          ]
        },
        {
          path: 'datacount',
          component: () => import('./views/myworkspace/datacount.vue')// 数据统计页面
        },
        {
          path: 'todolist',
          component: () => import('./views/myworkspace/todolist.vue'),// 代办事宜
          children: [
            {
              path: 'viewInfo',
              component: () => import('./views/myworkspace/todoList/viewInfo.vue')// 查看详情
            }
          ]
        },
        {
          path: 'havedolist',
          component: () => import('./views/myworkspace/havedolist.vue'),// 已办事宜
          children: [
            {
              path: 'viewInfo',
              component: () => import('./views/myworkspace/havedoList/viewInfo.vue')// 查看详情
            }
          ]
        },
        {
          path: 'serviceprocess',
          component: () => import('./views/myworkspace/serviceprocess.vue')// 服务流程
        },
        {
          path: 'processtemplate',
          component: () => import('./views/myworkspace/processtemplate.vue')// 流程模板
        }

      ]
    },
    {
      path: '/transactionLink',
      name: 'transactionLink',
      component: () => import('./views/transactionLink/index.vue'), // ******交易链路********//
      children: [
        {
          path: 'search',
          component: () => import('./views/transactionLink/search.vue')// 资源管理页面
        },
        {
          path: 'preserve',
          component: () => import('./views/transactionLink/preserve.vue') // 节点维护
        },
        {
          path: 'preview',
          component: () => import('./views/transactionLink/preview.vue') // 预览
        }
      ]
    },
    {
      path: '/servicemanage',
      name: 'servicemanage',
      component: () => import('./views/servicemanage/index.vue'), // ******服务管理********//
      children: [
        {
          path: 'versionManger',
          component: () => import('./views/servicemanage/versionManger/index.vue') // 版本管理
        },
        {
          path: 'lineDo',
          component: () => import('./views/servicemanage/versionManger/linedo.vue') // 基线制作
        }
      ]
    }
  ]
})

export default router
