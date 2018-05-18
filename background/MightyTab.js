class MightyTab {  //make members private
	constructor(n){  
		this.name = n;
		//this.tabIds = {};
		this.tabIdsList = [];

	}

	addTab(id){
		var l = this.tabIdsList.length;
		console.log("ids list length"+l)
		if(this.tabIdsList.indexOf(id) == -1 ){
			this.tabIdsList[l] = id
			MightyHandlerBackground.currentMighty = "none"
		}

	}

	removeTab(tabId){
		if(this.tabIdsList.indexOf(tabId) > -1){
			var indexToRemove = this.tabIdsList.indexOf(tabId);
			this.tabIdsList.splice(indexToRemove, 1);
		}
	}

	
	bringTogether(){
		
		//var tabIdsList = this.turnUrlsIntoListOfIds();
		var amountOfTabsInMighty = this.tabIdsList.length;
		var theNameOfTheMighty = this.name
		var listOfTabsInMighty = this.tabIdsList

		if(theNameOfTheMighty != MightyHandlerBackground.currentMighty){//this is problematic because if you change the moghty you need to switch
			//gets ids of the mightys url	
			console.log("122: ids list:" + this.tabIdsList)
			//chrome.tabs.move(this.tabIdsList,{index: 0}, function(taben){
				chrome.tabs.query({},function(tabs2){

					//pin and unpin the proper tabs
					
					for(var tab in tabs2){
						var indexOfIdInTabIdList = listOfTabsInMighty.find(function(id){
							return id == tabs2[tab].id;
							})
						console.log(indexOfIdInTabIdList)
						if(indexOfIdInTabIdList)
							{//release the pinned mighty members
							
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
