import request from '@/utils/request.js'
import { ref } from 'vue';

//验证码请求模块
export const getCaptcha = () => {
	return request({
		url: '/captchaImage',
		method: 'get'
	})
}

// 验证码对象
export const captchaInfo = ref({img: '', uuid: ''});

export const refreshCaptcha = async () => {
	await getCaptchaInfo();
}
const getCaptchaInfo = async () => {
	const data = await getCaptcha();
	captchaInfo.value.img = 'data:image/gif;base64,' + data.img;
	captchaInfo.value.uuid = data.uuid;
}
