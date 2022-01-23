<template>
  <div id="app" class="body">
    <div class="header">
      <h2 class="logo">一粒麦子后台管理系统</h2>
    </div>
    <Login />

    <div class="footer">
      <div class="version">
        成都一粒麦子医疗科技有限公司 蜀ICP备2021025805号
      </div>
    </div>
  </div>
</template>

<script>
import Login from '@/components/Login/Login.vue'

export default {
  name: 'App',
  components: {
    Login
  }
}
</script>

<style lang="scss" scoped>
#app {
  font-family: Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.body {
  margin: 0;
  padding: 0;
  background-image: url("../../assets/login.jpg");
  background-size: cover;
}
.footer,
.header {
  padding: 20px 20px;
  color: #f0f4f8;
  display: flex;
  flex-direction: column;
  align-items: center;
  h1,
  h2,
  h3 {
    color: #f0f4f8;
    padding: 0;
    margin: 0;
  }
  .links {
    display: flex;
    font-family: "Open Sans";
    span {
      padding: 0 10px;
      font-size: 18px;
      border-right: 1px solid #9fb3c8;
      &:last-child {
        border-right: none;
      }
    }
  }
  .version {
    font-family: "Open Sans";
    padding: 0 10px;
    color: #f0f4f8;
    font-size: 12px;
    margin-top: 5px;
  }
}
.header {
  padding: 10px 20px;
  .logo {
    font-family: "Open Sans";
    letter-spacing: 3px;
    padding-top: 15px;
    padding-bottom: 15px;
  }
  .logo .part-2 {
    color: #d64545;
  }
}
</style>
