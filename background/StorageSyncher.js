class StorageSyncher{    
    static sync(){//can make tis kind for when moved only, for efficiency. for now will do this for all
        console.log("in sync")
        var mightiesINDXS = {};
        for(var mighty in MightyHandlerBackground.mighties){
            mightiesINDXS[mighty] = new MightyTab(mighty)
        }
        
        //var mightiesINDXS = JSON.parse(JSON.stringify(MightyHandlerBackground.mighties))//deep
                        //console.log("logging mightiesINDXS to see if it really is an object of mighties with empty lists:" + JSON.stringify(mightiesINDXS))
                        //console.log("now the mightyhandler.mighties: ")
                        //console.log(MightyHandlerBackground.mighties)
                        //console.log(mightiesINDXS["Mighty #1"].tabIdsList[0]) //this test shows that before nulling everything there was something there
        
        if(!isEmpty(MightyHandlerBackground.mighties)){ //I see no choice other than to put this if because the mempory 
                                                        //set needs to happen at the end of the callback chain
            for(let mighty in MightyHandlerBackground.mighties){
                                    //console.log("im in the first loop on the mighties. the mighty im on is: " + mighty)
                if(MightyHandlerBackground.mighties[mighty].tabIdsList[0] != undefined){    
                    for(let i in MightyHandlerBackground.mighties[mighty].tabIdsList){ //all the gets happen completely seperately
                                        //console.log("index loop, i am on index: " + i)
                        var tabid = MightyHandlerBackground.mighties[mighty].tabIdsList[i]
                                                    // console.log("the id of the " + i + "'th list member is" + tabid + "we are now using tabs.get(id, callback)")
                                                    // console.log("goimg to get with mighty" + mighty)
                        chrome.tabs.get(tabid, function(tab){ //the problem is here. all the vars: tabid, mighty
                                                    //console.log("the mighty im on after get is:" + mighty)
                            var tabIndex = tab.index
                                                    //console.log("the tab with id:" + MightyHandlerBackground.mighties[mighty].tabIdsList[i] + " is on index " + tabIndex)
                            
                            var l = mightiesINDXS[mighty].tabIdsList.length
                                                    //console.log("the last member of the index list of mightyINDX " + mighty + "is " + (l - 1))
                            
                            mightiesINDXS[mighty].tabIdsList.push(tabIndex)
                            
                                                    // console.log("after the push it is :" + (l - 1))
                                                    // console.log("on the next command this will be pushed into storage: " + JSON.stringify(mightiesINDXS))
                            
                            chrome.storage.local.set({'mightiesINDXS': mightiesINDXS})// this probably takes a bunch of time...
                                                    // console.log("the mightyHandler mighty background members are still:")
                                                    // console.log(MightyHandlerBackground.mighties)
                        })
                    }
                }
                else{
                                                    // console.log("the mighty" + mighty + "was empty, so entered the else. i shall set this into mempory: ")
                                                    // console.log(mightiesINDXS)
                    chrome.storage.local.set({'mightiesINDXS': mightiesINDXS})
                }

            }
        }
        else{
            console.log(MightyHandlerBackground.mighties)
            chrome.storage.local.set({'mightiesINDXS': {}})
            
            //test
            console.log(MightyHandlerBackground.mighties)
            chrome.storage.local.get('mightiesINDXS', function(response){
                console.log(response.mightiesINDXS)
                })    
        
        }

        
        /*
        chrome.storage.local.set({'mighties' : MightyHandlerBackground.mighties}, function(result){
            console.log(result.mighties + "something to say")
        })
        */
    }

    static mightyFixerUnload(){
        //1) gets mightiesINDXS from background, an item quite like mighties but with index list instead of tablist
            //2) copies mightiesINDXS to mighties.
                //3) for all mighties in mightiesINDXS, for every list item, 
                //   query that index and on callback append the tab's id to Handler.mighties[mighty].tabIdsList        
                    //4) console.log(mighties)


        //1) gets mightiesINDXS from background, an item quite like mighties but with index list instead of id list

        chrome.storage.local.get('mightiesINDXS', function(gotten){
                             // console.log("what was saved in the storage, now on unload:")  
                            //console.log(gotten.mightiesINDXS)
            
            if(gotten.mightiesINDXS == undefined){// supposed to work only on first run
                
                StorageSyncher.sync()
                            //    console.log("mighties were undefined before this")
            }
            
            else{       
                 //2) copies mightiesINDXS to mighties.
                                            //  console.log(gotten.mightiesINDXS)
                for(let mighty in gotten.mightiesINDXS){
                    MightyHandlerBackground.mighties[mighty] = new MightyTab(mighty)
                }
                                    
                //somewhere mightiesINDXS got deleted
                for(let mighty in gotten.mightiesINDXS){
                    //make context menu item
                    chrome.contextMenus.create({
                        "id" : mighty,
                        "title" : mighty,
                        "parentId": "addToMighty",
                        "contexts": ["all"]
                    })
                    chrome.contextMenus.onClicked.addListener(function(clickData, tab){
                //        console.log(typeof(MightyHandlerBackground.mighties[clickData.menuItemId]))
                        MightyHandlerBackground.mighties[clickData.menuItemId].addTab(tab.id); //were the classes not created yet?
                //        console.log("the tab title and id that has been added by clicking the cM item: " + tab.title + " " + tab.id)
                        //StorageSyncher.sync();
                        });
                    for(let i in gotten.mightiesINDXS[mighty].tabIdsList){
                //        console.log("this is in for loist: "+ gotten.mightiesINDXS[mighty].tabIdsList[i])
                        chrome.tabs.query({index: gotten.mightiesINDXS[mighty].tabIdsList[i]}, function(tabs){
                //            console.log("gonna push the id: " + tabs[0].id + "into " + mighty + "mighty tab")
                            MightyHandlerBackground.mighties[mighty].tabIdsList.push(tabs[0].id)
                            
                        })
                    }
                        
                }


            }

        })
    }
}//end of class storage syncher