<template>
  <el-container class="layout-container-demo" style="height: 100vh">
    <el-aside width="200px" style="background: #fff;box-shadow: 0.2px 0px #333;z-index: 100">
      <el-scrollbar>
        <div style="display: flex;justify-content: center;align-items: center;text-align: center;height: 60px;background: #fff">
          <el-icon :size="30" color="aqua" style="margin-right: 10px"><Platform/></el-icon>律师咨询<br>后台管理系统
        </div>
        <el-menu>
          <el-sub-menu index="user" @click="change('')">
            <template #title>
              <el-icon><UserFilled /></el-icon>用户管理
            </template>
          </el-sub-menu>
          <el-sub-menu index="lawyer" @click="change('lawyer')">
            <template #title>
              <el-icon><Avatar /></el-icon>律师管理
            </template>
          </el-sub-menu>
          <el-sub-menu index="order" @click="change('order')">
            <template #title>
              <el-icon><Management /></el-icon>订单管理
            </template>
          </el-sub-menu>
          <el-sub-menu index="chat" @click="change('chat')">
            <template #title>
               <el-icon><ChatLineRound /></el-icon>消息管理
            </template>
          </el-sub-menu>
          <el-sub-menu index="rate" @click="change('rate')">
            <template #title>
              <el-icon><StarFilled /></el-icon>评价管理
            </template>
          </el-sub-menu>
          <el-sub-menu index="feedback">
            <template #title>
              <el-icon><Failed /></el-icon>反馈处理
            </template>
            <el-menu-item-group>
              <template #title>处理</template>
              <el-menu-item index="6-1">异常处理</el-menu-item>
              <el-menu-item index="6-2">举报处理</el-menu-item>
              <el-menu-item index="6-3">违规处理</el-menu-item>
              <el-menu-item index="6-4">用户意见</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
        </el-menu>
      </el-scrollbar>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px;background: #00ffce0f">
        <div class="toolbar">
          <el-dropdown>
            <el-icon style="margin-right: 8px; margin-top: 1px"
            ><setting
            /></el-icon>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>View</el-dropdown-item>
                <el-dropdown-item>Add</el-dropdown-item>
                <el-dropdown-item>Delete</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <span>管理员</span>
        </div>
      </el-header>

      <el-main>
        <el-scrollbar>
          <router-view/>

        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
// import { ref } from 'vue'
import {useRouter} from 'vue-router'
import { Menu as UserFilled,Failed , StarFilled ,Management , Avatar, ChatLineRound,Platform } from '@element-plus/icons-vue'

const router=useRouter()

const change = (index) =>{
  router.push("/"+index);
}
</script>

<style scoped>
.layout-container-demo .el-header {
  position: relative;
  background-color: var(--el-color-primary-light-7);
  color: var(--el-text-color-primary);
}
.layout-container-demo .el-aside {
  color: var(--el-text-color-primary);
  background: var(--el-color-primary-light-8);
}
.layout-container-demo .el-menu {
  border-right: none;
}
.layout-container-demo .el-main {
  padding: 0;
}
.layout-container-demo .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}
</style>
