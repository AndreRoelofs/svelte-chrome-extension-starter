chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    // Only run when the tab is done loading,
    // and make sure it's the right YouTube watch page
    if (
        changeInfo.status === 'complete' &&
        tab.url &&
        tab.url.includes('youtube.com/watch')
    ) {
        // Instead of splitting off only the first parameter,
        // pass the full query string to URLSearchParams
        const queryString = tab.url.split('?')[1] || '';
        const urlParameters = new URLSearchParams(queryString);

        chrome.tabs.sendMessage(tabId, {
            type: 'NEW',
            videoId: urlParameters.get('v'),
        });
    }
});
