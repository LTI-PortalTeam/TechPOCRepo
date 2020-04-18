//var jq = jQuery.noConflict();

var testJsonObject = {
	key1 : 'bar',
	key2 : 'baz'
};

/**
 * Generate key, value, key-value pairs for Json object.
 */
var taskConfig = {
	taskParam : [ {
		id : "sno",
		description : "Serial Number",
		hyperlink : false,
		value : ""
	}, {
		id : "panTan",
		description : "Pan or Tan Number",
		hyperlink : true,
		value : ""
	}, {
		id : "userType",
		description : "User Type",
		hyperlink : false,
		value : ""
	}, {
		id : "regReqNum",
		description : "Required Registration Number",
		hyperlink : false,
		value : ""
	}, {
		id : "name",
		description : "Id",
		hyperlink : false,
		value : ""
	}, {
		id : "category",
		description : "Category",
		hyperlink : false,
		value : ""
	}, {
		id : "formType",
		description : "Form Type",
		hyperlink : false,
		value : ""
	}, {
		id : "status",
		description : "Status",
		hyperlink : false,
		value : ""
	} ],
	controlType : 'checkbox',
	multiControl : false
};

var JsonFetch = (function() {
	var valueArr = [], keysArr = [], keyValuePair = [];
	var testJsonObject;
	return {
		SetJsonObject : function(jsonObject) {
			testJsonObject = jsonObject;
		},
		GenerateData : function(fetchType) {
			switch (fetchType) {
			case 'fetchkeys':
				var objectData = jq.each(testJsonObject,
						function(index, value) {
							keysArr.push(index);
						});
				return keysArr;
			case 'fetchvalues':
				var objectData = jq.each(testJsonObject,
						function(index, value) {
							valueArr.push(value);
						});
				return valueArr;
			case 'keyvalues':
				var objectData = jq.each(testJsonObject,
						function(index, value) {
							keyValuePair.push(index + ":" + value);
						});
				return keyValuePair;
			}
		},
		CloneObject : function(objectToClone) {
			var cloneOfA = JSON.parse(JSON.stringify(objectToClone));
			return cloneOfA;
		}
	}
})();
// set the JSON object from here
JsonFetch.SetJsonObject(testJsonObject);
// then generate the data from here
var keysData = JsonFetch.GenerateData('fetchkeys');
var valuesData = JsonFetch.GenerateData('fetchvalues');
var keyValuesData = JsonFetch.GenerateData('keyvalues');

/**
 * Function to get the userType for Modal based on User Type.
 */
function GetTargetModal(userType) {
	// For opening a different type of modal based on the user Type
	var targetModalRef;

	if (userType == 'Reporting Entity User') {
		targetModalRef = '#ReportingEntityUser';
	} else {
		targetModalRef = '#Officer';
	}
	return targetModalRef;
}

function FetchModalBodyContainerId(userType) {
	// For opening a different type of modal based on the user Type
	var modalBodyRef;
	if (userType == 'Reporting Entity User') {
		modalBodyRef = '#re-modal-body';
	} else {
		modalBodyRef = '#officer-modal-body';
	}

	return modalBodyRef;
}




/**
 * Function to set the attribute property. It is a Property initiater.
 */
function ModifyDOM() {

}

/**
 * Function to set the attribute
 * 
 * @param elementId -
 *            It takes element ID as input
 * @param attribute -
 *            It takes attribute name which we want to apply on element
 * @param attributeValue -
 *            It takes attribute Value either true or false
 */
ModifyDOM.prototype.SetAttribute = function(elementId, attribute,
		attributeValue) {
	document.querySelector(elementId).setAttribute(attribute, attributeValue);
}

/**
 * Function to remove the attribute
 * 
 * @param elementId -
 *            It takes element ID as input
 * @param attribute -
 *            It takes attribute name which we want to apply on element
 */

ModifyDOM.prototype.RemoveAttribute = function(elementId, attribute) {
	document.querySelector(elementId).removeAttribute(attribute);
}

/**
 * Function to set the inner HTML
 * 
 * @param elementId -
 *            It takes element ID as input
 * @param innerHTMLValue -
 *            It takes html value to be appended
 */
ModifyDOM.prototype.SetInnerHTML = function(elementId, innerHTMLValue) {
	document.querySelector(elementId).innerHTML = innerHTMLValue;
}

/**
 * Function to hide the element
 * 
 * @param elementId -
 *            It takes element ID as input
 * @param attributeValue - 
 * 			  can be block or none
 */

ModifyDOM.prototype.HideShowElement = function(elementId, attributeValue) {
	document.querySelector(elementId).style.display = attributeValue;
}
function XSSProtector(value){
	   var inputValue = true;
	   var originalText = value;
	   var filterText = filterXSS(originalText);
	   if (originalText != filterText) {
	      inputValue = false;
	   } else {
	      inputValue = true;
	   }
	   return inputValue;
	}
