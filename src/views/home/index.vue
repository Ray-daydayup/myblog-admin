<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="6">
        <v-card>
          <v-card-text class="text--primary">
            <h2 class="mb-2">文章数：{{ count.articleCount }}</h2>
            <h2 class="mb-2">分类数：{{ count.tagCount }}</h2>
            <h2 class="mb-2">标签数：{{ count.categoryCount }}</h2>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { getCount } from '@/api/article'
export default {
  name: 'Home',
  data() {
    return {
      count: {}
    }
  },
  created() {
    getCount().then((res) => {
      if (!res.flag) {
        return
      }
      this.count = res.data
    })
  }
}
</script>

<style></style>
