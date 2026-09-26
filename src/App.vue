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
  overflow-y: auto !important;
}
</style>
