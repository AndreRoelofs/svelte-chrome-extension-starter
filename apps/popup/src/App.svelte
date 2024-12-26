<script>
import * as utils from '@svelte-chrome-extension-starter/utils';
import { onMount } from 'svelte';
import * as Table from '$lib/components/table';
import { Button } from '$lib/components/button';
import Snippet from './Snippet.svelte';

const addNewBookmark = (bookmarks, bookmark) => {
    const bookmarkTitleElement = document.createElement('div');
    const controlsElement = document.createElement('div');
    const newBookmarkElement = document.createElement('div');

    bookmarkTitleElement.textContent = bookmark.desc;
    bookmarkTitleElement.className = 'bookmark-title';
    controlsElement.className = 'bookmark-controls';

    setBookmarkAttributes('play', onPlay, controlsElement);
    setBookmarkAttributes('delete', onDelete, controlsElement);

    newBookmarkElement.id = 'bookmark-' + bookmark.time;
    newBookmarkElement.className = 'bookmark';
    newBookmarkElement.setAttribute('timestamp', bookmark.time);

    newBookmarkElement.appendChild(bookmarkTitleElement);
    newBookmarkElement.appendChild(controlsElement);
    bookmarks.appendChild(newBookmarkElement);
};

const viewBookmarks = (currentBookmarks = []) => {
    const bookmarksElement = document.getElementById('bookmarks');
    bookmarksElement.innerHTML = '';

    if (currentBookmarks.length > 0) {
        for (let i = 0; i < currentBookmarks.length; i++) {
            const bookmark = currentBookmarks[i];
            addNewBookmark(bookmarksElement, bookmark);
        }
    } else {
        bookmarksElement.innerHTML = '<i class="row">No bookmarks to show</i>';
    }

    return;
};

const onPlay = async (e) => {
    const bookmarkTime =
        e.target.parentNode.parentNode.getAttribute('timestamp');
    const activeTab = await getActiveTabURL();

    chrome.tabs.sendMessage(activeTab.id, {
        type: 'PLAY',
        value: bookmarkTime,
    });
};

const onDelete = async (e) => {
    const activeTab = await getActiveTabURL();
    const bookmarkTime =
        e.target.parentNode.parentNode.getAttribute('timestamp');
    const bookmarkElementToDelete = document.getElementById(
        'bookmark-' + bookmarkTime,
    );

    bookmarkElementToDelete.parentNode.removeChild(bookmarkElementToDelete);

    chrome.tabs.sendMessage(
        activeTab.id,
        {
            type: 'DELETE',
            value: bookmarkTime,
        },
        viewBookmarks,
    );
};

const setBookmarkAttributes = (src, eventListener, controlParentElement) => {
    const controlElement = document.createElement('img');

    controlElement.src = 'assets/' + src + '.png';
    controlElement.title = src;
    controlElement.addEventListener('click', eventListener);
    controlParentElement.appendChild(controlElement);
};

// onMount(async () => {
//     const activeTab = await getActiveTabURL();
//     const queryParameters = activeTab.url.split('?')[1];
//     const urlParameters = new URLSearchParams(queryParameters);

//     const currentVideo = urlParameters.get('v');

//     if (activeTab.url.includes('youtube.com/watch') && currentVideo) {
//         chrome.storage.sync.get([currentVideo], (data) => {
//             const currentVideoBookmarks = data[currentVideo]
//                 ? JSON.parse(data[currentVideo])
//                 : [];

//             viewBookmarks(currentVideoBookmarks);
//         });
//     } else {
//         const container = document.getElementsByClassName('container')[0];

//         container.innerHTML =
//             '<div class="title">This is not a youtube video page.</div>';
//     }
// });

const bookmarks = [
    { title: 'Video 1', timestamp: '5:49', date: '2024/12/22' },
    { title: 'Video 2', timestamp: '10:49', date: '2024/12/22' },
    { title: 'Video 3', timestamp: '15:49', date: '2024/12/22' },
];
</script>

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
