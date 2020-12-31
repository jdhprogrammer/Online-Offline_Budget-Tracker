let db;
// create a new db request for a "budget" database.
const request = window.indexedDB.open("budget", 1);
request.onupgradeneeded = function(event) {
    // create object store called "pending" and set autoIncrement to true
    db = event.target.result;
    const budgetStore = db.createObjectStore("pending", {
        autoIncrement: true
    });

    // budgetStore.createIndex("")
};

request.onsuccess = function(event) {
    db = event.target.result;

    if (navigator.onLine) {
        checkDatabase();
    }
};

request.onerror = function(event) {
    // log error here
    console.log("Not connected to the Internet, Will Save data until you reconnect")
};

function saveRecord(record) {
    // create a transaction on the pending db with readwrite access
    // access your pending object store
    // add record to your store with add method.
    const transaction = db.transaction(["pending"], "readwrite");
    const budgetStore = transaction.objectStore("pending");
    budgetStore.add(record)
}

function checkDatabase() {
    console.log("checking database.....")
        // open a transaction on your pending db
        // access your pending object store
        // get all records from store and set to a variable
    const transaction = db.transaction(["pending"], "readonly");
    const budgetStore = transaction.objectStore("pending");
    const getAll = budgetStore.getAll()

    getAll.onsuccess = function() {
        if (getAll.result.length > 0) {
            fetch('/api/transaction/bulk', {
                    method: 'POST',
                    body: JSON.stringify(getAll.result),
                    headers: {
                        Accept: 'application/json, text/plain, */*',
                        'Content-Type': 'application/json',
                    },
                })
                .then((response) => response.json())
                .then(() => {
                    // if successful, open a transaction on your pending db
                    // access your pending object store
                    // clear all items in your store
                    const transaction = db.transaction(["pending"], "readwrite");
                    const budgetStore = transaction.objectStore("pending");
                    budgetStore.clear()
                });
        }
    };
}

// listen for app coming back online
window.addEventListener('online', checkDatabase);