import Vue from 'vue';
import Vuex from 'vuex';
import { dataService } from '../shared';
import {
  GET_HEROES,
  ADD_HEROES,
  DELETE_HEROES,
  UPDATE_HEROES,
} from './mutation-types';

Vue.use(Vuex);
const state = {
  heroes: [],
};
const mutations = {
  [GET_HEROES](state, heroes) {
    state.heroes = heroes;
  },
  [ADD_HEROES](state, hero) {
    state.heroes.push(hero);
  },
  [UPDATE_HEROES](state, hero) {
    const index = state.heroes.findindex(h => h.id === hero.id);
    state.heroes.splice(index, 1, hero);
    state.heroes = [...state.heroes];
  },
  [DELETE_HEROES](state, hero) {
    state.heroes = [...state.heroes.filter(h => h.id !== hero.id)];
  },
};
const actions = {
  //actions let us use many things
  //{state , commit , getters , dispatch }
  async getHeroesActions({ commit }) {
    const heroes = await dataService.getHeroes();
    commit(GET_HEROES, heroes);
  },
  async addHeroActions({ commit }, hero) {
    const addedHero = await dataService.addHero(hero);
    commit(ADD_HEROES, addedHero);
  },
  async deleteHeroActions({ commit }, hero) {
    const deleteHero = await dataService.deleteHero(hero);
    commit(DELETE_HEROES, deleteHero);
  },
  async updateHeroActions({ commit }, hero) {
    const updateHero = await dataService.updateHero(hero);
    commit(UPDATE_HEROES, updateHero);
  },
};
const getters = {
  getHeroById: state => id => state.heroes.find(h => h.id == id),
};
export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state,
  mutations,
  actions,
  getters,
});
