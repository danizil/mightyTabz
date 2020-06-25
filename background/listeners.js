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
		MightyHandlerBackground.currentMighty = "mightyless"
		MightyHandlerBackground.collectMightyless()
	}
	
})


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
	if(request.request == "revive button pressed"){

		// this kills the existing mighties and needs to be moved to mightyhandler
		MightyHandlerBackground.currentMighty = "mightyless"
		for(mighty in MightyHandlerBackground.mighties){
			console.log("after pressing revive in for loop mighty in backround mighty handler\n" + JSON.stringify(MightyHandlerBackground.mighties[mighty]))
			MightyHandlerBackground.destroyMighty(mighty)
		}

		// console.log("in revive function, mighties afte zeroed out: \n" + JSON.stringify(MightyHandlerBackground.mighties))
		// console.log("the backup mighties: \n" + JSON.stringify(MightyHandlerBackground.backupMighties))
		StorageSyncher.turnTitleMightyListIntoMightiesList(MightyHandlerBackground.backupMighties)
		// next line and response will give background mighties that are nothing because of an asynchronous function in turnTitleMighties....
		mightiesNameLength = MightyHandlerBackground.getMightiesLengths(MightyHandlerBackground.backupMighties)
		console.log('in revive, mightyHandelers mighties:\n' + JSON.stringify(mightiesNameLength))
		// well i dont have to send the mighties, only the lengths...
		
		sendResponse({restored: true, mightiesNameLength: mightiesNameLength})
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

// !!!!!DEPRECATED!!!!!Listener for current page action
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
	if(request.current){
		chrome.tabs.query({active: true, lastFocusedWindow: true}, function(tabs){
			switch(request.request){
			case 'add current':
				console.log("in case add current")
				MightyHandlerBackground.mighties[request.toBeAdeedTo].addTab(tabs[0].id)
				if(MightyHandlerBackground.currentMighty == request.toBeAdeedTo){
					MightyHandlerBackground.mighties[request.toBeAdeedTo].bringTogether()
				}
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

			sendResponse(responseToBeSent)
				
		})
	}
})

//listener to add highlighted (also includes the current tab)
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
	if(request.current){
		switch(request.request){
		case 'add highlighted':
			MightyHandlerBackground.mighties[request.toBeAdeedTo].addTabList(MightyHandlerBackground.highlightedTabs)
			if(MightyHandlerBackground.currentMighty == request.toBeAdeedTo){
				MightyHandlerBackground.mighties[MightyHandlerBackground.currentMighty].bringTogether()
			}
			responseToBeSent = {added : true, newLength : MightyHandlerBackground.mighties[request.toBeAdeedTo].tabIdsList.length}
			break
		case 'remove highlighted from mighty':
			// If the current tab's id is in the mighty with the name sent
			MightyHandlerBackground.mighties[request.nameToRemoveTabsFrom].removeTabList(MightyHandlerBackground.highlightedTabs)
			if(MightyHandlerBackground.currentMighty == request.nameToRemoveTabsFrom){
				MightyHandlerBackground.mighties[MightyHandlerBackground.currentMighty].bringTogether()
			}
			responseToBeSent = {currInMighty: true, newLength : MightyHandlerBackground.mighties[request.nameToRemoveTabsFrom].tabIdsList.length}
			break
		default:
			responseToBeSent = {added : 'no valid option given'}
		}
		sendResponse(responseToBeSent)

	}
})


// listener for opening new tab in mighty
chrome.runtime.onMessage.addListener(function(request,sender,sendResponse){
	if(request.request == 'open new in mighty'){
		mightyName = request.nameToOpenNewTabIn
		MightyHandlerBackground.mighties[mightyName].newTabInMighty()
	}
})

// listener for when there is an opener tab id
// chrome.tabs.onCreated.addListener(function(newlyOpenedTab){
// 	if(newlyOpenedTab.openerTabId){
// 		console.log('opener tab ' + newlyOpenedTab.openerTabId)
// 	}
// })
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
	// this is important when a tab changes it's title
	StorageSyncher.sync()
})

// this listener handels when a tab changes it's id
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
	
	}
})
// can do this cleverer: run query in addTabList for highlighted and add them in the callback, instead of saving all highlighted. this will also make the listeners shorter 
chrome.tabs.onHighlighted.addListener(function(highlighted){
	// basically the mistake is with the computer interperting the highlighted object good luck
	MightyHandlerBackground.highlightedTabs = highlighted.tabIds
})
//listening to keybord shortcuts
chrome.commands.onCommand.addListener( function(command)	{
	switch(command)	{
		case "open_tab_in_current_mighty":
			console.log(MightyHandlerBackground.currentMighty)
			if(MightyHandlerBackground.currentMighty)
				MightyHandlerBackground.mighties[MightyHandlerBackground.currentMighty].newTabInMighty()
		break
		case "next_tab_in_mighty":
			chrome.tabs.query({highlighted: true}, (tabs)	=>	{
				MightyHandlerBackground.getCurrent((mighty) => {
					chrome.tabs.get(mighty.nextTabInMighty(tabs[0].id), (tab) =>	{
						chrome.tabs.highlight({tabs:tab.index})
					})
				})
			})
		break
		case "previous_tab_in_mighty":
			chrome.tabs.query({highlighted: true}, (tabs)	=>	{
				MightyHandlerBackground.getCurrent((mighty) => {
					chrome.tabs.get(mighty.prevTabInMighty(tabs[0].id), (tab) =>	{
						chrome.tabs.highlight({tabs:tab.index})
					})
				})
			})
		break
		case "add_current_tab_to_mighty":
			chrome.tabs.query({active:true, currentWindow:true} , function( tab )	{
				var currentMighty = MightyHandlerBackground.getCurrent( function( mighty ) {
					if(!mighty || !tab)
						return
					mighty.addTabList(tab[0].id)
				})
			})
		break
		case "remove_current_tab_from_mighty":
			chrome.tabs.query({active:true, currentWindow:true} , function( tab )	{
				var currentMighty = MightyHandlerBackground.getCurrent( function( mighty ) {
					if(!mighty || tab.length === 0)
						return
					mighty.removeTabList(tab[0].id)
					mighty.bringTogether()
				})
			})
		break
			
	}
})


chrome.sessions.onChanged.addListener(function(){
	console.log("sessions.onChanged fired ")
})
// onChanged fires when something of value closes (not new tab)

function incMod(x, mod)	{
	return (x + 1)%mod
}

	
