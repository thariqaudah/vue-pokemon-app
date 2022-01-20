import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
	state: {
		pokemons: [],
		isLoading: false,
	},

	actions: {
		async fetchPokemon({ commit }, id) {
			const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
			if (res.status === 200) {
				console.log(res.data);
				commit('addPokemon', res.data);
			}
		},
	},

	mutations: {
		addPokemon(state, pokemon) {
			state.pokemons.push(pokemon);
		},
	},
});
