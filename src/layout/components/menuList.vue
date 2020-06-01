<template>
  <v-list nav>
    <v-list-item-group>
      <v-tooltip
        :disabled="!$vuetify.breakpoint.lgAndUp"
        right
        v-for="(item, i) in items"
        :key="i"
      >
        <template v-slot:activator="{ on }">
          <v-list-item v-on="on" link :to="item.path">
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
        <span>{{ item.text }}</span>
      </v-tooltip>
    </v-list-item-group>
  </v-list>
</template>

<script>
export default {
  name: 'menuList',
  data() {
    return {
      items: [
        { icon: 'mdi-home', text: '首页', path: '/home' },
        {
          icon: 'mdi-bookshelf',
          text: '文章管理',
          path: '/articles'
        },
        { icon: 'mdi-tag', text: '标签管理', path: '/tags' },
        { icon: 'mdi-bookmark', text: '分类管理', path: '/categories' },
        { icon: 'mdi-account-circle', text: '用户管理', path: '/users' }
      ],
      item: 1
    }
  }
}
</script>
