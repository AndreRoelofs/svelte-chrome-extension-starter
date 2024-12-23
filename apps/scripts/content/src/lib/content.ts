// import TestButton from '$lib/components/TestButton.svelte';
import { Button } from '$lib/mountable-components/button/index.js';
// import '$lib/mountable-components/button/index.ts';
// import YoutubePlayerCreator from 'youtube-player';
// import { YouTubePlayer } from 'youtube-player/dist/types.js';
import { mountIfExists } from '@svelte-chrome-extension-starter/utils';

(() => {
    let youtubeLeftControls: HTMLElement;
    // let youtubePlayer: YouTubePlayer;
    // let currentVideo = '';
    // let currentVideoBookmarks = [];

    chrome.runtime.onMessage.addListener((obj, sender, response) => {
        // const { type, value, videoId } = obj;
        const { type } = obj;

        if (type === 'NEW') {
            // currentVideo = videoId;
            newVideoLoaded();
        } else if (type === 'PLAY') {
            // console.log('PLAY', obj);
            // if (youtubePlayer) {
            //     youtubePlayer.seekTo(5, true);
            // }
        }
    });

    const newVideoLoaded = async () => {
        console.log('New video loaded');

        youtubeLeftControls = document.querySelector(
            '.ytp-left-controls',
        ) as HTMLElement;

        // youtubePlayer = document.getElementsByClassName('video-stream')[0];
        // youtubePlayer = YoutubePlayerCreator.default('video-player');

        if (!youtubeLeftControls) {
            console.error('Could not find youtubeLeftControls');
            return;
        }
        // Create a div and prepend it to the body
        // const div = document.createElement('div');
        // div.id = 'test-button-container';
        // document.body.prepend(div);

        // mountIfExists(TestButton, {
        //     target: youtubeLeftControls,
        //     props: {
        //         text: 'world',
        //     },
        // });

        mountIfExists(Button, {
            target: youtubeLeftControls,
            props: {
                text: 'Click Me!',
            },
        });

        // customElements.define(
        //     'tw-bookmark-button',
        //     Button as unknown as CustomElementConstructor,
        // );
        // ===============================
        // const button = document.createElement('tw-bookmark-button');
        // button.id = 'my-button';

        // // Make the position absolute and put in the middle of the screen
        // button.style.position = 'absolute';
        // button.style.top = '50%';
        // button.style.left = '50%';

        // // Give z-index so it's on top of everything
        // button.style.zIndex = '9999';

        // // Make the button bigger
        // button.style.width = '100px';
        // button.style.height = '100px';

        // button.style.backgroundColor = 'red';

        // // youtubeLeftControls.prepend(button);
        // document.body.prepend(button);

        // console.log('Button mounted');
        // console.log(button);

        // ===============================

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
