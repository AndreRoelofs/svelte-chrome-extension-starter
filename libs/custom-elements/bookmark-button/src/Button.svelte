<svelte:options
    customElement={{
        tag: 'tws-bookmark-button',
        props: {
            text: { reflect: true, type: 'String' },
        },
        shadow: 'open',
    }}
/>

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
