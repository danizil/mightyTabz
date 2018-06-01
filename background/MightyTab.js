class MightyTab {  //make members private
	constructor(n, idsList = []){  
		this.name = n;
		//this.tabIds = {};
		this.tabIdsList = idsList;

	}


	addTab(id){
		var l = this.tabIdsList.length;
		//console.log("ids list length"+l)
		if(this.tabIdsList.indexOf(id) == -1 ){
			this.tabIdsList[l] = id
		//	console.log("welcome to the function addTab(id). this is the last member of the tablist: " + this.tabIdsList[l +  "and the tab that was added is also: " + id])
			MightyHandlerBackground.currentMighty = "none"
		}

		StorageSyncher.sync();
		
	}

	removeTab(tabId){
		if(this.tabIdsList.indexOf(tabId) > -1){
			var indexToRemove = this.tabIdsList.indexOf(tabId);
			this.tabIdsList.splice(indexToRemove, 1);
		}
		/*
		if(this.tabIdsList[0] == undefined){
			MightyHandlerBackground.destroyMighty(this.name)
		}
		*/
		StorageSyncher.sync()
	}

	
	bringTogether(){
		
		//var tabIdsList = this.turnUrlsIntoListOfIds();
		var amountOfTabsInMighty = this.tabIdsList.length;
		var theNameOfTheMighty = this.name
		var listOfTabsInMighty = this.tabIdsList

		console.log("bring together")
		if(theNameOfTheMighty != MightyHandlerBackground.currentMighty){//this is problematic because if you change the moghty you need to switch
			//gets ids of the mightys url	
																	//console.log("122: ids list:" + this.tabIdsList)
			//chrome.tabs.move(this.tabIdsList,{index: 0}, function(taben){
				chrome.tabs.query({},function(tabs2){
					
					for(var tab in tabs2){
						var indexOfIdInTabIdList = listOfTabsInMighty.find(function(id){
							return id == tabs2[tab].id;
							})
						console.log("index of id in tab ids list: " + indexOfIdInTabIdList)	
						
						if(indexOfIdInTabIdList)//works fine with the callback return and all
							{//its supposed to release only the pinned mighty members
							console.log(indexOfIdInTabIdList)
							if(tabs2[tab].pinned){

								chrome.tabs.update(tabs2[tab].id, {pinned: false});
							}
						}
						else if(!tabs2[tab].pinned){//pin released not members
 
							chrome.tabs.update(tabs2[tab].id, {pinned: true});
						}
					}
				})
	 		//})					
		}
		
	}
	
	


}//end of class mightytab

MightyTab.prototype.toString = function printMighty(){
	tbr = "name: " + this.name + "   tabs: " + JSON.stringify(this.tabIdsList); 
	return tbr;
}
 