const popupStore = {
  namespaced: true,
  state: () => ({
    dialog: {
      isShow: false,
      title: '提示',
      content: ''
    },
    callback: () => {},
    snackbar: {
      isShow: false,
      text: '',
      timeout: 3000,
      color: 'info'
    }
  }),
  mutations: {
    CHANGE_DIALOG(state, flag) {
      state.dialog.isShow = flag
    },
    SET_DIALOG_TITLE(state, title) {
      state.dialog.title = title
    },
    SET_DIALOG_CONTENT(state, content) {
      state.dialog.content = content
    },
    SET_CALLBACK(state, callback) {
      state.callback = callback
    },
    CHANGE_SNACKBAR(state, flag) {
      state.snackbar.isShow = flag
    },
    SET_SNACKBAR_TEXT(state, text) {
      state.snackbar.text = text
    },
    SET_SNACKBAR_TIMEOUT(state, timeout) {
      state.snackbar.timeout = timeout
    },
    SET_SNACKBAR_COLOR(state, color) {
      state.snackbar.color = color
    }
  },
  actions: {
    showDialog({ commit }, data) {
      const [content = '', callback = () => {}, title = '提示'] = data
      commit('SET_DIALOG_TITLE', title)
      commit('SET_DIALOG_CONTENT', content)
      commit('SET_CALLBACK', callback)
      commit('CHANGE_DIALOG', true)
    },
    hideDialog({ state, commit }, flag) {
      commit('CHANGE_DIALOG', false)
      state.callback(flag)
    },
    showSnackbar({ commit }, data) {
      const [text = '', color = 'info', timeout = 3000] = data
      const colors = {
        success: 'success',
        info: '',
        error: 'error'
      }
      commit('SET_SNACKBAR_TEXT', text)
      commit('SET_SNACKBAR_COLOR', colors[color])
      commit('SET_SNACKBAR_TIMEOUT', timeout)
      commit('CHANGE_SNACKBAR', true)
    },
    hideSnackbar({ commit }) {
      commit('CHANGE_SNACKBAR', false)
    }
  }
}

export default popupStore
