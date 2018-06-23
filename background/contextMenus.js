 ///<reference path="C:\Users\User\Documents\לימודים\comps\chrome_extensions\mightyTab\mightyTab\chrome-api-vsdoc.js"/>
 var contextMenuItemParent = {
	"id": "addToMighty",
	"title": "Add to Mighty",
	"contexts": ["all"]
	
};

/*
var contextMenuOpenInNewTabInMightyParent = {
	"id": "OpenInNewTabInMighty",
	"title": "Open Link In New Tab In Mighty:",
	"contexts": ["link"]
}
*/

chrome.contextMenus.create(contextMenuItemParent);
//chrome.contextMenus.create(contextMenuOpenInNewTabInMightyParent)