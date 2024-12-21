import '@svelte-chrome-extension-starter/ui-styles/styles/global.css';

import App from './App.svelte';
import { mount } from 'svelte';

const app = mount(App, {
    target: document.body,
});

export default app;
