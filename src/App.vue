<template>
  <div id="app">
    <div class="login-wrapper" v-if="showFlag">
      <LoginLy></LoginLy>
    </div>
    <el-container v-if="!showFlag">
      <el-header>
        <header-ly>
        </header-ly>
      </el-header>
      <el-container>
        <el-aside width="200">
          <menu-ly></menu-ly>
        </el-aside>
        <el-container>
          <el-container>
            <el-header>Header</el-header>
            <el-main>Main</el-main>
          </el-container>
          <el-footer>
            深圳市茁壮网络股份有限公司 Version 2.0.1 IPANEL.TV INC.,ALL RIGHTS RESERVED
          </el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import HeaderLy from './components/header'
  import LoginLy from './components/login'
  import MenuLy from './components/menu'
export default {
  name: 'App',
  components: {
    LoginLy,
    HeaderLy,
    MenuLy
  },
  data() {
    return {
      showFlag: this.$store.state.loginStore.isLogin
    }
  },
  created() {
    sessionStorage.getItem("loginStore") && this.$store.replaceState(JSON.parse(sessionStorage.getItem("loginStore")));
    this.showFlag = this.$store.state.loginStore.isLogin;
  }
}
</script>
