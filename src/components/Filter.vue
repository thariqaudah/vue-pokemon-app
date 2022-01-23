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
import { inject, onMounted, ref } from 'vue';

export default {
  name: 'Filter',
  props: ['pokemons'],
  setup(props) {
    const types = ref([]);
    const selectedType = ref('--Select type--');

    const filterByType = inject('filterByType');

    const typeSet = new Set();

    const handleChange = () => {
      if (selectedType.value !== '--Select type--') {
        // Run filter function
        filterByType(selectedType.value);
      }
    };

    onMounted(() => {
      props.pokemons.forEach(pokemon => {
        pokemon.types.forEach(el => typeSet.add(el.type.name));
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
