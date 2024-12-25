<svelte:options
    customElement={{
        tag: 'tws-bookmark-button',
        props: {
            text: { reflect: true, type: 'String' },
        },
        shadow: 'none',
    }}
/>

<script>
import Bookmark from 'lucide-svelte/icons/bookmark';
import './style.pcss';
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
/* @tailwind base;
@tailwind components;
@tailwind utilities; */
</style>
