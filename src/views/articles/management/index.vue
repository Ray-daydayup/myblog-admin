<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
    :search="search"
    :loading="loading"
    sort-by="modifiedtime"
    sort-desc
    loading-text="数据加载中……"
    class="elevation-1"
  >
    <template v-slot:item.tags="{ item }">
      <v-chip
        class="mr-2"
        color="green"
        v-for="tag in item.tags"
        :key="tag.tagId"
        small
        dark
      >
        {{ tag.name }}
      </v-chip>
    </template>
    <template v-slot:item.createtime="{ item }">
      {{ timeConvert(item.createtime) }}
    </template>
    <template v-slot:item.modifiedtime="{ item }">
      {{ timeConvert(item.modifiedtime) }}
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
        <v-btn
          color="primary"
          outlined
          dark
          class="mb-2"
          @click="$router.push('/articles/edit/-1')"
          >新增文章</v-btn
        >
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        @click="$router.push(`/articles/edit/${item.article_id}`)"
        class="mr-4"
      >
        mdi-pencil
      </v-icon>
      <v-icon color="red darken-4" small @click="deleteItem(item)">
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="getArticleList">未获取到数据，重试</v-btn>
    </template>
  </v-data-table>
</template>

<script>
import { getArticleList, delArticle } from '@/api/article'
import { timestampFormat } from '@/utils/time'
export default {
  data() {
    return {
      loading: false,
      search: '',
      headers: [
        { text: '标题', value: 'title', sortable: false },
        { text: '分类', value: 'category', sortable: false },
        {
          text: '标签',
          value: 'tags',
          sortable: false,
          filter: (val, search) => {
            return val.some(
              (item) => item.name.toLowerCase().indexOf(search) !== -1
            )
          }
        },
        { text: '创建时间', value: 'createtime' },
        { text: '修改时间', value: 'modifiedtime' },
        { text: '操作', value: 'actions', sortable: false }
      ],
      desserts: []
    }
  },
  computed: {
    timeConvert() {
      return timestampFormat
    }
  },
  created() {
    this.getArticleList()
  },

  methods: {
    async getArticleList() {
      this.loading = true
      const res = await getArticleList(1, 100)
      this.desserts = res.flag ? res.data : []
      this.loading = false
    },
    async deleteItem(item) {
      const id = item.article_id
      const callback = async (flag) => {
        if (flag) {
          const res = await delArticle(id)
          if (res.flag) {
            this.$store.dispatch('popup/showSnackbar', [
              '文章删除成功！',
              'success'
            ])
            this.getArticleList()
          }
        }
      }
      this.$store.dispatch('popup/showDialog', [
        `是否确定删除文章 >> ${item.title}?`,
        callback
      ])
    }
  }
}
</script>

<style></style>
