<template>
  <div class="app-container">
    <!-- 筛选卡片 -->
    <v-card elevation="1" rounded="lg" class="pa-4 mb-4">
      <v-row dense align="center">
        <!-- 学生筛选 -->
        <v-col cols="12" sm="6" md="3">
          <v-select
            v-model="query_form.student_name"
            :items="student_list"
            item-title="nick_name"
            item-value="nick_name"
            label="学生姓名"
            placeholder="请选择学生"
            clearable
            density="compact"
            variant="outlined"
            hide-details
            prepend-inner-icon="mdi-school-outline"
          />
        </v-col>

        <!-- 老师筛选 -->
        <v-col cols="12" sm="6" md="3">
          <v-select
            v-model="query_form.user_name"
            :items="teacher_list"
            item-title="nick_name"
            item-value="nick_name"
            label="任课老师"
            placeholder="请选择教师"
            clearable
            density="compact"
            variant="outlined"
            hide-details
            prepend-inner-icon="mdi-account-tie-outline"
          />
        </v-col>

        <!-- 状态筛选 -->
        <v-col cols="12" sm="6" md="3">
          <v-select
            v-model="query_form.status"
            :items="status_option"
            item-title="name"
            item-value="ID"
            label="课程状态"
            placeholder="请选择状态"
            clearable
            density="compact"
            variant="outlined"
            hide-details
            prepend-inner-icon="mdi-tag-outline"
          />
        </v-col>

        <!-- 操作按钮 -->
        <v-col cols="12" sm="6" md="3" class="d-flex align-center">
          <v-btn
            color="primary"
            prepend-icon="mdi-magnify"
            class="mr-2 flex-grow-1"
            elevation="1"
            height="40"
            @click="handleSearch"
          >
            搜索
          </v-btn>
          <v-btn
            variant="outlined"
            prepend-icon="mdi-refresh"
            class="flex-grow-1"
            height="40"
            @click="handleReset"
          >
            重置
          </v-btn>
        </v-col>
      </v-row>
    </v-card>

    <!-- 数据表格卡片 -->
    <v-card elevation="1" rounded="lg" class="overflow-hidden">
      <div class="px-4 py-3 d-flex align-center justify-space-between border-b">
        <div class="text-subtitle-1 font-weight-bold d-flex align-center">
          <v-icon icon="mdi-clipboard-text-clock-outline" color="primary" class="mr-2" />
          课时记录列表
        </div>
        <div class="text-caption text-medium-emphasis">
          共找到 <strong>{{ total }}</strong> 条记录
        </div>
      </div>

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
          <!-- 学生姓名列：优先显示 name，再 fallback 到 nick_name -->
          <template #item.name="{ item }">
            <div class="font-weight-medium text-body-2 text-no-wrap">
              {{ item.name || item.nick_name || '-' }}
              <div v-if="mobile" class="text-caption text-medium-emphasis" style="font-size: 11px;">
                老师: {{ item.user_name || '-' }}
              </div>
            </div>
          </template>

          <!-- 任课老师列 -->
          <template #item.user_name="{ item }">
            <div class="text-body-2 text-no-wrap">
              {{ item.user_name || '-' }}
            </div>
          </template>

          <!-- 打卡时间列 -->
          <template #item.created_at="{ item }">
            <div class="d-flex flex-column text-body-2 text-no-wrap">
              <div class="d-flex align-center">
                <v-icon icon="mdi-clock-outline" size="14" class="mr-1 text-medium-emphasis" />
                <span :style="mobile ? 'font-size: 12px;' : ''">{{ formatDateTime(item.created_at) }}</span>
              </div>
              <div v-if="mobile" class="mt-1">
                <v-chip
                  :color="getStatusColor(item.status)"
                  size="x-small"
                  variant="flat"
                  class="font-weight-medium"
                >
                  {{ getStatusLabel(item.status) }}
                </v-chip>
              </div>
            </div>
          </template>

          <!-- 课程状态列 -->
          <template #item.status="{ item }">
            <v-chip
              :color="getStatusColor(item.status)"
              size="small"
              variant="flat"
              class="font-weight-medium"
            >
              {{ getStatusLabel(item.status) }}
            </v-chip>
          </template>

          <!-- 操作列 -->
          <template #item.actions="{ item }">
            <div class="d-flex justify-end align-center text-no-wrap pr-1">
              <v-tooltip text="编辑记录" location="top">
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
              <v-tooltip text="删除记录" location="top">
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

          <!-- 无数据提示 -->
          <template #no-data>
            <div class="py-8 text-center text-medium-emphasis">
              <v-icon icon="mdi-folder-open-outline" size="48" class="mb-2 opacity-40" />
              <p>暂无课时打卡记录</p>
            </div>
          </template>
        </v-data-table>
      </div>

      <!-- 底部自定义分页栏 -->
      <v-divider />
      <div class="d-flex flex-column flex-sm-row align-center justify-space-between px-3 px-sm-4 py-3 gap-2">
        <div class="d-flex align-center justify-center justify-sm-start w-100 w-sm-auto mb-2 mb-sm-0">
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

        <div class="d-flex justify-center w-100 w-sm-auto">
          <v-pagination
            v-model="query_form.page_num"
            :length="pageCount"
            :total-visible="mobile ? 4 : 5"
            rounded="circle"
            size="small"
            density="comfortable"
            color="primary"
            class="my-0"
            @update:model-value="queryRecord"
          />
        </div>
      </div>
    </v-card>

    <!-- 编辑弹窗 -->
    <v-dialog v-model="open" max-width="520" persistent>
      <v-card rounded="xl" class="pa-4">
        <v-card-title class="d-flex align-center justify-space-between pb-2">
          <span class="text-h6 font-weight-bold">修改课时记录 - {{ editTitle }}</span>
          <v-btn icon="mdi-close" variant="text" size="small" @click="cancel" />
        </v-card-title>
        <v-divider class="mb-4" />

        <v-card-text class="pa-0">
          <v-form ref="editFormRef" v-model="isFormValid">
            <v-text-field
              v-model="form.created_at"
              label="打卡时间"
              placeholder="YYYY-MM-DD HH:mm:ss"
              prepend-inner-icon="mdi-calendar-clock"
              variant="outlined"
              density="comfortable"
              class="mb-3"
            />

            <v-text-field
              v-model="form.user_name"
              label="任课老师"
              prepend-inner-icon="mdi-account-tie"
              variant="outlined"
              density="comfortable"
              disabled
              class="mb-3"
            />

            <v-select
              v-model="form.status"
              label="课程类型"
              :items="[
                { title: '缺席', value: 0 },
                { title: '个训', value: 1 },
                { title: '集体', value: 2 },
                { title: '影子', value: 3 },
                { title: '辅课', value: 4 },
                { title: '衔接', value: 5 }
              ]"
              prepend-inner-icon="mdi-bookmark-outline"
              variant="outlined"
              density="comfortable"
              :rules="[v => v !== undefined && v !== null || '课程类型不能为空']"
            />
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
            保存更新
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useDisplay } from 'vuetify'
import { listRecord, deleteRecord, updateRecord } from '@/api/record'
import { studentListAll } from '@/api/student'
import { userList } from '@/api/user'
import { message, confirm } from '@/utils/feedback'
import moment from 'moment'

const { mobile } = useDisplay()

const headers = computed(() => {
  if (mobile.value) {
    return [
      { title: '学生 / 教师', key: 'name', align: 'start' },
      { title: '打卡信息 / 类型', key: 'created_at', align: 'start' },
      { title: '操作', key: 'actions', align: 'end', width: '56px', sortable: false }
    ]
  }
  return [
    { title: '学生姓名', key: 'name', minWidth: '120px', align: 'start' },
    { title: '任课老师', key: 'user_name', minWidth: '120px', align: 'start' },
    { title: '打卡日期', key: 'created_at', minWidth: '180px', align: 'start' },
    { title: '课程类型', key: 'status', minWidth: '110px', align: 'start' },
    { title: '操作', key: 'actions', minWidth: '110px', align: 'end', sortable: false }
  ]
})

const loading = ref(false)
const submitLoading = ref(false)
const total = ref(0)
const tableData = ref([])
const student_list = ref([])
const teacher_list = ref([])
const open = ref(false)
const editTitle = ref('')
const isFormValid = ref(false)
const editFormRef = ref(null)

const query_form = reactive({
  user_name: '',
  student_name: '',
  start_at: '',
  end_at: '',
  search: '',
  status: null,
  page_num: 1,
  page_size: 20
})

const form = reactive({
  id: '',
  created_at: '',
  student_id: '',
  user_name: '',
  nick_name: '',
  status: 0
})

const status_option = [
  { ID: 0, name: '缺席' },
  { ID: 1, name: '个训' },
  { ID: 2, name: '集体' },
  { ID: 3, name: '影子' },
  { ID: 4, name: '辅课' },
  { ID: 5, name: '衔接' }
]

const pageCount = computed(() => {
  return Math.ceil(total.value / query_form.page_size) || 1
})

function formatDateTime(timeStr) {
  if (!timeStr) return '-'
  return moment(timeStr).format('YYYY-MM-DD HH:mm:ss')
}

function getStatusLabel(status) {
  const map = {
    0: '缺席',
    1: '个训',
    2: '集体',
    3: '影子',
    4: '辅课',
    5: '衔接'
  }
  return map[status] || '未知'
}

function getStatusColor(status) {
  const map = {
    0: 'error',
    1: 'success',
    2: 'warning',
    3: 'indigo',
    4: 'amber-darken-2',
    5: 'info'
  }
  return map[status] || 'grey'
}

async function queryRecord() {
  loading.value = true
  query_form.search =
    (query_form.user_name || '') +
    (query_form.student_name || '') +
    '%' +
    (query_form.status !== null && query_form.status !== undefined ? query_form.status : '')

  try {
    const res = await listRecord(query_form)
    if (res?.data) {
      tableData.value = res.data.data || []
      total.value = res.data.total || 0
    }
  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false
  }
}

function handleSearch() {
  query_form.page_num = 1
  queryRecord()
}

function handleReset() {
  query_form.user_name = ''
  query_form.student_name = ''
  query_form.status = null
  query_form.start_at = ''
  query_form.end_at = ''
  handleSearch()
}

async function getStudentList() {
  try {
    const res = await studentListAll({})
    if (res?.data) student_list.value = res.data
  } catch (err) {}
}

async function getTeacherList() {
  try {
    const res = await userList({})
    if (res?.data) teacher_list.value = res.data
  } catch (err) {}
}

function handleEdit(row) {
  editTitle.value = row.name || row.nick_name || ''
  form.id = row.id
  form.student_id = row.student_id
  form.created_at = row.created_at
  form.user_name = row.user_name
  form.nick_name = row.name || row.nick_name || ''
  form.status = Number(row.status)
  open.value = true
}

async function submitForm() {
  const { valid } = await editFormRef.value.validate()
  if (!valid) return

  submitLoading.value = true
  try {
    const res = await updateRecord(form)
    if (res.code === 200 || res.code === '200') {
      message.success('课时记录更新成功')
      open.value = false
      queryRecord()
    }
  } catch (err) {
    console.error(err)
  } finally {
    submitLoading.value = false
  }
}

function handleDelete(row) {
  const studentName = row.name || row.nick_name || '学员'
  confirm(`确认移除学生【${studentName}】在 ${formatDateTime(row.created_at)} 的打卡记录吗？`, '删除确认')
    .then(async () => {
      try {
        const res = await deleteRecord(row)
        if (res.code === 200 || res.code === '200') {
          message.success('记录删除成功')
          queryRecord()
        }
      } catch (err) {
        console.error(err)
      }
    })
    .catch(() => {})
}

function cancel() {
  open.value = false
}

onMounted(() => {
  queryRecord()
  getStudentList()
  getTeacherList()
})
</script>

<style scoped>
.table-responsive {
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}
</style>
