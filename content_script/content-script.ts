(async() => {
    const src = chrome.runtime.getURL('assets/content-main.js');
    await import(src);
})()