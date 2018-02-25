var contextMenuItem = {
	"id": "getSuggestion",
	"title": "GetSuggestion",
	"contexts": ["selection"]
};

chrome.contextMenus.create(contextMenuItem); 

chrome.contextMenus.onClicked.addListener(function (clickData) {

    //will change later to getting by tag (hardcoded)
    if (clickData.menuItemId == "getSuggestion" && clickData.selectionText) {
        //chrome.tabs.executeScript(null, { file: 'js/contextMenuScript.js'});

        var textInput = clickData.selectionText;
        var urlQueried = "http://writeon.tech/src/html/search.html?q=" + textInput;

        chrome.tabs.create({ url: urlQueried });
    }
});