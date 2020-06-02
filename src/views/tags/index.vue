<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
    :search="search"
    :loading="loading"
    loading-text="数据加载中……"
    class="elevation-1"
  >
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
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" outlined dark class="mb-2" v-on="on"
              >新增标签</v-btn
            >
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="editedItem.name"
                      label="标签名"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-textarea
                      label="描述"
                      v-model="editedItem.description"
                      rows="1"
                      auto-grow
                    ></v-textarea>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">取消</v-btn>
              <v-btn color="blue darken-1" text @click="save">保存</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-4" @click="editItem(item)">
        mdi-pencil
      </v-icon>
      <v-icon color="red darken-4" small @click="deleteItem(item.id)">
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary">Reset</v-btn>
    </template>
  </v-data-table>
</template>

<script>
import tagApi from '@/api/tags'
export default {
  data() {
    return {
      dialog: false,
      loading: false,
      search: '',
      headers: [
        {
          text: '标签名',
          align: 'start',
          sortable: false,
          value: 'name'
        },
        { text: '描述', value: 'description', sortable: false },
        { text: '操作', value: 'actions', sortable: false }
      ],
      desserts: [],
      editedIndex: -1,
      editedName: '',
      editedItem: {
        name: '',
        description: ''
      },
      defaultItem: {
        name: '',
        description: ''
      }
    }
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? '新增标签' : '编辑标签'
    },
    nameChangeFlag() {
      return this.editedName !== this.editedItem.name
    }
  },

  watch: {
    dialog(val) {
      val || this.close()
    }
  },
  created() {
    this.getTagList()
  },

  methods: {
    async getTagList() {
      this.loading = true
      const res = await tagApi.getTagList()
      this.desserts = res || []
      this.loading = false
    },
    editItem(item) {
      this.editedIndex = item.id
      this.editedItem = Object.assign({}, item)
      this.editedName = this.editedItem.name
      this.dialog = true
    },
    async deleteItem(id) {
      confirm('Are you sure you want to delete this item?') &&
        (await tagApi.delTag(id))
      this.getTagList()
    },
    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    async save() {
      console.log(this.editedItem)
      console.log(this.editedIndex)
      let res = ''
      if (this.editedIndex > -1) {
        if (!this.nameChangeFlag) {
          delete this.editedItem.name
        }
        if (this.editedItem.description === null) {
          this.editedItem.description = ''
        }
        res = await tagApi.updateTag(this.editedItem)
      } else {
        res = await tagApi.addTag(this.editedItem)
      }
      console.log(res)
      this.getTagList()
      this.close()
    }
  }
}
</script>

<style></style>
