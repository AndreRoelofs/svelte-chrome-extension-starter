import '@webcomponents/custom-elements';
import '@svelte-chrome-extension-starter/bookmark-button';

(() => {
    // if (window['hasTWSExtension']) {
    //     window['hasTWSExtension'] = true;
    //     return;
    // }

    let youtubeLeftControls: HTMLElement;
    let youtubePlayer: HTMLVideoElement;
    let currentVideo = '';
    let currentVideoBookmarks = [];

    const fetchBookmarks = () => {
        return new Promise((resolve) => {
            chrome.storage.sync.get([currentVideo], (obj) => {
                resolve(obj[currentVideo] ? JSON.parse(obj[currentVideo]) : []);
            });
        });
    };

    const addNewBookmarkEventHandler = async () => {
        if (currentVideo === '') {
            console.error('No video found');
            return;
        }

        const currentTime = youtubePlayer.currentTime;
        // Get the title of the video
        const title = document.querySelector(
            'yt-formatted-string.style-scope.ytd-watch-metadata',
        ) as HTMLElement;

        const newBookmark = {
            timestamp: currentTime,
            createdAt: new Date().toISOString(),
            title: title.innerText,
            // time: currentTime,
            // desc: 'Bookmark at ' + getTime(currentTime),
        };

        currentVideoBookmarks = (await fetchBookmarks()) as unknown[];

        chrome.storage.sync.set({
            [currentVideo]: JSON.stringify(
                [...currentVideoBookmarks, newBookmark].sort(
                    (a, b) => a.timestamp - b.timestamp,
                ),
            ),
        });
    };

    const newVideoLoaded = async () => {
        const bookmarkButtonExists = document.querySelector(
            'tws-bookmark-button',
        );

        currentVideoBookmarks = (await fetchBookmarks()) as unknown[];

        if (bookmarkButtonExists) {
            return;
        }

        youtubeLeftControls = document.querySelector(
            '.ytp-left-controls',
        ) as HTMLElement;

        youtubePlayer = document.getElementsByClassName(
            'video-stream',
        )[0] as HTMLVideoElement;

        if (!youtubeLeftControls || !youtubePlayer) {
            console.error('Could not find youtube player');
            return;
        }

        const button = document.createElement('tws-bookmark-button');
        console.log('Button created', button);
        button['text'] = 'Bookmark';

        youtubeLeftControls.append(button);

        button.addEventListener('click', addNewBookmarkEventHandler);
    };

    chrome.runtime.onMessage.addListener((obj, _, response) => {
        console.log('Received message', obj);
        const { type, value, videoId } = obj;

        // currentVideoBookmarks = (await fetchBookmarks()) as unknown[];

        if (type === 'NEW') {
            currentVideo = videoId;
            newVideoLoaded();
        } else if (type === 'PLAY') {
            console.log('playing', value);
            youtubePlayer.currentTime = value;
        } else if (type === 'DELETE') {
            console.log(currentVideoBookmarks);
            currentVideoBookmarks = currentVideoBookmarks.filter(
                (b) => b.timestamp != value,
            );
            chrome.storage.sync.set({
                [currentVideo]: JSON.stringify(currentVideoBookmarks),
            });

            fetchBookmarks().then((bookmarks: []) => {
                currentVideoBookmarks = bookmarks;
            });

            response(currentVideoBookmarks);
        }
    });

    // document.addEventListener('DOMContentLoaded', newVideoLoaded);
    newVideoLoaded();
})();
