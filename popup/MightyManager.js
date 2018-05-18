class MightyManager{

    static changeCurr(newMighty){
        console.log("98: curr mighty" + MightyManager.currMighty)
        console.log("98: newmighty" + newMighty)
        //if(MightyManager.currMighty){
        document.getElementById(MightyManager.currMighty).style.color = "black";
    //}
        if(newMighty){
            console.log("123: mighty change has happened")
            document.getElementById(newMighty).style.color = "red";
        }
        MightyManager.currMighty = newMighty;

    }

}
MightyManager.currMighty = '';