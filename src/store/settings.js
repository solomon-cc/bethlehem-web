import { defineStore } from 'pinia'

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    fixedHeader: true,
    sidebarLogo: true,
    title: '一粒麦子管理系统'
  })
})
