```javascript
// popup.js

// Function to trigger clear data
function triggerClearData() {
    // Send a message to the background script
    chrome.runtime.sendMessage({action: "clearCache"});
}

// Add event listener for when the popup is opened
document.addEventListener('DOMContentLoaded', triggerClearData);
```