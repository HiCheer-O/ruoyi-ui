<script setup>
import { Refresh, Search, Setting } from '@element-plus/icons-vue'
import { ref, watch, reactive } from 'vue'
import { ElTree } from 'element-plus'
import TableColumn from '@/components/tableColumn.vue';

const filterText = ref('')
const treeRef = ref()

const defaultProps = {
  children: 'children',
  label: 'label',
}

watch(filterText, (val) => {
  treeRef.value.filter(val)
})

const filterNode = (value, data) => {
  if (!value) return true
  return data.label.includes(value)
}

const dept_data = [
  {
    label: '若依科技',
    children: [
      {
        label: '深圳总公司',
        children: [
          {
            label: '研发部门',
          },
        ],
      },
    ],
  }
]

// 右边

const formInline = reactive({
  user: '',
  region: '',
  date: '',
})

const onSubmit = () => {
  console.log('submit!')
  console.log(columns)
}

const refresh = () => {
  console.log('refresh!')
}

const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    sex: '男'
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    sex: '男'
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    sex: '男'
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    sex: '男'
  },
]

const allColumns = reactive([
  { label: '性别', prop: 'sex' },
])

const columns = reactive([
  { label: '日期', prop: 'date' },
  { label: '姓名', prop: 'name' },
  { label: '地址', prop: 'address' },
])

const currentColumns = ref(columns)
const confirmSelectedParam = (selectedParam) => {
  currentColumns.value = columns.concat(selectedParam)
}


</script>

<template>
  <el-row>
    <el-col :span="6" style="padding: 0 10px; min-width: 100px">
      <el-input
          v-model="filterText"
          style="width: 100%; margin-bottom: 20px;"
          placeholder="请输入部门名称"
      >
        <template #prefix>
          <el-icon class="el-input__icon"><search /></el-icon>
        </template>
      </el-input>
      <el-tree
          ref="treeRef"
          style="max-width: 600px;"
          class="filter-tree"
          :data="dept_data"
          :props="defaultProps"
          default-expand-all
          :filter-node-method="filterNode"
          empty-text="暂无数据"
      />
    </el-col>
    <el-col :span="18" class="user-right">
      <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="用户名称">
            <el-input v-model="formInline.user" placeholder="请输入用户名称" clearable />
          </el-form-item>
          <el-form-item label="手机号码">
            <el-input v-model="formInline.user" placeholder="请输入用户名称" clearable />
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="formInline.region" placeholder="用户状态" clearable>
              <el-option label="正常" value="0" />
              <el-option label="停用" value="1" />
            </el-select>
          </el-form-item>
          <el-form-item label="创建时间">
            <el-date-picker
                v-model="formInline.date"
                type="monthrange"
                clearable
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit" :icon="Search">搜索</el-button>
            <el-button type="info" @click="refresh" :icon="Refresh" text bg>重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="table-container">
        <div style="display: flex; justify-content: flex-end;">
          <table-column used-key="userIndex" :all-param="allColumns" @confirmSelectedParam="confirmSelectedParam"></table-column>
        </div>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column
              v-for="(item, index) in currentColumns"
              :key="index"
              :prop="item.prop"
              :label="item.label"
              width="180"
          />
          <el-table-column label="操作">
            <el-button size="small" @click="">编辑</el-button>
            <el-button size="small" type="danger" @click="">删除</el-button>
          </el-table-column>
        </el-table>
      </div>
    </el-col>
  </el-row>
</template>

<style scoped lang="scss">
.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.demo-form-inline .el-input {
  --el-input-width: 220px;
}

.demo-form-inline .el-select {
  --el-select-width: 220px;
}

el-button {
  border: 1px solid black;
}

.table-container {
  position: relative;
}
</style>
