<template>
  <v-breadcrumbs :items="items"></v-breadcrumbs>
</template>

<script>
export default {
  data() {
    return {
      items: []
    }
  },
  watch: {
    $route(newVal) {
      this.setBreadcrumb(newVal.matched)
    }
  },
  mounted() {
    this.setBreadcrumb(this.$route.matched)
  },
  methods: {
    setBreadcrumb(matched) {
      matched = matched.filter((item) => item.meta.name)
      const items = matched.map((item) => ({
        text: item.meta.name,
        exact: true,
        to: item.redirect || item.path
      }))
      this.items = items
    }
  }
}
</script>

<style></style>
