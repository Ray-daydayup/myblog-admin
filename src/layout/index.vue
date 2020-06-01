<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      color="blue-grey lighten-2"
      dark
      app
      floating
      :mini-variant="$vuetify.breakpoint.lgAndUp"
    >
      <menu-list></menu-list>
    </v-navigation-drawer>
    <head-bar :drawer.sync="drawer"></head-bar>
    <v-content>
      <breadcrumb></breadcrumb>
      <router-view class="content"></router-view>
    </v-content>
  </v-app>
</template>

<script>
import menuList from './components/menuList'
import headBar from './components/headBar'
import breadcrumb from './components/breadcrumb'
export default {
  components: {
    menuList,
    headBar,
    breadcrumb
  },
  props: {
    source: String
  },
  data: () => ({
    drawer: null
  })
}
</script>

<style scoped>
.content {
  padding: 0 24px;
}
</style>
