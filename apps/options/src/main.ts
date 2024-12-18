import App from './App.svelte';
import { mount } from 'svelte';

const app = mount(App, {
    target: document.getElementById('app')!,
});

export const ssr = false;

export default app;

// const app = new App({
//     target: document.getElementById('app'),
//     // props: {
//     //     name: 'options',
//     // },
// });

// export const ssr = false;

// export default app;

// // console.log('test')