
function isEmpty(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }

    return JSON.stringify(obj) === JSON.stringify({});
}


function len(obj) {
	// need this for if obj is not an object and thus has no length 
	if(obj){
		return Object.keys(obj).length;
	}
	
	else{
		return 0;
	}
 }
