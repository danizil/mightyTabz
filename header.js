
class MightyTab {
    constructor(n){  
      name = n;
    }
  
    addTab(tabId){
      tabIds[tabId] = tabId;
    }

}


class MightyHandler{
  //mighty arr saves the id of the first tab in each mighty
    static createMighty(name = "defult"){
      
      console.log(name + "header18");

      if(name == 'defult'){
       newMightyName = 'Mighty' + (MightyHandler.mighties.length + 1);
      }
      else{
       newMightyName = name;
      }

      MightyHandler.mighties[newMightyName] = new MightyTab(newMightyName);

    }

    
    
    static destroyMighty(name){
      
    }

  }
  MightyHandler.mighties = [];
  MightyHandler.currentMighty = '';



function poopyfunction(){
    console.log("so poopy44")
}

