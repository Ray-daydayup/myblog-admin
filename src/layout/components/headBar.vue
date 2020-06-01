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
    <v-btn icon large>
      <v-icon>mdi-account-arrow-right</v-icon>
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
  }
}
</script>
