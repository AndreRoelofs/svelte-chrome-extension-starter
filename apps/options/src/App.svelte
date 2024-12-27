<script>
import * as utils from '@svelte-chrome-extension-starter/utils';
import { onMount } from 'svelte';
import * as Table from '$lib/components/table';
import { Button } from '$lib/components/button';
import Play from 'lucide-svelte/icons/play';
import Trash from 'lucide-svelte/icons/trash';

let bookmarks = [];

const fetchBookmarks = async () => {
    const keys = await chrome.storage.sync.getKeys();
    console.log(keys);

    const newBookmarks = [];

    const data = await chrome.storage.sync.get(keys);
    for (const key in data) {
        const bookmarkObject = JSON.parse(data[key]);
        newBookmarks.push({
            id: key,
            name: bookmarkObject[0].title,
            items: [...bookmarkObject],
        });
    }

    bookmarks = newBookmarks;

    console.log('pop-up bookmarks', bookmarks);
};
const onPlay = async (videoId, timestamp) => {
    const videoURL = `https://www.youtube.com/watch?v=${videoId}&t=${Math.round(timestamp)}`;

    // Open the video in a new tab
    chrome.tabs.create({ url: videoURL });
};

const onDelete = async (timestamp) => {
    const activeTab = await utils.getActiveTabURL();

    bookmarks = bookmarks.filter(
        (bookmark) => bookmark.timestamp !== timestamp,
    );

    chrome.tabs.sendMessage(activeTab.id, {
        type: 'DELETE',
        value: timestamp,
    });
};

const getTime = (t) => {
    const date = new Date(0);
    date.setSeconds(t);

    return date.toISOString().substring(11, 19);
};

const getDateWithTime = (t) => {
    const date = new Date(t);

    const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    };
    const formattedDate = date.toLocaleString('en-US', options);

    return formattedDate;
};

onMount(fetchBookmarks);
</script>

<main class="bg-background">
    <article class="prose lg:prose-xl">
        <h1>The Bookmarker</h1>
        <p>All your bookmarks</p>

        {#if bookmarks.length > 0}
            {#each bookmarks as { id, name, items }}
                <Table.Root>
                    <Table.Caption>{name}</Table.Caption>
                    <Table.Header>
                        <Table.Row>
                            <Table.Head class="w-[100px]">Timestamp</Table.Head>
                            <Table.Head class="w-[250px] text-center"
                                >Created At</Table.Head
                            >
                            <Table.Head class="text-right">Actions</Table.Head>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {#each items as { timestamp, title, createdAt }}
                            <Table.Row>
                                <Table.Cell>{getTime(timestamp)}</Table.Cell>
                                <Table.Cell
                                    >{getDateWithTime(createdAt)}</Table.Cell
                                >
                                <Table.Cell class="text-right">
                                    <Button
                                        size="icon"
                                        onclick={onPlay.bind(
                                            null,
                                            id,
                                            timestamp,
                                        )}><Play /></Button
                                    >

                                    <Button
                                        size="icon"
                                        onclick={onDelete.bind(null, timestamp)}
                                        ><Trash /></Button
                                    >
                                </Table.Cell>
                            </Table.Row>
                        {/each}
                    </Table.Body>
                </Table.Root>
                <br />
            {/each}
        {:else}
            <p>No bookmarks to show.</p>
        {/if}
    </article>
</main>

<style lang="postcss">
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
</style>
