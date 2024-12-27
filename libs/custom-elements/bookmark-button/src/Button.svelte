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
                    // adoptStyles(this.shadowRoot, testTailwindElement);
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

// Export default custom element
</script>

<script lang="ts">
import Bookmark from 'lucide-svelte/icons/bookmark';
import { Button } from '$lib/components/button';
let { text = 'Hello World!' } = $props();
</script>

<Button variant="default" class="my-auto">
    <Bookmark />
    {text}
</Button>
<slot />

<style lang="postcss">
:host {
    display: flex;
}
</style>
