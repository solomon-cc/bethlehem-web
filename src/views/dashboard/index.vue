<template>
  <div class="app-container">
    <!-- 欢迎 Banner -->
    <v-card
      class="welcome-banner mb-6 pa-6 text-white"
      elevation="2"
      rounded="xl"
    >
      <v-row align="center">
        <v-col cols="12" md="8">
          <div class="d-flex align-center mb-2">
            <v-chip color="white" variant="flat" size="small" class="text-primary font-weight-bold mr-2">
              今日寄语
            </v-chip>
            <span class="text-caption opacity-80">{{ currentDateText }}</span>
          </div>
          <h2 class="text-h4 font-weight-bold mb-2">
            认识至圣者便是聪明
          </h2>
          <p class="text-body-1 opacity-90">
            欢迎回来，<strong>{{ userName }}</strong>！
          </p>
        </v-col>
        <v-col cols="12" md="4" class="text-md-right d-none d-md-block">
          <v-icon icon="mdi-heart-pulse" size="100" class="banner-icon opacity-20" />
        </v-col>
      </v-row>
    </v-card>

    <!-- 核心统计指标 -->
    <v-row class="mb-6">
      <v-col cols="12" sm="6" lg="3">
        <v-card elevation="1" rounded="lg" class="pa-4 metric-card cursor-pointer" to="/user/student">
          <div class="d-flex justify-space-between align-center">
            <div>
              <span class="text-caption text-medium-emphasis font-weight-medium">在园学生</span>
              <div class="text-h4 font-weight-bold mt-1 text-primary">{{ studentCount }}</div>
            </div>
            <v-avatar color="primary" variant="tonal" rounded="lg" size="48">
              <v-icon icon="mdi-school-outline" size="28" />
            </v-avatar>
          </div>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" lg="3">
        <v-card elevation="1" rounded="lg" class="pa-4 metric-card cursor-pointer" to="/user/teacher">
          <div class="d-flex justify-space-between align-center">
            <div>
              <span class="text-caption text-medium-emphasis font-weight-medium">在职康复师</span>
              <div class="text-h4 font-weight-bold mt-1 text-teal">{{ teacherCount }}</div>
            </div>
            <v-avatar color="teal" variant="tonal" rounded="lg" size="48">
              <v-icon icon="mdi-account-tie-outline" size="28" />
            </v-avatar>
          </div>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" lg="3">
        <v-card elevation="1" rounded="lg" class="pa-4 metric-card cursor-pointer" to="/class/record">
          <div class="d-flex justify-space-between align-center">
            <div>
              <span class="text-caption text-medium-emphasis font-weight-medium">累计课时记录</span>
              <div class="text-h4 font-weight-bold mt-1 text-indigo">{{ recordCount }}</div>
            </div>
            <v-avatar color="indigo" variant="tonal" rounded="lg" size="48">
              <v-icon icon="mdi-clipboard-text-clock-outline" size="28" />
            </v-avatar>
          </div>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" lg="3">
        <v-card elevation="1" rounded="lg" class="pa-4 metric-card">
          <div class="d-flex justify-space-between align-center">
            <div>
              <span class="text-caption text-medium-emphasis font-weight-medium">系统运行状态</span>
              <div class="text-h6 font-weight-bold mt-2 text-success d-flex align-center">
                <v-icon icon="mdi-check-circle" size="18" class="mr-1" /> 正常在线
              </div>
            </div>
            <v-avatar color="success" variant="tonal" rounded="lg" size="48">
              <v-icon icon="mdi-server-network" size="28" />
            </v-avatar>
          </div>
          <div class="text-caption text-medium-emphasis mt-3">
            <span>服务节点：西南一区</span>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <!-- 快捷操作与工作台 -->
    <v-row>
      <v-col cols="12" md="8">
        <v-card elevation="1" rounded="lg" class="pa-5 mb-6">
          <v-card-title class="pa-0 mb-4 text-subtitle-1 font-weight-bold d-flex align-center">
            <v-icon icon="mdi-lightning-bolt-outline" color="amber-darken-2" class="mr-2" />
            快捷工作台
          </v-card-title>
          <v-row>
            <v-col cols="12" sm="4">
              <v-btn
                block
                variant="outlined"
                color="primary"
                rounded="lg"
                min-height="60"
                class="d-flex flex-row flex-sm-column align-center justify-center text-none py-2"
                to="/class/record"
              >
                <v-icon icon="mdi-calendar-plus" size="22" class="mr-2 mr-sm-0 mb-sm-1" />
                <span class="text-caption font-weight-medium">课时打卡管理</span>
              </v-btn>
            </v-col>
            <v-col cols="12" sm="4">
              <v-btn
                block
                variant="outlined"
                color="teal"
                rounded="lg"
                min-height="60"
                class="d-flex flex-row flex-sm-column align-center justify-center text-none py-2"
                to="/user/student"
              >
                <v-icon icon="mdi-account-plus-outline" size="22" class="mr-2 mr-sm-0 mb-sm-1" />
                <span class="text-caption font-weight-medium">学生建档登记</span>
              </v-btn>
            </v-col>
            <v-col cols="12" sm="4">
              <v-btn
                block
                variant="outlined"
                color="indigo"
                rounded="lg"
                min-height="60"
                class="d-flex flex-row flex-sm-column align-center justify-center text-none py-2"
                to="/user/teacher"
              >
                <v-icon icon="mdi-account-tie-outline" size="22" class="mr-2 mr-sm-0 mb-sm-1" />
                <span class="text-caption font-weight-medium">康复师人员管理</span>
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card elevation="1" rounded="lg" class="pa-5 mb-6">
          <v-card-title class="pa-0 mb-4 text-subtitle-1 font-weight-bold d-flex align-center">
            <v-icon icon="mdi-information-outline" color="primary" class="mr-2" />
            系统信息
          </v-card-title>
          <v-list density="compact" class="pa-0">
            <v-list-item class="px-0">
              <template #prepend>
                <span class="text-caption text-medium-emphasis">系统版本：</span>
              </template>
              <span class="text-caption font-weight-bold">v4.4.0 (Vuetify 4)</span>
            </v-list-item>
            <v-list-item class="px-0">
              <template #prepend>
                <span class="text-caption text-medium-emphasis">前端框架：</span>
              </template>
              <span class="text-caption font-weight-bold">Vue 3.5 + Vite 6</span>
            </v-list-item>
            <v-list-item class="px-0">
              <template #prepend>
                <span class="text-caption text-medium-emphasis">支持单位：</span>
              </template>
              <span class="text-caption font-weight-bold">成都一粒麦子医疗科技</span>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useUserStore } from '@/store/user'
import { studentListAll } from '@/api/student'
import { userList } from '@/api/user'
import { listRecord } from '@/api/record'
import moment from 'moment'

const userStore = useUserStore()
const userName = computed(() => userStore.name || userStore.user || '管理员')

const studentCount = ref(0)
const teacherCount = ref(0)
const recordCount = ref(0)

const currentDateText = computed(() => {
  return moment().format('YYYY年MM月DD日 星期') + ['日', '一', '二', '三', '四', '五', '六'][moment().day()]
})

onMounted(async () => {
  try {
    const sRes = await studentListAll({})
    if (sRes?.data) studentCount.value = sRes.data.length || 0
  } catch (e) {}

  try {
    const uRes = await userList({})
    if (uRes?.data) teacherCount.value = uRes.data.length || 0
  } catch (e) {}

  try {
    const rRes = await listRecord({ page_num: 1, page_size: 1 })
    if (rRes?.data?.total) recordCount.value = rRes.data.total
  } catch (e) {}
})
</script>

<style scoped>
.welcome-banner {
  background: linear-gradient(135deg, #007C89 0%, #009688 100%);
  position: relative;
  overflow: hidden;
}
.banner-icon {
  position: absolute;
  right: 20px;
  top: 10px;
}
.metric-card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.metric-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08) !important;
}
.cursor-pointer {
  cursor: pointer;
}
</style>
