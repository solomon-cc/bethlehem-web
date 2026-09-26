<template>
  <div class="not-found-page d-flex align-center justify-center">
    <v-card elevation="2" rounded="xl" max-width="500" class="pa-8 text-center mx-4">
      <v-avatar color="primary" variant="tonal" size="88" class="mb-4">
        <v-icon icon="mdi-compass-off-outline" size="52" color="primary" />
      </v-avatar>
      <h1 class="text-h3 font-weight-bold text-high-emphasis mb-2">404</h1>
      <h2 class="text-h6 font-weight-medium text-medium-emphasis mb-4">抱歉，您访问的页面不存在</h2>
      <p class="text-body-2 text-medium-emphasis mb-6">
        请检查您输入的网址是否正确，或者点击下方按钮返回系统首页。
      </p>
      <v-btn
        color="primary"
        size="large"
        rounded="lg"
        prepend-icon="mdi-home-outline"
        elevation="1"
        to="/"
      >
        返回系统首页
      </v-btn>
    </v-card>
  </div>
</template>

<script setup>
</script>

<style scoped>
.not-found-page {
  min-height: 100vh;
  width: 100%;
  background-color: rgb(var(--v-theme-background));
}
</style>
