class MightyManager{

    static changeCurr(newMighty){
        if(MightyManager.currMighty != 'mightyless' && MightyManager.currMighty != 'none'){
            document.getElementById(MightyManager.currMighty + "Written").style.color = "black"
        }
       
        if(newMighty){
            document.getElementById(newMighty + "Written").style.color = "red";
            MightyManager.currMighty = newMighty;
        }
        
    }
    static changeNumberOnDisplay(name, newLength){
        let mightyDisplay = document.getElementById(name + 'Written')
        indexOfNumber = mightyDisplay.innerHTML.indexOf('~') + 1
        newNumber = newLength
        caption = mightyDisplay.innerHTML.slice(0, indexOfNumber)
        newInner = caption.concat(newNumber)
        console.log("new number and capion: ", newInner)
        mightyDisplay.innerHTML = newInner
    }


}
MightyManager.mightiesNumTabsArr = [];
MightyManager.currMighty = '';