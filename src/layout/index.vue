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
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import menuList from './components/menuList'
import headBar from './components/headBar'
export default {
  components: {
    menuList,
    headBar
  },
  props: {
    source: String
  },
  data: () => ({
    drawer: null
  }),
  watch: {
    drawer(newVal, oldVal) {
      // this.$emit('update:drawer', newVal)
      console.log('outer', newVal, oldVal)
    }
  },
  mounted() {
    console.log(this.$vuetify)
  }
}
</script>

<style></style>
