class MightyTab {  //make members private
	constructor(n, idsList = []){  
		this.name = n;
		//this.tabIds = {};
		this.tabIdsList = idsList;

	}

	addTabList(idList){
		// this should replace addTab and is fit to handle the adding of individual tabs
		console.log('this mightys tab id list ' + this.tabIdsList[0])
		// console.log('idList at begining of add' + idList[0]) this works fine
		if(typeof idList == 'number'){
			console.log('the type to be added is a number')
			idList = [idList]
		}
		let l = this.tabIdsList.length
		for(let id in idList){
			console.log('id in id list ' + idList[id])
			if(this.tabIdsList.indexOf(idList[id]) == -1 && idList[id] > 0){
				this.tabIdsList[l] = idList[id]
				l++	
			}	
		}
		StorageSyncher.sync()
		console.log('does the predefined l equal the length of the ids list after it has changed? l = '+ l +' tabIdsList.length = '+this.tabIdsList.length +
		'\n if so, go to MightTab.removeTabList and make it sync storage only if lengths are different')	
	}


	addTab(id){
		// soon to be DEPRECATED
		var l = this.tabIdsList.length;
		if(this.tabIdsList.indexOf(id) == -1 && id > 0){
			this.tabIdsList[l] = id
			MightyHandlerBackground.currentMighty = "none"
			StorageSyncher.sync();
		}
		else{
			if(this.tabIdsList.indexOf(id) != -1){
			}
			else if (id<=0){
			}
		}
	}

	newTabInMighty(){
		// This opens a new tab in this mighty
		let thisMighty = this
		chrome.tabs.create({} , function(newlyOpenedTab){
			console.log("tab id ", newlyOpenedTab.id)
			console.log("tab id list \n", thisMighty.tabIdsList)
			thisMighty.addTab(newlyOpenedTab.id)
		})
	}

	removeTab(tabId){
		if(this.tabIdsList.indexOf(tabId) > -1){
			var indexToRemove = this.tabIdsList.indexOf(tabId);
			this.tabIdsList.splice(indexToRemove, 1);
			StorageSyncher.sync()
		}
		
	}

	
	removeTabList(idList){
		if(typeof idList == 'number'){
			idList = [idList]
		}
		let l = this.tabIdsList.length
		for(let id in idList){
			if(this.tabIdsList.indexOf(idList[id]) > -1){
				var indexToRemove = this.tabIdsList.indexOf(idList[id]);
				this.tabIdsList.splice(indexToRemove, 1);
				
			}
		}
		StorageSyncher.sync()
		console.log('does the predefined l equal the length of the ids list after it has changed? l = '+ l +' tabIdsList.length = '+this.tabIdsList.length  +
		' \n if so, go to MightTab.removeTabList and make it sync storage only if lengths are different')
	}

	
	bringTogether(){
		
		//var tabIdsList = this.turnUrlsIntoListOfIds();
		var amountOfTabsInMighty = this.tabIdsList.length;
		var theNameOfTheMighty = this.name
		var listOfTabsInMighty = this.tabIdsList
		
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
 