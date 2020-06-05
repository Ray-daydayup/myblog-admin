<template>
  <div>
    <v-snackbar
      v-model="snackbarShow"
      top
      :timeout="snackbar.timeout"
      :color="snackbar.color"
    >
      {{ snackbar.text }}
    </v-snackbar>
    <v-dialog v-model="dialog.isShow" max-width="500">
      <v-card>
        <v-card-title class="headline">{{ dialog.title }}</v-card-title>
        <v-card-text> {{ dialog.content }} </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="hideDialog(false)">
            取消
          </v-btn>
          <v-btn color="red darken-1" text @click="hideDialog(true)">
            确定
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'popup',
  computed: {
    ...mapState({
      dialog: (state) => state.popup.dialog,
      snackbar: (state) => state.popup.snackbar
    }),
    snackbarShow: {
      get: function() {
        return this.$store.state.popup.snackbar.isShow
      },
      set: function() {
        this.hideSnackbar()
      }
    }
  },
  methods: {
    ...mapActions('popup', [
      'showDialog',
      'hideDialog',
      'showSnackbar',
      'hideSnackbar'
    ])
  }
}
</script>

<style></style>
