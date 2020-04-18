var jq = jQuery.noConflict();
//Create instance of BuildUIControl here
var genCBox = new BuildUIControl();

// function to build the table
function BuildList(tasklist, tablebodyid,taskConfig) {
	var tableBodyRef = document.querySelector(tablebodyid),
	cellData = [],
	controlType = taskConfig.controlType;
	var uiControlInstance;
	var currentUserType;
	//debugger;
	
	// create the cells here
	for (var counter = 0; counter < tasklist.length; counter++) {
		var row = document.createElement("tr");
		tableBodyRef.appendChild(row);

		// converting object into array
		// TODO :::: to be changed later when call is made to the rest api
		var currentTask = [];
		for(var c =0;c<taskConfig.taskParam.length;c++){
			var idName = taskConfig.taskParam[c].id;
			if(idName == 'UserType')
			{
				currentUserType = tasklist[counter][idName];
			}
			taskConfig.taskParam[c].value = tasklist[counter][idName];
			currentTask.push(tasklist[counter][idName]);
		}

		//Create an instance of the control type 
		if(controlType == 'checkbox'){
			uiControlInstance = genCBox.CreateCheckBox(counter);
			currentTask.push(uiControlInstance);
		}
	
		// this is for creating the cells in the row
		// creating 6 cells from the task list
		for (var c = 0; c < currentTask.length; c++) {
			var cell = document.createElement("td");
			cellData.push(cell);
			row.appendChild(cell);
		};

        //add the checkbox control in the last cell
        var lastCellIndex = cellData.length-1;
		cellData[lastCellIndex].appendChild(uiControlInstance);
				
		// set the inner HTML data		
		taskConfig.taskParam.forEach(function(index, i) {
			// if it is status
			//debugger;
			if (index.hyperlink == true) {
				//create the link element 
				var anchorElem = document.createElement('a');
				anchorElem.href = "";
				anchorElem.setAttribute('data-search-key',index.value);
                anchorElem.setAttribute('data-currentusertype',currentUserType);
				anchorElem.setAttribute('data-toggle','modal');
				
				var titleInfo = index.description;
				anchorElem.setAttribute('title',titleInfo);				
				
				var userTypeRef = anchorElem.getAttribute('data-currentusertype');
				var targetModalRef = GetTargetModal(userTypeRef);
				anchorElem.setAttribute('data-target',targetModalRef);
                //debugger;

				//based on the user type the type of modal to opened can be decided				
				anchorElem.onclick = function(){
					//debugger;
					var searchKey = anchorElem.getAttribute('data-search-key');
					var userTypeClicked = anchorElem.getAttribute('data-currentusertype');					
					LinkClick(searchKey,userTypeClicked);
				};                
				anchorElem.innerHTML = index.value;
				cellData[i].appendChild(anchorElem);
			}			
			else {
				var titleInfo = index.description;
				cellData[i].setAttribute('title',titleInfo);
				cellData[i].innerHTML = "<b>" + index.value + "  " + "</b>";
			}
			//debugger;
		});
				
		tableBodyRef.appendChild(row);
		cellData = [];
	}
}