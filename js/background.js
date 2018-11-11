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

chrome.tabs.onCreated.addListener(function() {
	chrome.storage.sync.get(['currentPokemon'], updatePokemon);
});

chrome.tabs.onActivated.addListener(function() {
	chrome.storage.sync.get(['currentPokemon'], updatePokemon);
});
