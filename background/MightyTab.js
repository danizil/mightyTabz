class MightyTab {  //make members private
	constructor(n, idsList = []){  
		this.name = n;
		//this.tabIds = {};
		this.tabIdsList = idsList;

	}

	addHighlighedTabs(){
		// reason not to have this function: query will prevent us from sending back the number of tabs for the popup
		// we could have another listener in the popup but that maybe would be jjust as bad as the listener for highlighted in the background
		// although the popup is not always open....
		chrome.tabs.query({highlighted : true}, function(tabs){	
			for(let tabIdx in tabs){
				id = tabs[tabIdx].id
				if(this.tabIdsList.indexOf(id) == -1 && id > 0){

				}
			}
		})
	}
	
	addTabList(idList){
		// this should replace addTab and is fit to handle the adding of individual tabs
		// console.('this mightys tab id list ' + this.tabIdsList[0])
		// console.log('idList at begining of add' + idList[0]) this works fine
		if(typeof idList == 'number'){
			// console.log('the type to be added is a number')
			idList = [idList]
		}
		let formerLength = this.tabIdsList.length
		let l = formerLength
		for(let id in idList){
			if(this.tabIdsList.indexOf(idList[id]) == -1 && idList[id] > 0){
				this.tabIdsList[l] = idList[id]
				l++	
			}	
		}
		if (formerLength != l){
			if(MightyHandlerBackground.currentMighty == this.name){
				this.bringTogether()
			}
			else if(MightyHandlerBackground.currentMighty == 'mightyless'){
				MightyHandlerBackground.collectMightyless()
			}
			StorageSyncher.sync()
		}
		// console.log('does the predefined l equal the length of the ids list after it has changed? formerlength = '+ formerlength +' tabIdsList.length = '+l +
		// '\n if so, go to MightTab.removeTabList and make it sync storage only if lengths are different')	
	}


	addTab(id){
		// soon to be DEPRECATED
		var l = this.tabIdsList.length;
		if(this.tabIdsList.indexOf(id) == -1 && id > 0){
			this.tabIdsList[l] = id
			// MightyHandlerBackground.currentMighty = "none"
			if(MightyHandlerBackground.currentMighty == this.name){
				this.bringTogether()
			}
			else if(MightyHandlerBackground.currentMighty == 'mightyless'){
				MightyHandlerBackground.collectMightyless()
			}
			StorageSyncher.sync();
		}
	}

	newTabInMighty(){
		// This opens a new tab in this mighty
		this.bringTogether()
		// the next line is necessary!! "this" is not the same this in the callback
		let thisMighty = this
		chrome.tabs.create({} , function(newlyOpenedTab){
			thisMighty.addTab(newlyOpenedTab.id)
		})
	}

	removeTab(tabId){
		// Soon to be DEPRECATED
		if(this.tabIdsList.indexOf(tabId) > -1){
			var indexToRemove = this.tabIdsList.indexOf(tabId);
			this.tabIdsList.splice(indexToRemove, 1);
			if(MightyHandlerBackground.currentMighty == this.name){
				this.bringTogether()
			}
			else if(MightyHandlerBackground.currentMighty == 'mightyless'){
				MightyHandlerBackground.collectMightyless()
			}
			StorageSyncher.sync()
		}
		
	}

	
	removeTabList(idList){
		if(typeof idList == 'number'){
			idList = [idList]
		}
		let formerLength = this.tabIdsList.length
		let l = formerLength
		for(let id in idList){
			if(this.tabIdsList.indexOf(idList[id]) > -1){
				var indexToRemove = this.tabIdsList.indexOf(idList[id]);
				this.tabIdsList.splice(indexToRemove, 1);
				l--
			}
		}
		if(l != formerLength){
			if(MightyHandlerBackground.currentMighty == this){
				this.bringTogether()
			}
			else if(MightyHandlerBackground.currentMighty == 'mightyless'){
				MightyHandlerBackground.collectMightyless()
			}
			StorageSyncher.sync()
	
		}
	}
	
	bringTogether(){
		
		//var tabIdsList = this.turnUrlsIntoListOfIds();
		var amountOfTabsInMighty = this.tabIdsList.length;
		var theNameOfTheMighty = this.name
		var listOfTabsInMighty = this.tabIdsList
		MightyHandlerBackground.currentMighty = this.name
		chrome.tabs.query({},function(tabs2){
			
			for(var tab in tabs2){
				var indexOfIdInTabIdList = listOfTabsInMighty.find(function(id){
					return id == tabs2[tab].id;
					})		
				if(indexOfIdInTabIdList)//works fine with the callback return and all
					{//its supposed to release only the pinned mighty members
					if(tabs2[tab].pinned){

						chrome.tabs.update(tabs2[tab].id, {pinned: false});
					}
				}
				else if(!tabs2[tab].pinned){//pin released not members

					chrome.tabs.update(tabs2[tab].id, {pinned: true});
				}
			}
		})
	
		
	}
	
	


}//end of class mightytab

MightyTab.prototype.toString = function printMighty(){
	tbr = "name: " + this.name + "   tabs: " + JSON.stringify(this.tabIdsList); 
	return tbr;
}
 