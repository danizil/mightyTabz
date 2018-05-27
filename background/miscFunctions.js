
function isEmpty(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }

    return JSON.stringify(obj) === JSON.stringify({});
}


function len(obj) {
	
	if(obj){
		return Object.keys(obj).length;
	}
	
	else{
		return 0;
	}
 }
