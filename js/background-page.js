// React when a browser action's icon is clicked.
chrome.browserAction.onClicked.addListener((tab) => {
    window.open(chrome.extension.getURL("html/index.html"), "_target");
});