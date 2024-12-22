<script>
import { onMount } from 'svelte';

// We'll store an array of snippets and their usage counts
let snippets = [];

// Example structure for usage:
// [
//   { text: "Hello world", usageCount: 3 },
//   { text: "Another snippet", usageCount: 1 }
// ]

onMount(async () => {
    // Load snippet data from storage
    const data = await chrome.storage.local.get(['snippets', 'usageCounts']);
    const storedSnippets = data.snippets || [];
    const usageCounts = data.usageCounts || {};

    // Transform the arrays into an object that includes usage counts
    snippets = storedSnippets.map((text) => {
        return {
            text,
            usageCount: usageCounts[text] ? usageCounts[text] : 0,
        };
    });
});
</script>

<main>
    <div class="container">
        <h1 class="mb-4 text-xl font-semibold">Snippet Manager DevTools</h1>

        {#if snippets.length > 0}
            <ul class="space-y-2">
                {#each snippets as snippet, i}
                    <li class="border-b px-2 py-1">
                        <div class="font-bold">{snippet.text}</div>
                        <div class="text-sm text-gray-500">
                            Usage count: {snippet.usageCount}
                        </div>
                    </li>
                {/each}
            </ul>
        {:else}
            <p class="text-sm text-gray-500">No snippets found in storage.</p>
        {/if}
    </div>
</main>

<style>
/* If using Tailwind, remove/replace these styles or just rely on .p-4, etc. */
.container {
    padding: 1rem;
    font-family: sans-serif;
    color: #333;
}
</style>
