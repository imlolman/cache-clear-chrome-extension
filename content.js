```javascript
// content.js

// Function to clear site-specific data
function clearSiteData() {
    // Clear cookies
    document.cookie.split(";").forEach(function(c) {
        document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });

    // Clear localStorage
    localStorage.clear();

    // Clear sessionStorage
    sessionStorage.clear();

    // Clear IndexedDB
    indexedDB.deleteDatabase('_pouch_');

    // Clear WebSQL
    var db = openDatabase('mydb', '1.0', 'Test DB', 2 * 1024 * 1024);
    db.transaction(function (tx) {
        tx.executeSql('DROP TABLE IF EXISTS LOGS');
    });

    // Clear Service Workers
    navigator.serviceWorker.getRegistrations().then(function(registrations) {
        for(let registration of registrations) {
            registration.unregister();
        }
    });
}

// Listen for a message from the background script
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.message === "clearCache") {
            clearSiteData();
            sendResponse({result: "Cache cleared"});
        }
    }
);
```