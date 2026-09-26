<template>
  <v-app-bar elevation="1" height="56" class="px-2" color="surface">
    <!-- 汉堡菜单折叠按钮 -->
    <v-app-bar-nav-icon
      variant="text"
      density="comfortable"
      class="mr-1 text-medium-emphasis"
      @click="toggleSideBar"
    />

    <!-- 桌面端动态面包屑 -->
    <v-breadcrumbs :items="breadcrumbItems" class="pa-0 ml-1 d-none d-sm-flex">
      <template #prepend>
        <v-icon icon="mdi-home-outline" size="small" class="mr-1 text-medium-emphasis" />
      </template>
      <template #title="{ item }">
        <span class="text-caption font-weight-medium">{{ item.title }}</span>
      </template>
    </v-breadcrumbs>

    <!-- 移动端简洁标题 -->
    <div class="d-sm-none text-subtitle-2 font-weight-bold ml-1 text-truncate" style="max-width: 180px;">
      {{ currentTitle }}
    </div>

    <v-spacer />

    <!-- 右侧功能区 -->
    <div class="d-flex align-center">
      <!-- 全屏切换（桌面端） -->
      <v-tooltip text="全屏切换" location="bottom">
        <template #activator="{ props }">
          <v-btn
            v-bind="props"
            variant="text"
            icon="mdi-fullscreen"
            density="comfortable"
            class="mr-1 text-medium-emphasis d-none d-sm-inline-flex"
            @click="toggleFullscreen"
          />
        </template>
      </v-tooltip>

      <!-- 主题切换 -->
      <v-tooltip :text="theme.global.current.value.dark ? '切换到浅色模式' : '切换到深色模式'" location="bottom">
        <template #activator="{ props }">
          <v-btn
            v-bind="props"
            variant="text"
            :icon="theme.global.current.value.dark ? 'mdi-weather-night' : 'mdi-weather-sunny'"
            density="comfortable"
            class="mr-1 mr-sm-2 text-medium-emphasis"
            @click="toggleTheme"
          />
        </template>
      </v-tooltip>

      <!-- 用户下拉操作菜单 -->
      <v-menu min-width="180" rounded="lg" offset="8">
        <template #activator="{ props }">
          <v-btn v-bind="props" variant="text" density="comfortable" class="px-1 px-sm-2 py-1 user-btn">
            <v-avatar size="32" class="mr-1 mr-sm-2">
              <v-img :src="userAvatar" alt="Avatar" />
            </v-avatar>
            <span class="text-subtitle-2 font-weight-medium text-capitalize mr-1 d-none d-sm-inline-block">
              {{ userName || '管理员' }}
            </span>
            <v-icon icon="mdi-chevron-down" size="small" class="text-medium-emphasis" />
          </v-btn>
        </template>

        <v-list density="compact" nav class="pa-1">
          <v-list-item
            prepend-icon="mdi-home-outline"
            title="首页"
            to="/dashboard"
            rounded="md"
          />
          <v-divider class="my-1" />
          <v-list-item
            prepend-icon="mdi-logout"
            title="退出登录"
            rounded="md"
            class="text-error"
            @click="handleLogout"
          />
        </v-list>
      </v-menu>
    </div>
  </v-app-bar>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTheme } from 'vuetify'
import { useUserStore } from '@/store/user'
import { useAppStore } from '@/store/app'
import { confirm, message } from '@/utils/feedback'

const route = useRoute()
const router = useRouter()
const theme = useTheme()
const userStore = useUserStore()
const appStore = useAppStore()

const userName = computed(() => userStore.name || userStore.user)
const userAvatar = computed(() => userStore.avatar || 'https://picsum.photos/id/103/80/80')
const currentTitle = computed(() => route.meta?.title || '一粒麦子')

// Dynamic Breadcrumbs
const breadcrumbItems = computed(() => {
  const matched = route.matched.filter(item => item.meta && item.meta.title)
  return matched.map(item => ({
    title: item.meta.title,
    disabled: item.path === route.path,
    to: item.path
  }))
})

function toggleSideBar() {
  appStore.toggleSideBar()
}

function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark ? 'customLightTheme' : 'customDarkTheme'
}

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen()
  } else if (document.exitFullscreen) {
    document.exitFullscreen()
  }
}

function handleLogout() {
  confirm('确定要退出当前登录账号吗？', '提示')
    .then(() => {
      userStore.logout()
      message.success('已安全退出')
      router.push('/login')
    })
    .catch(() => {})
}
</script>

<style scoped>
.user-btn {
  text-transform: none;
}
</style>
