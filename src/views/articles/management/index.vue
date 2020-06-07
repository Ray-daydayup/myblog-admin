<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
    :search="search"
    :loading="loading"
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
        <v-btn color="primary" outlined dark class="mb-2">新增文章</v-btn>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-4">
        mdi-pencil
      </v-icon>
      <v-icon color="red darken-4" small @click="deleteItem(item)">
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary">未获取到数据</v-btn>
    </template>
  </v-data-table>
</template>

<script>
import categoryApi from '@/api/categories'
import { getArticleList } from '@/api/article'
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
      return (timestamp) => {
        const dateTime = new Date(timestamp)
        const y = dateTime.getFullYear()
        let m = dateTime.getMonth() + 1
        m = m < 10 ? '0' + m : m
        let d = dateTime.getDate() + 1
        d = d < 10 ? '0' + d : d
        let h = dateTime.getHours() + 1
        h = h < 10 ? '0' + h : h
        let min = dateTime.getMinutes() + 1
        min = min < 10 ? '0' + min : min
        return y + '/' + m + '/' + d + ' ' + h + ':' + min
      }
    }
  },
  created() {
    this.getArticleList()
  },

  methods: {
    async getArticleList() {
      this.loading = true
      const res = await getArticleList(1, 10)
      this.desserts = res.flag ? res.data : []
      this.loading = false
    },
    async deleteItem(item) {
      const id = item.id
      const callback = async (flag) => {
        if (flag) {
          const res = await categoryApi.delCategory(id)
          if (res.flag) {
            this.$store.dispatch('popup/showSnackbar', [
              '分类删除成功！',
              'success'
            ])
            this.getCategories()
          }
        }
      }
      this.$store.dispatch('popup/showDialog', [
        `是否确定删除分类 -- ${item.name}?`,
        callback
      ])
    }
  }
}
</script>

<style></style>
