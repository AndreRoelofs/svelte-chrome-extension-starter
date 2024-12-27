<script>
import * as utils from '@svelte-chrome-extension-starter/utils';
import { onMount } from 'svelte';
import * as Table from '$lib/components/table';
import { Button } from '$lib/components/button';
import Play from 'lucide-svelte/icons/play';
import Trash from 'lucide-svelte/icons/trash';
import { on } from 'events';

let bookmarks = [];

const fetchBookmarks = async () => {
    const activeTab = await utils.getActiveTabURL();
    const queryParameters = activeTab.url.split('?')[1];
    const urlParameters = new URLSearchParams(queryParameters);

    const currentVideo = urlParameters.get('v');

    if (activeTab.url.includes('youtube.com/watch') && currentVideo) {
        chrome.storage.sync.get([currentVideo], (data) => {
            bookmarks = data[currentVideo]
                ? JSON.parse(data[currentVideo])
                : [];
        });
    } else {
        bookmarks = [];
    }
};

const onPlay = async (timestamp) => {
    const activeTab = await utils.getActiveTabURL();

    chrome.tabs.sendMessage(activeTab.id, {
        type: 'PLAY',
        value: timestamp,
    });
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
        <p>A simple app that makes it easy to bookmark your videos.</p>
    </article>

    {#if bookmarks.length > 0}
        <Table.Root>
            <Table.Caption>A list of your bookmarks.</Table.Caption>
            <Table.Header>
                <Table.Row>
                    <Table.Head class="w-[100px]">Title</Table.Head>
                    <Table.Head>Timestamp</Table.Head>
                    <Table.Head>Created At</Table.Head>
                    <Table.Head class="text-right">Actions</Table.Head>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                <!-- {#each bookmarks as { time, desc }} -->
                {#each bookmarks as { timestamp, title, createdAt }}
                    <Table.Row>
                        <Table.Cell class="font-medium">{title}</Table.Cell>
                        <!-- <Table.Cell>{timestamp}</Table.Cell> -->
                        <!-- <Table.Cell>{getTime(timestamp)}</Table.Cell> -->
                        <Table.Cell>{timestamp}</Table.Cell>
                        <!-- <Table.Cell>{createdAt}</Table.Cell> -->
                        <Table.Cell>{getDateWithTime(createdAt)}</Table.Cell>
                        <Table.Cell class="text-right">
                            <Button
                                size="icon"
                                onclick={onPlay.bind(null, timestamp)}
                                ><Play /></Button
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
    {:else}
        <p>No bookmarks to show.</p>
    {/if}
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
