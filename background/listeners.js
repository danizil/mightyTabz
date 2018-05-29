//the listener to the request to unpin all
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
	if(request.request == "unpin all"){
		MightyHandlerBackground.currentMighty = "none"
		chrome.tabs.query({pinned: true},function(tabs){
			for(let elt in tabs){
				chrome.tabs.update(tabs[elt].id, {pinned: false});
			}
		})
	}
})


// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
// 	if(request.request == "get tabs from storage"){
// 		chrome.storage.local.get('mightiesTitles', function(gotten){
//             console.log("what was saved in the storage, now on unload:")  
//             console.log(JSON.stringify(gotten.mightiesTitles))
// 			StorageSyncher.mightyFixerUnload()
// 		})
// 	}


//sends the popup a list of tabs to put on the  popup html, this is for when the popup window opens
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
	if(request.message == "what mighties are there"){
		var mightyNameList = [];
		var i = 0;
		if(MightyHandlerBackground.mighties){
			for(let mighty in MightyHandlerBackground.mighties){
			
				mightyNameList[i] = mighty;
				
				i++; 
			}
	//		console.log(MightyHandlerBackground.mighties)
		}
		sendResponse({mighties: mightyNameList, current: MightyHandlerBackground.currentMighty});
		
	}
})


//listener to bring all mighties together
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
	//console.log(JSON.stringify(request))
	if(request.request == "gatherMighty"){
		MightyHandlerBackground.mighties[request.mighty].bringTogether();
		MightyHandlerBackground.currentMighty = request.mighty;
		sendResponse({request: "mighties gathered"});
	}
})


//make a new mighty
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if (request.identifier == "new mighty"){
		newName = request.newMightysName;
		if(newName == ""){
			newName = "Mighty #" + (len(MightyHandlerBackground.mighties) + 1);
		//	console.log("21: empty str, the name is " +newName);
		}
		MightyHandlerBackground.createMighty(newName);
		//console.log(MightyHandlerBackground.mighties)
		//console.log("99: " + JSON.stringify(MightyHandlerBackground.mighties));
	}
}
);


//removes mighty from mighty list
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if (request.request == "remove"){
		MightyHandlerBackground.destroyMighty(request.toRemove)
		sendResponse({backGroundToPopup: "finished"})
		}
	
		
	
})

//sync memory on move
chrome.tabs.onMoved.addListener(function (moved){
	StorageSyncher.sync()
})


/*

//window close save all mighties IMPORTANT TO KEEP THIS ORDER OF CLOSERS CAUSE THIS IS THE FIRST LISTENER


removeWithWindow = {isWindowClosing: "true"};
var toBeSaved = {};
var firstTabClosed = true;

chrome.tabs.onRemoved.addListener(function(tabId, removeWithoutWindow){//this is really annoying, i would like to get the index from id but i cant make query work
	if(firstTabClosed)	
		for(mighty in MightyHandlerBackground.mighties){
			//console.log(MightyHandlerBackground.mighties[mighty])
			//console.log("the closed id in mighty" + MightyHandlerBackground.mighties[mighty].tabIdsList.indexOf(tabId))
			if(MightyHandlerBackground.mighties[mighty].tabIdsList.indexOf(tabId) > -1){ //if tabid in the mighty we are iteratingg, save it to chrome 
				console.log("in the if after close" + MightyHandlerBackground.mighties[mighty].tabIdsList)
			}
		}
		//firstTabClosed = false;

	})

*/
chrome.windows.onRemoved.addListener(function(something){
	console.log("you colsed a window. the mighties in the mightylisty are: " + JSON.stringify(MightyHandlerBackground.mighties))
	chrome.storage.local.get('mightiesTitles', function(gotten){
		console.log("you colsed the window, this is what you saved in the storage (after storage.local.get): " + JSON.stringify(gotten.mightiesTitles))
	})
})

//tab removal, removes tab from mighty. this is shitty and will be changed

var mainWindow //this is a patch. will later be changed to a window class with mightywindow handler whatever
var mainWindowId
var removeWithoutWindow
chrome.windows.getCurrent(function(window){
	mainWindow = window
	mainWindowId = mainWindow.id
	console.log(mainWindowId)
	removeWithoutWindow = {windowId: mainWindowId ,isWindowClosing: "false"}
})

chrome.tabs.onRemoved.addListener(function(tabId, removeWithoutWindow){
	for(let mighty in MightyHandlerBackground.mighties){
		if(MightyHandlerBackground.mighties[mighty].tabIdsList.indexOf(tabId) > -1){
			console.log("tablist before removal: " + JSON.stringify(MightyHandlerBackground.mighties[mighty].tabIdsList))
			MightyHandlerBackground.mighties[mighty].removeTab(tabId);
			//console.log("tablist after removal: " + JSON.stringify(MightyHandlerBackground.mighties[mighty].tabIdsList))
		}
			//all that remains is to remove it from the list, or MAKE THE LIST A METHOD
	}
})
