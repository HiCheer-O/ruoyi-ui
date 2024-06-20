<script setup>
import {onMounted, ref} from 'vue';
import { ElMessage } from 'element-plus';
import 'element-plus/theme-chalk/index.css';
import {UserFilled, Lock, CircleCheck} from "@element-plus/icons-vue";
import {captchaInfo, refreshCaptcha} from "@/api/captcha.js";

const userForm = ref({
  username: '',
  password: '',
  confirmPassword: '',
  captcha: '',
});

const captchaUrl = ref('');

// 点击注册
const onSubmit = () => {
  // 这里添加表单提交的逻辑
  console.log('Form Submitted:', userForm.value);
  ElMessage.success('表单提交成功');
};

onMounted(() => {
  // 第一次进入页面验证码刷新
  refreshCaptcha();
});
</script>

<template>
  <div class="login-container">
    <el-form :model="userForm" ref="form" label-width="0px">
      <h3 class="title" style="color: #707070">若依后台管理系统</h3>
      <el-form-item prop="username">
        <el-input
            v-model="userForm.username"
            placeholder="账号"
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
        >
          <template #prefix>
            <el-icon slot="prefix"><Lock /></el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
            v-model="userForm.confirmPassword"
            type="password"
            placeholder="确认密码"
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
            >
              <template #prefix>
                <el-icon slot="prefix"><CircleCheck /></el-icon>
              </template>
            </el-input>
          </el-col>
          <el-col :span="10">
            <img :src="captchaInfo.img" alt="captcha" @click="refreshCaptcha" class="captcha-img" />
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" style="width: 100%;">注册</el-button>
      </el-form-item>
      <div class="register-link" style="color: #707070; font-size: 14px">
        <span>已有账号？</span>
        <RouterLink to='/login'>点击登录</RouterLink>
      </div>
    </el-form>
  </div>
</template>

<style scoped>
.login-container {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}
.captcha-img {
  cursor: pointer;
  border: 1px solid #dcdfe6;
  height: 40px;
}
</style>
