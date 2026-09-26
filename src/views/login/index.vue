<template>
  <div class="login-page">
    <div class="header text-center pt-6 pt-sm-8 px-4">
      <div class="d-inline-flex align-center">
        <v-icon icon="mdi-grain" size="32" color="white" class="mr-2" />
        <h1 class="text-h5 text-sm-h4 font-weight-bold text-white tracking-wide">
          一粒麦子后台管理系统
        </h1>
      </div>
    </div>

    <div class="content-body py-6 py-sm-8 px-4">
      <login-form />
    </div>

    <div class="footer text-center pb-6 px-4">
      <div class="text-caption text-white" style="opacity: 0.88;">
        成都一粒麦子医疗科技有限公司 · 蜀ICP备2021025805号
      </div>
    </div>
  </div>
</template>

<script setup>
import LoginForm from '@/components/Login/Login.vue'
</script>

<style scoped>
.login-page {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
  width: 100%;
  background-image: linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.65)), url("@/assets/login.jpg");
  background-size: cover;
  background-position: center;
}

.content-body {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tracking-wide {
  letter-spacing: 1.5px;
}
</style>
