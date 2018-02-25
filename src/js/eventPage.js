var contextMenuItem = {
	"id": "writeOn",
	"title": "WriteOn",
	"contexts": ["selection"]
};

chrome.contextMenus.create(contextMenuItem); 

chrome.contextMenus.onClicked.addListener(function (clickData) {

    //will change later to getting by tag (hardcoded)
    if (clickData.menuItemId == "writeOn" && clickData.selectionText) {
        //chrome.tabs.executeScript(null, { file: 'js/contextMenuScript.js'});

        var textInput = clickData.selectionText;
        var urlQueried = "https://writeon.azurewebsites.net/src/html/search.html?q=" + textInput;

        chrome.tabs.create({ url: urlQueried });
    }
});