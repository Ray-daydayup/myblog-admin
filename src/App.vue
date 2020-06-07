<template>
  <v-app id="inspire">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </v-app>
</template>

<script>
export default {
  name: 'App'
}
</script>
