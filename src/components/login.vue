<template>
  <el-main>
    <el-form
      :model="LoginForm"
      ref="LoginForm"
      :rules="rule"
      label-width="0"
      class="login-form">
      <h3>用户登录</h3>
      <el-form-item prop="username">
        <el-input
          type="text"
          v-model="LoginForm.username"
          placeholder="username">
        </el-input>
      </el-form-item>

      <el-form-item prop="password">
        <el-input
          type="password"
          v-model="LoginForm.password"
          placeholder="password">
        </el-input>
      </el-form-item>

      <el-form-item>
        <el-button
          type="danger"
          class="submitBtn"
          round
          @click.native.prevent="submit"
          :loading="logining">
          登录
        </el-button>
        <el-button
          type="primary"
          class="resetBtn"
          round
          @click.native.prevent="reset">
          重置
        </el-button>
        <p>还没有账号？马上去<span class="to" @click="toReg">注册</span></p>
      </el-form-item>
    </el-form>
  </el-main>
</template>

<script>
  import {LoginUser} from "../api/api";

  export default {
    name: "login",
    data() {
      return {
        LoginForm: {
          username: '',
          password: ''
        },
        logining: false,
        rule: {
          username: [
            {
              required: true,
              max: 14,
              min: 2,
              message: '请填写用户名,长度2-14位',
              trigger: 'blur'
            }
          ],
          password: [
            {
              required: true,
              message: '请填写密码',
              trigger: 'blur'
            }
          ]
        }
      }
    },
    methods: {
      submit() {
        this.$refs.LoginForm.validate(valid => {
          if (valid) {
            this.logining = true;
            console.log('开始请求后台数据...');
            let LoginJson = {
              username: this.LoginForm.username,
              password: this.LoginForm.password};

            LoginUser(LoginJson).then(res => {
              this.logining = false;
              if (res.data.code !== 0) {
                this.$message({
                  type: 'error',
                  message: '登录失败' + res.data.msg
                });
                this.$refs.LoginForm.resetFields()
              } else {
                this.$message({
                  type: 'success',
                  message: '登录成功'
                });
                //设置前端为登录状态
                this.$store.commit('logged');
                window.location.reload();
              }
            }).catch(err => {
              this.logining = false;
              this.$message({
                type: 'error',
                message: '登录失败' + err
              })
            })
          }
        })
      },
      reset() {
        this.$refs.LoginForm.resetFields()
      },
      toReg() {
        this.$emit('changeToReg')
      }
    }
  }
</script>

<style scoped>
  .login-form {
    margin: 20px auto;
    width: 320px;
    background: #fff;
    box-shadow: 0 0 35px #B4BCCC;
    padding: 30px 30px 0 30px;
    border-radius: 25px;
  }

  .submitBtn {
    width: 65%;
  }

  .to {
    color: #67C23A;
    cursor: pointer;
  }

  #menu li{
    display:block; /* 将链接设为块级元素 */
    padding:8px 50px; /* 设置内边距 */
    background:#e91e63; /* 设置背景色 */
    color:#f2f2f2; /* 设置文字颜色 */
    text-decoration:none; /* 去掉下划线 */
    border-right:1px solid #f2f2f2; /* 在左侧加上分隔线 */
    float:left; /* 往左浮动 */
  }
</style>

