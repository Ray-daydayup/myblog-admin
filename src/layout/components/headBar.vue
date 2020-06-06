<template>
  <v-app-bar
    :clipped-left="$vuetify.breakpoint.lgAndUp"
    color="blue-grey lighten-2"
    app
    dark
  >
    <v-app-bar-nav-icon
      @click.stop="$emit('update:drawer', !drawer)"
    ></v-app-bar-nav-icon>
    <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
      <span class="hidden-sm-and-down">Ray's Blog Admin</span>
    </v-toolbar-title>
    <v-text-field
      flat
      solo-inverted
      hide-details
      prepend-inner-icon="mdi-magnify"
      label="搜索"
      class="hidden-sm-and-down"
    ></v-text-field>
    <v-spacer></v-spacer>
    <v-btn icon large @click="$router.push('/articles/edit')">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <v-btn text large @click="userClick">
      <span>{{ username }}</span>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: 'HeadBar',
  props: {
    drawer: {
      type: Boolean,
      default: null
    }
  },
  computed: {
    username: function() {
      if (this.$store.state.user.info) {
        return this.$store.state.user.info.username
      }
      return '未登录'
    }
  },
  methods: {
    userClick() {
      if (this.username === '未登录') {
        this.$store.dispatch('user/showLogin')
        return
      }
      this.loginOut()
    },
    loginOut() {
      const callback = async (flag) => {
        if (flag) {
          this.$store.dispatch('user/loginOut')
        }
      }
      this.$store.dispatch('popup/showDialog', ['是否确定退出登录？', callback])
    }
  }
}
</script>
