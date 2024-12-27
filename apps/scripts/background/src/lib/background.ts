chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (
        changeInfo.status === 'complete' &&
        tab.url &&
        tab.url.includes('youtube.com/watch')
    ) {
        const queryParameters = tab.url.split('?')[1];
        const urlParameters = new URLSearchParams(queryParameters);

        console.log('Sending message to tab', tabId);

        chrome.tabs.sendMessage(tabId, {
            type: 'NEW',
            videoId: urlParameters.get('v'),
        });
    }
});
