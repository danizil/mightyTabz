//when starting the extension unpin all tabs
chrome.tabs.query({},function(tabs){
	var amountOfOpenTabs = tabs.length;
	//unpin all tabs
	for(var i = 0; i < amountOfOpenTabs; i++){
			chrome.tabs.update(tabs[i].id, {pinned: false});
		
	}
})










class storageSyncher{ //this should work when the browser is being closed
	static addMightyToStorage(name){
		chrome.storage.sync.set({name: []})
	}
	static addTabToMightyInStorage(mightyName, tabId){
		chrome.storage.sync.get([mightyName], function(result){ //if mightyName is not in storage result will be an empty object yaani {}
			result.mightyName.push(tabid);
			console.log(result.mightyName);
		})
	}
}






function len(obj) {
	
	if(obj){
		return Object.keys(obj).length;
	}
	
	else{
		return 0;
	}
 }




