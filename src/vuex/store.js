import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

/*登录状态*/
function loginSessionStore (state) {
  window.sessionStorage.setItem("loginStore", JSON.stringify(state));
}

const loginStore = {
  isLogin: false, //初始默认为未登录
  LoginUser: {
    username: '',
    avatar: ''
  }
};

export default new Vuex.Store({
  state: {
    loginStore
  },
  mutations:{
    logged (state){
      state.loginStore.isLogin = true;
      loginSessionStore(state)
    },
    logout(state){
      state.loginStore.isLogin = false;
      loginSessionStore(state)
    }
  }
})
