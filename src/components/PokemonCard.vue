<template>
  <transition name="fade-card">
    <div class="pokemon-card card">
      <div class="img-container bg-light text-center">
        <img
          :src="pokemon.sprites.front_shiny"
          class="card-img-top pokemon-img bg-light w-75"
          alt="Pokemon image"
        />
      </div>

      <div class="card-body py-4">
        <p class="fs-6 fw-normal text-secondary mb-3">#{{ pokemon.id }}</p>
        <h4 class="card-title" v-if="pokemon">
          {{ $filters.capitalizeString(pokemon.name) }}
        </h4>
        <p class="mb-5">
          <small class="me-2">Type:</small>
          <span
            class="badge bg-dark rounded-3 me-1"
            v-for="el in pokemon.types"
            :key="el.type.name"
          >
            {{ el.type.name }}
          </span>
        </p>
        <router-link
          class="btn btn-primary"
          :to="{ name: 'PokemonDetails', params: { id: pokemon.id } }"
          >View details</router-link
        >
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'PokemonCard',
  props: ['pokemon'],
};
</script>

<style lang="scss" scoped>
.pokemon-card {
  transition: all 0.2s ease-in;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  }
}

.fade-card {
  .fade-card-enter-active {
    transition: all 0.3s ease-in;
  }

  .fade-card-enter-from {
    opacity: 0;
  }

  .fade-card-enter-to {
    opacity: 1;
  }
}
</style>
