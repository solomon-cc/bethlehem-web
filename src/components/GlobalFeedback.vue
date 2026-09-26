<template>
  <div>
    <!-- 全局消息 Toast -->
    <v-snackbar
      v-model="feedbackState.snackbar.show"
      :color="feedbackState.snackbar.color"
      :timeout="feedbackState.snackbar.timeout"
      :location="mobile ? 'top' : 'top right'"
      rounded="lg"
      elevation="4"
    >
      <div class="d-flex align-center">
        <v-icon
          :icon="iconMap[feedbackState.snackbar.color] || 'mdi-information-outline'"
          class="mr-2"
        />
        <span>{{ feedbackState.snackbar.text }}</span>
      </div>
      <template #actions>
        <v-btn
          variant="text"
          icon="mdi-close"
          size="small"
          @click="feedbackState.snackbar.show = false"
        />
      </template>
    </v-snackbar>

    <!-- 全局确认弹窗 Dialog -->
    <v-dialog v-model="feedbackState.dialog.show" max-width="420" persistent>
      <v-card rounded="lg" class="pa-4">
        <v-card-title class="d-flex align-center text-subtitle-1 font-weight-bold pb-2">
          <v-icon icon="mdi-alert-circle-outline" color="warning" class="mr-2" />
          {{ feedbackState.dialog.title }}
        </v-card-title>
        <v-card-text class="py-2 text-body-2 text-medium-emphasis">
          {{ feedbackState.dialog.message }}
        </v-card-text>
        <v-card-actions class="pt-3 justify-end">
          <v-btn
            variant="text"
            @click="handleCancel"
          >
            {{ feedbackState.dialog.cancelText }}
          </v-btn>
          <v-btn
            variant="flat"
            color="primary"
            @click="handleConfirm"
          >
            {{ feedbackState.dialog.confirmText }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { useDisplay } from 'vuetify'
import { feedbackState } from '@/utils/feedback'

const { mobile } = useDisplay()

const iconMap = {
  success: 'mdi-check-circle-outline',
  error: 'mdi-alert-circle-outline',
  warning: 'mdi-alert-outline',
  info: 'mdi-information-outline'
}

function handleConfirm() {
  feedbackState.dialog.show = false
  if (feedbackState.dialog.resolve) {
    feedbackState.dialog.resolve(true)
  }
}

function handleCancel() {
  feedbackState.dialog.show = false
  if (feedbackState.dialog.reject) {
    feedbackState.dialog.reject('cancel')
  }
}
</script>
