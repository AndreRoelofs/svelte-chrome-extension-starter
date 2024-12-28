<svelte:options
    customElement={{
        tag: 'tws-bookmark-button',
        props: {
            text: { reflect: true, type: 'String' },
        },
        shadow: 'open',
        extend: (customElementConstructor) => {
            // Extend the class so we can let it participate in HTML forms
            return class extends customElementConstructor {
                constructor() {
                    super();

                    // Add dark class to the shadow root
                    // this.shadowRoot.querySelector('slot').classList.add('dark');

                    this.shadowRoot.adoptedStyleSheets = [sheet];
                }
            };
        },
    }}
/>

<script lang="ts" module>
import { unsafeCSS } from 'lit';
import * as style from '../../../ui-styles/src/styles/global.shadow.pcss?inline';
const compiledTW = unsafeCSS(style.default);
const sheet = new CSSStyleSheet();
sheet.replaceSync(compiledTW.cssText);

let theme = $state('default');

chrome.storage.sync.getKeys((keys) => {
    console.log('Keys:', keys);
});
chrome.storage.sync.get(['theme'], function (data) {
    theme = data.theme || 'default';
    console.log('Value currently is ' + data.theme);
});
</script>

<script lang="ts">
// import { onMount } from 'svelte';
import Bookmark from 'lucide-svelte/icons/bookmark';
import { Button } from '$lib/components/button/index.js';
let { text = 'Hello World!' } = $props();

// let theme = $state('default');

// onMount(() => {
//     chrome.storage.sync.getKeys((keys) => {
//         console.log('Keys:', keys);
//     });
//     chrome.storage.sync.get(['theme'], function (data) {
//         theme = data.theme || 'default';
//         console.log('Value currently is ' + data.theme);
//     });
// });
</script>

<!-- Add conditional dark class to button -->
<Button variant="default" class="my-auto {theme === 'dark' ? 'dark' : ''}">
    <Bookmark />
    {text}
</Button>

<slot />

<style lang="postcss">
:host {
    display: flex;
}
</style>
