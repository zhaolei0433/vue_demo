import Vue from 'vue'
import Router from 'vue-router'

// 引入自定义的组件
import Home from '../components/home'
import Products from '../components/header/products'
import FAQ from '../components/header/faq'
import Manager from '../components/header/manager'
import My from '../components/header/manager/my'
import History from '../components/header/manager/history'
import Send from '../components/header/manager/send'
import Page404 from '../components/404'
import Login from  '../components/login'
import PlaceManager from '../components/menu/placeManager'
import Area from '../components/menu/placeManager/areaManager'

Vue.use(Router)

export default new Router({
  routes: [
    /*404路由*/
    {
      path: '*',
      hidden: true,
      component: Page404
    },
    /*登录页面*/
    {
      path: '/login',
      name: '登录',
      hidden: true,
      component: Login
    },
    {
      path: '/',
      name: '首页',
      class: 'my-icon-blog-home',
      hidden: true,
      component: Home
    },
    /*header路由开始*/
    {
      path: '/header/products',
      name: '商品',
      class: 'el-icon-goods',
      component: Products
    },
    {
      path: '/header/faq',
      name: 'FAQ',
      class: 'el-icon-document',
      component: FAQ
    },
    {
      path: '/header/manager',
      name: '我的工作台',
      redirect: '/header/manager/my',
      component: Manager,
      hasChild: true,
      children: [
        {
          path: '/header/manager/my',
          name: '我的信息',
          class: 'my-icon-blog-shouye',
          component: My
        },
        {
          path: '/header/manager/history',
          name: '发货记录',
          class: 'my-icon-blog-shouye1',
          component: History
        },
        {
          path: '/header/manager/send',
          name: '发货管理',
          class: 'my-icon-blog-fasong',
          component: Send
        }
      ]
    },
    /*header路由结束*/
    /*menu路由开始*/
    {
      path: '/menu/place',
      name: '会场管理',
      redirect: '/menu/place/area',
      component: PlaceManager,
      hasChild: true,
      children: [
        {
          path: '/menu/place/area',
          name: '区域管理',
          class: 'my-icon-blog-shouye',
          component: Area
        }
      ]
    },
    {
      path: '/menu/group',
      name: '会议管理',
      redirect: '/menu/group/my',
      component: Manager,
      hasChild: true,
      children: [
        {
          path: '/menu/group/my',
          name: '会议管理',
          class: 'my-icon-blog-shouye',
          component: My
        }
      ]
    },
    {
      path: '/menu/resource',
      name: '资源管理',
      redirect: '/menu/manager/my',
      component: Manager,
      hasChild: true,
      children: [
        {
          path: '/menu/resource/my',
          name: '摄像头管理',
          class: 'my-icon-blog-shouye',
          component: My
        }
      ]
    }
    /*menu路由结束*/
  ]
})
