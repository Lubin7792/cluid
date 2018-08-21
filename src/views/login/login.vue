<style>
@import './login.css';
</style>
<template>
    <div class="main">
        <img src="../../images/logo.png" alt="" class="logo">
        <img src="../../images/computer.png" alt="" class="login-img">
        <Form ref="formInline" :model="formInline" class="login-form">
            <p class="login-p">THE VRTS备份软件</p>
            <FormItem prop="user">
                <Input type="text" v-model="formInline.user" placeholder="用户名" class="login-input" on-focus="colorChange">
                <!--  <Icon type="ios-person-outline" slot="prepend"></Icon> -->
                </Input>
            </FormItem>
            <FormItem prop="password">
                <Input type="password" v-model="formInline.password" placeholder="密码" class="login-input input1" on-focus="colorChange">
                <!-- <Icon type="ios-locked-outline" slot="prepend"></Icon> -->
                </Input>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit('formInline')" class="login-btn">登录</Button>
            </FormItem>
        </Form>
    </div>
</template>
<script>
import md5 from 'js-md5'
import axios from 'axios'
import ajax from '../../libs/util.js'
export default {
  data() {
    return {
      formInline: {
        user: '',
        password: ''
      },
      ruleInline: {
        user: [
          {
            required: true,
            message: 'Please fill in the user name',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: 'Please fill in the password.',
            trigger: 'blur'
          },
          {
            type: 'string',
            min: 6,
            message: 'The password length cannot be less than 6 bits',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    padDate: function(value) {
      return value < 10 ? '0' + value : value
    },
    handleSubmit() {
      var date = new Date()
      var year = date.getFullYear()
      var month = this.padDate(date.getMonth() + 1)
      var day = this.padDate(date.getDate())
      var hours = this.padDate(date.getHours())
      var minutes = this.padDate(date.getMinutes())
      var second = this.padDate(date.getSeconds())
      var now = year + month + day + hours + minutes + second
      var key = md5(this.formInline.user + this.formInline.password + now)
      axios({
        method: 'get',
        url:
          '/rest-ful/v3.0/login?uid=' +
          this.formInline.user +
          '&key=' +
          key +
          '&timestamp=' +
          now
      })
        .then(res => {
          if (res.data.code == 0) {
            this.$router.push('/navigation')
          } else {
            alert('用户名或密码错误')
          }
        })
        .catch(error => {
          // console.log(error);
        })
    }
  }
}
</script>
