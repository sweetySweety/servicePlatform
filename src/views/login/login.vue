<template>
  <div class="border">
    <div class="login-container">
      <div class="login-content">
        <a-row type="flex" justify="center">
          <a-col :span="11">
            <img class="login-img" src="../../assets/background-02.png">
          </a-col>
          <a-col :span="13" style="padding: 40px 70px 0 70px;">
            <img class="login-logo" src="../../assets/group.png">
            <a-form
              id="components-form-demo-normal-login"
              :form="form"
              class="login-form"
              @submit="handleSubmit"
            >
              <a-form-item>
                <a-input
                  v-decorator="[
          'userName',
          { rules: [{ required: true, message: '请输入用户名' }] },
        ]"
                  placeholder="请输入用户名"
                >
                  <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
                </a-input>
              </a-form-item>
              <a-form-item>
                <a-input
                  v-decorator="[
          'passWord',
          { rules: [{ required: true, message: '请输入密码' }] },
        ]"
                  type="password"
                  placeholder="请输入密码"
                >
                  <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
                </a-input>
              </a-form-item>
              <a-form-item>

                <div style="text-align: right">
                  <a>忘记密码</a>
                </div>
                <a-button style="width: 100%" type="primary" html-type="submit" class="login-form-button">
                  登录
                </a-button>

              </a-form-item>
            </a-form>
          </a-col>
        </a-row>
      </div>
    </div>
  </div>
</template>

<script>
  import md5 from 'js-md5'
  export default {
    name: 'login',
    data() {
      return{

      }
    },
    beforeCreate() {
      this.form = this.$form.createForm(this, { name: 'normal_login' });
    },
    methods: {
      handleSubmit(e) {
        e.preventDefault();
        this.form.validateFields((err, values) => {
          if (!err) {
            this.loginSumit(values)
          }
        });
      },
      loginSumit(val){
        let url = '/login/';
        let fd = new FormData()
        fd.append('username', val.userName)
        fd.append('password', md5(val.passWord))

        let response = () => {
          this.$router.push({path:'/home'})
        };

        this.$store.state.getUploadPost(url,fd,response)
      }
    },
  }
</script>

<style scoped>
  .border{
    width: 100%;
    height: 100%;
  }
  .login-container{
    width: 100%;
    height: 100%;
    background: url("../../assets/background-01.png") no-repeat center center;
    background-size: 100% 100%;
    padding: 150px 0 0 0;
    box-sizing: border-box;
  }
  .login-content{
    margin: 0 auto;
    width: 720px;
    background: #ffffff;
    border-radius: 10px;
    padding: 4px;
  }
  .login-img{
    width: 100%;
    border-radius: 4px;
  }
  .login-logo{
    margin: 0 0 20px 0;
  }
</style>
