<template>
  <div class="app-container">
    <el-row>
      <el-col>
        <el-col :span="7">
          <el-date-picker
            v-model="date"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions"
          />
        </el-col>
        <el-col :offset="1" :span="4">
          <span>学生: </span>
          <el-select
            v-model="query_form.student_name"
            filterable
            clearable
            placeholder="请选择"
            class="query-select"
          >
            <el-option
              v-for="item in student_list"
              :key="item.ID"
              :label="item.nick_name"
              :value="item.nick_name"
            />
          </el-select>
        </el-col>
        <el-col :span="4">
          <span>老师: </span>
          <el-select
            v-model="query_form.user_name"
            filterable
            clearable
            placeholder="请选择"
            class="query-select"
          >
            <el-option
              v-for="item in teacher_list"
              :key="item.ID"
              :label="item.nick_name"
              :value="item.nick_name"
            />
          </el-select>
        </el-col>
        <el-col :span="4">
          <span>状态: </span>
          <el-select
            v-model="query_form.status"
            filterable
            clearable
            placeholder="请选择"
            class="query-select"
          >
            <el-option
              v-for="item in status_option"
              :key="item.ID"
              :label="item.name"
              :value="item.ID"
            />
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-button
            type="primary"
            icon="el-icon-search"
            @click="queryRecord"
          >搜索</el-button>
        </el-col>
      </el-col>

      <el-col>
        <el-table
          v-loading="loading"
          :data="tableData"
          stripe
          height="500"
          style="width: 100%"
        >
          <el-table-column prop="nick_name" label="姓名" width="200" />
          <el-table-column prop="user_name" label="任课老师" width="200" />
          <el-table-column prop="created_at" label="日期" width="200">
            <template slot-scope="scope">
              {{ scope.row.created_at | transferTime }}
            </template>
          </el-table-column>
          <el-table-column prop="status" label="状态" width="200" sortable="">
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.status | colorFilter"
                disable-transitions
              >{{ scope.row.status | Status }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="handleEdit(scope.row)"
              >编辑</el-button>
              <el-button
                type="text"
                size="small"
                @click="handleDelete(scope.row)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          :current-page="query_form.page_num"
          :page-sizes="[20, 30, 50]"
          :page-size="query_form.page_size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />

        <el-dialog
          :title="title"
          :visible.sync="open"
          width="40%"
          :close-on-click-modal="false"
        >
          <el-form
            ref="form"
            label-position="right"
            :model="form"
            :rules="rules"
            label-width="120px"
          >
            <el-form
              ref="form"
              :model="form"
              :rules="rules"
              label-width="120px"
            >
              <el-form
                ref="form"
                :model="form"
                :rules="rules"
                label-width="120px"
              >
                <el-form-item label="打卡时间" prop="created_at">
                  <el-date-picker
                    v-model="form.created_at"
                    type="datetime"
                    placeholder="选择日期时间"
                  />
                </el-form-item>
              </el-form>
              <el-form-item label="任课老师" prop="user_name">
                <el-input
                  v-model="form.user_name"
                  style="width: 220px"
                  disabled
                />
              </el-form-item>
            </el-form>
            <el-form-item label="课程类型" prop="status">
              <el-select
                v-model="form.status"
                style="width: 220px"
                clearable
                placeholder="请选择"
              >
                <el-option label="缺席" :value="0" />
                <el-option label="个训" :value="1" />
                <el-option label="集体" :value="2" />
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submitForm">确 定</el-button>
            <el-button @click="cancel">取 消</el-button>
          </div>
        </el-dialog>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { typeFilter, statusFilter } from '@/utils'
import { listRecord, deleteRecord, updateRecord } from '@/api/record'
import { studentListAll } from '@/api/student'
import { userList } from '@/api/user'

import moment from 'moment'

export default {
  filters: {
    colorFilter(object) {
      const type = typeFilter(object)
      return type
    },
    transferTime(utcTime) {
      const time = moment(utcTime).format('YYYY-MM-DD HH:mm:ss')
      return time
    },

    Status(object) {
      const status = statusFilter(object)
      return status
    }
  },
  data() {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      date: '',
      query_form: {
        user_name: '',
        student_name: '',
        start_at: '',
        end_at: '',
        search: '',
        status: '',
        page_num: 1,
        page_size: 20
      },
      form: {
        id: '',
        created_at: '',
        student_id: '',
        user_name: '',
        nick_name: '',
        status: 0
      },
      total: 0,
      student_list: [],
      teacher_list: [],
      status_option: [
        {
          ID: 0,
          name: '缺席'
        },
        {
          ID: 1,
          name: '个训'
        },
        {
          ID: 2,
          name: '集体'
        },
        {
          ID: 3,
          name: '影子'
        },
        {
          ID: 4,
          name: '辅课'
        },
        {
          ID: 5,
          name: '衔接'
        }
      ],
      title: '',
      createdAt: '',
      open: false,
      tableData: [],
      loading: true,
      isDelete: false,
      isEdit: false,
      rules: {
        status: [
          { required: true, message: '课程类型不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    this.queryRecord()
    this.getStudentList()
    this.getUsertList()
  },
  methods: {
    queryRecord() {
      if (this.date == null) {
        this.reset()
      }
      if (this.date.length !== 0) {
        this.query_form.start_at = moment(this.date[0]).format(
          'YYYY-MM-DD HH:mm:ss'
        )
        this.query_form.end_at = moment(this.date[1]).endOf('day').format(
          'YYYY-MM-DD HH:mm:ss'
        )
      }

      this.query_form.search =
        this.query_form.user_name +
        this.query_form.student_name +
        '%' +
        this.query_form.status
      listRecord(this.query_form).then((res) => {
        this.tableData = res.data.data
        this.total = res.data.total
        this.loading = false
      })
    },
    submitForm() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          if (this.isEdit) {
            updateRecord(this.form).then((res) => {
              if (res.code == 200) {
                this.$message.success('更新成功')
                this.open = false
                this.queryRecord()
              }
            })
          }
        }
      })
    },
    getStudentList() {
      studentListAll({}).then((res) => {
        this.student_list = res.data
      })
    },
    getUsertList() {
      userList({}).then((res) => {
        this.teacher_list = res.data
      })
    },
    handleSizeChange: function(size) {
      this.query_form.page_size = size
      this.queryRecord()
    },
    handleCurrentChange: function(currentPage) {
      this.query_form.page_num = currentPage
      this.queryRecord()
    },

    handleDelete(row) {
      this.$confirm('确认移除记录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteRecord(row).then((res) => {
          if (res.code === 200) {
            this.$message.success('删除成功')
            this.queryRecord()
          }
        })
      })
    },
    handleEdit(row) {
      this.open = true
      this.isEdit = true
      this.title = row.nick_name

      this.form.created_at = row.created_at
      this.form.id = row.id
      this.form.student_id = row.student_id
      this.form.status = row.status
      this.form.nick_name = row.nick_name
      this.form.user_name = row.user_name
    },
    cancel() {
      this.open = false
    },
    reset() {
      this.date = ''
      this.query_form.start_at = ''
      this.query_form.end_at = ''
    }
  }
}
</script>
<style scoped>
.query-select {
  width: 100px;
}
</style>
