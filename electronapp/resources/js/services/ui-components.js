

/**
 * Function to create UI controls Dynamically.
 */
function BuildUIControl() {
	
}

/**
 * Create single checkboxes Dynamically.
 * @param counter - It is the Id count
 */
BuildUIControl.prototype.CreateCheckBox = function(counter){
	var checkbox = document.createElement('input');
	checkbox.type = "checkbox";
	checkbox.name = "name"+counter;
	checkbox.value = "value" + counter;
	checkbox.id = "checkboxid" + counter;	
	checkbox.onclick = function(){
		//console.log("Check Box is Clicked"+"  "+"and id is"+"  "+checkbox.id);
		console.log(checkbox.getAttribute('checked'));
		//set the attribute based on its checked status
		var checkedStatus = checkbox.getAttribute('checked');
		if(checkedStatus == "true"){
	      //debugger;
		  checkbox.setAttribute('checked',"false");		
		}
		else {
		  //debugger;
		  checkbox.setAttribute('checked',"true");
		}
	}
	return checkbox;
}

/**
 * Create label Dynamically.
 * @param counter - It is the Id count
 */

BuildUIControl.prototype.CreateLabel = function(counter){
	var label = document.createElement('label');
	label.htmlFor = checkboxData.checkboxCodes[counter].key;
	//debugger;
	label.appendChild(document.createTextNode(checkboxData.checkboxCodes[counter].key));
	return label;
}

/**
 * generate multiple checkboxes Dynamically.
 * @param checkboxcontainerid - It is the Id count
 */

BuildUIControl.prototype.GenerateCheckBoxes = function(checkboxcontainerid){
	for (var counter = 0; counter < 14; counter++) {
		var checkboxHolder = document.createElement('div'),
		checkBoxInstance = this.CreateCheckBox(counter),
		labelInstance = this.CreateLabel(counter);
		checkboxHolder.appendChild(checkBoxInstance);
		checkboxHolder.appendChild(labelInstance);
		//appending the check box to the check box container
		document.querySelector(checkboxcontainerid).appendChild(checkboxHolder);
	}
}

//select all the date selectors
var dateObjects = document.querySelectorAll('.dateselector');

/**
 * Function to create DatePicker.
 */
function datePickerBuilder() {
}

/** 
 * Fetch the dateid's from the array
 */
datePickerBuilder.prototype.fetchDateObjects = function() {
	this.dateIds = [];
	for (var index = 0; index < dateObjects.length; index++) {
		this.dateIds.push("#" + dateObjects[index].id);
	}
	;
}

datePickerBuilder.prototype.initDateObjects = function() {	
	/** 
	 * call and initialize the date function
	 * @param datePickerId - datapickerId will accept the id of datepicker input box.
	 */
	
	this.dateIds.forEach(function(datePickerId) {
		/*var currentTime = new Date();
		var yearRange = "1900";*/
		jq(datePickerId).datepicker({
			dateFormat : 'dd-mm-yy',
			changeMonth: true,
		    changeYear: true,
		    yearRange: '-120y:c+nn',
            maxDate: '-1d'
		});
	});
}

var datePkr = new datePickerBuilder();
datePkr.fetchDateObjects();
datePkr.initDateObjects();