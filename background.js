let videos = [];

chrome.webRequest.onHeadersReceived.addListener(
(details) => {
    const url = details.url;

    if (
        url.includes(".mp4") ||
        url.includes(".webm") ||
        url.includes(".m3u8")
    ) {
        videos.push(url);
        console.log("Found:", url);
    }
},
{ urls: ["<all_urls>"] },
["responseHeaders"]
);

chrome.action.onClicked.addListener(() => {
    if (videos.length > 0) {
        chrome.downloads.download({
            url: videos[videos.length - 1]
        });
    } else {
        console.log("No video found");
    }
});