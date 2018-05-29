
 ///<reference path="C:\Users\User\Documents\לימודים\comps\chrome_extensions\mightyTab\mightyTab\chrome-api-vsdoc.js"/>


function sendMessageToUnpinAll(){
    chrome.runtime.sendMessage({request: "unpin all"}, function(response){
        MightyManager.changeCurr('');
        console.log("listItemsFuncs change curr")
    })
}

    
//makes all tabs of the specific mighty appear at the same place
function sendMessageToGatherMighty(){
    //console.log("30: " + this.innerHTML)
    var theHtmlInsideTheListItem = this.innerHTML
    chrome.runtime.sendMessage({request: "gatherMighty", mighty: theHtmlInsideTheListItem}, function(response){
        if(response.request == "mighties gathered"){
            console.log("60: " + theHtmlInsideTheListItem)
            MightyManager.changeCurr(theHtmlInsideTheListItem)
            
        }
    })
}


/*
function sendMessageToUpdateMightiesFromStorage(){
    chrome.runtime.sendMessage({request: "get tabs from storage"})
}
*/


//when remove button is closed 
function sendMessageToRemoveMighty(){
    //console.log("81: the parent of the remove button" + this.parentElement)
    var nameToRemove = this.parentElement.id;
    chrome.runtime.sendMessage({request: "remove", toRemove: nameToRemove},function(response){
        var listItemToRemove = document.getElementById(nameToRemove);
        console.log("84: " + listItemToRemove)
        document.getElementById("listOfMighties").removeChild(listItemToRemove);
    })
}

//sends a message with the user's input to become the name of a new mighty tab
function sendInputToBackground(){
    var newName = document.getElementById("nameInput").value;
    console.log("36:  the submitted name:" + newName);
    chrome.runtime.sendMessage({identifier: "new mighty", newMightysName: newName}, function(response){
    })

}