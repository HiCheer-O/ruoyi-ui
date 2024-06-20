// 用户相关的，登录、登出、注册、获取用户信息、修改用户信息
import request from '@/utils/request.js'

// 登录
//请求参数 obj示例：{"code":"","password":"","username":"","uuid":""}
export const login = (obj) => {
	return request({
		url: '/login',
		method: "post",
		data: obj
	})
}
