<script>
import * as Card from '$lib/components/card';
import * as RadioGroup from '$lib/components/radio-group';
import { Label } from '$lib/components/label';
import '../../../libs/ui-styles/src/styles/global.pcss';
import Sun from 'lucide-svelte/icons/sun';
import Moon from 'lucide-svelte/icons/moon';
import { Button } from '$lib/components/button';

let theme = $state('default');
let bookmarkButtonStyle = $state('default');

$effect(() => {
    // Add or remove the dark class to the body
    document.body.classList.toggle('dark', theme === 'dark');
});

chrome.storage.sync.get(['theme', 'bookmarkButtonStyle'], (result) => {
    console.log('Value currently is ' + result.theme);
    if (result.theme) {
        theme = result.theme;
    }
    if (result.bookmarkButtonStyle) {
        bookmarkButtonStyle = result.bookmarkButtonStyle;
    }
});

function toggleTheme() {
    theme = theme === 'dark' ? 'default' : 'dark';
    chrome.storage.sync.set({ theme });
}

function handleBookmarkButtonStyleChange(event) {
    // The ShadCN-Svelte RadioGroup sends a `detail.value` event.
    bookmarkButtonStyle = event.detail.value;

    // Persist to Chrome storage
    chrome.storage.sync.set({ bookmarkButtonStyle });
}
</script>

<!-- <main class="container mx-auto {theme === 'dark' ? 'dark' : ''}"> -->
<main class="container mx-auto">
    <article class="prose text-center lg:prose-xl">
        <h1>Styles</h1>
        <p>Select your settings</p>
    </article>
    <br />
    <Card.Root class="mx-auto w-[350px]">
        <Card.Header>
            <Card.Title>Theme</Card.Title>
            <Card.Description
                >Choose the theme of the whole application</Card.Description
            >
        </Card.Header>
        <Card.Content>
            <Button onclick={toggleTheme} variant="outline" size="icon">
                {#if theme === 'default'}
                    <Sun class="h-[1.2rem] w-[1.2rem] rotate-0" />
                {:else}
                    <Moon class="h-[1.2rem] w-[1.2rem] rotate-90" />
                {/if}
            </Button>
        </Card.Content>
    </Card.Root>
    <br />
    <Card.Root class="mx-auto w-[350px]">
        <Card.Header>
            <Card.Title>Bookmark Button Style</Card.Title>
            <Card.Description
                >Choose the variant of the injected bookmark button</Card.Description
            >
        </Card.Header>
        <Card.Content>
            <RadioGroup.Root
                value={bookmarkButtonStyle}
                name="bookmarkButtonStyle"
                on:valueChange={handleBookmarkButtonStyleChange}
            >
                <div class="flex items-center space-x-2">
                    <RadioGroup.Item value="default" id="r1" />
                    <Label for="r1">Default</Label>
                </div>
                <div class="flex items-center space-x-2">
                    <RadioGroup.Item value="destructive" id="r2" />
                    <Label for="r2">Destructive</Label>
                </div>
                <div class="flex items-center space-x-2">
                    <RadioGroup.Item value="outline" id="r3" />
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
</style>
