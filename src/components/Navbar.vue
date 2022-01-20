<template>
	<nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-5">
		<div class="container-fluid px-5">
			<span class="navbar-brand">PokeApp</span>
			<button
				class="navbar-toggler"
				type="button"
				data-bs-toggle="collapse"
				data-bs-target="#navbarNavAltMarkup"
				aria-controls="navbarNavAltMarkup"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<span class="navbar-toggler-icon"></span>
			</button>
			<div class="collapse navbar-collapse" id="navbarNavAltMarkup">
				<div class="navbar-nav ms-auto">
					<router-link class="nav-link me-3" :to="{ name: 'Home' }"
						>Home</router-link
					>
					<router-link class="nav-link" :to="{ name: 'About' }"
						>About</router-link
					>
				</div>
			</div>
		</div>
	</nav>
</template>

<script>
export default {
	name: 'Navbar',
};
</script>
