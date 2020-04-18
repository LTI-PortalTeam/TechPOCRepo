
/**
 * Function to load the Scripts and CSS files in Head and Body
 */
function CreateScript() {
}

/**
 * This Function Add the Scripts into Head.
 */
CreateScript.prototype.addScript = function(tag, scriptpath) {
	var head = document.querySelector(tag);
	var script = document.createElement('script');
	script.setAttribute('type', 'text/javascript');
	script.setAttribute('src', scriptpath);
	head.appendChild(script);
}

/**
 * This Function Add CSS to the head tag through java-script
 */
CreateScript.prototype.addCss = function(tag, scriptpath,media) {
	var head = document.querySelector(tag);
	var link = document.createElement('link');
	link.rel = 'stylesheet';
	link.type = 'text/css';
	link.href = scriptpath;
	link.media = media;
	head.appendChild(link);
}
