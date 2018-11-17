class MightyTab {  //make members private
	constructor(n, idsList = []){  
		this.name = n;
		//this.tabIds = {};
		this.tabIdsList = idsList;

	}


	addTab(id){
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

	
	bringTogether(){
		
		//var tabIdsList = this.turnUrlsIntoListOfIds();
		var amountOfTabsInMighty = this.tabIdsList.length;
		var theNameOfTheMighty = this.name
		var listOfTabsInMighty = this.tabIdsList
		if(theNameOfTheMighty != MightyHandlerBackground.currentMighty){//this is problematic because if you change the moghty you need to switch
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
		
	}
	
	


}//end of class mightytab

MightyTab.prototype.toString = function printMighty(){
	tbr = "name: " + this.name + "   tabs: " + JSON.stringify(this.tabIdsList); 
	return tbr;
}
 