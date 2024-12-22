<script>
import { onMount } from 'svelte';

let snippet = '';
let snippets = [];

// Load existing snippets from chrome.storage when the component mounts
onMount(async () => {
    const stored = await chrome.storage.local.get('snippets');
    snippets = stored.snippets || [];
});

// Add a new snippet and store in chrome.storage
async function addSnippet() {
    if (!snippet.trim()) return;
    snippets = [...snippets, snippet.trim()];

    await chrome.storage.local.set({ snippets });
    snippet = '';
}

// Copy snippet to clipboard
async function copySnippet(text) {
    await navigator.clipboard.writeText(text);
    alert('Snippet copied to clipboard!');
}
</script>

<div class="min-w-[200px] p-4 text-gray-900 dark:text-white">
    <h1 class="mb-2 text-lg font-semibold">Quick Snippet Manager</h1>

    <div class="mb-4 flex items-center gap-2">
        <input
            class="flex-1 rounded border px-2 py-1"
            type="text"
            placeholder="Enter a snippet"
            bind:value={snippet}
            on:keydown={(e) => e.key === 'Enter' && addSnippet()} />
        <button
            class="rounded bg-blue-600 px-3 py-1 text-white hover:bg-blue-700"
            on:click={addSnippet}>
            Add
        </button>
    </div>

    {#if snippets.length > 0}
        <ul class="space-y-2">
            {#each snippets as text, i}
                <li
                    class="cursor-pointer rounded px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-700"
                    on:click={() => copySnippet(text)}>
                    {text}
                </li>
            {/each}
        </ul>
    {:else}
        <p class="text-sm text-gray-500">No snippets yet. Add one above!</p>
    {/if}
</div>
