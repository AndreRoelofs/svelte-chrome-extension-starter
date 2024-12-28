import '../../../libs/ui-styles/src/styles/global.pcss';

import App from './App.svelte';
import { mount } from 'svelte';

const app = mount(App, {
    target: document.getElementById('app') as HTMLElement,
});

chrome.storage.sync.get(['theme'], (result) => {
    document.body.classList.toggle('dark', result.theme === 'dark');
});

export default app;
