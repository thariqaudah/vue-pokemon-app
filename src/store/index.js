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
    pokemonsByType: state => type => {
      if (!type) {
        return state.pokemons;
      }

      return state.pokemons.filter(pokemon =>
        pokemon.types.forEach(el => el.type.name === type)
      );
    },
  },

  actions: {
    async fetchPokemon({ commit }, id) {
      commit('setLoading', true);
      const res = await axios.get(
        `${process.env.VUE_APP_API_BASE_URL}/pokemon/${id}`
      );
      if (res.status === 200) {
        commit('setLoading', false);
        commit('pushPokemon', res.data);
      }
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
  },

  mutations: {
    pushPokemon(state, pokemon) {
      if (state.pokemons.length === 100) {
        // Pokemons array  already contain 100 pokemon. So clear the array first
        state.pokemons = [];
      }
      state.pokemons.push(pokemon);
    },
    setPokemon(state, pokemon) {
      state.pokemon = pokemon;
    },
    setLoading(state, status) {
      state.isLoading = status;
    },
  },
});
