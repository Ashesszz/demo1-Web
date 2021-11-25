<template>
  <div>
    <!--前端分页 user.slice((currentPage-1)*pageSize,currentPage*pageSize) -->
    <el-table :data="user" border style="width: 100%">
      <el-table-column prop="id" label="id"> </el-table-column>
      <el-table-column prop="username" label="用户名"> </el-table-column>
      <el-table-column prop="password" label="密码"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            ><i class="el-icon-edit"></i
          ></el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            ><i class="el-icon-delete"></i
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="current"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Show",
  data() {
    return {
      user: [
        {
          id: "",
          username: "",
          password: "",
        },
      ],
      current: 1, // 当前页码
      total: 0, // 总条数
      size: 5, // 每页的数据条数
    };
  },
  mounted() {
    axios
      .get("/findAll/" + this.current + "/" + this.size)
      .then(
        (response) => (
          (this.user = response.data.records),
          (this.total = response.data.total),
          (this.size = response.data.size)
        )
      );
  },
  methods: {
    //每页条数改变时触发 选择一页显示多少行
    handleSizeChange(val) {
      this.current = 1;
      this.size = val;
      axios
        .get("/findAll/" + this.current + "/" + this.size)
        .then(
          (response) => (
            (this.user = response.data.records),
            (this.total = response.data.total),
            (this.size = response.data.size)
          )
        );
    },
    //当前页改变时触发 跳转其他页
    handleCurrentChange(val) {
      //console.log(`当前页: ${val}`);
      this.current = val;
      axios
        .get("/findAll/" + this.current + "/" + this.size)
        .then(
          (response) => (
            (this.user = response.data.records),
            (this.total = response.data.total),
            (this.size = response.data.size)
          )
        );
    },
    //index 表格下标从0开始,row 当前行的所有数据
    handleEdit(index, row) {
      //页面路由跳转
      this.$router.push({
        path: "/edit",
        //query内为传递参数
        query: {
          id: row.id,
        },
      });
    },
    handleDelete(index, row) {
      const _this = this;
      axios.delete("/deleteById/" + row.id).then(function (response) {
        if (response.data == "success") {
          _this.$message({
            message: "删除成功",
            type: "success",
          });
          axios
            .get("/findAll/" + _this.current + "/" + _this.size)
            .then(function (response) {
              axios
                .get("/findAll/" + _this.current + "/" + _this.size)
                .then(
                  (resp1) => (
                    (_this.user = resp1.data.records),
                    (_this.total = resp1.data.total),
                    (_this.size = resp1.data.size)
                  )
                );
            });
        } else {
          this.$message.error("删除失败");
        }
      });
    },
  },
};
</script>