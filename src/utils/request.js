import axios from 'axios'
import {tokenStore} from "@/store/index.js";

// 请求地址
const baseURL = 'http://localhost:8080'
// 公共请求方法
const instance = axios.create({
	baseURL,
	timeout: 5000,
})

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
	// 在发送请求之前做些什么
	const userToken = tokenStore();
	if (userToken.token !== '') {
		config.headers.Authorization = userToken.token
	}
	return config;
}, function (error) {
	// 对请求错误做些什么
	return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
	// 2xx 范围内的状态码都会触发该函数。
	const data = response.data
	if (data.code === 200) {
		// 正确处理
		return data;
	} else {
		// 失败业务处理
		console.log('失败')
	}

}, function (error) {
	// 超出 2xx 范围的状态码都会触发该函数。
	// 对响应错误做点什么
	return Promise.reject(error);
});

export default instance
