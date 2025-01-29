// background.js
chrome.runtime.onInstalled.addListener(function() {
  chrome.contextMenus.create({
    id: "saveResource",
    title: "Salva risorsa",
    contexts: ["page", "link"]
  });
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
  if (info.menuItemId === "saveResource") {
    chrome.action.openPopup();
  }
});