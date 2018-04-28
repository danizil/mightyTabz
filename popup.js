

/*
function secondpoopy(){
    console.log("hi this is the popup");
    //send a requeset to a listener in the background. when he gets 
}
*/
/*
var a = {message : "sex MONSTERSEX"}

chrome.runtime.sendMessage(a)//, whatToDoWithResponse(response));
//console.log("a");
function whatToDoWithResponse(resp){
    console.log(resp.response);
}
*/


function newMightyFromPopup(){
    chrome.runtime.sendMessage({content: "initiate creation"}, function(response) {
        console.log(response.farewell);
    });
    document.getElementById("mightyButton").innerHTML = "line 24: remember to turn this to a line to name the mighty";
}

function doneMighting(){
    console.log(28 + "in doneMighting");
    
    chrome.runtime.sendMessage({message: "done mighting"},
        function(response){
            console.log(response.message);
        
        }
    )
}


//this thing here waits untill the popup html finishes loading and the you can send a message to the background with newMighty
//when i finish my shit i tell the background im finished with finished mighty
document.addEventListener('DOMContentLoaded', function(){
         
        chrome.runtime.sendMessage({content: "make or done"}, function(response){
            if(response.message == "showMake"){//no need to remove the event listener because only one of these opens when we open the popup
                document.getElementById("mightyButton").innerHTML = "Make Mighty";
                document.getElementById('mightyButton').addEventListener('click', newMightyFromPopup);
            }
            
            else if(response.message == "showDone"){                 document.getElementById("mightyButton").innerHTML = "Done";
                document.getElementById('mightyButton').addEventListener('click', doneMighting);
            }

        })
        
        //open a text box
})

