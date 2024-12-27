import '@webcomponents/custom-elements';
import '@svelte-chrome-extension-starter/bookmark-button';

(() => {
    let youtubeLeftControls: HTMLElement;
    let youtubePlayer: HTMLVideoElement;
    let currentVideo = '';
    let currentVideoBookmarks = [];

    chrome.runtime.onMessage.addListener((obj, _, response) => {
        const { type, value, videoId } = obj;

        if (type === 'NEW') {
            currentVideo = videoId;
            console.log(currentVideo);
            newVideoLoaded();
        } else if (type === 'PLAY') {
            youtubePlayer.currentTime = value;
        } else if (type === 'DELETE') {
            currentVideoBookmarks = currentVideoBookmarks.filter(
                (b) => b.time != value,
            );
            chrome.storage.sync.set({
                [currentVideo]: JSON.stringify(currentVideoBookmarks),
            });

            response(currentVideoBookmarks);
        }
    });

    const newVideoLoaded = async () => {
        console.log('New video loaded');

        youtubeLeftControls = document.querySelector(
            '.ytp-left-controls',
        ) as HTMLElement;

        youtubePlayer = document.getElementsByClassName(
            'video-stream',
        )[0] as HTMLVideoElement;

        if (!youtubeLeftControls) {
            console.error('Could not find youtubeLeftControls');
            // return;
        }

        const button = document.createElement('tws-bookmark-button');
        console.log('Button created', button);
        button['text'] = 'Bookmark';

        youtubeLeftControls.append(button);

        button.addEventListener('click', addNewBookmarkEventHandler);
    };

    const fetchBookmarks = () => {
        return new Promise<[]>((resolve) => {
            chrome.storage.sync.get([currentVideo], (obj) => {
                resolve(obj[currentVideo] ? JSON.parse(obj[currentVideo]) : []);
            });
        });
    };

    const getTime = (t) => {
        const date = new Date(0);
        date.setSeconds(t);

        return date.toISOString().substring(11, 8);
    };

    const addNewBookmarkEventHandler = async () => {
        const currentTime = youtubePlayer.currentTime;
        const newBookmark = {
            time: currentTime,
            desc: 'Bookmark at ' + getTime(currentTime),
        };

        currentVideoBookmarks = await fetchBookmarks();

        chrome.storage.sync.set({
            [currentVideo]: JSON.stringify(
                [...currentVideoBookmarks, newBookmark].sort(
                    (a, b) => a.time - b.time,
                ),
            ),
        });
    };

    newVideoLoaded();
})();
