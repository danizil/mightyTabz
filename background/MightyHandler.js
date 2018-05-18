class MightyHandlerBackground{
	//mighty arr saves the id of the first tab in each mighty
        
    static createMighty(name){
        if (name in MightyHandlerBackground.mighties){
            return;
        }
        
        //make context menu item
        MightyHandlerBackground.mighties[name] = new MightyTab(name);
        chrome.contextMenus.create({
            "id" : name,
            "title" : name,
            "parentId": "addToMighty",
            "contexts": ["all"]
        })
        chrome.contextMenus.onClicked.addListener(function(clickData, tab){
            MightyHandlerBackground.mighties[clickData.menuItemId].addTab(tab.id);
            console.log("the tab title and id that has been added by clicking the cM item: " + tab.title + " " + tab.id)
            //console.log("73: mighty tab " + MightyHandlerBackground.mighties[clickData.menuItemId]);
            //console.log("67: menu item id " + clickData.menuItemId);
            //console.log("68: tab id:  " + tab.id)
        });
    }


		
		static destroyMighty(name){
           
            var mightyToDestroy = MightyHandlerBackground.mighties[name]
            for(var index in mightyToDestroy.tabIdsList){
                delete mightyToDestroy.tabIdsList[index]
                console.log("deleted a tab from the mighty tab. now the list is: " + mightyToDestroy.tabIdsList)
            }
            delete MightyHandlerBackground.mighties[name]
		    chrome.contextMenus.remove(name)
		}
		
		
}
MightyHandlerBackground.mighties = {};
MightyHandlerBackground.currentMighty = '';
