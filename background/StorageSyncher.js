class StorageSyncher{    
    static sync(){//can make tis kind for when moved only, for efficiency. for now will do this for all
        let mightiesTitles = {};
        // console.log("in the begining of sync, mighties are:\n" + JSON.stringify(MightyHandlerBackground.mighties))
        for(let mighty in MightyHandlerBackground.mighties){
            mightiesTitles[mighty] = new MightyTab(mighty)
        }
        if(!isEmpty(MightyHandlerBackground.mighties)){ //I see no choice other than to put this if because the mempory 
                                                        //set needs to happen at the end of the callback chain
            for(let mighty in MightyHandlerBackground.mighties){
                if(MightyHandlerBackground.mighties[mighty].tabIdsList[0] != undefined){    
                    for(let i in MightyHandlerBackground.mighties[mighty].tabIdsList){ 
                        // no choice but to access them one by one. get() doesnt take tab list
                        var tabid = MightyHandlerBackground.mighties[mighty].tabIdsList[i]
                        if(tabid>0){
                            chrome.tabs.get(tabid, function(tab){ 
                                if(tab != undefined){   
                                    let tabTitle = tab.title
                                    let l = mightiesTitles[mighty].tabIdsList.length
                                    mightiesTitles[mighty].tabIdsList.push(tabTitle)
                                    chrome.storage.local.set({'mightiesTitles': mightiesTitles})// this probably takes a bunch of time...
                                }
                        
                            })
                        }
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
        // loads the mighties at the begining of a browser session, saves backups at the begining
        //1) gets mightiesTitles from background, an item quite like mighties but with index list instead of tablist
            //2) copies mightiesTitles to mighties.
                //3) for all mighties in mightiesTitles, for every list item, 
                //   query that index and on callback append the tab's id to Handler.mighties[mighty].tabIdsList        

        chrome.storage.local.get('mightiesTitles', function(gotten){
            if(gotten.mightiesTitles == undefined){// supposed to work only on first run
                
                StorageSyncher.sync()
        
            }
            
            else{       
                 //2) copies mightiesTitles to mighties.
                for(let mighty in gotten.mightiesTitles){
                    //MightyHandlerBackground.mighties[mighty] = new MightyTab(mighty)
                    MightyHandlerBackground.backupMighties[mighty] = new MightyTab(mighty, gotten.mightiesTitles[mighty].tabIdsList)
                }
                // console.log("unloading backup mighties:\n" + JSON.stringify(MightyHandlerBackground.backupMighties))
                StorageSyncher.turnTitleMightyListIntoMightiesList(gotten.mightiesTitles)
              
            }

        })
    }




    static turnTitleMightyListIntoMightiesList(mightiesTitles){
        // bad function!! have it return a value and not change some variable
        for(let mighty in mightiesTitles){
            MightyHandlerBackground.mighties[mighty] = new MightyTab(mighty)
            //make context menu item
            
            ContextMenusHandler.addItemToParent(mighty, mighty, "addToMighty")
            ContextMenusHandler.addItemToParent(mighty + "inNewTab", mighty, "newTabInMighty")   
            if(mightiesTitles[mighty].tabIdsList != []){
                for(let i in mightiesTitles[mighty].tabIdsList){
                    // console.log("in turn titles into ids in the second loop\n" + JSON.stringify(mightiesTitles[mighty].tabIdsList[i]))
                    chrome.tabs.query({title: mightiesTitles[mighty].tabIdsList[i]}, function(tabs){
                        if(MightyHandlerBackground.mighties[mighty].tabIdsList.indexOf(tabs[0].id) <= -1){
                            MightyHandlerBackground.mighties[mighty].tabIdsList.push(tabs[0].id)
                        }
                    })
                }
            }
                
        }
    }
}//end of class storage syncher b
