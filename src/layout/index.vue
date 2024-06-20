<template>
  <div class="common-layout">
    <el-container>
      <div class="sidebar-container">
        <sidebar :is-collapse="isCollapse" :activeIndex="activeIndex" @menuItemClick="handleMenuItemClick" />
      </div>
      <el-container>
        <el-header>
          <div class="menu-fold" @click="menuFold">
            <el-icon color="#737d8e" size="30"><DArrowRight /></el-icon>
          </div>
          <div class="menu-fold-other">
            <!-- 面包屑 -->
            <div class="breadcrumb">
              <el-breadcrumb separator="/">
                <el-breadcrumb-item v-for="(item, index) in route.matched" :key="index">
                  {{ item.meta.title }}
                </el-breadcrumb-item>
              </el-breadcrumb>
            </div>
          </div>
        </el-header>
        <div>
          <el-tabs
              v-model="editableTabsValue"
              type="card"
              class="demo-tabs"
              @tab-remove="removeTab"
              @tab-click="tabClick"
          >
            <el-tab-pane
                v-for="item in editableTabs"
                :closable="item.closable"
                :key="item.name"
                :label="item.title"
                :name="item.name"
            >
            </el-tab-pane>
          </el-tabs>
        </div>
        <el-main><router-view /></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import Sidebar from "@/layout/sidebar.vue";
import { DArrowRight } from "@element-plus/icons-vue";
import { ref, watch } from 'vue';
import { useRoute, useRouter } from "vue-router";

// 获取全部路由
const router = useRouter();
// 获取当前路由
const route = useRoute();

// 初始化菜单是否折叠
const isCollapse = ref(false);

// 菜单是否折叠切换
const menuFold = async () => {
  isCollapse.value = !isCollapse.value;
};

// 初始化标签页定位
const editableTabsValue = ref('index');
// 初始化标签页
const editableTabs = ref([
  {
    title: '首页',
    name: 'index',
    path: '/index',
    closable: false
  },
]);

// 当前选中的菜单项
const activeIndex = ref(router.currentRoute.value.path);

// 标签页点击跳转
const tabClick = (event) => {
  const tabs = editableTabs.value;
  const tab = tabs.find(tab => tab.name === event.props.name);
  if (tab) {
    router.push(tab.path);
    activeIndex.value = tab.path; // 更新菜单选中项
  }
};

// 添加标签页
const addTab = (obj) => {
  let existingTab = editableTabs.value.find(tab => tab.path === obj.path);
  if (!existingTab) {
    editableTabs.value.push({
      title: obj.title,
      name: obj.name,
      path: obj.path,
      closable: true
    });
    console.log(obj)
    console.log(editableTabs.value.name)
    editableTabsValue.value = obj.name;
    router.push(obj.path);
  } else {
    editableTabsValue.value = existingTab.name;
    router.push(existingTab.path);
  }
  activeIndex.value = obj.path; // 更新菜单选中项
};

// 移除标签页
const removeTab = (targetName) => {
  const tabs = editableTabs.value;
  let activeName = editableTabsValue.value;
  if (activeName === targetName) {
    tabs.forEach((tab, index) => {
      if (tab.name === targetName) {
        const nextTab = tabs[index + 1] || tabs[index - 1];
        if (nextTab) {
          activeName = nextTab.name;
          router.push(nextTab.path);
        }
      }
    });
  }
  editableTabsValue.value = activeName;
  editableTabs.value = tabs.filter((tab) => tab.name !== targetName);
  activeIndex.value = editableTabs.value.find(tab => tab.name === activeName)?.path || '/index'; // 更新菜单选中项
};

// 点击菜单添加标签页
const handleMenuItemClick = (menuItem) => {
  addTab({
    title: menuItem.title,
    path: menuItem.index,
    name: menuItem.name
  });
};

// 页面加载时根据路径恢复标签页
watch(route, () => {
  const currentPath = route.path;
  const existingTab = editableTabs.value.find(tab => tab.path === currentPath);
  if (!existingTab) {
    // 如果不存在当前路径对应的标签页，添加新标签页
    addTab({
      title: route.meta.title || '新标签页', // 根据实际需要设置标签页标题
      path: currentPath,
      name: currentPath
    });
  } else {
    // 如果存在，激活该标签页
    editableTabsValue.value = existingTab.name;
  }
  activeIndex.value = currentPath; // 更新菜单选中项
}, {immediate: true});
</script>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';

.common-layout {
  display: flex;
  height: 100%;
}

.sidebar-container {
  height: 100%;
  background-color: #3A71A8;
}

.el-header {
  display: flex;
  background-color: #ffffff;
  height: 50px;
  padding: 0;
  border-bottom: gray solid 1px;
}

.menu-fold {
  height: 30px;
  width: 30px;
  cursor: pointer;
  text-align: center;
  line-height: 50px;
  padding: 10px;
}

.menu-fold-other {
  width: 100%;
}

.breadcrumb {
  display: flex;
  height: 100%;
  align-items: center;
  font-size: 16px;
}

.breadcrumb-font {
  font-size: 16px;
}

.crumb {
  height: 56px;
}

.el-main {
  background-color: #292d31;
}

:deep(.el-tabs__header) {
  margin: 0;
}

.el-main {
  padding: 0;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  padding: 20px;
}
</style>
