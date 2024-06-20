<template>
  <el-menu
      background-color="#304156"
      text-color="#85909f"
      :default-active="activeIndex"
      class="sidebar-menu"
      :collapse="isCollapse"
      :router="true"
      @select="handleMenuItemSelect"
  >
    <!-- 顶部系统信息 -->
    <el-menu-item index="/index" style="height: 56px; padding: 0 20px;">
      <img src="@/assets/logo/logo.png" style="width: 32px; height: 32px; margin-right: 12px;" alt="logo图片">
      <span style="font-size: 14px; color: #ffffff">
        若依管理系统
      </span>
    </el-menu-item>

    <!-- 菜单项 -->
    <template v-for="item in mainMenuItems" :key="item.index">
      <el-menu-item v-if="!item.children" :index="item.index">
        <el-icon>
          <component :is="getIconComponent(item.icon)" />
        </el-icon>
        <span>{{ item.title }}</span>
      </el-menu-item>
      <el-sub-menu v-else :index="item.index">
        <template #title>
          <el-icon>
            <component :is="getIconComponent(item.icon)" />
          </el-icon>
          <span>{{ item.title }}</span>
        </template>
        <template v-for="subItem in item.children" :key="subItem.index">
          <el-menu-item v-if="!subItem.children" :index="subItem.index">
            <el-icon>
              <component :is="getIconComponent(subItem.icon)" />
            </el-icon>
            <span>{{ subItem.title }}</span>
          </el-menu-item>
          <el-sub-menu v-else :index="subItem.index">
            <template #title>
              <el-icon>
                <component :is="getIconComponent(subItem.icon)" />
              </el-icon>
              <span>{{ subItem.title }}</span>
            </template>
            <template v-for="sonItem in subItem.children" :key="sonItem.index">
              <el-menu-item v-if="!sonItem.children" :index="sonItem.index">
                <el-icon>
                  <component :is="getIconComponent(sonItem.icon)" />
                </el-icon>
                <span>{{ sonItem.title }}</span>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
      </el-sub-menu>
    </template>
  </el-menu>
</template>

<script lang="ts" setup>
import * as Icons from '@element-plus/icons-vue';
import { defineProps, defineEmits } from 'vue';
import { useRouter } from 'vue-router';

// 获取全部路由
const router = useRouter();

// 路由转菜单
const generateMenuItems = (routers) => {
  return routers.map(route => {
    const menuItem = {
      index: route.path,
      title: route.meta?.title || '',
      icon: route.meta?.icon || '',
      name: route.meta?.name || '',
      children: route.children ? generateMenuItems(route.children) : null
    };
    return menuItem;
  });
};

const menuItems = generateMenuItems(router.options.routes);
// 获取主要菜单
const mainMenuItems = menuItems.find(item => item.index === '/')?.children || [];
console.log('mainMenuItems:', mainMenuItems);
// 是否菜单塌陷 true：塌陷，false：不塌陷
const props = defineProps({
  isCollapse: {
    type: Boolean,
    required: true
  },
  activeIndex: {
    type: String,
    required: true
  }
});

// 定义自定义事件
const emit = defineEmits(['menuItemClick']);

const handleMenuItemSelect = (index) => {
  const findMenuItem = (items, index) => {
    for (const item of items) {
      if (item.index === index) {
        return item;
      }
      if (item.children) {
        const found = findMenuItem(item.children, index);
        if (found) {
          return found;
        }
      }
    }
    return null;
  };

  const menuItem = findMenuItem(mainMenuItems, index);
  if (menuItem) {
    emit('menuItemClick', menuItem);
  }
};

const getIconComponent = (iconName) => {
  return Icons[iconName];
};
</script>

<style lang="scss">
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.sidebar-menu {
  height: 100%;
  border: 0;
}
span {
  font-size: 13px;
}
.logo-container {
  display: flex;
  width: 100%;
  height: 50px;
  align-items: center;
  justify-content: center;
}

.logo-container img {
  width: 32px;
  height: 32px;
  margin-right: 12px;
}
</style>
