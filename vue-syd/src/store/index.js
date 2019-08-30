import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import getMenu from '@/utils/getMenu'

Vue.use(Vuex)

const state = {
    menus: []
}

const getters = {}

const mutations = {
    saveMenuTree(state, menus) {
        state.menus = menus
    }
}

const actions = {
   
}

export default new Vuex.Store({
    modules: {},
    state,
    getters,
    mutations,
    actions
})