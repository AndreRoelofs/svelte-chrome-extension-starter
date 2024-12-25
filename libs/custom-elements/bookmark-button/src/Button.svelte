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

                    this.shadowRoot.adoptedStyleSheets = [sheet];
                }
            };
        },
    }}
/>

<script lang="ts" module>
import * as style from '../dist/style.css?inline';
const sheet = new CSSStyleSheet();
sheet.replaceSync(style.default);
</script>

<script lang="ts">
import Bookmark from 'lucide-svelte/icons/bookmark';
import { Button } from '$lib/components/button';
let { text = 'Hello World!' } = $props();
</script>

<Button variant="destructive" class="my-auto">
    <Bookmark />
    {text}
</Button>
<slot />

<style lang="postcss">
:host {
    display: flex;
}
</style>
