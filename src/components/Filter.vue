<template>
  <form @change.prevent="handleChange">
    <select class="form-select" v-model="selectedType">
      <option v-for="type in types" :key="type" :value="type">
        {{ type }}
      </option>
    </select>
  </form>
</template>

<script>
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import axios from 'axios';

export default {
  name: 'Filter',
  setup() {
    const types = ref([]);
    const selectedType = ref('--Select type--');

    const store = useStore();

    const handleChange = () => {
      if (selectedType.value !== '--Select type--') {
        // Run filter
        store.dispatch('filterPokemons', selectedType.value);
      }
    };

    onMounted(async () => {
      const pokemons = [];
      // Get first 100 pokemons by id
      for (let id = 1; id <= 100; id++) {
        const res = await axios.get(
          `${process.env.VUE_APP_API_BASE_URL}/pokemon/${id}`
        );
        pokemons.push(res.data);
      }

      const typeSet = new Set();

      pokemons.forEach(pokemon => {
        pokemon.types.forEach(el => {
          typeSet.add(el.type.name);
        });
      });

      types.value = ['--Select type--', ...typeSet];
    });

    return {
      types,
      selectedType,
      handleChange,
    };
  },
};
</script>
