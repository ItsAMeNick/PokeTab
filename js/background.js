function updateBadge() {
	chrome.browserAction.getBadgeText({}, function(result) {
		if (result) {
			chrome.browserAction.setBadgeText({text: String(++result)});
		} else {
			chrome.browserAction.setBadgeText({text: "1"});
		}
	});
}

function updatePokemon(pkmn) {
	if (pkmn) {
			pkmn = new Pokemon(pkmn.currentPokemon);
			if (pkmn.isEgg) {
				pkmn.eggCycles -= 1;
				chrome.storage.sync.set({'currentPokemon': pkmn});
			} else {
				pkmn.exp += tab_exp[pkmn.level];
				chrome.storage.sync.set({'currentPokemon': pkmn});
			}
			updateBadge();
		}
}

function checkForEgg() {
	if (Math.random()*100 < 1.95) {
		chrome.browserAction.setBadgeBackgroundColor({color: "#DC143C"});
	}
}

chrome.tabs.onCreated.addListener(function() {
	chrome.storage.sync.get(['currentPokemon'], updatePokemon);
	checkForEgg();
});

chrome.tabs.onActivated.addListener(function() {
	chrome.storage.sync.get(['currentPokemon'], updatePokemon);
});
