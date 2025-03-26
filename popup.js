document.getElementById("getCode").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript(
            {
                target: { tabId: tabs[0].id },
                func: getCodeFromPage
            },
            (injectionResults) => {
                if (injectionResults && injectionResults[0]) {
                    document.getElementById("output").textContent = 
                        "HTML:\n" + injectionResults[0].result.html + 
                        "\n\nCSS:\n" + injectionResults[0].result.css;
                }
            }
        );
    });
});

function getCodeFromPage() {
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

    return { html: htmlCode, css: cssRules };
}
