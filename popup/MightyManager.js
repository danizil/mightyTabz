class MightyManager{

    static changeCurr(newMighty){
        if(MightyManager.currMighty != 'mightyless' && MightyManager.currMighty != 'none'){
<<<<<<< HEAD
            document.getElementById(MightyManager.currMighty + "Written").style.color = "black"
        }
        //the second if is here so that we can paint the previous curr black
        MightyManager.currMighty = newMighty
        if(newMighty !='mightyless' && newMighty != 'none'){
            document.getElementById(newMighty + "Written").style.color = "red"
=======
            console.log('currmighty = ' + MightyManager.currMighty)
            document.getElementById(MightyManager.currMighty + "Written").classList.remove('selected')
        }
       
        if(newMighty){
            document.getElementById(newMighty + "Written").classList.add('selected');
            MightyManager.currMighty = newMighty;
>>>>>>> b5dc8c84e30cd1f53b80898698e08cb227436577
        }
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
