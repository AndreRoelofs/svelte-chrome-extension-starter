chrome.tabs.onUpdated.addListener((tabId, tab) => {
    if (tab.url && tab.url.includes('youtube.com/watch')) {
        const queryParameters = tab.url.split('?')[1].split('&')[0];
        const urlParameters = new URLSearchParams(queryParameters);

        console.log('Sending message to tab', tabId);

        chrome.tabs.sendMessage(tabId, {
            type: 'NEW',
            videoId: urlParameters.get('v'),
        });
    }
});

// Add listener on first load page
chrome.tabs.onActivated.addListener((activeInfo) => {
    chrome.tabs.get(activeInfo.tabId, (tab) => {
        if (tab.url && tab.url.includes('youtube.com/watch')) {
            const queryParameters = tab.url.split('?')[1].split('&')[0];
            const urlParameters = new URLSearchParams(queryParameters);

            console.log('Sending message to tab', activeInfo.tabId);

            chrome.tabs.sendMessage(activeInfo.tabId, {
                type: 'NEW',
                videoId: urlParameters.get('v'),
            });
        }
    });
});
