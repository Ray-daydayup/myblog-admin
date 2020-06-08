<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
    :search="search"
    :loading="loading"
    loading-text="数据加载中……"
    class="elevation-1"
  >
    <template v-slot:item.state="{ item }">
      <v-chip :color="item.state === 1 ? 'green' : 'red darken-4'" dark>{{
        item.state | state
      }}</v-chip>
    </template>
    <template v-slot:item.permission="{ item }">
      <v-chip color="green" dark>{{ item.permission }}级</v-chip>
    </template>
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="搜索"
          single-line
          hide-details
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" outlined dark class="mb-2" v-on="on"
              >新增用户</v-btn
            >
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">新增用户</span>
            </v-card-title>
            <v-card-text>
              <v-form ref="form">
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.username"
                        label="用户名"
                        :rules="rules.username"
                        :error="usernameError.flag"
                        :error-messages="usernameError.msg"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        class="mt-4"
                        label="密码"
                        :rules="rules.password"
                        :type="pwdShow ? 'text' : 'password'"
                        :append-icon="pwdShow ? 'mdi-eye' : 'mdi-eye-off'"
                        @click:append="pwdShow = !pwdShow"
                        v-model="editedItem.password"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-form>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">取消</v-btn>
              <v-btn color="blue darken-1" text @click="save">保存</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon color="red darken-4" small @click="deleteItem(item)">
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="getUserList">未获取到数据，点击重试</v-btn>
    </template>
  </v-data-table>
</template>

<script>
import { getUserList, delUser, register } from '@/api/user'
export default {
  data() {
    return {
      dialog: false,
      loading: false,
      search: '',
      pwdShow: false,
      usernameError: {
        flag: false,
        msg: ''
      },
      rules: {
        username: [(value) => !!value || '用户名不能为空'],
        password: [(value) => !!value || '密码不能为空']
      },
      headers: [
        {
          text: '用户名',
          align: 'start',
          sortable: false,
          value: 'username'
        },
        { text: '帐号状态', value: 'state', sortable: false },
        { text: '权限', value: 'permission', sortable: false },
        { text: '操作', value: 'actions', sortable: false }
      ],
      desserts: [],
      editedItem: {
        username: '',
        password: ''
      },
      defaultItem: {
        username: '',
        password: ''
      }
    }
  },
  computed: {
    username() {
      return this.editedItem.username
    }
  },
  watch: {
    dialog(val) {
      val || this.close()
    },
    username: function() {
      this.usernameError.flag = false
      this.usernameError.msg = ''
    }
  },
  filters: {
    state: function(val) {
      if (val === 1) {
        return '正常'
      }
      return '禁用'
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    async getUserList() {
      this.loading = true
      const res = await getUserList()
      this.desserts = res.flag ? res.data : []
      this.loading = false
    },
    async deleteItem(item) {
      const id = item.id
      const callback = async (flag) => {
        if (flag) {
          const res = await delUser(id)
          if (res.flag) {
            this.$store.dispatch('popup/showSnackbar', [
              '用户删除成功！',
              'success'
            ])
            this.getUserList()
          }
        }
      }
      this.$store.dispatch('popup/showDialog', [
        `是否确定删除用户 -- ${item.username}?`,
        callback
      ])
    },
    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
      })
      this.$refs.form.resetValidation()
    },
    async save() {
      const res = await register(this.editedItem)
      if (res.rootResponse.code === 2005) {
        this.usernameError.flag = !res.flag
        this.usernameError.msg = res.rootResponse.msg
        return
      }
      if (!res.flag) {
        return
      }
      this.$refs.form.resetValidation()
      this.$store.dispatch('popup/showSnackbar', ['用户新增成功！', 'success'])
      this.getUserList()
      this.close()
    }
  }
}
</script>

<style></style>
