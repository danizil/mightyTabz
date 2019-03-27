 ///<reference path="C:\Users\User\Documents\לימודים\comps\chrome_extensions\mightyTab\mightyTab\chrome-api-vsdoc.js"/>



chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
	if(request.request == "unpin all"){
		MightyHandlerBackground.currentMighty = ""
		chrome.tabs.query({pinned: true},function(tabs){
			for(let elt in tabs){
				chrome.tabs.update(tabs[elt].id, {pinned: false});
			}
		})
	}
})



chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
	if(request.request == "collect mightyless"){
		MightyHandlerBackground.currentMighty = ""
		MightyHandlerBackground.collectMightyless()
	}
	
})


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
	if(request.request == "revive button pressed"){

		MightyHandlerBackground.currentMighty = ""
		for(mighty in MightyHandlerBackground.mighties){
			console.log("after pressing revive in for loop mighty in backround mighty handler\n" + JSON.stringify(MightyHandlerBackground.mighties[mighty]))
			MightyHandlerBackground.destroyMighty(mighty)
		}

		console.log("in revive function, mighties afte zeroed out: \n" + JSON.stringify(MightyHandlerBackground.mighties))
		console.log("the backup mighties: \n" + JSON.stringify(MightyHandlerBackground.backupMighties))
		StorageSyncher.turnTitleMightyListIntoMightiesList(MightyHandlerBackground.backupMighties)
		//console.log("the mighties after revive\n" + JSON.stringify(MightyHandlerBackground.mighties))
		
		/*
		for(mighty in MightyHandlerBackground.backupMighties){
			MightyHandlerBackground.mighties[mighty] = new MightyTab(mighty, MightyHandlerBackground.backupMighties[mighty].tabIdsList)
		}
		*/
		//StorageSyncher.sync()
	}
	
})


//sends the popup a list of tabs to put on the  popup html, this is for when the popup window opens
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
	if(request.message == "what mighties are there"){
		var mightyNameList = [];
		var i = 0;
		if(MightyHandlerBackground.mighties){
			for(let mighty in MightyHandlerBackground.mighties){
			
				mightyNameList[i] = [mighty, MightyHandlerBackground.mighties[mighty].tabIdsList.length];
				
				i++; 
			}
		}
		sendResponse({mighties: mightyNameList, current: MightyHandlerBackground.currentMighty});
		
	}
})


//listener to bring all mighties together
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
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
		}
		MightyHandlerBackground.createMighty(newName);
	}
}
);


//removes mighty from mighty list
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if (request.request == "remove mighty"){
		MightyHandlerBackground.destroyMighty(request.toRemove)
		sendResponse({backGroundToPopup: "finished"})
		}
})


		// The listeners for the current window options

// Listener for current page action
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
	if(request.current){
		chrome.tabs.query({active: true, lastFocusedWindow: true}, function(tabs){
			switch(request.request){
			case 'add current':
				console.log("in case add current")
				MightyHandlerBackground.mighties[request.toBeAdeedTo].addTab(tabs[0].id)
				responseToBeSent = {added: true}
				break	
			case 'remove current from mighty':
				console.log("in case remove current")
				nameToRemoveFrom = request.nameToRemoveTabFrom
				// If the current tab's id is in the mighty with the name sent
				if (MightyHandlerBackground.mighties[nameToRemoveFrom].tabIdsList.indexOf(tabs[0].id) != -1){
					MightyHandlerBackground.mighties[nameToRemoveFrom].removeTab(tabs[0].id)
					responseToBeSent = {currInMighty: true}
				}
				else{
					responseToBeSent = {currInMighty: false}
				}
				break	
			}
			console.log("response to be seent current tab\n", responseToBeSent)
			sendResponse(responseToBeSent)
				
		})
		// sendResponse({response: "peins of donkey"})
	
	}
})

// listener for opening new tab in mighty
chrome.runtime.onMessage.addListener(function(request,sender,sendResponse){
	if(request.request == 'open new in mighty'){
		mightyName = request.nameToOpenNewTabIn
		MightyHandlerBackground.mighties[mightyName].newTabInMighty()
	}
})

//tab removal, removes tab from mighty. this is shitty and will be changed

var mainWindow //this is a patch. will later be changed to a window class with mightywindow handler whatever
var mainWindowId
var removeWithoutWindow
chrome.windows.getCurrent(function(window){
	mainWindow = window
	mainWindowId = mainWindow.id
	removeWithoutWindow = {windowId: mainWindowId ,isWindowClosing: "false"}
})

var date = new Date()
var now = date.getTime()

chrome.tabs.onRemoved.addListener(function(tabId, removeWithoutWindow){
	let old_t = now;
	delete date
	let date = new Date();
	now = date.getTime()
	let dt = now - old_t;
	if(dt > 100){
		for(let mighty in MightyHandlerBackground.mighties){
			if(MightyHandlerBackground.mighties[mighty].tabIdsList.indexOf(tabId) > -1){
				MightyHandlerBackground.mighties[mighty].removeTab(tabId);
				MightyHandlerBackground.backupMighties[mighty].removeTab(tabId)
			}
				//all that remains is to remove it from the list, or MAKE THE LIST A METHOD
		}
	}
})

chrome.tabs.onUpdated.addListener(function(tab){
	StorageSyncher.sync()
})

chrome.webNavigation.onTabReplaced.addListener(function(details){
	let oldId = details.replacedTabId
	let newId = details.tabId
	console.log("a tab has changed id number:\n " + details)
	for(let mighty in MightyHandlerBackground.mighties){
		let indexOfTab = MightyHandlerBackground.mighties[mighty].tabIdsList.indexOf(oldId)
		if(indexOfTab > -1){
			console.log("the tab with id: " + JSON.stringify(MightyHandlerBackground.mighties[mighty].tabIdsList[indexOfTab]+ " in mighty" + mighty) )
			MightyHandlerBackground.mighties[mighty].tabIdsList[indexOfTab] = newId
		}
		console.log("the new mighties in handler: \n" + JSON.stringify(MightyHandlerBackground.mighties))
	}
})