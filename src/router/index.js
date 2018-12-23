import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'

/** note: Submenu only appear when children.length>=1
 *  detail see  https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 **/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
**/
export const constantRouterMap = [{
  path: '/redirect',
  component: Layout,
  hidden: true,
  children: [{
    path: '/redirect/:path*',
    component: () =>
      import('@/views/redirect/index')
  }]
},
{
  path: '/login',
  component: () =>
    import('@/views/login/index'),
  hidden: true
},
{
  path: '/auth-redirect',
  component: () =>
    import('@/views/login/authredirect'),
  hidden: true
},
{
  path: '/404',
  component: () =>
    import('@/views/errorPage/404'),
  hidden: true
},
{
  path: '/401',
  component: () =>
    import('@/views/errorPage/401'),
  hidden: true
},
{
  path: '',
  component: Layout,
  redirect: 'dashboard',
  children: [{
    path: 'dashboard',
    component: () =>
      import('@/views/dashboard/index'),
    name: 'Dashboard',
    meta: { title: 'dashboard', icon: 'dashboard', noCache: true }
  }]
}
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [{
  path: '/order',
  component: Layout,
  redirect: '/order/operatelist',
  alwaysShow: true,
  meta: {
    title: 'orders',
    icon: 'list'
  },
  children: [{
    path: 'operatelist',
    component: () =>
      import('@/views/order/operatelist'),
    name: 'OperateListOrder',
    meta: { title: 'operateListOrders', noCache: true }
  },
  {
    path: 'list',
    component: () =>
      import('@/views/order/list'),
    name: 'ListOrder',
    meta: { title: 'listOrders', noCache: true }
  },
  {
    path: 'print',
    component: () =>
      import('@/views/order/print'),
    name: 'PrintOrder',
    meta: { title: 'printOrder', noCache: false },
    hidden: true
  }]
},

// {
//   path: '/order',
//   component: Layout,
//   redirect: '/order/list',
//   meta: {
//     title: 'orders',
//     icon: 'list',
//   },
//   children: [{
//     path: 'list',
//     component: () =>
//       import('@/views/order/list'),
//     name: 'ListOrder',
//     meta: { title: 'listOrders', noCache: true }
//   }]
// },
{
  path: '/printmachine',
  component: Layout,
  redirect: '/printmachine/index',
  // alwaysShow: true,
  meta: {
    title: 'printmachine',
    icon: 'nested'
  },
  children: [{
    path: 'index',
    component: () =>
        import('@/views/printmachine/index'),
    name: 'IndexPrintmachine',
    meta: {
      title: 'indexprintmachine'
    }
  }
  ]
},
{
  path: '/dispatch',
  component: Layout,
  redirect: '/dispatch/index',
  alwaysShow: true,
  meta: {
    title: 'dispatches',
    icon: 'lock'
  },
  children: [{
    path: 'list',
    component: () =>
      import('@/views/dispatch/list'),
    name: 'ListDispatch',
    meta: {
      title: 'listdispatches'
    }
  },
  {
    path: 'detail/:id(\\d+)',
    component: () =>
      import('@/views/dispatch/detail'),
    name: 'DetailDispatch',
    meta: {
      title: 'detaildispatches'
    },
    hidden: true
  }
  ]
},
{
  path: '/shop',
  component: Layout,
  redirect: '/shop/index',
  alwaysShow: true,
  meta: {
    title: 'shops',
    icon: 'lock'
  },
  children: [{
    path: 'list',
    component: () =>
      import('@/views/shop/list'),
    name: 'ListShop',
    meta: {
      title: 'listshops'
    }
  },
  {
    path: 'detail/:id(\\d+)',
    component: () =>
      import('@/views/shop/detail'),
    name: 'DetailShop',
    meta: {
      title: 'detailshops'
    },
    hidden: true
  }
  ]
},
{
  path: '/partner',
  component: Layout,
  redirect: '/partner/index',
  alwaysShow: true, // will always show the root menu
  meta: {
    title: 'partners',
    icon: 'component',
    roles: ['999'] // you can set roles in root nav
  },
  children: [{
    path: 'list',
    component: () =>
      import('@/views/partner/list'),
    name: 'ListPartner',
    meta: {
      title: 'listpartners',
      roles: ['999'] // 超级管理员才能看到
    }
  },
  {
    path: 'detail/:id(\\d+)',
    component: () =>
      import('@/views/partner/detail'),
    name: 'DetailPartner',
    meta: {
      title: 'detailpartners',
      roles: ['999'] // 超级管理员才能看到
    },
    hidden: true
  }
  ]
},
{
  path: '/commodity',
  component: Layout,
  redirect: '/commodity/index',
  alwaysShow: true, // will always show the root menu
  meta: {
    title: 'commodities',
    icon: 'component',
    roles: ['999'] // you can set roles in root nav
  },
  children: [{
    path: 'list',
    component: () =>
      import('@/views/commodity/list'),
    name: 'ListCommodity',
    meta: {
      title: 'listcommodities',
      roles: ['999'] // 超级管理员才能看到
    }
  },
  {
    path: 'detail/:id(\\d+)',
    component: () =>
      import('@/views/commodity/detail'),
    name: 'DetailCommodity',
    meta: {
      title: 'detailCommodities',
      roles: ['999'] // 超级管理员才能看到
    },
    hidden: true
  }
  ]
},
{ path: '*', redirect: '/404', hidden: true }
]
