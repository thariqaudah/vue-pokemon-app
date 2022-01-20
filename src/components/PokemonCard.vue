<template>
	<div class="pokemon-card card shadow p-4">
		<div class="img-container">
			<img
				:src="pokemon.sprites.front_shiny"
				class="card-img-top pokemon-img"
				alt="Pokemon image"
			/>
		</div>

		<div class="card-body mx-auto text-center">
			<h4 class="card-title mb-5">{{ pokemonName }}</h4>
			<a href="#" class="btn btn-primary">View details</a>
		</div>
	</div>
</template>

<script>
import { computed } from 'vue';

export default {
	name: 'PokemonCard',
	props: ['pokemon'],
	setup(props) {
		const pokemonName = computed(
			() =>
				`${props.pokemon.name[0].toUpperCase()}${props.pokemon.name.slice(1)}`
		);

		return {
			pokemonName,
		};
	},
};
</script>

<style lang="scss" scoped>
.pokemon-card {
	.img-container {
		text-align: center;
		position: relative;

		&::before {
			content: '';
			display: block;
			width: 60%;
			padding-bottom: 60%;
			background-color: #fceaea;
			border-radius: 50%;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}

		.pokemon-img {
			width: 80%;
			margin: 0 auto;
			position: relative;
		}
	}
}
</style>
