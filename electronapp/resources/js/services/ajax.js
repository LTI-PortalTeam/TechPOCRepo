/**
 * 
 * Creates a namespace to access the JQuery
 */
/**
 * Function To handle Ajax Request and getting response
 * @param String - ajaxurl this should be the URL from where response should come.
 * @param String - fetchtype is request type of GET or POST.
 * @param Function - callbackfunc is a function to be called after response is successfully received.
 * @param dataToSend is the data we need to send to backend.
 * @author Shoumya Dasgupta
 */
function AjaxHandle(){}

var checkSuccessFailure ;
//Initialize the Ajax Call configuration
AjaxHandle.prototype.InitConfig = function(ajaxUrl,fetchType,callBackFunc, dataToSend,parsingid,token,header){
    this.ajaxUrl = ajaxUrl;
	this.ajaxType = fetchType;	
	this.callBackFunction = callBackFunc;
	this.dataToSend = dataToSend;
	this.parsingid=parsingid;
	this.token=token;
	this.header=header;
}

//Make the Ajax Call
AjaxHandle.prototype.getResponse = function(){
	var token = this.token;
	var header = this.header;
		jq.ajax({
		type : this.ajaxType,
		url :  this.ajaxUrl,
		contentType : 'application/json; charset=utf-8',
		dataType : "json",
		async : false,
		data : this.dataToSend,
		beforeSend : function(xhr) {
			
			if (token) {
				xhr.setRequestHeader(header, token);
			}
		},
		success : function(data) {
			response=data.data;
		},
		error : function(error) {
			
			if(error.status==403){
				window.location.href="login";
			}
			return error;
		}
	});
	return response;
}

//
AjaxHandle.prototype.DownloadFile=function(){
	xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
	    var a;
	    if (xhttp.readyState === 1) {
	    	jq("#wait").show();
	    }
	    if (xhttp.readyState === 4 && xhttp.status === 200) {
	        // Trick for making downloadable link
	        a = document.createElement('a');
	        var filename = "";
	        var disposition = xhttp.getResponseHeader('Content-Disposition');
	        if (disposition && disposition.indexOf('attachment') !== -1) {
	            var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
	            var matches = filenameRegex.exec(disposition);
	            if (matches != null && matches[1]) filename = matches[1].replace(/['"]/g, '');
	        }
	        jq("#wait").hide();
	        var blob=new Blob([xhttp.response],{type:'application/pdf'});
	        if(navigator.appVersion.toString().indexOf('.NET') > 0 )
	        {
	        	
	        	window.navigator.msSaveBlob(blob,filename);
	        }
	        else
	        {	
	        a.href = window.URL.createObjectURL(xhttp.response);
	        // Give filename you wish to download
	        a.download = filename;
	        a.style.display = 'none';
	        document.body.appendChild(a);
	        a.click();
	        }
	    }
	    if (xhttp.readyState === 4 && xhttp.status === 401) {
	    	jq('html, body').animate({scrollTop : 0});
	    	ComplianceController.successor(errorMessages.UNAUTORIZED);
	    	jq("div").modal("hide");
	    }
	};
	// Post data to URL which handles post request
	xhttp.open(this.ajaxType, this.ajaxUrl);
	if (token) {
    	xhttp.setRequestHeader(header, token);
	}
	xhttp.setRequestHeader("Content-Type", "application/json");
	// You should set responseType as blob for binary responses
	xhttp.responseType = 'blob';
	xhttp.send(this.dataToSend);
}
//Make Multipart Get Response
AjaxHandle.prototype.MakeMultipartGetResponse = function(){
    //debugger;	
	var token = this.token;
	var header = this.header;
	jq.ajax({
		type : 'POST',
		url :  this.ajaxUrl,
		cache: false,
		contentType: false,
		processData: false,
		dataType : "json",
		async : false,
		data : this.dataToSend,
		beforeSend : function(xhr) {
			if (token) {
				xhr.setRequestHeader(header, token);
			}
		},
		enctype:'multipart/form-data',
		success : function(data) {
			if(data.resStatus == "Failure") {
				checkSuccessFailure = data.resStatus;
				//alert("Please upload prtoper ext");
				
			} else {
				checkSuccessFailure = data.resStatus;
			response=data.data; 
			}
		},
		error : function(error) {
			//debugger;
			responseData = error;
			//callBack(responseData,parseRefid);
			//alert('request failed ' + responseData );
		}
	});
	return response;
}

//Make the Ajax Call With ID
AjaxHandle.prototype.MakeAjaxCallWithID = function(){
    //debugger;
	var callBack = this.callBackFunction;
	var responseData = null;
	var parseRefid=this.parsingid;
	var token = this.token;
	var header = this.header;
	jq.ajax({
		type : this.ajaxType,
		url :  this.ajaxUrl,
		contentType : 'application/json; charset=utf-8',
		dataType : "json",
		async : false,
		data : this.dataToSend,
		beforeSend : function(xhr) {
			if (token && header) {
				xhr.setRequestHeader(header, token);
			}
		},
		success : function(data) {			
			responseData = data;				
			callBack(responseData,parseRefid);
		},
		error : function(error) {
			//debugger;
			responseData = error;
			callBack(responseData,parseRefid);
			//alert('request failed ' + responseData );
		}
	});
}
//Make the Ajax Call
AjaxHandle.prototype.MakeAjaxCall = function(){
    //debugger;
	var callBack = this.callBackFunction;
	var responseData = null;
	var token = this.token;
	var header = this.header;
	jq.ajax({
		type : this.ajaxType,
		url :  this.ajaxUrl,
		contentType : 'application/json; charset=utf-8',
		dataType : "json",
		async : false,
		data : this.dataToSend,
		beforeSend : function(xhr) {
			if (token && header) {
				xhr.setRequestHeader(header, token);
			}
		},
		success : function(data) {
			//console.log(data);
			responseData = data;
			//debugger;
			callBack(responseData);
		},
		error : function(error) {
			//debugger;
			responseData = error;
			callBack(responseData);
			//alert('request failed ' + responseData );
		}
	});
}

//Make the Ajax Call
AjaxHandle.prototype.MakeMultipartAjaxCall = function(){
    //debugger;
	var callBack = this.callBackFunction;
	var responseData = null;
	var parseRefid=this.parsingid;
	var token = this.token;
	var header = this.header;
	jq.ajax({
		type : this.ajaxType,
		url :  this.ajaxUrl,
		cache: false,
		contentType: false,
		processData: false,
		datatype : "json",
		async : true,
		data : this.dataToSend,
		beforeSend : function(xhr) {
			if (token && header) {
				xhr.setRequestHeader(header, token);
			}
		},
		success : function(data) {
			responseData = data;
			//debugger;
			callBack(responseData,parseRefid);
		},
		error : function(error) {
			//debugger;
			responseData = error;
			callBack(responseData,parseRefid);
			//alert('request failed ' + responseData );
		}
	});
}



