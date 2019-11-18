///<reference path="C:\Users\User\Documents\לימודים\comps\chrome_extensions\mightyTab\mightyTab\chrome-api-vsdoc.js"/>

 //this file is the setup for the popup window. all things that set up when it opens




//this makes the unpin all list button whenever the popup html loads
//NOTICE: this is quite important since chrome will not allow you to have an onclick event in your html
//this is so that the browser can check all functionality you add to the html to be dandy

unloadPopup()

function unloadPopup(){
    var unpinAllListItem = document.getElementById("unpin all button")
    unpinAllListItem.innerHTML = "Span all";
    unpinAllListItem.addEventListener('click', sendMessageToUnpinAll);

    var unassociatedsListItem = document.getElementById("mightyless button")
    unassociatedsListItem.innerHTML = "Mightyless Tabs";
    unassociatedsListItem.addEventListener('click', sendMessageToCollectMightyless);

    var reveiveListItem = document.getElementById("revive after crash")
    reveiveListItem.innerHTML = "Revive After crash"
    reveiveListItem.addEventListener('click', sendMessageToRestoreMighties)

    document.addEventListener('DOMContentLoaded', function(){
        chrome.runtime.sendMessage({message: "what mighties are there"},function(response){
            if(response.mighties){
                console.log(MightyManager)
                MightyManager.mightiesNumTabsArr = response.mighties;
                MightyManager.currMighty = response.current;
                var l = MightyManager.mightiesNumTabsArr.length;
                var list = document.getElementById("listOfMighties") 

                for(var i = 0; i < l ; i++ ){
                    var listItem = document.createElement("li");
                    listItem.id = MightyManager.mightiesNumTabsArr[i][0];
		    listItem.classList.add("mightyLi")

                    var writtenPart = document.createElement("p")
                    writtenPart.id = MightyManager.mightiesNumTabsArr[i][0] + "Written"
                    console.log(writtenPart.id)
			writtenPart.classList.add("mightyP")
                    writtenPart.innerHTML = MightyManager.mightiesNumTabsArr[i][0] + "~" + MightyManager.mightiesNumTabsArr[i][1];
                    // alert("43unload mighties array\n" + mightiesNumTabsArr)
                    writtenPart.addEventListener('click', sendMessageToGatherMighty);
                    listItem.appendChild(writtenPart);
                    
                    //add a function to send a message for when you press it
                    //list.appendChild(listItem);
                    
                    list.insertBefore(listItem, list.childNodes[0]);
                    let mightyName = writtenPart.innerHTML.slice(0, writtenPart.innerHTML.indexOf("~"))
                    console.log("currmighty" + MightyManager.currMighty)
                    if(mightyName == MightyManager.currMighty)
			writtenPart.classList.add('selected') 
                    // these are the associated buttons to each mighty
                    
                    var addButton = document.createElement("button");
                    addButton.className = "add"
                    addButton.innerHTML = "+";
                    // addButton.addEventListener("click", sendMessageToAddToMighty)
                    addButton.addEventListener("click", sendMessageToAddHIghlightedToMighty)
                    listItem.appendChild(addButton)
                    // all good just need to make the number change

                    var newTabInMightyButton = document.createElement("button");
                    newTabInMightyButton.className = "newtab";
                    newTabInMightyButton.innerHTML = "New Tab";
                    newTabInMightyButton.addEventListener("click", sendMessageToOpenNewTab)
                    listItem.appendChild(newTabInMightyButton)

                    var removeCurrentButton = document.createElement("button");
                    removeCurrentButton.className = "removecurrent";
                    removeCurrentButton.innerHTML = "-";
                    removeCurrentButton.addEventListener("click", sendMessageToRemoveHighlightedFromMighty)
                    // removeCurrentButton.addEventListener("click", sendMessageToRemoveCurrFromMighty)
                    listItem.appendChild(removeCurrentButton)
                    // all good just need to make the number change
                    
                    var removeButton = document.createElement("button");
                    removeButton.className = "remove";
                    removeButton.innerHTML = "X";
                    removeButton.addEventListener("click", sendMessageToRemoveMighty)
                    listItem.appendChild(removeButton)
                    
                }
		setStyle()
                
            }

        })
        
    })
}

//assigns functionality to submitting the new mighty name
//NOTICE: everytime the form is submitted, the html reloads!!
document.getElementById("mightyForm").addEventListener("submit", sendInputToBackground)
