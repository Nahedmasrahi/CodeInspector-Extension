chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getCode") {
        const htmlCode = document.documentElement.outerHTML;
        const cssRules = [...document.styleSheets]
            .map(sheet => {
                try {
                    return [...sheet.cssRules].map(rule => rule.cssText).join("\n");
                } catch (e) {
                    return "";
                }
            })
            .join("\n");

        sendResponse({ html: htmlCode, css: cssRules });
    }
});
