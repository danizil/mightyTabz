class MightyManager{

    static changeCurr(newMighty){
        console.log("98: curr mighty is: " + MightyManager.currMighty)
        console.log("98: newmighty" + newMighty)
        if(MightyManager.currMighty){
            document.getElementById(MightyManager.currMighty + "Written").style.color = "black"
        }
       
        if(newMighty){
            console.log("123: mighty change has happened")
            document.getElementById(newMighty + "Written").style.color = "red";
            MightyManager.currMighty = newMighty;
        }
        
        console.log("the current mighty at end of function: " + MightyManager.currMighty)

    }

}
MightyManager.currMighty = '';