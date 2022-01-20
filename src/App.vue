<template>
	<Navbar />
	<div class="container">
		<router-view />
	</div>
</template>

<script>
import Navbar from './components/Navbar.vue';

export default {
	name: 'App',
	components: { Navbar },
};
</script>

<style lang="scss">
// * {
// 	padding: 0;
// 	margin: 0;
// 	box-sizing: border-box;
// }

// body {
// 	font-family: 'Poppins', sans-serif;
// 	color: #444;
// }
</style>
