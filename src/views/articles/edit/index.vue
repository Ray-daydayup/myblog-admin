<template>
  <v-form ref="form">
    <v-container fluid>
      <v-row align="end" justify="space-between">
        <v-col cols="12" sm="6">
          <v-btn
            color="primary"
            absolute
            right
            class="mr-2"
            @click="save"
            outlined
            dark
            >保存</v-btn
          >
          <h3>标题</h3>
          <v-text-field
            v-model="editArticle.title"
            prepend-icon="mdi-format-title"
            :rules="rules"
          ></v-text-field>
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
            v-model="editArticle.categoryid"
            :items="categories"
            :rules="rules"
            label="分类"
            prepend-icon="mdi-bookmark"
          ></v-select>
        </v-col>
        <v-col cols="12" sm="6">
          <v-select
            v-model="editArticle.tagsId"
            :items="tags"
            label="标签"
            prepend-icon="mdi-tag"
            :rules="rules"
            multiple
            chips
          ></v-select>
        </v-col>
      </v-row>
      <v-row align="center">
        <v-col cols="12" sm="6">
          <v-text-field
            type="datetime-local"
            v-model="createTime"
            prepend-icon="mdi-clock-time-two"
            label="创建时间"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            type="datetime-local"
            label="修改时间"
            prepend-icon="mdi-clock-time-seven"
            v-model="modifiedTime"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <h3>摘要</h3>
          <codemirror v-model="editArticle.abstract" :options="cmOptions" />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <h3>正文</h3>
          <codemirror v-model="editArticle.content" :options="cmOptions" />
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import { getArticleById, addArticle, updateArticle } from '@/api/article'
import { getCategories } from '@/api/categories'
import { getTagList } from '@/api/tags'
import { timestampFormat, toTimestamp } from '@/utils/time'
import { codemirror } from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/markdown/markdown.js'
export default {
  name: 'Edit',
  props: ['id'],
  components: {
    codemirror
  },
  data() {
    return {
      categories: [],
      tags: [],
      articleTitle: '',
      createTime: '',
      modifiedTime: '',
      rules: [(value) => (!!value && value.length !== 0) || '不能为空'],
      editArticle: {
        articleId: this.id * 1,
        title: '',
        abstract: '',
        content: '',
        createtime: Date.now(),
        modifiedtime: Date.now(),
        categoryid: 0,
        tagsId: [],
        state: 1
      },
      cmOptions: {
        tabSize: 2,
        mode: 'text/x-markdown',
        theme: 'default',
        lineNumbers: true,
        line: true,
        lineWrapping: true
      },
      reader: new FileReader()
    }
  },
  computed: {
    titleChangeFlag() {
      return this.articleTitle !== this.editArticle.title
    }
  },
  watch: {
    createTime(newValue) {
      this.editArticle.createtime = toTimestamp(newValue)
    },
    modifiedTime(newValue) {
      this.editArticle.modifiedtime = toTimestamp(newValue)
    }
  },
  created() {
    this.getCategories()
    this.getTagList()
    this.getArticleById(this.id)
  },
  methods: {
    async getArticleById(id) {
      if (id < 0) {
        this.createTime = timestampFormat(this.editArticle.createtime, 'T')
        this.modifiedTime = timestampFormat(this.editArticle.modifiedtime, 'T')
        return
      }
      const res = await getArticleById(id * 1)
      if (res.flag) {
        const article = res.data
        this.articleTitle = article.title
        this.editArticle.title = article.title
        this.editArticle.abstract = article.abstract
        this.editArticle.content = article.content
        this.editArticle.createtime = article.createtime
        this.editArticle.categoryid = article.category_id
        this.editArticle.tagsId = article.tags.map((item) => item.tagId)
      }
      this.createTime = timestampFormat(this.editArticle.createtime, 'T')
      this.modifiedTime = timestampFormat(this.editArticle.modifiedtime, 'T')
    },
    async getCategories() {
      const res = await getCategories()
      if (res.flag) {
        this.categories = res.data.map((item) => ({
          text: item.name,
          value: item.id
        }))
        return
      }
      this.categories = []
    },
    async getTagList() {
      const res = await getTagList()
      if (res.flag) {
        this.tags = res.data.map((item) => ({
          text: item.name,
          value: item.id
        }))
        return
      }
      this.tags = []
    },
    fileChange(e) {
      if (e) {
        this.reader.readAsText(e, 'utf-8')
        this.reader.onload = () => {
          this.editArticle.content = this.reader.result
        }
      }
    },
    async save() {
      if (!this.$refs.form.validate()) {
        return
      }
      if (this.editArticle.content === '' || this.editArticle.content === '') {
        this.$store.dispatch('popup/showSnackbar', [
          '摘要和正文不能为空！！！',
          'error'
        ])
        return
      }
      console.log(this.editArticle.createtime)
      if (this.editArticle.articleId < 0) {
        const res = await addArticle(this.editArticle)
        if (res.flag) {
          this.$store.dispatch('popup/showSnackbar', [
            '文章新增成功！',
            'success'
          ])
          this.articleTitle = this.editArticle.title
          this.editArticle.articleId = res.data.articleId
        }
        return
      }
      if (!this.titleChangeFlag) {
        delete this.editArticle.title
      }
      const res = await updateArticle(this.editArticle)
      if (res.flag) {
        this.$store.dispatch('popup/showSnackbar', [
          '文章修改成功！',
          'success'
        ])
      }
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
