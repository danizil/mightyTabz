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
reveiveListItem.innerHTML = "Revive"
reveiveListItem.addEventListener('click', sendMessageToRestoreMighties)



//send a message upon opening the popup to get all open mighties and put them on the popup

            //X make it send the request to the window that its in
document.addEventListener('DOMContentLoaded', function(){
    chrome.runtime.sendMessage({message: "what mighties are there"},function(response){
        console.log(response.mighties)
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
                    writtenPart.style.color = "red";
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
 

//assigns functionality to submitting the new mighty name
//NOTICE: everytime the form is submitted, the html reloads!!
document.getElementById("mightyForm").addEventListener("submit", sendInputToBackground)

