import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import getMenu from '@/utils/getMenu';

Vue.use(Vuex);

const state = {
    menus: []
}

const getters = {}

const mutations = {
    GET_MENU(state, menus) {
        state.menus = menus;
    }
}

const actions = {
    getMenuAsync({ commit }) {
        axios({
			baseURL: 'http://192.168.1.56:18080/syd-paper/',
			url: '/getMenus.jspa',
			method: 'get'
		})
		.then(res => {
            const menus = getMenu(res.data);
            commit('GET_MENU', menus);
            
            this.$route
		}).catch(err => {
			console.log(err);
		});
    }
}

export default new Vuex.Store({
    modules: {},
    state,
    getters,
    mutations,
    actions
});