<template>
    <div class="login-container">
        <!-- 卡片 -->
        <el-card class="login_box">
            <img src="../assets/images/logo_index.png" alt="">
            <!-- 表单组件 ref="form"：获取dom :model='form'：绑定表单格式是对象-->
            <el-form ref="loginForm" status-icon :model="loginForm" :rules="loginRules">
                <!-- 表单项组件 -->
                <el-form-item prop="mobile">
                    <!-- 表单元素 v-model="form.name"双向数据绑定-->
                    <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
                </el-form-item>
                <el-form-item prop="code">
                    <el-input placeholder="请输入验证码" style="width:280px" v-model="loginForm.code"></el-input>
                    <el-button style="float:right">发送验证码</el-button>
                </el-form-item>
                <el-form-item>
                    <el-checkbox v-model="checked"></el-checkbox>  我以阅读并同意<el-link type="primary" :underline="false">用户协议</el-link>和<el-link type="primary" :underline="false">隐私条款</el-link>
                </el-form-item>
                <el-form-item>
                    <!-- 提交按钮 -->
                    <el-button type="primary" @click="login()" style="width:100%">登录</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>

</template>

<script>
export default {
  data () {
    // 校验手机号
    const checkMobile = (rule, value, callback) => {
      if (/^1[3-9]\d{9}$/.test(value)) {
        callback()
      } else {
        callback(new Error('手机号格式不对'))
      }
    }
    return {
      // 表单对象
      loginForm: {
        mobile: '17361571377',
        code: '246810'
      },
      // 表单校验规则
      loginRules: {
        mobile: [
          { required: true, message: '手机号必填', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '验证码必填', trigger: 'blur' },
          { len: 6, message: '必须是六位', trigger: 'blur' }
        ]
      },
      checked: true

    }
  },
  methods: {
    login () {
      // 整体表单校验
      this.$refs.loginForm.validator((valid) => {
        if (valid) {
          // 校验成功，登录
          this.$ajax
            .post('http://ttapi.research.itcast.cn/mp/v1_0/authorizations', this.loginForm)
            .then(res => {
              // res 是响应对象  包含响应数据
              const data = res.data
              // 后台的返回的json内容  已经转换成了对象
              console.log(data)
              // 登录成功后 跳转到首页，保存登录状态
              this.$router.push('/')
            })
            .catch(() => {
              // 提示错误  使用组件  消息提示组件
              this.$message.error('用户名或密码错误')
            })
        }
      })
    }
  }
}
</script>

<style lang='less'>
.login-container {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: url('../assets/images/loginbg.jpg') no-repeat center / cover;
  .login_box{
    width: 450px;
    height: 350px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    img{
      display: block;
      width: 200px;
      margin: 0 auto 30px;
    }
  }
  .el-checkbox{
      margin-right: 10px;
  }
}
</style>
