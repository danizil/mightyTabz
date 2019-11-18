class MightyManager{

    static changeCurr(newMighty){
        //the second if is here so that we can paint the previous curr black
        MightyManager.currMighty = newMighty
    }

    static changeNumberOnDisplay(name, newLength){
        let mightyDisplay = document.getElementById(name + 'Written')
        let indexOfNumber = mightyDisplay.innerHTML.indexOf('~') + 1
        let caption = mightyDisplay.innerHTML.slice(0, indexOfNumber)
        let newInner = caption.concat(newLength)
        mightyDisplay.innerHTML = newInner
    }


}
MightyManager.mightiesNumTabsArr = [];
MightyManager.currMighty = '';
