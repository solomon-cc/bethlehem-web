import { defineStore } from 'pinia'
import Cookies from 'js-cookie'

export const useAppStore = defineStore('app', {
  state: () => ({
    sidebar: {
      opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
      withoutAnimation: false
    },
    device: 'desktop'
  }),
  actions: {
    toggleSideBar() {
      this.sidebar.opened = !this.sidebar.opened
      Cookies.set('sidebarStatus', this.sidebar.opened ? 1 : 0)
    },
    closeSideBar({ withoutAnimation = false } = {}) {
      this.sidebar.opened = false
      this.sidebar.withoutAnimation = withoutAnimation
      Cookies.set('sidebarStatus', 0)
    },
    toggleDevice(device) {
      this.device = device
    }
  }
})
