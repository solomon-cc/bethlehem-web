<template>
  <div class="app-container">
    <!-- 顶部操作栏 -->
    <v-card elevation="1" rounded="lg" class="pa-4 mb-4">
      <div class="d-flex flex-column flex-sm-row align-start align-sm-center justify-space-between gap-3">
        <div class="d-flex align-center mb-3 mb-sm-0">
          <v-avatar color="teal" variant="tonal" rounded="lg" size="40" class="mr-3">
            <v-icon icon="mdi-account-tie-outline" size="24" />
          </v-avatar>
          <div>
            <h3 class="text-subtitle-1 font-weight-bold">康复师 / 教师管理</h3>
            <span class="text-caption text-medium-emphasis">管理康复教师队伍及在职任教状态</span>
          </div>
        </div>

        <div class="d-flex align-center w-100 w-sm-auto justify-end">
          <v-btn
            color="primary"
            prepend-icon="mdi-plus"
            elevation="1"
            rounded="lg"
            class="flex-grow-1 flex-sm-grow-0"
            @click="handleAdd"
          >
            新增康复师
          </v-btn>
        </div>
      </div>
    </v-card>

    <!-- 数据表格卡片 -->
    <v-card elevation="1" rounded="lg" class="overflow-hidden">
      <div class="table-responsive">
        <v-data-table
          :headers="headers"
          :items="tableData"
          :loading="loading"
          hover
          density="comfortable"
          class="elevation-0 responsive-data-table"
          :items-per-page="query_form.page_size"
          hide-default-footer
        >
          <!-- 姓名与账号 -->
          <template #item.nick_name="{ item }">
            <div class="d-flex align-center py-1 text-no-wrap">
              <v-avatar size="36" color="teal-lighten-4" class="mr-3 elevation-1">
                <v-icon icon="mdi-account-tie" color="teal-darken-2" />
              </v-avatar>
              <div>
                <div class="font-weight-medium text-body-2">{{ item.nick_name }}</div>
                <div class="text-caption text-medium-emphasis">账号: {{ item.UserName || item.user_name || '-' }}</div>
              </div>
            </div>
          </template>

          <!-- 创建日期 -->
          <template #item.created_at="{ item }">
            <div class="text-body-2 text-medium-emphasis text-no-wrap">
              {{ formatTime(item.CreatedAt || item.created_at) }}
            </div>
          </template>

          <!-- 状态列 -->
          <template #item.status="{ item }">
            <v-chip
              :color="item.status == 1 ? 'success' : 'grey'"
              size="small"
              variant="flat"
              class="font-weight-medium text-no-wrap"
            >
              <v-icon
                :icon="item.status == 1 ? 'mdi-check-circle' : 'mdi-close-circle'"
                start
                size="14"
              />
              {{ item.status == 1 ? '在职' : '离职' }}
            </v-chip>
          </template>

          <!-- 操作列 -->
          <template #item.actions="{ item }">
            <div class="d-flex justify-end align-center text-no-wrap pr-1">
              <v-tooltip text="编辑教师" location="top">
                <template #activator="{ props }">
                  <v-btn
                    v-bind="props"
                    icon="mdi-pencil-outline"
                    density="comfortable"
                    variant="text"
                    color="primary"
                    class="mr-1"
                    @click="handleEdit(item)"
                  />
                </template>
              </v-tooltip>
              <v-tooltip text="移除教师" location="top">
                <template #activator="{ props }">
                  <v-btn
                    v-bind="props"
                    icon="mdi-delete-outline"
                    density="comfortable"
                    variant="text"
                    color="error"
                    @click="handleDelete(item)"
                  />
                </template>
              </v-tooltip>
            </div>
          </template>

          <!-- 无数据 -->
          <template #no-data>
            <div class="py-8 text-center text-medium-emphasis">
              <v-icon icon="mdi-account-off-outline" size="48" class="mb-2 opacity-40" />
              <p>暂无康复师记录</p>
            </div>
          </template>
        </v-data-table>
      </div>

      <!-- 分页栏 -->
      <v-divider />
      <div class="d-flex flex-wrap align-center justify-space-between px-4 py-3">
        <div class="d-flex align-center my-1">
          <span class="text-caption text-medium-emphasis mr-2">每页行数:</span>
          <v-select
            v-model="query_form.page_size"
            :items="[10, 20, 30, 50]"
            density="compact"
            variant="outlined"
            hide-details
            style="max-width: 90px;"
            @update:model-value="handleSearch"
          />
        </div>

        <v-pagination
          v-model="query_form.page_num"
          :length="pageCount"
          :total-visible="5"
          rounded="circle"
          size="small"
          density="comfortable"
          color="primary"
          class="my-1"
          @update:model-value="getUserList"
        />
      </div>
    </v-card>

    <!-- 新增 / 编辑弹窗 -->
    <v-dialog v-model="open" max-width="520" persistent>
      <v-card rounded="xl" class="pa-4">
        <v-card-title class="d-flex align-center justify-space-between pb-2">
          <span class="text-h6 font-weight-bold">
            {{ isEdit ? '编辑康复师 - ' + title : '新增康复师' }}
          </span>
          <v-btn icon="mdi-close" variant="text" size="small" @click="cancel" />
        </v-card-title>
        <v-divider class="mb-4" />

        <v-card-text class="pa-0">
          <v-form ref="formRef" v-model="isValid">
            <v-row dense>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="form.nickname"
                  label="教师姓名"
                  placeholder="请输入姓名"
                  prepend-inner-icon="mdi-account-outline"
                  variant="outlined"
                  density="comfortable"
                  :rules="[v => !!v || '姓名不能为空']"
                  class="mb-2"
                />
              </v-col>

              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="form.user_name"
                  label="登录用户名"
                  placeholder="请输入用户名"
                  prepend-inner-icon="mdi-badge-account-outline"
                  variant="outlined"
                  density="comfortable"
                  :rules="[v => !!v || '用户名不能为空']"
                  class="mb-2"
                />
              </v-col>

              <v-col cols="12">
                <v-select
                  v-model="form.status"
                  label="在职状态"
                  :items="[
                    { title: '在职', value: 1 },
                    { title: '离职', value: 0 }
                  ]"
                  prepend-inner-icon="mdi-briefcase-check-outline"
                  variant="outlined"
                  density="comfortable"
                  class="mb-2"
                />
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>

        <v-card-actions class="pt-4 justify-end">
          <v-btn variant="text" @click="cancel">取消</v-btn>
          <v-btn
            color="primary"
            variant="flat"
            :loading="submitLoading"
            @click="submitForm"
          >
            保存信息
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { userList, userUpdateByid } from '@/api/user'
import { message, confirm } from '@/utils/feedback'
import moment from 'moment'

const headers = [
  { title: '教师姓名 / 账号', key: 'nick_name', minWidth: '160px', align: 'start' },
  { title: '创建日期', key: 'created_at', minWidth: '170px', align: 'start' },
  { title: '在职状态', key: 'status', minWidth: '110px', align: 'start' },
  { title: '操作', key: 'actions', minWidth: '110px', align: 'end', sortable: false }
]

const loading = ref(false)
const submitLoading = ref(false)
const total = ref(0)
const tableData = ref([])
const open = ref(false)
const isEdit = ref(false)
const title = ref('')
const isValid = ref(false)
const formRef = ref(null)

const query_form = reactive({
  page_num: 1,
  page_size: 20
})

const form = reactive({
  id: undefined,
  user_name: '',
  nickname: '',
  status: 1
})

const pageCount = computed(() => {
  return Math.ceil(total.value / query_form.page_size) || 1
})

function formatTime(utcTime) {
  if (!utcTime) return '-'
  return moment(utcTime).local().format('YYYY-MM-DD HH:mm:ss')
}

async function getUserList() {
  loading.value = true
  try {
    const res = await userList(query_form)
    if (res?.data) {
      tableData.value = Array.isArray(res.data) ? res.data : (res.data.data || [])
      total.value = res.total || res.data?.total || 0
    }
  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false
  }
}

function handleSearch() {
  query_form.page_num = 1
  getUserList()
}

function handleAdd() {
  resetForm()
  isEdit.value = false
  open.value = true
}

function handleEdit(row) {
  isEdit.value = true
  title.value = row.nick_name || ''
  form.id = row.ID || row.id
  form.status = Number(row.status)
  form.nickname = row.nick_name
  form.user_name = row.UserName || row.user_name
  open.value = true
}

async function submitForm() {
  const { valid } = await formRef.value.validate()
  if (!valid) return

  submitLoading.value = true
  try {
    const res = await userUpdateByid(form)
    if (res.code === 200 || res.code === '200') {
      message.success('康复师信息保存成功')
      open.value = false
      getUserList()
    }
  } catch (err) {
    console.error(err)
  } finally {
    submitLoading.value = false
  }
}

function handleDelete(row) {
  confirm(`确认移除康复师【${row.nick_name}】的档案记录吗？`, '删除确认')
    .then(async () => {
      message.success('操作成功')
      getUserList()
    })
    .catch(() => {})
}

function cancel() {
  open.value = false
}

function resetForm() {
  form.id = undefined
  form.user_name = ''
  form.nickname = ''
  form.status = 1
}

onMounted(() => {
  getUserList()
})
</script>

<style scoped>
.table-responsive {
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}
</style>
