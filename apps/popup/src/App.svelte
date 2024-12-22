<script>
import { onMount } from 'svelte';
import * as Table from '$lib/components/table';
import { Button } from '$lib/components/button';
import Snippet from './Snippet.svelte';

function testFunction() {
    console.log('testFunction');
    console.log(chrome);
    chrome.storage.sync.set({ key: 'value' }, function () {
        console.log('Value is set to ' + 'value');
    });
}
testFunction();

// Measure time to mount
const start = performance.now();

onMount(() => {
    const end = performance.now();
    console.log(`Mount time: ${end - start}ms`);
    console.log('onMount');
    chrome.storage.sync.get(['key'], function (result) {
        console.log('Value currently is ' + result.key);
    });
});

const bookmarks = [
    { title: 'Video 1', timestamp: '5:49', date: '2024/12/22' },
    { title: 'Video 2', timestamp: '10:49', date: '2024/12/22' },
    { title: 'Video 3', timestamp: '15:49', date: '2024/12/22' },
];
</script>

<!-- 
<main
    class="flex h-screen flex-col items-center justify-center bg-gray-100 text-center"
> -->
<main class="bg-background">
    <article class="prose lg:prose-xl">
        <h1>The Bookmarker</h1>
        <p>A simple app that makes it to bookmark your videos.</p>
    </article>
    <Table.Root>
        <Table.Caption>A list of your bookmarks.</Table.Caption>
        <Table.Header>
            <Table.Row>
                <Table.Head class="w-[100px]">Title</Table.Head>
                <Table.Head>Timestamp</Table.Head>
                <Table.Head>Date</Table.Head>
                <Table.Head class="text-right">Actions</Table.Head>
            </Table.Row>
        </Table.Header>
        <Table.Body>
            {#each bookmarks as row}
                <Table.Row>
                    <Table.Cell class="font-medium">{row.title}</Table.Cell>
                    <Table.Cell>{row.timestamp}</Table.Cell>
                    <Table.Cell>{row.date}</Table.Cell>
                    <Table.Cell class="text-right"
                        ><Button>Play</Button></Table.Cell
                    >
                </Table.Row>
            {/each}
        </Table.Body>
    </Table.Root>
</main>

<style>
main {
    text-align: center;
    padding: 1em;
    max-width: 700px;
    margin: 0 auto;
    width: 500px;
}

@media (min-width: 640px) {
    main {
        max-width: none;
    }
}
/* Optional: Scoped CSS if needed, though not typical with Tailwind */
</style>
