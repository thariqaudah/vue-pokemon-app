import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    pokemons: [],
    pokemon: null,
    isLoading: false,
    filterStatus: false,
  },

  getters: {
    orderPokemonsById(state) {
      return state.pokemons.sort(
        (firstEl, secondEl) => firstEl.id - secondEl.id
      );
    },
  },

  actions: {
    async fetchPokemons({ commit }) {
      commit('setLoading', true);

      const pokemons = [];

      // Fetch all 100 pokemon data
      for (let id = 1; id <= 100; id++) {
        const res = await axios.get(
          `${process.env.VUE_APP_API_BASE_URL}/pokemon/${id}`
        );

        pokemons.push(res.data);
      }

      commit('setLoading', false);
      commit('setPokemons', pokemons);
    },

    async fetchSinglePokemon({ commit }, id) {
      commit('setLoading', true);
      const res = await axios.get(
        `${process.env.VUE_APP_API_BASE_URL}/pokemon/${id}`
      );
      if (res.status === 200) {
        console.log(res.data);
        commit('setLoading', false);
        commit('setPokemon', res.data);
      }
    },

    async filterPokemons({ commit, dispatch, state }, typeName) {
      commit('setLoading', true);

      // Restore all 100 pokemon data
      await dispatch('fetchPokemons');

      const filteredPokemons = state.pokemons.filter(pokemon =>
        pokemon.types.some(el => el.type.name === typeName)
      );

      commit('setLoading', false);
      commit('setFilterStatus', true);
      commit('setPokemons', filteredPokemons);
    },
  },

  mutations: {
    pushPokemon(state, pokemon) {
      if (state.pokemons.length === 100) {
        // Pokemons array  already contain 100 pokemon. So clear the array first
        state.pokemons = [];
      }
      state.pokemons.push(pokemon);
    },
    setPokemons(state, pokemons) {
      state.pokemons = pokemons;
    },
    setPokemon(state, pokemon) {
      state.pokemon = pokemon;
    },
    setLoading(state, status) {
      state.isLoading = status;
    },
    setFilterStatus(state, status) {
      state.filterStatus = status;
    },
  },
});
