 ///<reference path="C:\Users\User\Documents\לימודים\comps\chrome_extensions\mightyTab\mightyTab\chrome-api-vsdoc.js"/>
 var contextMenuItemParent = {
	"id": "migthy tabs uber parent",
	"title": "Whelcome MightyTabbers!",
	"contexts": ["all"]
	
};
chrome.contextMenus.create(contextMenuItemParent);


// dont try to create to parents. it wont allow it and 
//they will just be pushed to be children of the one and only parent
// var secondParent = {
// 	"id": "mightyTabz2",
// 	"title": "WhelhtyTabbers!",
// 	"contexts": ["all"]
	
// };
// chrome.contextMenus.create(secondParent)

var contextMenuAddToMighty = {
	"id": "addToMighty",
	"title": "Add Current to Mighty",
	"parentId" : "migthy tabs uber parent",
	"contexts": ["all"]
}
chrome.contextMenus.create(contextMenuAddToMighty)

var contextMenuRemoveFromMighty = {
	"id": "removeFromMighty",
	"title": "Remove from Mighty",
	"parentId" : "migthy tabs uber parent",
	"contexts": ["all"]
}
chrome.contextMenus.create(contextMenuRemoveFromMighty)

var contextMenuOpenNewTabInMighty = {
	"id": "newTabInMighty",
	"title": "New Tab In Mighty:",
	"parentId" : "migthy tabs uber parent",
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

	else if(clickData.menuItemId == "removeFromMighty"){
		mightiesListForThisTab = MightyHandlerBackground.findMightiesForTab(tab.id)
		for(let i in mightiesListForThisTab){
			ContextMenusHandler.addItemToParent(mightiesListForThisTab[i] + "toRemove", mightiesListForThisTab[i], "removeFromMighty")
		}
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