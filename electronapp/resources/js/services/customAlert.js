
/**
 * Function To create custom alert box
 * @param String - header this should be the heading of Alert box.
 * @param String - dialog is message to be given to user.
 * @param Function - callback is a function to be called when page navigation is necessary after user response.
 * @author Priyanka Bansal
 */
function CustomAlert() {
}

var Alert = new CustomAlert();
var returnValue = false;

/*CustomAlert.prototype.customAlertConfig = function(callBackFunc) {
	this.callBackFunction = callBackFunc;
}
*/
CustomAlert.prototype.show = function(header,dialog,OKBtn,YesBtn, CnclBtn,btnId) {
	//var callBack = this.callBackFunction;
        var winW = window.innerWidth;
        var winH = window.innerHeight;
        var dialogOverlay = document.getElementById('dialog-overlay');
        var dialogBox = document.getElementById('dialog-box');

        dialogOverlay.style.display = "block";
        dialogOverlay.style.height = winH + "px";
        dialogBox.style.left = ((winW / 2) - (350 / 2)) + "px";
        dialogBox.style.top = "200px";
        dialogBox.style.display = "block";

        document.getElementById('dialog-box-head').innerHTML = header;
        document.getElementById('dialog-box-body').innerHTML = dialog;
        jq("#dialog-box-foot").empty();
        if(OKBtn){
        	jq("#dialog-box-foot").append("<button class='button' onclick='Alert.cancel()'>OK</button>&nbsp;");
        }
        if(YesBtn){
        	jq("#dialog-box-foot").append("<button class='button' id='"+btnId+"'>OK</button>");
        }
        if(CnclBtn){
        	jq("#dialog-box-foot").append("&nbsp;<button class='button' id='cancelBtn' onclick='Alert.cancel()'>Cancel</button>");
        }
        
}

CustomAlert.prototype.ok = function (callback) {
        if(callback!=null){
			callback();
	    }
        returnValue = true;
        CustomAlert.prototype.hide();
        return returnValue;
    }

CustomAlert.prototype.cancel = function () {
    CustomAlert.prototype.hide();

}

CustomAlert.prototype.hide = function () {
        document.getElementById('dialog-box').style.display = "none";
        document.getElementById('dialog-overlay').style.display = "none";
    }


/*CustomAlert.prototype.showCustomConfirm = function (header,dialog, op, id, callback) {
        var winW = window.innerWidth;
        var winH = window.innerHeight;
        var dialogOverlay = document.getElementById('dialog-overlay_confirm');
        var dialogBox = document.getElementById('dialog-box_confirm');

        dialogOverlay.style.display = "block";
        dialogOverlay.style.height = winH + "px";
        dialogBox.style.left = ((winW / 2) - (350 / 2)) + "px";
        dialogBox.style.top = "200px";
        dialogBox.style.display = "block";

        document.getElementById('dialog-box-head_confirm').innerHTML = header;
        document.getElementById('dialog-box-body_confirm').innerHTML = dialog;
        document.getElementById('dialog-box-foot_confirm').innerHTML =
            '<button class="button" onclick="Alert.yes(\'' + op + '\',\'' + id + '\',\''+callback+'\')">Yes</button> <button class="button" onclick="Alert.no()">No</button>';
    }

CustomAlert.prototype.no = function () {
	CustomAlert.prototype.hide();
    }

CustomAlert.prototype.yes = function (op, id,callback) {
        if (op == "delete_post") {
            deletePost(id);
        }
        else if(op=="confirm_post") {
        	if(callback!=null){
    			callback();
    	    }
        }
        CustomAlert.prototype.hide();
    }
	

function deletePost(id) {
	    var db_id = id.replace("post_", "");
	    // Run Ajax request here to delete post from database
	    document.body.removeChild(document.getElementById(id));
	}*/

/*function confirmPost(){
	return true;
}*/