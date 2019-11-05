//clears the text Create Mighty when the user press on it
const nameInput =	document.getElementById('nameInput')
const nameInput_original_value = nameInput.value
document.getElementById('nameInput').addEventListener('mousedown', function()	{
	if(nameInput.value == nameInput_original_value )	{
		nameInput.value = ""
	}
})

