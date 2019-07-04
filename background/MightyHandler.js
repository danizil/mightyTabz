///<reference path="C:\Users\User\Documents\לימודים\comps\chrome_extensions\mightyTab\mightyTab\chrome-api-vsdoc.js"/>
class MightyHandlerBackground{
	//mighty arr saves the id of the first tab in each mighty
    static createMighty(name){
        if (name in MightyHandlerBackground.mighties){
            return;//add elert for te user understanding of the problem.
        }

        MightyHandlerBackground.mighties[name] = new MightyTab(name);
        //make context menu item
        
        ContextMenusHandler.addItemToParent(name, name, "addToMighty")
        ContextMenusHandler.addItemToParent(name + "inNewTab", name, "newTabInMighty")
        // chrome.contextMenus.create({
        //     "id" : name,
        //     "title" : name,
        //     "parentId": "addToMighty",
        //     "contexts": ["all"]
        // })
        chrome.contextMenus.onClicked.addListener(function(clickData, tab){
            MightyHandlerBackground.mighties[clickData.menuItemId].addTab(tab.id); 
        });


        StorageSyncher.sync();
    
    
    }

		
    static destroyMighty(name){
        
        let mightyToDestroy = MightyHandlerBackground.mighties[name]
        for(let index in mightyToDestroy.tabIdsList){ //deletes all of the tabids list
            delete mightyToDestroy.tabIdsList[index]
        }
        delete MightyHandlerBackground.mighties[name]
        ContextMenusHandler.removeItem(name)
        ContextMenusHandler.removeItem(name + "inNewTab")
        StorageSyncher.sync();
    }
    
    static findMightiesForTab(tabId){
        let mightiesList = []
        for(let mighty in MightyHandlerBackground.mighties){
            if(MightyHandlerBackground.mighties[mighty].tabIdsList.indexOf(tabId) != -1){
                mightiesList.push(mighty)
            }
        }
        return mightiesList
    }

    static collectMightyless(){
        chrome.tabs.query({}, function(tabs){
            let tabsInMighties = []
            let mightylessList = [];

            for(let mighty in MightyHandlerBackground.mighties){
                for(let i in MightyHandlerBackground.mighties[mighty].tabIdsList){
                    tabsInMighties.push(MightyHandlerBackground.mighties[mighty].tabIdsList[i])
                }
            }
             
            for(let i in tabs){
                let id = tabs[i].id;
                if(tabsInMighties.indexOf(id) == -1){
                    mightylessList.push(id)
                }
            }
            let zombieMighty = new MightyTab("zombie", mightylessList)
            zombieMighty.bringTogether();
        })
    }
		
}
MightyHandlerBackground.mighties = {}
MightyHandlerBackground.backupMighties = {}
MightyHandlerBackground.currentMighty = ''
chrome.tabs.query({highlighted : true}, function(tabs){
    MightyHandlerBackground.highlightedTabs = [tabs[0].id]
})
  

