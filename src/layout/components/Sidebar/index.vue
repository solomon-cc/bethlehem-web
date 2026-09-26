<template>
  <v-navigation-drawer
    v-model="drawer"
    :rail="!mobile && rail"
    :temporary="mobile"
    :permanent="!mobile"
    :width="mobile ? 290 : undefined"
    elevation="1"
    class="sidebar-drawer"
  >
    <!-- Brand Header -->
    <div class="brand-header d-flex align-center px-4 py-3">
      <v-avatar color="primary" size="36" class="mr-3 elevation-1">
        <v-icon icon="mdi-grain" color="white" size="22" />
      </v-avatar>
      <div v-if="mobile || !rail" class="brand-title font-weight-bold text-subtitle-1 text-truncate">
        一粒麦子
        <span class="text-caption text-medium-emphasis d-block" style="line-height: 1;">管理系统</span>
      </div>
      <v-spacer v-if="mobile" />
      <v-btn
        v-if="mobile"
        icon="mdi-close"
        variant="text"
        density="comfortable"
        @click="drawer = false"
      />
    </div>

    <v-divider />

    <!-- Navigation Menu List -->
    <v-list density="comfortable" nav class="px-2 py-3">
      <!-- 首页 -->
      <v-list-item
        prepend-icon="mdi-view-dashboard-outline"
        title="首页仪表盘"
        to="/dashboard"
        rounded="lg"
        active-color="primary"
        color="primary"
        @click="handleNavClick"
      />

      <!-- 课时管理 -->
      <v-list-group value="class">
        <template #activator="{ props }">
          <v-list-item
            v-bind="props"
            prepend-icon="mdi-calendar-clock-outline"
            title="课时管理"
            rounded="lg"
          />
        </template>
        <v-list-item
          prepend-icon="mdi-clipboard-text-clock-outline"
          title="课时记录"
          to="/class/record"
          rounded="lg"
          active-color="primary"
          color="primary"
          class="pl-4"
          @click="handleNavClick"
        />
      </v-list-group>

      <!-- 用户管理 -->
      <v-list-group value="user">
        <template #activator="{ props }">
          <v-list-item
            v-bind="props"
            prepend-icon="mdi-account-group-outline"
            title="用户管理"
            rounded="lg"
          />
        </template>
        <v-list-item
          prepend-icon="mdi-school-outline"
          title="学生管理"
          to="/user/student"
          rounded="lg"
          active-color="primary"
          color="primary"
          class="pl-4"
          @click="handleNavClick"
        />
        <v-list-item
          prepend-icon="mdi-account-tie-outline"
          title="教师管理"
          to="/user/teacher"
          rounded="lg"
          active-color="primary"
          color="primary"
          class="pl-4"
          @click="handleNavClick"
        />
      </v-list-group>
    </v-list>

    <template #append v-if="!mobile">
      <div class="pa-2">
        <v-btn
          variant="text"
          :icon="rail ? 'mdi-chevron-double-right' : 'mdi-chevron-double-left'"
          block
          size="small"
          class="text-medium-emphasis"
          @click="rail = !rail"
        />
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import { useDisplay } from 'vuetify'
import { useAppStore } from '@/store/app'

const { mobile } = useDisplay()
const appStore = useAppStore()

const rail = ref(false)

const drawer = computed({
  get() {
    return appStore.sidebar.opened
  },
  set(val) {
    appStore.sidebar.opened = val
  }
})

function handleNavClick() {
  if (mobile.value) {
    drawer.value = false
  }
}

watch(mobile, (isMob) => {
  if (isMob) {
    drawer.value = false
  } else {
    drawer.value = true
  }
}, { immediate: true })
</script>

<style scoped>
.sidebar-drawer {
  border-right: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
  user-select: none;
}
.brand-header {
  min-height: 56px;
}
.brand-title {
  color: rgb(var(--v-theme-on-surface));
  letter-spacing: 0.5px;
}
</style>
