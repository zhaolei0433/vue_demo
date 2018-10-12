import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


function storeSessionStore (state) {
  window.sessionStorage.setItem("loginStore", JSON.stringify(state));
}


/*登录状态*/
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
      storeSessionStore(state)
    },
    logout(state){
      state.loginStore.isLogin = false;
      storeSessionStore(state)
    }
  }
})
