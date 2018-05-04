
//the unpin all list button
var listItem = document.createElement("li");
listItem.innerHTML = "Unpin All";
listItem.addEventListener('click', sendMessageToUnpinAll);
document.getElementById("listOfMighties").appendChild(listItem);
function sendMessageToUnpinAll(){
    chrome.runtime.sendMessage({request: "unpin all"}, function(response){
        MightyManager.changeCurr('');
        console.log("10 change curr")
    })
}


//build a class to house all the functions that send messages


//send a message upon opening the popup to get all open mighties and put them on the popup
document.addEventListener('DOMContentLoaded', function(){
    chrome.runtime.sendMessage({message: "what mighties are there"},function(response){
        if(response.mighties){
            mightiesStringArr = response.mighties;
            MightyManager.currMighty = response.current;
            var l = mightiesStringArr.length;
            var list = document.getElementById("listOfMighties") 
            //console.log("10: "+ l)
            for(var i = 0; i < l ; i++ ){
                console.log(i);
                var listItem = document.createElement("li");
                listItem.id = mightiesStringArr[i];

                var writtenPart = document.createElement("p")
                writtenPart.id = mightiesStringArr[i] + "Written"
                writtenPart.innerHTML = mightiesStringArr[i];
                writtenPart.addEventListener('click', sendMessageToGatherMighty);
                listItem.appendChild(writtenPart);
                
                //add a function to send a message for when you press it
                //list.appendChild(listItem);
                
                list.insertBefore(listItem, list.childNodes[0]);
                if(writtenPart.innerHTML == MightyManager.currMighty){
                    listItem.style.color = "red";
                }
               
                var removeButton = document.createElement("button");
                removeButton.innerHTML = "Remove";
                removeButton.addEventListener("click", sendMessageToRemoveMighty)
                //define the function remove mighty
                listItem.appendChild(removeButton)
                /*
                var addButton = document.createElement("button");
                addButton.innerHTML = "Add Current";
                addButton.addEventListener("click", sendMessageToGatherMighty)
                //define the function remove mighty
                listItem.appendChild(removeButton)
                */
            }
            
        }

    })
     
})
    
//makes all tabs of the specific mighty appear at the same place
function sendMessageToGatherMighty(){
    //console.log("30: " + this.innerHTML)
    var theHtmlInsideTheListItem = this.innerHTML
    chrome.runtime.sendMessage({request: "gatherMighty", mighty: theHtmlInsideTheListItem}, function(response){

        if(response.request == "mighties gathered"){
            console.log("60: " + this.innerHTML)
            MightyManager.changeCurr(theHtmlInsideTheListItem)
            
        }
    })
}

function sendMessageToRemoveMighty(){
    //console.log("81: the parent of the remove button" + this.parentElement)
    var nameToRemove = this.parentElement.id;
    chrome.runtime.sendMessage({request: "remove", toRemove: nameToRemove},function(response){
        var listItemToRemove = document.getElementById(nameToRemove);
        console.log("84: " + listItemToRemove)
        document.getElementById("listOfMighties").removeChild(listItemToRemove);
    })
}


//what to do when the form is submitted
document.getElementById("mightyForm").addEventListener("submit", sendInputToBackground)


function sendInputToBackground(){
    var newName = document.getElementById("nameInput").value;
    console.log("36:  the submitted name:" + newName);
    chrome.runtime.sendMessage({identifier: "new mighty", newMightysName: newName}, function(response){
    })

}












class MightyManager{

    static changeCurr(newMighty){
        console.log("98: curr mighty" + MightyManager.currMighty)
        console.log("98: newmighty" + newMighty)
        if(MightyManager.currMighty){
            document.getElementById(MightyManager.currMighty).style.color = "black";
        }
        if(newMighty){
            document.getElementById(newMighty).style.color = "red";
        }
        MightyManager.currMighty = newMighty;

    }

}
MightyManager.currMighty = '';