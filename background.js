 ///<reference path="chrome-api-vsdoc.js"/>
 var contextMenuItemParent = {
	"id": "addToMighty",
	"title": "Add to Mighty",
	"contexts": ["all"]
	
};

chrome.contextMenus.create(contextMenuItemParent);


//when starting the extension unpin all tabs
chrome.tabs.query({},function(tabs){
	var amountOfOpenTabs = tabs.length;
	//unpin all tabs
	for(var i = 0; i < amountOfOpenTabs; i++){
			chrome.tabs.update(tabs[i].id, {pinned: false});
		
	}

})

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


//sends the popup a list of tabs to put on the html
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
	if(request.message == "what mighties are there"){
		var mightyNameList = [];
		var i = 0;
		for(let mighty in MightyHandlerBackground.mighties){
		
			mightyNameList[i] = mighty;
			i++; 
		}
		
		sendResponse({mighties: mightyNameList, current: MightyHandlerBackground.currentMighty});
	}
})


//listener to bring all mighties together
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
	console.log(JSON.stringify(request))
	if(request.request == "gatherMighty"){
		MightyHandlerBackground.mighties[request.mighty].bringTogether();
		MightyHandlerBackground.currentMighty = request.mighty;
		sendResponse({request: "mighties gathered"});
	}
})


//make a new mighty
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if (request.identifier == "new mighty"){
		//console.log("97: " + request.newMightysName);
		newName = request.newMightysName;
		if(newName == ""){
			newName = "Mighty #" + (len(MightyHandlerBackground.mighties) + 1);
		//	console.log("21: empty str, the name is " +newName);
		}
		MightyHandlerBackground.createMighty(newName);
		//console.log("99: " + JSON.stringify(MightyHandlerBackground.mighties));
	}
}
);


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if (request.request == "remove"){
		delete MightyHandlerBackground.mighties[request.toRemove]
		chrome.contextMenus.remove(request.toRemove)
		sendResponse({backGroundToPopup: "finished"})
		}
	
		
	
})




class MightyTab {  //make members private
	constructor(n){  
		this.name = n;
		this.tabURLs = {};
		this.tabUrlsList = [];

	}

	addTab(url){
		var l = len(this.tabURLs);

		if(!this.tabURLs[url]){
			this.tabURLs[url] = url; //remember this dict can only be accessed with tabURLs[] and not url.str....
			this.tabUrlsList[l] = url

			MightyHandlerBackground.currentMighty = "none"
		}

	}


	bringTogether(){
		
		//var tabUrlsList = this.turnUrlsIntoListOfIds();
		var amountOfTabsInMighty = this.tabUrlsList.length;
		var theNameOfTheMighty = this.name
		
		if(theNameOfTheMighty != MightyHandlerBackground.currentMighty){//this is problematic because if you change the moghty you need to switch
		
			//gets ids of the mightys url
			chrome.tabs.query({url: this.tabUrlsList}, function(tabs){
				var ids = [];
				if(tabs){	
					//creates an array of interger ids
		
					for(var i = 0; i < tabs.length; i++){
						ids[i] = tabs[i].id;
					
					} 
				
		 			chrome.tabs.move(ids,{index: 0}, function(taben){
						chrome.tabs.query({},function(tabs2){
		
							//pin and unpin the proper tabs
							
							for(var tab in tabs2){
		
								if(Object.values(ids).includes(tabs2[tab].id)){//release the pinned mighty members
									
									if(tabs2[tab].pinned){
		
										chrome.tabs.update(tabs2[tab].id, {pinned: false});
									}
								}
								else if(!tabs2[tab].pinned){//pin released not members
		
									chrome.tabs.update(tabs2[tab].id, {pinned: true});
								}
							}
						})
					})					
				}
			})
		}
	}




}//end of class mightytab
MightyTab.prototype.toString = function printMighty(){
	tbr = "name: " + this.name + "   tabs: " + JSON.stringify(this.tabURLs); 
	return tbr;
}







var globalVar






class MightyHandlerBackground{
	//mighty arr saves the id of the first tab in each mighty
		static createMighty(name){
			if (name in MightyHandlerBackground.mighties){
				return;
			}
			MightyHandlerBackground.mighties[name] = new MightyTab(name);
			chrome.contextMenus.create({
				"id" : name,
				"title" : name,
				"parentId": "addToMighty",
				"contexts": ["all"]
			})
			chrome.contextMenus.onClicked.addListener(function(clickData, tab){
				
				MightyHandlerBackground.mighties[clickData.menuItemId].addTab(tab.url);
				console.log("187: " + tab.url)
				//console.log("73: mighty tab " + MightyHandlerBackground.mighties[clickData.menuItemId]);
				//console.log("67: menu item id " + clickData.menuItemId);
				//console.log("68: tab id:  " + tab.id)
			});
		}
	

		
		static destroyMighty(name){

		}
		
		
}
MightyHandlerBackground.mighties = {};
MightyHandlerBackground.currentMighty = '';




function len(obj) {
	
	if(obj){
		return Object.keys(obj).length;
	}
	
	else{
		return 0;
	}
 }




