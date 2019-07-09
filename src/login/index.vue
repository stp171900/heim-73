<template>
    <div class="login-container">
        <!-- 卡片 -->
        <el-card class="login_box">
            <img src="../assets/images/logo_index.png" alt="">
            <!-- 表单组件 ref="form"：获取dom :model='form'：绑定表单格式是对象-->
            <el-form>
                <!-- 表单项组件 -->
                <el-form-item>
                    <!-- 表单元素 v-model="form.name"双向数据绑定-->
                    <el-input placeholder="请输入手机号"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input placeholder="请输入验证码" style="width:280px"></el-input>
                    <el-button style="float:right">发送验证码</el-button>
                </el-form-item>
                <el-form-item>
                    <el-checkbox v-model="checked"></el-checkbox>  我以阅读并同意<el-link type="primary" :underline="false">用户协议</el-link>和<el-link type="primary" :underline="false">隐私条款</el-link>
                </el-form-item>
                <el-form-item>
                    <!-- 提交按钮 -->
                    <el-button type="primary" @click="onSubmit" style="width:100%">登录</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>

</template>

<script>
export default {
  data () {
    return {
      checked: true,
      form: {
        name: ''

      }
    }
  },
  methods: {
    onSubmit () {
      console.log('sub')
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
  background-image: url(../assets/images/s1.jpg);
  background: no-repeat center / cover;
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
