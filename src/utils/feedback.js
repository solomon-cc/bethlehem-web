import { reactive } from 'vue'

export const feedbackState = reactive({
  snackbar: {
    show: false,
    text: '',
    color: 'success',
    timeout: 3000
  },
  dialog: {
    show: false,
    title: '系统提示',
    message: '',
    confirmText: '确定',
    cancelText: '取消',
    resolve: null,
    reject: null
  }
})

export const message = {
  success(text, timeout = 3000) {
    feedbackState.snackbar.text = text
    feedbackState.snackbar.color = 'success'
    feedbackState.snackbar.timeout = timeout
    feedbackState.snackbar.show = true
  },
  error(text, timeout = 4000) {
    feedbackState.snackbar.text = text
    feedbackState.snackbar.color = 'error'
    feedbackState.snackbar.timeout = timeout
    feedbackState.snackbar.show = true
  },
  warning(text, timeout = 3500) {
    feedbackState.snackbar.text = text
    feedbackState.snackbar.color = 'warning'
    feedbackState.snackbar.timeout = timeout
    feedbackState.snackbar.show = true
  },
  info(text, timeout = 3000) {
    feedbackState.snackbar.text = text
    feedbackState.snackbar.color = 'info'
    feedbackState.snackbar.timeout = timeout
    feedbackState.snackbar.show = true
  }
}

export function confirm(messageText, title = '系统提示') {
  return new Promise((resolve, reject) => {
    feedbackState.dialog.title = title
    feedbackState.dialog.message = messageText
    feedbackState.dialog.resolve = resolve
    feedbackState.dialog.reject = reject
    feedbackState.dialog.show = true
  })
}

export default message
