<script>
import * as Card from '$lib/components/card';
import * as RadioGroup from '$lib/components/radio-group';
import { Label } from '$lib/components/label';
import '../../../libs/ui-styles/src/styles/global.pcss';

import { Switch } from '$lib/components/switch';

let theme = 'default';
</script>

<main>
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
            <Switch id="theme" />
            {#if theme === 'default'}
                <Label for="theme">Default</Label>
            {:else}
                <Label for="theme">Dark</Label>
            {/if}
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
</style>
