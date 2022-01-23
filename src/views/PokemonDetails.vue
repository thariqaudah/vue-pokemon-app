<template>
  <div class="row justify-content-center">
    <div
      class="pokemon-details bg-white rounded-3 shadow-sm p-4 col-md-10 col-lg-8"
      v-if="pokemon"
    >
      <!-- Details title -->
      <header class="p-2 mb-5 d-flex align-items-center justify-content-center">
        <h2 class="mb-0 ms-3">
          <span class="text-secondary me-2">#{{ pokemon.id }}</span>
          <span>
            {{ $filters.capitalizeString(pokemon.name) }}
          </span>
        </h2>
      </header>

      <!-- Content -->
      <main class="row gx-4">
        <!-- Pokemon image -->
        <div class="col-6">
          <div class="bg-light rounded text-center">
            <img
              class="pokemon-img"
              :src="pokemon.sprites.front_shiny"
              alt="Pokemon image"
            />
          </div>
        </div>

        <!-- Pokemon statistics -->
        <div class="col-6">
          <div class="row p-3">
            <div class="col-6">
              <div class="mb-3">
                <p class="fs-6 text-secondary mb-1">Height</p>
                <p class="mb-0 fs-4">{{ pokemonHeightMetres }} m</p>
              </div>
              <div class="mb-3">
                <p class="fs-6 text-secondary mb-1">Weight</p>
                <p class="mb-0 fs-4">{{ pokemonWeightKilogram }} kg</p>
              </div>
              <div class="mb-3">
                <p class="fs-6 text-secondary mb-1">Ability</p>
                <p class="mb-0 fs-4">
                  {{
                    $filters.capitalizeString(pokemon.abilities[0].ability.name)
                  }}
                </p>
              </div>
            </div>
            <div class="col-6">
              <div class="mb-3">
                <p class="fs-6 text-secondary mb-1">Species</p>
                <p class="mb-0 fs-4">
                  {{ $filters.capitalizeString(pokemon.species.name) }}
                </p>
              </div>
              <div class="mb-3">
                <p class="fs-6 text-secondary mb-1">Types</p>
                <p
                  class="badge bg-dark rounded-3 fs-6 me-2"
                  v-for="el in pokemon.types"
                  :key="el.type.name"
                >
                  {{ $filters.capitalizeString(el.type.name) }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Statistics -->
        <div class="pokemon-stats row p-4">
          <div class="p-3 rounded-3">
            <h5 class="fw-bold mb-4">Statistics</h5>
            <ul class="stat-list ps-1">
              <li class="mb-3" v-for="stat in pokemonStats" :key="stat.name">
                <div class="mb-2">{{ stat.name }}</div>
                <div class="progress">
                  <div
                    class="progress-bar"
                    role="strengthbar"
                    :style="{ width: stat.base + '%' }"
                  ></div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </main>

      <div class="text-end mt-4 px-4">
        <router-link class="btn btn-primary ms-end" :to="{ name: 'Home' }"
          >Explore All Pokemon</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'PokemonDetails',
  props: ['id'],
  setup(props) {
    const store = useStore();

    const pokemon = computed(() => store.state.pokemon);
    const pokemonHeightMetres = computed(() => pokemon.value.height / 10);
    const pokemonWeightKilogram = computed(() => pokemon.value.weight / 10);
    const pokemonStats = computed(() => {
      return pokemon.value.stats.map(el => {
        return {
          name: el.stat.name,
          base: (el.base_stat / 100) * 100,
        };
      });
    });

    onMounted(() => store.dispatch('fetchSinglePokemon', props.id));

    return {
      pokemon,
      pokemonHeightMetres,
      pokemonWeightKilogram,
      pokemonStats,
    };
  },
};
</script>

<style lang="scss" scoped>
.pokemon-details {
  .logo {
    width: 30px;
  }

  .pokemon-img {
    width: 300px;
  }

  .pokemon-stats {
    & > div {
      background-color: #fceaea;
    }

    .stat-list {
      list-style: none;
    }
  }
}
</style>
