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
          <el-main>
            <router-view/>
          </el-main>
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
  methods: {
    WebSocketTest() {
      if ("WebSocket" in window) {
        this.$message({
          type: 'success',
          message: '您的浏览器支持 WebSocket!'
        });
        // 打开一个 web socket
        let ws = new WebSocket("ws://localhost:8080/webSocket");
        /*//连接成功时调用
        ws.onopen = function()
        {
           // Web Socket 已连接上，使用 send() 方法发送数据
           ws.send("发送数据");
           alert("数据发送中...");
        };*/
        ws.onmessage = function (evt) {
          let received_msg = evt.data;
          console.log(received_msg);
        };
        ws.onclose = function () {
          // 关闭 websocket

        };
      } else {
        // 浏览器不支持 WebSocket
        this.$message({
          type: 'error',
          message: '您的浏览器不支持 WebSocket!'
        });
      }
    },
  },
  created() {
    sessionStorage.getItem("loginStore") && this.$store.replaceState(JSON.parse(sessionStorage.getItem("loginStore")));
    this.showFlag = this.$store.state.loginStore.isLogin;
   // this.WebSocketTest();
  }
}
</script>
