
 ///<reference path="C:\Users\User\Documents\לימודים\comps\chrome_extensions\mightyTab\mightyTab\chrome-api-vsdoc.js"/>


function sendMessageToUnpinAll(){
    chrome.runtime.sendMessage({request: "unpin all"}, function(response){
        MightyManager.changeCurr('');
       
    })
}

function sendMessageToCollectMightyless(){
    chrome.runtime.sendMessage({request: "collect mightyless"}, function(response){
        MightyManager.changeCurr('');
    })
}

function sendMessageToRestoreMighties(){
    chrome.runtime.sendMessage({request: "revive button pressed"}, function(response){
        MightyManager.changeCurr('');
    })
}
    
//makes all tabs of the specific mighty appear at the same place
function sendMessageToGatherMighty(){
    var theHtmlInsideTheListItem = this.innerHTML
    let indexOfTilda = theHtmlInsideTheListItem.indexOf("~")
    let mightyName = theHtmlInsideTheListItem.slice(0, indexOfTilda)
    chrome.runtime.sendMessage({request: "gatherMighty", mighty: mightyName}, function(response){
        if(response.request == "mighties gathered"){
            let mightyName = theHtmlInsideTheListItem.slice(0, theHtmlInsideTheListItem.indexOf("~"))
            MightyManager.changeCurr(mightyName)
            
        }
    })
}

//when remove button is closed 
function sendMessageToRemoveMighty(){
    var nameToRemove = this.parentElement.id;
    chrome.runtime.sendMessage({request: "remove", toRemove: nameToRemove},function(response){
        var listItemToRemove = document.getElementById(nameToRemove);
        document.getElementById("listOfMighties").removeChild(listItemToRemove);
    })
}

//sends a message with the user's input to become the name of a new mighty tab
function sendInputToBackground(){
    var newName = document.getElementById("nameInput").value;
    chrome.runtime.sendMessage({identifier: "new mighty", newMightysName: newName}, function(response){
    })

}