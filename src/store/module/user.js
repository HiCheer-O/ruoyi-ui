import { defineStore } from 'pinia'
import { ref } from 'vue'

export const tokenStore = defineStore(
  // store 唯一标识
  'token',
  // 对外暴露信息
  () => {
    // token 初始化
    const token = ref('')
    
    // 设置用户 token
    const setToken = (newToken) => {
      token.value = `Bearer ${newToken}`
    }
    
    // 移除用户 token
    const removeToken = () => {
      token.value = ''
    }
    
    // 对外提供 store 信息
    return {
      token,
      setToken,
      removeToken
    }
  },
  // 选项配置
  {
    persist: true // 持久化
  }
)
