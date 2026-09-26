<template>
  <div class="login-wrapper">
    <v-card class="login-card pa-6 pa-sm-8" elevation="4" rounded="xl" max-width="400" width="100%">
      <div class="text-center mb-6">
        <v-avatar color="primary" size="48" class="mb-3 elevation-2">
          <v-icon icon="mdi-shield-account-outline" color="white" size="28" />
        </v-avatar>
        <h2 class="text-h5 font-weight-bold text-high-emphasis">欢迎登录</h2>
        <p class="text-caption text-medium-emphasis mt-1">请输入您的账号与密码访问系统</p>
      </div>

      <v-form ref="formRef" v-model="isValid" @submit.prevent="handleLogin">
        <v-text-field
          v-model="model.username"
          label="用户名"
          placeholder="请输入用户名"
          prepend-inner-icon="mdi-account-outline"
          :rules="usernameRules"
          variant="outlined"
          density="comfortable"
          class="mb-3"
        />

        <v-text-field
          v-model="model.password"
          label="密码"
          placeholder="请输入密码"
          prepend-inner-icon="mdi-lock-outline"
          :append-inner-icon="showPassword ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
          :type="showPassword ? 'text' : 'password'"
          :rules="passwordRules"
          variant="outlined"
          density="comfortable"
          class="mb-2"
          @click:append-inner="showPassword = !showPassword"
        />

        <div class="d-flex justify-end mb-4">
          <a href="https://app.ylmz.com.cn/" target="_blank" class="text-caption text-primary text-decoration-none py-1">
            忘记密码？
          </a>
        </div>

        <v-btn
          type="submit"
          color="primary"
          block
          size="large"
          elevation="2"
          rounded="lg"
          :loading="loading"
        >
          立即登录
        </v-btn>
      </v-form>
    </v-card>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '@/api/user'
import { useUserStore } from '@/store/user'
import { message } from '@/utils/feedback'

const router = useRouter()
const userStore = useUserStore()

const formRef = ref(null)
const isValid = ref(false)
const loading = ref(false)
const showPassword = ref(false)

const model = reactive({
  username: '',
  password: ''
})

const usernameRules = [
  v => !!v || '请输入用户名',
  v => (v && v.length >= 3) || '用户名至少需 3 个字符'
]

const passwordRules = [
  v => !!v || '请输入密码',
  v => (v && v.length >= 4) || '密码至少需 4 个字符'
]

async function handleLogin() {
  const { valid } = await formRef.value.validate()
  if (!valid) return

  loading.value = true
  try {
    const res = await login({
      user_name: model.username,
      password: model.password
    })

    if (res.code === 200 || res.code === '200') {
      const loginData = {
        user: res.data.user_name,
        id: res.data.id,
        nick_name: res.data.nickname || res.data.nick_name || res.data.user_name,
        token: res.data.token
      }
      userStore.login(loginData)
      message.success('登录成功，欢迎回来！')
      router.push('/dashboard')
    }
  } catch (error) {
    console.error('Login error:', error)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 0 16px;
}

.login-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.6);
}
</style>
