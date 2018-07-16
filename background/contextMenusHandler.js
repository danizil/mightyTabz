 ///<reference path="C:\Users\User\Documents\לימודים\comps\chrome_extensions\mightyTab\mightyTab\chrome-api-vsdoc.js"/>
 var contextMenuItemParent = {
	"id": "mightyTabz",
	"title": "Whelcome MightyTabbers!",
	"contexts": ["all"]
	
};
chrome.contextMenus.create(contextMenuItemParent);



var contextMenuAddToMighty = {
	"id": "addToMighty",
	"title": "Add Current to Mighty",
	"parentId" : "mightyTabz",
	"contexts": ["all"]
}
chrome.contextMenus.create(contextMenuAddToMighty)

var contextMenuRemoveFromMighty = {
	"id": "removeFromMighty",
	"title": "Remove from Mighty",
	"parentId" : "mightyTabz",
	"contexts": ["all"]
}
chrome.contextMenus.create(contextMenuRemoveFromMighty)

var contextMenuOpenNewTabInMighty = {
	"id": "newTabInMighty",
	"title": "New Tab In Mighty:",
	"parentId" : "mightyTabz",
	"contexts": ["all"]
}
chrome.contextMenus.create(contextMenuOpenNewTabInMighty)

chrome.contextMenus.onClicked.addListener(function(clickData, tab){
	// the uniqueness of the menu item is its title
	if(clickData.parentMenuItemId == "addToMighty"){
		MightyHandlerBackground.mighties[clickData.menuItemId].addTab(tab.id); 
	}

	else if(clickData.parentMenuItemId == "newTabInMighty"){
		chrome.tabs.create({} , function(newlyOpenedTab){
			mightyNameWithEnding = clickData.menuItemId
			mightyName = mightyNameWithEnding.slice(0, mightyNameWithEnding.length - 8)
			console.log(mightyName)
			MightyHandlerBackground.mighties[mightyName].addTab(newlyOpenedTab.id)
		})
	}

});

//context menus appear in the following files: 
// 1) storageSyncher.onUnload creates context menu items
// 2) mighty handler background has create and remove

class ContextMenusHandler{
	static addItemToParent(id, title, parent){
		var contextMenuItem = {
			"id": id,
			"title": title,
			"parentId" : parent,
			"contexts": ["all"]
		}
		
		chrome.contextMenus.create(contextMenuItem)
	}
	static removeItem(name){	
		chrome.contextMenus.remove(name)
	}
}