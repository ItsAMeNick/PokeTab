console.log("GETTING FIRST EGG");

chrome.storage.sync.set({'first_time': true});

var first_dex = 1;
var random_number = Math.random();

if (random_number > 0.67) {
	first_dex = 1;
} else if (random_number > 0.33) {
	first_dex = 4;
} else {
	first_dex = 7;
}

var pkmn = new Pokemon(first_dex);

chrome.storage.sync.set({'currentPokemon': pkmn})
chrome.storage.sync.set({'pc': []});

window.location = "../../main.html";