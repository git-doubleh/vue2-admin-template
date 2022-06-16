/*
 * @Description:
 * @Date: 2021-08-20 10:56:15
 * @LastEditTime: 2022-06-13 10:18:26
 */
import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import tagsView from './modules/tagsView'
import permission from './modules/permission'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    tagsView,
    permission
  },
  getters
})

export default store
