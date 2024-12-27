chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (tab.url && tab.url.includes('youtube.com/watch')) {
        const queryParameters = tab.url.split('?')[1];
        const urlParameters = new URLSearchParams(queryParameters);

        console.log('Sending message to tab', tabId);

        chrome.tabs.sendMessage(tabId, {
            type: 'NEW',
            videoId: urlParameters.get('v'),
        });
    }
});

// chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
//     // Only run when the tab is done loading,
//     // and make sure it's the right YouTube watch page
//     if (
//         changeInfo.status === 'complete' &&
//         tab.url &&
//         tab.url.includes('youtube.com/watch')
//     ) {
//         // Instead of splitting off only the first parameter,
//         // pass the full query string to URLSearchParams
//         const video = tab.url.split('v=')[1].split('&')[0];
//         // const urlParameters = new URLSearchParams(queryString);

//         chrome.tabs.sendMessage(tabId, {
//             type: 'NEW',
//             videoId: urlParameters.get('v'),
//         });
//     }
// });
