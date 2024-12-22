import { mount } from 'svelte';
import TestButton from '$lib/components/TestButton.svelte';

(() => {
    const newVideoLoaded = async () => {
        console.log('New video loaded');

        // Create a div and prepend it to the body
        const div = document.createElement('div');
        div.id = 'test-button-container';
        document.body.prepend(div);

        mount(TestButton, {
            target: div,
            props: {
                text: 'world',
            },
        });

        // const app = new TestButton({
        //     target: div,
        //     props: {
        //         text: 'world',
        //     },
        // });

        // Create a new button and prepend it to the body
    };

    // const container = document.querySelector('ytd-watch-metadata')!;
    // container.innerHTML = '<h1>Test Svelte App</h1>';
    // document.body.prepend(container);

    // function content(): string {
    //     return 'content Svelte app';
    // }

    // console.log(content());

    newVideoLoaded();
})();
