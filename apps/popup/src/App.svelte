<script>
import { Button } from '$lib/components/button';
import Snippet from './Snippet.svelte';

let message = 'Welcome to Svelte with TailwindCSS!';
</script>

<!-- 
<main
    class="flex h-screen flex-col items-center justify-center bg-gray-100 text-center"
> -->
<main class="bg-background">
    <Snippet />
    <Button>Click Me</Button>

    <h1 class="text-4xl font-bold text-blue-600">{message}</h1>
    <p class="mt-4 text-lg text-gray-700">
        TailwindCSS is correctly installed and working!
    </p>
    <button
        class="mt-6 rounded-lg bg-blue-500 px-6 py-3 text-white transition duration-300 hover:bg-blue-600"
        on:click={() => alert('TailwindCSS and Svelte are awesome!')}
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
