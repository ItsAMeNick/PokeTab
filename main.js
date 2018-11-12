//Clear badge when PokeTab is opened
chrome.browserAction.setBadgeText({text: ""});

//Make checks on current pokemon!
function checkHatch() {
	console.log("Checking EggCycles!")
	chrome.storage.sync.get(['currentPokemon'], function(result) {
		if (result.currentPokemon.isEgg && result.currentPokemon.eggCycles < 0) {
			alert("Your egg is hatching!");
			hatchCurrent();
		}
	});
}

function checkLevelUp() {
	console.log("Checking EXP");
	chrome.storage.sync.get(['currentPokemon'], function(result) {
		var pkmn = result.currentPokemon;
		if (pkmn.level != 100 && pkmn.level < exp_curves[pkmn.curve](pkmn.exp)) {
			alert("Your pokemon has leveled up!")
			levelUpCurrent();
		}
	});
}

function checkEvolve() {
	console.log("Checking Evolve");
	chrome.storage.sync.get(['currentPokemon'], function(result) {
		var pkmn = result.currentPokemon;
		if (!pkmn.isEgg && pkmn.level >= pkmn.evo_lv) {
			alert("Your pokemon is Evolving!")
			evolveCurrent();
		}
	});
}

function checkGetEgg() {
	chrome.browserAction.getBadgeBackgroundColor({}, function(result) {
		console.log();
		var color = result[0].toString(16) +
					result[1].toString(16) +
					result[2].toString(16)
		if (color === "dc143c") {
			alert("You've found an egg!");
			chrome.browserAction.setBadgeBackgroundColor({color: "#C0C0C0"});

			chrome.storage.sync.get(['pc'], function(result) {
				var pc = result.pc;
				console.log(pc);
				pc.push(createNewEgg());
				chrome.storage.sync.set({'pc': pc});
			})
			location.reload();
		}	
	});
}


//ACTIVE FUNCTIONS

function hatchCurrent() {
	console.log("Hatching Egg");
	chrome.storage.sync.get(['currentPokemon'], function(result) {
		if (result.currentPokemon.isEgg) {
			pkmn = new Pokemon(result.currentPokemon);
			pkmn.hatch();
			chrome.storage.sync.set({'currentPokemon': pkmn});
			location.reload();
		}
	});
}

function levelUpCurrent() {
	console.log("Leveling up Pokemon");
	chrome.storage.sync.get(['currentPokemon'], function(result) {
		pkmn = new Pokemon(result.currentPokemon);
		//pkmn.levelSet(10);
		pkmn.levelMatch();
		chrome.storage.sync.set({'currentPokemon': pkmn});
	});
	location.reload();
}

function evolveCurrent() {
	console.log("Evolving Pokemon!");
	chrome.storage.sync.get(['currentPokemon'], function(result) {
		pkmn = new Pokemon(result.currentPokemon);
		pkmn.evolve();
		chrome.storage.sync.set({'currentPokemon': pkmn});
	});
	location.reload();
}

function giveEXPCurrent() {
	console.log("Giving EXP");
	chrome.storage.sync.get(['currentPokemon'], function(result) {
		pkmn = new Pokemon(result.currentPokemon);
		pkmn.exp += 100000;
		chrome.storage.sync.set({'currentPokemon': pkmn});
	});
	location.reload();
}

function createNewEgg() {
	var possible_pokemon = [];
	for (i in pokemon_data) {
		if (possible_pokemon.indexOf(pokemon_data[i].egg_pokemon) < 0) {
			possible_pokemon.push(pokemon_data[i].egg_pokemon);
		}
	}
	var new_pkmn = new Pokemon(possible_pokemon[Math.floor(Math.random()*possible_pokemon.length)])
	console.log(new_pkmn);
	return new_pkmn;
}

chrome.storage.sync.get(['currentPokemon'], function(result) {
	if (result.currentPokemon) {
		checkHatch();
		checkLevelUp();
		checkEvolve();
		checkGetEgg();
	}
})

document.getElementById("clear").addEventListener("click", function() {
	chrome.storage.sync.clear();
	chrome.browserAction.setBadgeText({text: ""});
	location.reload();
}, false);

document.getElementById("hatchPokemon").addEventListener("click", hatchCurrent, false);
document.getElementById("giveEXPPokemon").addEventListener("click", giveEXPCurrent, false);
document.getElementById("forceEvolve").addEventListener("click", evolveCurrent, false);
document.getElementById("pc").addEventListener("click", function() {window.location = './html/pc.html'}, false);
