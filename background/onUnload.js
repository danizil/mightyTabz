///<reference path="C:\Users\User\Documents\לימודים\comps\chrome_extensions\mightyTab\mightyTab\chrome-api-vsdoc.js"/>

//when starting the extension unpin all tabs
chrome.tabs.query({},function(tabs){
	var amountOfOpenTabs = tabs.length;
	//unpin all tabs
	for(var i = amountOfOpenTabs - 1 ; i >-1; i--){
			chrome.tabs.update(tabs[i].id, {pinned: false});
		
	}
})

StorageSyncher.mightyFixerUnload()





function isEmpty(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }

    return JSON.stringify(obj) === JSON.stringify({});
}


function len(obj) {
	
	if(obj){
		return Object.keys(obj).length;
	}
	
	else{
		return 0;
	}
 }
