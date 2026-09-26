<template>
  <v-app>
    <router-view />
    <global-feedback />
  </v-app>
</template>

<script setup>
import GlobalFeedback from '@/components/GlobalFeedback.vue'
</script>

<style>
/* Global basic overrides if needed */
html, body {
  min-height: 100%;
  height: auto;
  overflow-x: hidden;
  overflow-y: auto !important;
  -webkit-overflow-scrolling: touch;
}
</style>
