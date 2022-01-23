<template>
  <div class="home">
    <header class="d-flex justify-content-between mb-5">
      <h1 class="text-dark d-flex align-items-center">
        <img
          class="logo"
          src="../assets/img/pokemon-logo.png"
          alt="Pokemon logo"
        />
        <span class="ms-1">Pokemons</span>
      </h1>

      <div class="d-flex align-items-center">
        <small class="me-2">Filter by type:</small>
        <Filter v-if="pokemons.length === 100" :pokemons="pokemons" />
      </div>
    </header>

    <div>
      <div class="text-center" v-if="isLoading">
        <Loader />
      </div>

      <ul class="pokemon-list ps-1" v-if="pokemons">
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
  </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import PokemonCard from '../components/PokemonCard.vue';
import Loader from '../components/Loader.vue';
import Filter from '../components/Filter.vue';

export default {
  name: 'Home',
  components: { PokemonCard, Loader, Filter },
  setup() {
    const store = useStore();

    // const pokemons = computed(() => store.getters.orderPokemonsById);
    const pokemons = computed(() => store.getters.pokemonsByType(null));
    const isLoading = computed(() => store.state.isLoading);

    onMounted(() => {
      // Get first 100 pokemons by id
      for (let id = 1; id <= 100; id++) {
        store.dispatch('fetchPokemon', id);
      }
    });

    return {
      pokemons,
      isLoading,
    };
  },
};
</script>

<style lang="scss" scoped>
.home {
  h1 {
    .logo {
      width: 75px;
    }
  }

  .pokemon-list {
    list-style: none;
  }
}
</style>
