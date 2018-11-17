///<reference path="C:\Users\User\Documents\לימודים\comps\chrome_extensions\mightyTab\mightyTab\chrome-api-vsdoc.js"/>

 //this file is the setup for the popup window. all things that set up when it opens




//this makes the unpin all list button whenever the popup html loads
//NOTICE: this is quite important since chrome will not allow you to have an onclick event in your html
//this is so that the browser can check all functionality you add to the html to be dandy
var unpinAllListItem = document.getElementById("unpin all button")
unpinAllListItem.innerHTML = "Unpin All";
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
            mightiesStringNumTabsArr = response.mighties;
            MightyManager.currMighty = response.current;
            var l = mightiesStringNumTabsArr.length;
            var list = document.getElementById("listOfMighties") 

            for(var i = 0; i < l ; i++ ){
                var listItem = document.createElement("li");
                listItem.id = mightiesStringNumTabsArr[i][0];

                var writtenPart = document.createElement("p")
                writtenPart.id = mightiesStringNumTabsArr[i][0] + "Written"
                console.log(writtenPart.id)
                writtenPart.innerHTML = mightiesStringNumTabsArr[i][0] + "~" + mightiesStringNumTabsArr[i][1];
                writtenPart.addEventListener('click', sendMessageToGatherMighty);
                listItem.appendChild(writtenPart);
                
                //add a function to send a message for when you press it
                //list.appendChild(listItem);
                
                list.insertBefore(listItem, list.childNodes[0]);
                let mightyName = writtenPart.innerHTML.slice(0, writtenPart.innerHTML.indexOf("~"))
                console.log("currmighty" + MightyManager.currMighty)
                if(mightyName == MightyManager.currMighty){
                    writtenPart.style.color = "red";
                }
               
                

                // these are the associated buttons to each mighty
                var removeButton = document.createElement("button");
                removeButton.innerHTML = "Remove";
                removeButton.addEventListener("click", sendMessageToRemoveMighty)
                listItem.appendChild(removeButton)
                // V
                
                
                var addButton = document.createElement("button");
                addButton.innerHTML = "Add Current";
                addButton.addEventListener("click", sendMessageToAddToMighty)
                listItem.appendChild(addButton)
                
                var newTabInMightyButton = document.createElement("button");
                addButton.innerHTML = "New Tab";
                addButton.addEventListener("click", sendMessageToOpenNewTab)
                listItem.appendChild(newTabInMightyButton)

                var removeCurrentButton = document.createElement("button");
                addButton.innerHTML = "remove curr";
                addButton.addEventListener("click", sendMessageToRemoveTab)
                listItem.appendChild(removeCurrentButton)
            }
            
        }

    })
     
})
 

//assigns functionality to submitting the new mighty name
//NOTICE: everytime the form is submitted, the html reloads!!
document.getElementById("mightyForm").addEventListener("submit", sendInputToBackground)

