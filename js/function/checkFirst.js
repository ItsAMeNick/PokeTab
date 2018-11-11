console.log("Running checkFirst.js");

chrome.storage.sync.get(['first_time'], function(result) {
	if (!result.first_time) {
		console.log("RUN FIRST TIME!");
		chrome.browserAction.setBadgeBackgroundColor({color: "#C0C0C0"});
		window.location = "../../html/firstTime.html";
	} else {
	}
});