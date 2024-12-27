<script>
import * as utils from '@svelte-chrome-extension-starter/utils';
import { onMount } from 'svelte';
import * as Table from '$lib/components/table';
import { Button } from '$lib/components/button';
import * as Card from '$lib/components/card';
import Play from 'lucide-svelte/icons/play';
import Trash from 'lucide-svelte/icons/trash';
import * as RadioGroup from '$lib/components/radio-group';
import { Label } from '$lib/components/label';
import '../../../libs/ui-styles/src/styles/global.pcss';

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

<main>
    <article class="prose text-center lg:prose-xl">
        <h1>The Bookmarker</h1>
        <p>Select your settings</p>
    </article>
    <br />
    <Card.Root class="mx-auto w-[350px]">
        <Card.Header>
            <Card.Title>Bookmark Button Style</Card.Title>
            <Card.Description
                >Choose the variant of the injected bookmark button</Card.Description
            >
        </Card.Header>
        <Card.Content>
            <RadioGroup.Root value="comfortable" name="spacing">
                <div class="flex items-center space-x-2">
                    <RadioGroup.Item value="default" id="r1" />
                    <Label for="r1">Default</Label>
                </div>
                <div class="flex items-center space-x-2">
                    <RadioGroup.Item value="comfortable" id="r2" />
                    <Label for="r2">Destructive</Label>
                </div>
                <div class="flex items-center space-x-2">
                    <RadioGroup.Item value="compact" id="r3" />
                    <Label for="r3">Outline</Label>
                </div>
            </RadioGroup.Root>
        </Card.Content>
    </Card.Root>
</main>

<style lang="postcss">
main {
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

html {
    font-size: 16px;
}
</style>
