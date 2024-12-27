// import '../../../libs/ui-styles/src/styles/global.pcss';
import '../../../libs/ui-styles/src/styles/global.pcss';

import App from './App.svelte';
import { mount } from 'svelte';

const app = mount(App, {
    target: document.getElementById('app') as HTMLElement,
});

export default app;
