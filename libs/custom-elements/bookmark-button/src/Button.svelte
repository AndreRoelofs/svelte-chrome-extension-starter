<svelte:options
    customElement={{
        tag: 'tws-bookmark-button',
        props: {
            text: { reflect: true, type: 'String' },
        },
        // shadow: 'none',
        shadow: 'open',
        extend: (customElementConstructor) => {
            // Extend the class so we can let it participate in HTML forms
            return class extends customElementConstructor {
                constructor() {
                    super();
                    // this.attachedInternals = this.attachInternals();

                    // const mySheet = new CSSStyleSheet();
                    // mySheet.replaceSync('');

                    // this.shadowRoot.adoptedStyleSheets = [sheet];
                    // this.shadowRoot.adoptedStyleSheets = [sheet];
                }
            };
        },
    }}
/>

<script lang="ts" module>
// import * as style from './style.css?inline';
// const sheet = new CSSStyleSheet();
// sheet.replaceSync(style.default);
</script>

<script lang="ts">
// import * as style from './style.css?inline';
// console.log(style);
import Bookmark from 'lucide-svelte/icons/bookmark';
// import './Button.pcss';
// import '../../../ui-styles/src/styles/local.pcss';
// import '../../../ui-styles/src/styles/test.pcss';
import { Button } from '$lib/components/button';
let { text = 'Hello World!' } = $props();
</script>

<Button variant="destructive">
    <Bookmark />
    {text}
</Button>
<slot />

<style lang="postcss">
/* @import './style.pcss?inline'; */
</style>
