import '../../../libs/ui-styles/src/styles/global.css';

import App from './App.svelte';
import { mount } from 'svelte';

const app = mount(App, {
    // target: document.getElementById('app') as HTMLElement,
    target: document.body,
});

export default app;
