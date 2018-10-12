<template>
  <el-row>
    <!-- 左边logo -->
    <el-col :span="3" class="logo">
      <img @click="toHome" src="../assets/logo.png" alt="">
    </el-col>

    <!-- 中间导航区域 -->
    <el-col class="main" :span="16">
      <el-menu
        :default-active="$route.path"
        class="menu"
        router
        mode="horizontal"
        @select="handleSelect"
        active-text-color="#000">
        <!-- 循环写的路由，其中路由中有  hidden：true 的就不加入循环 -->
        <template
          v-for="route in $router.options.routes"
          v-if="!route.hidden && route.path.indexOf('/header/') === 0">

          <!-- 循环没有children的路由 -->
          <el-menu-item
            v-if="!route.hasChild"
            :key="route.path"
            :index="route.path">
            <i :class="route.class"></i>
            {{ route.name }}
          </el-menu-item>

          <!-- 循环有children的路由 -->
          <el-submenu v-else :index="route.path">
            <template slot="title">{{ route.name }}</template>
            <el-menu-item
              v-for="child in route.children"
              :index="child.path"
              :key="child.path">
              <i :class="child.class"></i>
              {{ child.name }}
            </el-menu-item>
          </el-submenu>

        </template>
      </el-menu>
    </el-col>

    <!-- 右边用户信息以及登陆注册 -->
    <el-col :span="5" class="user">
      <!-- 根据logined值的真假来判断是显示登录按钮还是用户信息
      以后根据登录状态来改变 -->
      <el-dropdown>
        <img class="avatar" src="../assets/cjy.jpg" alt="">
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>ChenJiayi</el-dropdown-item>
          <el-dropdown-item>我的工作台</el-dropdown-item>
          <el-dropdown-item @click.native="logout" divided>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-row>
</template>
<script>
  export default {
    // ...
    data() {
      return {
        logined: false
      }
    },
    methods: {
      handleSelect() {
        console.log()
      },
      toHome() {
        this.$router.push('/');
        console.log('home')
      },
      logout() {
        //设置前端为下线状态
        this.$store.commit('logout');
        window.location.reload();
      }
    }
  }
</script>
<style scoped>

  .logo {
    text-align: center;
  }

  .logo img {
    width: 60px;
    height: 60px;
    cursor: pointer;
  }

  .button {
    margin: 15px 0;
  }

  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 20px;
    margin: 10px 0;
    cursor: pointer;
  }
</style>
