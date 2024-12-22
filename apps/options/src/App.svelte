<script>
import { onMount } from 'svelte';
import * as RadioGroup from '$lib/components/radio-group/index.js';
import { Label } from '$lib/components/label/index.js';

// Default options
let options = {
    sortOrder: 'date', // or 'alphabetical'
};

// Load current options from chrome.storage
onMount(async () => {
    const stored = await chrome.storage.local.get('options');
    if (stored.options) {
        options = stored.options;
    }
});

// Save options back to chrome.storage
async function saveOptions() {
    await chrome.storage.local.set({ options });
}

// Update the sort order on user interaction
function setSortOrder(order) {
    options.sortOrder = order;
    saveOptions();
}
</script>

<main>
    <RadioGroup.Root value="comfortable">
        <div class="flex items-center space-x-2">
            <RadioGroup.Item value="default" id="r1" />
            <Label for="r1">Default</Label>
        </div>
        <div class="flex items-center space-x-2">
            <RadioGroup.Item value="comfortable" id="r2" />
            <Label for="r2">Comfortable</Label>
        </div>
        <div class="flex items-center space-x-2">
            <RadioGroup.Item value="compact" id="r3" />
            <Label for="r3">Compact</Label>
        </div>
    </RadioGroup.Root>
    <!-- <div class="space-y-4 p-4 text-gray-900 dark:text-white">
        <h1 class="text-xl font-semibold">Extension Options</h1>

        <div>
            <label class="mb-2 block font-medium">Snippet Sort Order:</label>
            <div class="flex items-center gap-4">
                <label class="flex items-center gap-1">
                    <input
                        type="radio"
                        name="sortOrder"
                        value="date"
                        checked={options.sortOrder === 'date'}
                        on:change={() => setSortOrder('date')}
                    />
                    By Date
                </label>
                <label class="flex items-center gap-1">
                    <input
                        type="radio"
                        name="sortOrder"
                        value="alphabetical"
                        checked={options.sortOrder === 'alphabetical'}
                        on:change={() => setSortOrder('alphabetical')}
                    />
                    Alphabetical
                </label>
            </div>
        </div>
    </div> -->
</main>
