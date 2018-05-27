///<reference path="C:\Users\User\Documents\לימודים\comps\chrome_extensions\mightyTab\mightyTab\chrome-api-vsdoc.js"/>
class MightyHandlerBackground{
	//mighty arr saves the id of the first tab in each mighty
    static createMighty(name){
        if (name in MightyHandlerBackground.mighties){
            return;
        }
        
        MightyHandlerBackground.mighties[name] = new MightyTab(name);
        //make context menu item
        chrome.contextMenus.create({
            "id" : name,
            "title" : name,
            "parentId": "addToMighty",
            "contexts": ["all"]
        })
        chrome.contextMenus.onClicked.addListener(function(clickData, tab){
            MightyHandlerBackground.mighties[clickData.menuItemId].addTab(tab.id);
            console.log("the tab title and id that has been added by clicking the cM item: " + tab.title + " " + tab.id)
            
        });
        //console.log(MightyHandlerBackground.mighties)
        StorageSyncher.sync();
        
    
    }

		
		static destroyMighty(name){
           
            let mightyToDestroy = MightyHandlerBackground.mighties[name]
            for(let index in mightyToDestroy.tabIdsList){ //deletes all of the tabids list
                delete mightyToDestroy.tabIdsList[index]
                console.log("deleted a tab from the mighty tab. now the list is: " + mightyToDestroy.tabIdsList)
            }
            delete MightyHandlerBackground.mighties[name]
            chrome.contextMenus.remove(name)
           // console.log(name + "is being deleted")
           // console.log(MightyHandlerBackground.mighties)
            StorageSyncher.sync();
        }
		
		
}
MightyHandlerBackground.mighties = {}
MightyHandlerBackground.currentMighty = '';

