(()=>{let n;const e=window.indexedDB.open("budget",1);function t(){console.log("checking database.....");const e=n.transaction(["pending"],"readonly").objectStore("pending").getAll();e.onsuccess=function(){e.result.length>0&&fetch("/api/transaction/bulk",{method:"POST",body:JSON.stringify(e.result),headers:{Accept:"application/json, text/plain, */*","Content-Type":"application/json"}}).then((n=>n.json())).then((()=>{n.transaction(["pending"],"readwrite").objectStore("pending").clear()}))}}e.onupgradeneeded=function(e){n=e.target.result,n.createObjectStore("pending",{autoIncrement:!0})},e.onsuccess=function(e){n=e.target.result,navigator.onLine&&t()},e.onerror=function(n){console.log("Not connected to the Internet, Will Save data until you reconnect")},window.addEventListener("online",t)})();