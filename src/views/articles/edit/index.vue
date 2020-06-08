<template>
  <v-container fluid>
    <v-row align="end">
      <v-col cols="12" sm="6">
        <h3>标题</h3>
        <v-text-field v-model="article.title"></v-text-field>
      </v-col>
      <v-col v-if="id === '0'" cols="12" sm="6">
        <v-file-input
          chips
          label="从本地上传"
          @change="fileChange"
        ></v-file-input>
      </v-col>
    </v-row>
    <v-row align="center">
      <v-col cols="12" sm="6">
        <v-select
          v-model="article.category_id"
          :items="categories"
          label="分类"
          prepend-icon="mdi-bookmark"
        ></v-select>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="12" sm="6">
        <v-select
          :items="tags"
          label="标签"
          prepend-icon="mdi-tag"
          multiple
          chips
        ></v-select>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <h3>摘要</h3>
        <codemirror v-model="article.abstract" :options="cmOptions" />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <h3>正文</h3>
        <codemirror v-model="article.content" :options="cmOptions" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { getArticleById } from '@/api/article'
import { getCategories } from '@/api/categories'
import { getTagList } from '@/api/tags'
import { codemirror } from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/markdown/markdown.js'
export default {
  props: ['id'],
  components: {
    codemirror
  },
  data() {
    return {
      categories: [],
      tags: [],
      article: {},
      defaultArticle: {
        abstract: '',
        category_id: 1,
        content: '',
        createtime: 0,
        modifiedtime: 0,
        tags: [],
        title: ''
      },
      cmOptions: {
        tabSize: 2,
        mode: 'text/x-markdown',
        theme: 'default',
        lineNumbers: true,
        line: true,
        lineWrapping: true
      }
    }
  },
  watch: {
    id: {
      immediate: true,
      handler(newVal) {
        if (newVal === '0') {
          this.article = {}
          return
        }
        this.getArticleById(newVal)
      }
    }
  },
  created() {
    getCategories().then((res) => {
      if (res.flag) {
        this.categories = res.data.map((item) => ({
          text: item.name,
          value: item.id
        }))
        return
      }
      this.categories = []
    })
    getTagList().then((res) => {
      if (res.flag) {
        this.tags = res.data.map((item) => ({
          text: item.name,
          value: item.id
        }))
        return
      }
      this.tags = []
    })
  },
  methods: {
    async getArticleById(id) {
      getArticleById(id * 1).then((res) => {
        console.log(res)
        this.article = res.data
      })
    },
    fileChange(e) {
      console.log(e)
    }
  }
}
</script>

<style>
.vue-codemirror {
  margin: 10px 0;
  border-radius: 10px;
  box-shadow: 0 5px 6px -3px rgba(0, 0, 0, 0.2),
    0 9px 12px 1px rgba(0, 0, 0, 0.14), 0 3px 16px 2px rgba(0, 0, 0, 0.12) !important;
}
</style>
