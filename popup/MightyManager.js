class MightyManager{

    static changeCurr(newMighty){
        if(MightyManager.currMighty != '' && MightyManager.currMighty != 'none'){
            document.getElementById(MightyManager.currMighty + "Written").style.color = "black"
        }
       
        if(newMighty){
            document.getElementById(newMighty + "Written").style.color = "red";
            MightyManager.currMighty = newMighty;
        }
        
    }

}
MightyManager.currMighty = '';