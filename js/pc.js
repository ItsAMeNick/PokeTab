document.getElementById("sort_egg").addEventListener("click", function() {
	chrome.storage.local.get('eggPosition', function(result) {
		if (!result.eggPosition) {
			chrome.storage.local.set({'eggPosition': "top"});
		} else if (result.eggPosition == 'top') {
			chrome.storage.local.set({'eggPosition': "bottom"});
		} else {
			chrome.storage.local.set({'eggPosition': "top"});
		}
	});
	location.reload();
}, false);

document.getElementById("sort_dex").addEventListener("click", function() {
	chrome.storage.local.get('pcSort', function(result) {
		if (!result.pcSort) {
			chrome.storage.local.set({'pcSort': "DexL"});
		} else if (result.pcSort == 'DexL') {
			chrome.storage.local.set({'pcSort': "DexH"});
		} else {
			chrome.storage.local.set({'pcSort': "DexL"});
		}
	});
	location.reload();
}, false);

document.getElementById("sort_level").addEventListener("click", function() {
	chrome.storage.local.get('pcSort', function(result) {
		if (!result.pcSort) {
			chrome.storage.local.set({'pcSort': "LvL"});
		} else if (result.pcSort == 'LvL') {
			chrome.storage.local.set({'pcSort': "LvH"});
		} else {
			chrome.storage.local.set({'pcSort': "LvL"});
		}
	});
	location.reload();
}, false);
