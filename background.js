 ///<reference path="chrome-api-vsdoc.js"/>
//import * as Mighty from "header";

//chrome.browserAction.onClicked.addListener(createMighty);
/*
chrome.runtime.onMessage.addListener(whatToDoWithMessage(request, sender, sendResponse));

function whatToDoWithMessage(request, sender, sendResponse){
  if(request.message){
    console.log(request.message);
    sendResponse({response: "background to popup"});
  }
}
*/
var popupShowMakeOrDone = "make";

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        if (request.content == "make or done"){
            if(popupShowMakeOrDone == "make"){
              sendResponse({message: "showMake"});
             // popupShowMakeOrDone = "done";
            }  
            else if(popupShowMakeOrDone = "done"){
              sendResponse({message: "showDone"});
              //popupShowMakeOrDone = "make";
            }



        }

      }
);


chrome.runtime.onMessage.addListener(
  	function(request, sender, sendResponse) {
    		if (request.content == "initiate creation"){
			console.log(request.content + " line 39");
			MightyHandler.createMighty("news");
			//activate(); 
			console.log(MightyHandler.mighties["news"] + "line22");
			sendResponse({farewell: "created mighty "});
		}
    }    
);
  

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){

	if(request.message == "done mighting"){
		console.log("line 52" + request.message); 
		//chrome.tabs.onActiveChanged.removeEventListener(tabAdder());
		chrome.tabs.onActivated.removeListener();
		console.log("55: ");
		popupShowMakeOrDone = "make";
	 
		sendResponse({message: "145 in background sent this"}); 
	}

 }
)
/*  
function activate(){ //gets user input and makes new mighty
    
  chrome.tabs.query({}, 
    function(tabList){ //remember query returns an ARRAY
      if(tabList){
        chrome.tabs.move(tabList[0].id, {index: -1})
        //chrome.tabs.highlight({tabs: 0});
      }
    }
  )
    //here is where you will take user input
  MightyHandler.createMighty("news")
  
}
*/








class MightyTab {  //make members private
    constructor(n, idList){  
      this.name = n;
      this.tabIds = idList;
      //console.log(this.tabIds + "line53 in mighty constructor");
    }

    addTab(tabId){
    
    }

}

MightyTab.prototype.toString = function printMighty(){
  tbr = "name: " + this.name + "   tabs: " + this.tabIds; 
  return tbr;
}






class MightyHandler{
  //mighty arr saves the id of the first tab in each mighty
    static createMighty(name = false){

      var newMightyName;

      if(!name){
       newMightyName = 'Mighty ' + (MightyHandler.mighties.length + 1);
      }
      else{
       newMightyName = name;
      }
      
      //this is where you choose the tabs for this mighty
      popupShowMakeOrDone = "done";
	 var ids;
	 MightyHandler.tabMousePicker(ids);
      
      console.log("line 114:tab ids in createmighty you created them to create a new mighty: " + ids);
      if(!ids){
        console.log("ids is undefined. this means tabMousePicker didnt put a bunch of tabs");
        MightyHandler.mighties[newMightyName] = new MightyTab(newMightyName, ids);
      }
      //console.log(MightyHandler.mighties[newMightyName] + " line79");
    }



    
    static destroyMighty(name){
      
    }
    
    static tabMousePicker(idsToReturn){
        
        	chrome.tabs.onActivated.addListener(function tabAdder(tab){
			console.log("145: "+tab.tabId);
			console.log("146: "+ popupShowMakeOrDone);
		
			chrome.runtime.onMessage.addListener(function (request, sender, sendResponse){
				if(request.message == "done mighting"){
					console.log("151: yo it worked yo");
					chrome.tabs.onActivated.removeListener(tabAdder);
				}

			});
		
			if(tab){
			var strTabId = tab.tabId.toString()
			//console.log("158: " + strTabId);
			idsToReturn.strTabId = tab.tabId;
			//console.log("160idsToReturn.strTabId: "+idsToReturn.strTabId)
			for(let thing in ids){ 
				console.log("134idsToReturn[thing]: " + idsToReturn[thing]);
			}
			}

		}
		);
		
	}
	 
}
MightyHandler.mighties = [];
MightyHandler.currentMighty = '';

  


var contextMenuItem = {
	hiHow: "fofef"

}


