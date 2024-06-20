import { createWebHashHistory, createRouter } from 'vue-router'

// 路由地址信息
const routes = [
	{
		path: "/login",
		component: () => import('@/views/login.vue'),
	},
	{
		path: "/register",
		component: () => import('@/views/register.vue')
	},
	{
		path: "/",
		component: () => import('@/layout/index.vue'),
		redirect: '/index',
		children: [
			{
				path: "/index",
				component: () => import('@/layout/modules/index.vue'),
				meta:  {title: '首页', icon: 'HomeFilled', name: 'index' },
			},
			{
				path: "/system",
				meta: {title: '系统管理', icon: 'Setting'},
				children: [
					{
						path: "/user",
						component: () => import('@/layout/modules/user.vue'),
						meta:  {title: '用户管理', icon: 'User', name: 'system-user' },
					},
					{
						path: "/role",
						component: () => import('@/layout/modules/role.vue'),
						meta:  {title: '角色管理', icon: 'UserFilled',  name: 'system-role' },
					},
					{
						path: "/menu",
						component: () => import('@/layout/modules/menu.vue'),
						meta:  {title: '菜单管理', icon: 'Menu',  name: 'system-menu' },
					},
					{
						path: "/dept",
						component: () => import('@/layout/modules/dept.vue'),
						meta:  {title: '部门管理', icon: 'Share',  name: 'system-dept' },
					},
					{
						path: "/position",
						component: () => import('@/layout/modules/position.vue'),
						meta:  {title: '岗位管理', icon: 'CirclePlusFilled',  name: 'system-position' },
					},
					{
						path: "/dict",
						component: () => import('@/layout/modules/dict.vue'),
						meta:  {title: '字典管理', icon: 'Notebook',  name: 'system-dict' },
					},
					{
						path: "/param",
						component: () => import('@/layout/modules/param.vue'),
						meta:  {title: '参数设置', icon: 'Document',  name: 'system-param' },
					},
					{
						path: "/notify",
						component: () => import('@/layout/modules/notify.vue'),
						meta:  {title: '通知公告', icon: 'ChatDotRound',  name: 'system-notify' },
					},
					{
						path: "/log",
						meta:  {title: '日志管理', icon: 'Tickets',  name: 'system-log' },
						children: [
							{
								path: "/operation",
								component: () => import('@/layout/modules/operationLog.vue'),
								meta:  {title: '操作日志', icon: 'Memo',  name: 'system-log-operation' },
							},
							{
								path: "/login",
								component: () => import('@/layout/modules/loginLog.vue'),
								meta:  {title: '登录日志', icon: 'DataLine',  name: 'system-log-login' },
							},
						]
					},
				]
			},
		]
	},
]

// 创建路由
const router = createRouter({
	// 忽略路由器的 URL
	history: createWebHashHistory(),
	// 配置路由信息
	routes,
})

export default router
