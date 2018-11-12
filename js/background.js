function updateBadge() {
	chrome.browserAction.getBadgeText({}, function(result) {
		if (result) {
			chrome.browserAction.setBadgeText({text: String(++result)});
		} else {
			chrome.browserAction.setBadgeText({text: "1"});
		}
	});
}

function updatePokemon(data) {
	if (data) {
			var pkmn = data.pc[data.currentPokemon];
			if (pkmn.isEgg) {
				pkmn.eggCycles -= 1;
			} else {
				pkmn.exp += tab_exp[pkmn.level];
			}
			data.pc[data.currentPokemon] = pkmn;
			chrome.storage.local.set({'pc': data.pc});
			updateBadge();
		}
}

function checkForEgg() {
	if (Math.random()*100 < 8) {
		chrome.browserAction.setBadgeBackgroundColor({color: "#DC143C"});
	}
}

chrome.tabs.onCreated.addListener(function() {
	chrome.storage.local.get(['currentPokemon', 'pc'], updatePokemon);
	checkForEgg();
});

chrome.tabs.onActivated.addListener(function() {
	chrome.storage.local.get(['currentPokemon', 'pc'], updatePokemon);
});
