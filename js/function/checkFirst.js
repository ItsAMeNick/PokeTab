console.log("Running checkFirst.js");

chrome.storage.sync.get(['first_time'], function(result) {
	if (!result.first_time) {
		console.log("RUN FIRST TIME!");
		window.location = "../../html/firstTime.html";
	} else {
	}
});