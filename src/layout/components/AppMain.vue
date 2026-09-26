<template>
  <v-main class="app-main">
    <router-view v-slot="{ Component, route }">
      <transition name="fade-slide" mode="out-in">
        <component :is="Component" :key="route.path" />
      </transition>
    </router-view>
  </v-main>
</template>

<script setup>
</script>

<style scoped>
.app-main {
  min-height: calc(100vh - 56px);
  background-color: rgb(var(--v-theme-background));
}
</style>
