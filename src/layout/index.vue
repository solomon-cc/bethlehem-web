<template>
  <v-layout class="layout-wrapper">
    <sidebar />
    <navbar />
    <app-main />
  </v-layout>
</template>

<script setup>
import Sidebar from './components/Sidebar/index.vue'
import Navbar from './components/Navbar.vue'
import AppMain from './components/AppMain.vue'
</script>

<style scoped>
.layout-wrapper {
  min-height: 100vh;
  min-height: 100dvh;
  height: auto;
  overflow: visible;
}
</style>
