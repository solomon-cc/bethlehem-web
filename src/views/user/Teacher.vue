<template>
  <div class="app-container">
    <el-row>
      <el-col>
        <el-col :span="4" :push="20">
          <el-button type="primary" icon="el-icon-plus" @click="handleAdd"
            >新增康复师</el-button
          >
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
          <el-table-column prop="created_at" label="创建日期" width="200">
            <template slot-scope="scope">
              {{ scope.row.CreatedAt | transferTime }}
            </template>
          </el-table-column>
          <el-table-column prop="status" label="状态" width="200" sortable>
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.status | colorFilter"
                disable-transitions
                >{{ scope.row.status | Status }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="handleEdit(scope.row)"
                >编辑</el-button
              >
              <el-button
                type="text"
                size="small"
                @click="handleDelete(scope.row)"
                >删除</el-button
              >
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
                <el-form-item
                  v-show="isEdit"
                  label="创建时间"
                  prop="created_at"
                >
                  <span>{{ createdAt | transferTime }}</span>
                </el-form-item>
              </el-form>
              <el-form-item label="姓名" prop="ni_name">
                <el-input v-model="form.nick_name" style="width: 195px" />
              </el-form-item>
              <el-form-item label="用户名" prop="user_name">
                <el-input v-model="form.user_name" style="width: 195px" />
              </el-form-item>
              <el-form-item label="状态" prop="status">
                <el-select
                  v-model="form.status"
                  placeholder="状态"
                  style="width: 195px"
                >
                  <el-option label="在职" value="1" />
                  <el-option label="离职" value="0" />
                </el-select>
              </el-form-item>
            </el-form>
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
import { typeFilter } from "@/utils";
import { userList } from "@/api/user";

import moment from "moment";

export default {
  filters: {
    colorFilter(object) {
      const type = typeFilter(object);
      return type;
    },
    transferTime(utcTime) {
      const time = moment(utcTime).local().format("YYYY-MM-DD HH:mm:ss");

      return time;
    },

    Status(object) {
      let status = "";
      if (object == 1) {
        status = "在职";
      } else if (object == 0) {
        status = "离职";
      }
      return status;
    },
  },
  data() {
    return {
      date: "",
      form: {
        id: undefined,
        user_name: "",
        nick_name: "",
        status: 0,
      },
      query_form: {
        page_num: 1,
        page_size: 20,
      },
      createdAt: "",
      total: 0,
      title: "",
      open: false,
      tableData: [],
      loading: true,
      isDelete: false,
      isEdit: false,
      rules: {
        nick_name: [
          { required: true, message: "姓名不能为空", trigger: "blur" },
        ],
        user_name: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
        ],
        avatar: [{ required: true, message: "头像不能为空", trigger: "blur" }],
      },
    };
  },
  mounted() {
    this.getUserList();
  },
  methods: {
    getUserList() {
      userList(this.query_form).then((res) => {
        this.tableData = res.data;
        this.total = res.total;
        this.loading = false;
      });
    },
    submitForm() {
      this.$refs["form"].validate((valid) => {
        // if (valid) {
        //   if (this.isEdit) {
        //     updateStudent(this.form).then((res) => {
        //       if (res.code == 200) {
        //         this.$message.success("更新成功");
        //         this.open = false;
        //         this.getStudentList();
        //       }
        //     });
        //   } else {
        //     this.form.status = "1";
        //     createStudent(this.form).then((res) => {
        //       if (res.code === 200) {
        //         this.$message.success("新增成功");
        //         this.open = false;
        //         this.getStudentList();
        //       }
        //     });
        //   }
        // }
      });
    },

    handleAdd() {
      this.reset();
      this.open = true;
      this.isEdit = false;
    },
    handleSizeChange: function (size) {
      this.query_form.page_size = size;
      this.getStudentList();
    },
    handleCurrentChange: function (currentPage) {
      this.query_form.page_num = currentPage;
      this.getStudentList();
    },
    handleDelete(row) {
      this.$confirm("确认移除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        // deleteStudent(row).then((res) => {
        //   if (res.code === 200) {
        //     this.$message.success("删除成功");
        //     this.getStudentList();
        //   }
        // });
      });
    },
    handleEdit(row) {
      this.open = true;
      this.isEdit = true;
      this.title = row.Nickname;
      this.createdAt = row.CreatedAt;

      this.form.id = row.ID;
      this.form.status = row.Status;
      this.form.nickname = row.Nickname;
      this.form.user_name = row.UserName;
    },
    cancel() {
      this.open = false;
    },
    reset() {
      this.form = {
        id: undefined,
        user_name: "",
        nickname: "",
        status: 0,
        avatar: "",
      };
    },
  },
};
</script>
<style scoped>
.query-select {
  width: 100px;
}
</style>
