class StorageSyncher{    
    static sync(){//can make tis kind for when moved only, for efficiency. for now will do this for all
        let mightiesTitles = {};
        for(let mighty in MightyHandlerBackground.mighties){
            mightiesTitles[mighty] = new MightyTab(mighty)
        }
        
        if(!isEmpty(MightyHandlerBackground.mighties)){ //I see no choice other than to put this if because the mempory 
                                                        //set needs to happen at the end of the callback chain
            for(let mighty in MightyHandlerBackground.mighties){
                if(MightyHandlerBackground.mighties[mighty].tabIdsList[0] != undefined){    
                    for(let i in MightyHandlerBackground.mighties[mighty].tabIdsList){ 
                        var tabid = MightyHandlerBackground.mighties[mighty].tabIdsList[i]
                        chrome.tabs.get(tabid, function(tab){ 
                            let tabTitle = tab.title
                            let l = mightiesTitles[mighty].tabIdsList.length
                            mightiesTitles[mighty].tabIdsList.push(tabTitle)
                            chrome.storage.local.set({'mightiesTitles': mightiesTitles})// this probably takes a bunch of time...
                        })
                    }
                }
                else{
                    chrome.storage.local.set({'mightiesTitles': mightiesTitles})
                }

            }
        }
        else{
            chrome.storage.local.set({'mightiesTitles': {}})
        }
    }

    static mightyFixerUnload(){
        //1) gets mightiesTitles from background, an item quite like mighties but with index list instead of tablist
            //2) copies mightiesTitles to mighties.
                //3) for all mighties in mightiesTitles, for every list item, 
                //   query that index and on callback append the tab's id to Handler.mighties[mighty].tabIdsList        

        //1) gets mightiesTitles from background, an item quite like mighties but with index list instead of id list

        chrome.storage.local.get('mightiesTitles', function(gotten){
            if(gotten.mightiesTitles == undefined){// supposed to work only on first run
                
                StorageSyncher.sync()
        
            }
            
            else{       
                 //2) copies mightiesTitles to mighties.
                for(let mighty in gotten.mightiesTitles){
                    MightyHandlerBackground.mighties[mighty] = new MightyTab(mighty)
                    MightyHandlerBackground.backupMighties[mighty] = new MightyTab(mighty)
                    }
                                    
                //somewhere mightiesTitles got deleted
                for(let mighty in gotten.mightiesTitles){
                    //make context menu item
                    chrome.contextMenus.create({
                        "id" : mighty,
                        "title" : mighty,
                        "parentId": "addToMighty",
                        "contexts": ["all"]
                        })
                    chrome.contextMenus.onClicked.addListener(function(clickData, tab){
                        MightyHandlerBackground.mighties[clickData.menuItemId].addTab(tab.id); 
                        });
                    for(let i in gotten.mightiesTitles[mighty].tabIdsList){
                        chrome.tabs.query({title: gotten.mightiesTitles[mighty].tabIdsList[i]}, function(tabs){
                            MightyHandlerBackground.mighties[mighty].tabIdsList.push(tabs[0].id)
                            MightyHandlerBackground.backupMighties[mighty].tabIdsList.push(tabs[0].id)
                        })
                    }
                        
                }


            }

        })
    }
}//end of class storage syncher b