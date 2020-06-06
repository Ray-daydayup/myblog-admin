<template>
  <v-dialog v-model="user.isShow" persistent max-width="500">
    <v-card class="elevation-12">
      <v-toolbar dark flat>
        <v-toolbar-title>{{ user.title }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <!-- <v-btn icon large @click="hideLogin">
          <v-icon>mdi-close</v-icon>
        </v-btn> -->
      </v-toolbar>
      <v-card-text class="mt-4">
        <v-form ref="form">
          <v-text-field
            ref="username"
            label="用户名"
            name="login"
            prepend-icon="mdi-account"
            type="text"
            v-model="username"
            :rules="rules.username"
            :error="usernameError.flag"
            :error-messages="usernameError.msg"
            clearable
          ></v-text-field>

          <v-text-field
            ref="password"
            class="mt-4"
            label="密码"
            name="password"
            prepend-icon="mdi-lock"
            :rules="rules.password"
            :type="pwdShow ? 'text' : 'password'"
            :append-icon="pwdShow ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="pwdShow = !pwdShow"
            :error="passwordError.flag"
            :error-messages="passwordError.msg"
            v-model="password"
            clearable
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="submit" dark>登录</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'loginDialog',
  data() {
    return {
      username: '',
      password: '',
      pwdShow: false,
      usernameError: {
        flag: false,
        msg: ''
      },
      passwordError: {
        flag: false,
        msg: ''
      },
      rules: {
        username: [(value) => !!value || '用户名不能为空'],
        password: [(value) => !!value || '密码不能为空']
      }
    }
  },
  computed: {
    ...mapState({
      user: (state) => state.user
    })
  },
  watch: {
    username: function() {
      this.usernameError.flag = false
      this.usernameError.msg = ''
    },
    password: function() {
      this.passwordError.flag = false
      this.passwordError.msg = ''
    }
  },
  methods: {
    ...mapActions('user', ['showLogin', 'hideLogin', 'login']),
    async submit() {
      const flag = this.$refs.form.validate()
      if (!flag) {
        return
      }
      const data = {
        username: this.username.trim(),
        password: this.password.trim()
      }
      const res = await this.login(data)
      if (res.rootResponse.code === 2004) {
        this.usernameError.flag = !res.flag
        this.usernameError.msg = res.rootResponse.msg
        return
      }
      if (res.rootResponse.code === 2007) {
        this.passwordError.flag = !res.flag
        this.passwordError.msg = res.rootResponse.msg
        return
      }
      this.$refs.form.resetValidation()
      this.$refs.form.reset()
    }
  }
}
</script>

<style></style>
