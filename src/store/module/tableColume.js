import { defineStore } from 'pinia'
import { ref } from 'vue'

export const tableColumnStore = defineStore(
  // store 唯一标识
  'tableColumn',
  // 对外暴露信息
  () => {
    // token 初始化
    const tableColumn = ref({})
    
    // 获取
    const getUsedValue = (usedKey) => {
      return tableColumn.value[usedKey] ? tableColumn.value[usedKey] : { selectedParam: [] }
    }
    
    
    // 设置
    const setUsedValue = (userKey, usedValue) => {
      tableColumn.value['usedKey'] = usedValue
    }
    
    // 移除
    const removeUsedValue = (userKey) => {
      tableColumn.value['usedKey'].selectedParam = []
    }
    
    // 对外提供 store 信息
    return {
      getUsedValue,
      setUsedValue
    }
  },
  // 选项配置
  {
    persist: false // 持久化
  }
)
