<template>
  <div style="margin: auto; position: absolute">
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm.username"></el-input>
      </el-form-item>
      <el-form-item label="原密码" prop="password">
        <el-input
          type="password"
          v-model="ruleForm.password"
          autocomplete="off"
          show-password
          readonly
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input
          type="password"
          v-model="ruleForm.pass"
          autocomplete="off"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input
          type="password"
          v-model="ruleForm.checkPass"
          autocomplete="off"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >修改</el-button
        >
        <el-button @click="resetForm('ruleForm')">还原</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Edit",
  data() {
    var checkUsername = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("用户名不能为空"));
      }
      callback();
    };
    var validatePass = (rule, value, callback) => {
      if (value === "" || value == undefined) {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "" || value == undefined) {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        id: "",
        username: "",
        password: "",
        pass: "",
        checkPass: "",
      },
      rules: {
        username: [
          { min: 1, max: 10, message: "长度在1到10个字符", trigger: "blur" },
          { required: true, validator: checkUsername, trigger: "blur" },
        ],
        password: [
          { required: true, trigger: "blur" },
        ],
        pass: [
          { min: 1, max: 20, message: "长度在1到20个字符", trigger: "blur" },
          { required: true, validator: validatePass, trigger: "blur" },
        ],
        checkPass: [
          { required: true, validator: validatePass2, trigger: "blur" },
        ],
      },
    };
  },
  mounted() {
    axios
      .get("/selectById/" + this.$route.query.id)
      .then((response) => (this.ruleForm = response.data));
  },
  methods: {
    submitForm(formName) {
      const _this = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let data = {
            id: this.ruleForm.id,
            username: this.ruleForm.username,
            password: this.ruleForm.pass,
          };
          axios.put("/updateById", data).then(function (response) {
            if (response.data == "success") {
              _this.$message({
                message: "修改成功",
                type: "success",
              });
              _this.$router.push("/show");
            }
          });
        } else {
          this.$message.error("修改失败");
          return false;
        }
      });
    },
    resetForm(formName) {
    this.$refs[formName].resetFields();
      axios
        .get("/selectById/" + this.$route.query.id)
        .then((response) => (this.ruleForm = response.data));
    },
  },
};
</script>
