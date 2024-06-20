<script setup>
import { ref, onMounted} from 'vue';
import 'element-plus/theme-chalk/index.css';
import {CircleCheck, Lock, UserFilled} from "@element-plus/icons-vue";
import {captchaInfo, refreshCaptcha} from "@/api/captcha.js";
import {login} from "@/api/user.js";
import {tokenStore} from "@/store/index.js";

// 初始化表单
const userForm = ref({
  username: 'admin',
  password: 'admin123',
  captcha: '',
});


// 收集表单参数
const form = ref()

// 表单规则检验
const userFormRules = {
  username: [
    { required: true, message: '请输入您的账号', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入您的密码', trigger: 'blur' },
  ],
  captcha: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
  ]
}


// 登录提交
const onSubmit = async () => {
  // 校验参数
  await form.value.validate();
  // 请求准备、发送请求
  const data = await login({
    "code": userForm.value.captcha,
    "password": userForm.value.password,
    "username": userForm.value.username,
    "uuid": captchaInfo.value.uuid
  })
  // 处理相应
  // token 持久化存储
  const userToken = tokenStore()
  userToken.setToken(data.token)
};


onMounted(() => {
  // 第一次进入页面验证码刷新
  refreshCaptcha();
});

</script>

<template>
  <div class="container">
    <div class="login-container">
      <el-form
          :model="userForm"
          :rules="userFormRules"
          ref="form"
          label-width="0px">
        <h3 class="title" style="color: #707070">若依后台管理系统</h3>
        <el-form-item prop="username">
          <el-input
              v-model="userForm.username"
              placeholder="账号"
              class="input-height"
          >
            <template #prefix>
              <el-icon slot="prefix"><UserFilled /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
              v-model="userForm.password"
              type="password"
              placeholder="密码"
              class="input-height"
          >
            <template #prefix>
              <el-icon slot="prefix"><Lock /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="captcha">
          <el-row :gutter="20">
            <el-col :span="14">
              <el-input
                  v-model="userForm.captcha"
                  placeholder="验证码"
                  class="input-height"
              >
                <template #prefix>
                  <el-icon slot="prefix"><CircleCheck /></el-icon>
                </template>
              </el-input>
            </el-col>
            <el-col :span="10">
              <img :src="captchaInfo.img" alt="captcha" @click="refreshCaptcha" class="captcha-img input-height" />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" style="width: 100%;">登录</el-button>
        </el-form-item>
        <div class="register-link" style="color: #707070; font-size: 14px; float: right;">
          <span>没有账号？</span>
          <RouterLink to='/register'>点击注册</RouterLink>
        </div>
      </el-form>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  height: 100%;
  background-image: url("@/assets/images/login-background.jpg");
  background-size: cover;
  font-size: 1.17em;
}
.login-container {
  display: block;
  max-width: 400px;
  margin: auto;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}
.title {
  margin: 0 auto 30px auto;
  text-align: center;
  color: #707070;
}
.input-height {
  height: 38px;
}
.captcha-img {
  cursor: pointer;
  border: 1px solid #dcdfe6;
  height: 36px;
}
</style>
