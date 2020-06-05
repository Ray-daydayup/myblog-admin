<template>
  <v-dialog v-model="user.isShow" persistent max-width="500">
    <v-card class="elevation-12">
      <v-toolbar dark flat>
        <v-toolbar-title>{{ user.title }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon large @click="hideLogin">
          <v-icon>mdi-close</v-icon>
        </v-btn>
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
        username: [
          (value) => !!value || '用户名不能为空',
          () => !this.usernameError.flag || this.usernameError.msg
        ],
        password: [
          (value) => !!value || '密码不能为空',
          () => !this.passwordError.flag || this.passwordError.msg
        ]
      }
    }
  },
  computed: {
    ...mapState({
      user: (state) => state.user
    })
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
      if (res) {
        this.$refs.form.resetValidation()
        this.$refs.form.reset()
      }
    }
  }
}
</script>

<style></style>
