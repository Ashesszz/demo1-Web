import Vue from 'vue'
import Router from 'vue-router'
import Show from '../views/Show'
import Add from '../views/Add'
import Edit from '../views/Edit'
import Index from '../Index'
import Test1 from '../views/Test1'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name:"用户管理",
      redirect:"/show",
      component: Index,
      children: [
        {
          path: "/show",
          name:"查询用户",
          component: Show,
          show:true
          //meta: {requiresAuth: true}
        },
        {
          path:"/add",
          name:"添加用户",
          component:Add,
          show:true
        },
        {
          path:"/edit",
          name:"修改用户",
          component:Edit,
          show:false
        },
      ]
    },
    {
      path: '/a',
      name:"菜单二",
      component: Index,
      children:[
        {
          path:"/test1",
          name:"Test1",
          component:Test1,
          show:true
        },
        {
          path:"/test2",
          name:"Test2",
          component:Test1,
          show:true
        }
      ]
    },
  ]
})
