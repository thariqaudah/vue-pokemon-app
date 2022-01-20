<template>
	<div class="home">
		<h1 class="text-dark mb-5">All Pokemons</h1>

		<ul class="pokemon-list">
			<div class="row">
				<li
					class="col-md-4 col-lg-3 mb-4"
					v-for="pokemon in pokemons"
					:key="pokemon.id"
				>
					<PokemonCard :pokemon="pokemon" />
				</li>
			</div>
		</ul>
	</div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import PokemonCard from '../components/PokemonCard.vue';

export default {
	name: 'Home',
	components: { PokemonCard },
	setup() {
		const store = useStore();

		const pokemons = computed(() => store.state.pokemons);

		onMounted(() => {
			// Get first 100 pokemons by id
			for (let id = 1; id <= 100; id++) {
				store.dispatch('fetchPokemon', id);
			}
		});

		return {
			pokemons,
		};
	},
};
</script>

<style lang="scss" scoped>
.home {
	.pokemon-list {
		list-style: none;
	}
}
</style>
