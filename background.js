chrome.action.onClicked.addListener((tab) => {
  if (tab.url.includes("ebay.com")) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['content.js']
    });
  }
});
