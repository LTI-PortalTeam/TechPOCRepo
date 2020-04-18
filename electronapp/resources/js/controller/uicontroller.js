var jq = jQuery.noConflict();

// This is a UI Module
var CBDTController = (function() {
	var controllername = 'CBDT Controller';
	var domids = [];
	var createScriptInstance = new CreateScript();
	var formObjects = [];	
	return {		
		FetchDomHandle : function(element) {
			// Read all the DOM IDS in the page
			//debugger;
			var element = document.querySelector(element);
			domids = element.querySelectorAll("form");
			for (var c = 0; c < domids[0].length; c++) {
				var formpart = domids[0][c];
				formObjects.push(formpart);
			}
			return formObjects;
		},
		FetchTabDom : function(element) {
			// Read all the DOM IDS in the page
			//debugger;
			//var formChild = document.querySelector(element);			
			domids = document.querySelectorAll(element);			
			for (var c = 0; c < domids[0].length; c++) {
				var formpart = domids[0][c];
				if(jq.inArray(formpart,formObjects)== -1){
					formObjects.push(formpart);
				}
			}
			return formObjects;
		},
		FetchElementId : function(elementArr){
          	//debugger;
          	var elementIds = [];
          	for(var i=0;i<elementArr.children.length;i++){
          		var childElem = elementArr.children[i].firstChild.id;
          		elementIds.push("#"+childElem);
          	}
          	return elementIds;
		},
		ClearDom : function() {
			domids = [];
			formObjects = [];
			//debugger;
			console.log("This will clear the dom handles")
		},
		GenerateFormJson: function(formarray){
			var formJson = [];
			//debugger;
			for(var i =0;i<formarray.length;i++){
				var object = {};
				object.name = formarray[i].name;
				object.value = formarray[i].value;
				object.id = formarray[i].id;
				formJson.push(object);
			}
			return formJson;
		},
		GenerateKeyValueJson: function(formarray){
			var formJson = {};
			//debugger;
			for(var i =0;i<formarray.length;i++){
				if(formarray[i].name){
					formJson[formarray[i].name] = formarray[i].value;
				}
			}
			return formJson;
		},
		renderDataIntoForm : function(data, formId){
			jq.each(mlist, function(key, value) {
				jq('[name=' + key + ']',formId ).val(value);
			});
		},
		SearchFormObject:function(modalList,searchKey){
			//debugger;
			for(var i=0;i<modalList.length;i++){
			  	if(modalList[i].PanTan == searchKey){
			  		return modalList[i];
			  		break;
			  	}
			}
		},
		SetModalFormData:function(formElements,modallistdata){
			console.log(modallistdata);
			var modalDataArr = [];
			//convert object to array
			jq.each(modallistdata, function(i,n) {
				modalDataArr.push(n);
			});
			//do maintain the sequential flow in structure
			//loop through the form elements and assign the data			
			for(var counter = 0 ; counter < formElements.length; counter++) {
				document.querySelector('#'+formElements[counter].id).value = modalDataArr[counter];
			}
		},
		SearchFormElement : function(searchstring) {
			for (var i = 0; i < this.domids[0].length; i++) {
				if (this.domids[0][i].name == searchstring) {
					// construct the object details here and send it
					var searchObject = {};
					searchObject.name = this.domids[0][i].name;
					searchObject.type = this.domids[0][i].type;
					searchObject.value = this.domids[0][i].value;
					return searchObject;
					break;
				}
			}
		},
		BindModelUI : function() {
			console.log("WatchJs will be used over here to bind the form data with the model");
			BindUI(this.ajaxDataModel, this.domids);
		},
		LoadModel : function() {
			//initialize the call back function
			var callback = CBDTController.InitModelData; 
			HandleAjax('resources/jsonData.json','fetch',callback,{});
		},
		InitModelData:function(dataModel){
			//this.ajaxDataModel = dataModel;
			//debugger;
			//BuildTable(this.ajaxDataModel);
			InteractiveTable();
		},
		LoadExternalScripts : function(tag, scriptpath) {
			// parameters tag and script path
			createScriptInstance.addScript('head', 'resources/js/atscript.js');
		},
		LoadExternalCSS : function(tag, linkpath) {
			// parameters tag script path and css type is media
			createScriptInstance.addCss('head', 'resources/js/atscript.js','screen');
		},
		renderDataIntoForm : function(data, formId){
			jq.each(mlist, function(key, value) {
				jq('[name=' + key + ']',formId ).val(value);
			});
		}
	};
})();
