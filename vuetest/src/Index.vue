<template>
    <div>
        <el-container style="height: 500px; border: 1px solid #eee">
      <el-header style="text-align: right; font-size: 12px">
        <!--  @command="handleCommand" 下拉菜单单机事件 -->
        <el-dropdown  @command="handleCommand">
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="/show">查询</el-dropdown-item>
            <el-dropdown-item command="/add">添加</el-dropdown-item>
            <el-dropdown-item>删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>Admin</span>
      </el-header>

      <el-container>
        <el-aside width="200px" style="background-color: rgb(255, 255, 255)">
          <el-menu router :default-openeds="['0','1']">
            <el-submenu v-for="(item,index) in $router.options.routes" :key="item.name" :index="index+''">
                <template slot="title"  ><i class="el-icon-menu"></i>{{item.name}}</template>
                <el-menu-item v-for="item2 in item.children" :key="item2.name" :index="item2.path" :class="$route.path==item2.path?'is-active':'is-active:false'"  v-if="item2.show">{{item2.name}}</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>

        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
    </div>
</template>

<style>
.el-header {
  background-color: #a4d3ee;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>

<script>
export default {
  methods:{
    handleCommand(command) {
        this.$router.push(command)
      }
  }
}
</script>