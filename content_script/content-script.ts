(async() => {
    const src = chrome.runtime.getURL('assets/main.js');
    await import(src);
})()