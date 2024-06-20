<script setup>
import {defineEmits, defineProps, ref, watch} from "vue";
import {Grid} from "@element-plus/icons-vue";
import {tableColumnStore} from "@/store/index.js";

// 获取 pinia 对象
const tableColumn = tableColumnStore()

// 页面传递参数
const props = defineProps({
  // 使用者的 Key
  usedKey: {
    type: String,
    required: true
  },
  allParam: {
    type: Array,
    required: true
  }
});

// 获取当前页面的参数
const usedValue = tableColumn.getUsedValue(props.usedKey)

// 初始化全部参数
const allParam = ref(props.allParam)
// 初始化选中参数
const selectedParam =  ref(usedValue['selectedParam'])
// 初始化全选按钮
const checkAll = ref(false)
// 初始化弹窗关闭
const popoverVisible = ref(false);

// 选择列
const changeParam = (val) => {
  selectedParam.value = val
}
// 全选 / 全不选
const checkAllChange = (val) => {
  selectedParam.value = val ? allParam.value.map(item => item.prop) : [];
}
// 重置
const reset = () => {
  selectedParam.value = []
}

const emit = defineEmits(['confirmSelectedParam']);

// 确认
const confirm = () => {
  usedValue['selectedParam'] = selectedParam.value
  tableColumn.setUsedValue(usedValue)
  popoverVisible.value = false

  const result = selectedParam.value.map(item => {
    return allParam.value.find(obj => obj.prop === item);
  });

  emit('confirmSelectedParam', result);
}

const cancel = () => {
  selectedParam.value = [...usedValue['selectedParam']];
  popoverVisible.value = false
}

// 监听全选按钮
watch(selectedParam, async (newVal) => {
  try {
    checkAll.value = newVal.length ===  allParam.value.length
  } catch (err) {}
})
</script>

<template>
  <el-popover placement="left" trigger="click" v-model:visible="popoverVisible">
    <div style="display: flex; justify-content: space-between;align-items: center;">
      <el-checkbox v-model="checkAll" @change="checkAllChange">列展示</el-checkbox>
      <el-button type="text" @click="reset">重置</el-button>
    </div>
    <el-divider style="margin: 10px 0"/>
    <el-checkbox-group v-model="selectedParam" @change="changeParam">
      <el-checkbox v-for="(item) in allParam" :label="item.label" :key="item.prop" :value="item.prop"></el-checkbox>
    </el-checkbox-group>
    <div style="display: flex; margin-top: 10px; justify-content: flex-end;">
      <el-button type="primary" size="small" @click="confirm">确定</el-button>
      <el-button size="small" @click="cancel">取消</el-button>
    </div>
    <template #reference>
      <el-button type="primary" :icon="Grid" :usedKey="usedKey" circle></el-button>
    </template>
  </el-popover>
</template>

<style scoped>



</style>
