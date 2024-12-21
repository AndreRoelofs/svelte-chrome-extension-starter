<!-- <script lang="ts">
	export let name: string;
</script>

<main>
	<h1>Welcome {name}!</h1>
	<p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style> -->


<script>
  let message = "Welcome to Svelte with TailwindCSS!";
</script>

<main class="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
  <h1 class="text-4xl font-bold text-blue-600">{message}</h1>
  <p class="mt-4 text-lg text-gray-700">
    TailwindCSS is correctly installed and working!
  </p>
  <button
    class="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
    on:click={() => alert("TailwindCSS and Svelte are awesome!")}
  >
    Click Me
  </button>
</main>

<style>
    main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
        width: 500px;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
  /* Optional: Scoped CSS if needed, though not typical with Tailwind */
</style>
