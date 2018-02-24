var contextMenuItem = {
	"id": "GetText",
	"title": "GetText",
	"contexts": ["selection"]
};

chrome.contextMenus.create(contextMenuItem); 

chrome.contextMenus.onClicked.addListener(function(clickData)){
	if (clickData.menuItemId == "GetText" && clickData.selectionText){
		chrome.tabs.create({'url': chrome.extension.getURL('popup.html')}, function(tab) {
  		
  		});
	}
})
