//clears the text Create Mighty when the user press on it
const nameInput =	document.getElementById('nameInput')
const nameInput_original_value = nameInput.value
document.getElementById('nameInput').addEventListener('mousedown', function()	{
	if(nameInput.value == nameInput_original_value )	{
		nameInput.value = ""
	}
})
function clickEventFoo(element)	{
console.log('made')
	return function()	{
		console.log('fired')
		document.getElementsByClassName("selected")[0].classList.remove("selected")
		element.classList.add("selected")
	}
}
function setStyle()	{
	var mightyPs = document.getElementsByClassName("mightyP")
	for(var i = 0; i < mightyPs.length; i++)	{
		console.log("making")
		mightyPs[i].addEventListener('mousedown', clickEventFoo(mightyPs[i]))
	}
}

