///<reference path="chrome-api-vsdoc.js"/>



chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      console.log(sender.tab ?
                  "from a content script wassup niggggaalala:" + sender.tab.url :
                  "from the extension");
      console.log("hairy cheeks and ballsacks");
      if (request.greeting == "hello")
        sendResponse({farewell: "goodbye"});
    });

/*function uponClicking(){   
        console.log("xelo");
        let paragraphs = document.getElementsByTagName('p');
        for(paragraph in paragraphs){
            paragraph.innerHTML = "pussy";
        }
    }
    */
