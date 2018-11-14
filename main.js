//Clear badge when PokeTab is opened
chrome.browserAction.setBadgeText({text: ""});

//Make checks on current pokemon!
function checkHatch() {
	console.log("Checking EggCycles!")
	chrome.storage.local.get(['currentPokemon','pc'], function(result) {
		var current_id = result.currentPokemon;
		var pkmn = result.pc[current_id];
		if (pkmn.isEgg && pkmn.eggCycles < 0) {
			hatchCurrent();
		}
	});
}

function checkLevelUp() {
	console.log("Checking EXP");
	chrome.storage.local.get(['currentPokemon','pc'], function(result) {
		var current_id = result.currentPokemon;
		var pkmn = result.pc[current_id];
		if (pkmn.level != 100 && pkmn.level < exp_curves[pkmn.curve](pkmn.exp)) {
			levelUpCurrent();
		}
	});
}

function checkEvolve() {
	console.log("Checking Evolve");
	chrome.storage.local.get(['currentPokemon', 'pc'], function(result) {
		var current_id = result.currentPokemon;
		var pkmn = result.pc[current_id];
		if (!pkmn.isEgg && pkmn.level >= pkmn.evo_lv) {
			evolveCurrent();
		}
	});
}

function checkGetEgg() {
	chrome.browserAction.getBadgeBackgroundColor({}, function(result) {
		var color = result[0].toString(16) +
					result[1].toString(16) +
					result[2].toString(16)
		if (color === "dc143c") {
			//alert("You've found an egg!");
			chrome.browserAction.setBadgeBackgroundColor({color: "#C0C0C0"});

			chrome.storage.local.get(['pc'], function(result) {
				var new_pkmn = createNewEgg();
				result.pc[new_pkmn.id] = new_pkmn;
				chrome.storage.local.set({'newPokemon': new_pkmn});
				location.reload();
			});
		}
	});
}

function checkNewPokemon() {
	chrome.storage.local.get(['pc', 'newPokemon'], function(result) {
		if (result.newPokemon) {
			console.log(result.newPokemon);
			result.pc[result.newPokemon.id] = result.newPokemon;
			console.log(result.pc);
			chrome.storage.local.set({'pc': result.pc});

			document.getElementById('egg_notification').innerHTML = "You've found an Egg";
			document.getElementById('notification').show();

			chrome.storage.local.set({'newPokemon': null});
		}
	});
}



//ACTIVE FUNCTIONS

function forceGiveEgg() {
	chrome.storage.local.get(['pc'], function(result) {
		var new_pkmn = createNewEgg();
		result.pc[new_pkmn.id] = new_pkmn;
		chrome.storage.local.set({'pc': result.pc});
	});
	location.reload();
}

function hatchCurrent() {
	console.log("Hatching Egg");
	chrome.storage.local.get(['currentPokemon', 'pc'], function(result) {
		if (result.pc[result.currentPokemon].isEgg) {
			var pkmn = new Pokemon(result.pc[result.currentPokemon]);
			pkmn.hatch();
			result.pc[result.currentPokemon] = pkmn;
			chrome.storage.local.set({'pc': result.pc});
			document.getElementById('hatch_notification').innerHTML = "Your egg hatched!";
			document.getElementById('notification').show();
		}
	});
}

function levelUpCurrent() {
	console.log("Leveling up Pokemon");
	chrome.storage.local.get(['currentPokemon', 'pc'], function(result) {
		pkmn = new Pokemon(result.pc[result.currentPokemon]);
		pkmn.levelMatch();
		result.pc[result.currentPokemon] = pkmn;
		chrome.storage.local.set({'pc': result.pc});
	});
	document.getElementById('level_notification').innerHTML = "Your Pokemon has leveled up!";
	document.getElementById('notification').show();
}

function evolveCurrent() {
	console.log("Evolving Pokemon!");
	chrome.storage.local.get(['currentPokemon','pc'], function(result) {
		pkmn = new Pokemon(result.pc[result.currentPokemon]);
		pkmn.evolve();
		result.pc[result.currentPokemon] = pkmn;
		chrome.storage.local.set({'pc': result.pc});
	});
	document.getElementById('evolve_notification').innerHTML = "Your Pokemon has evolved!";
	document.getElementById('notification').show();
}

function giveEXPCurrent() {
	console.log("Giving EXP");
	chrome.storage.local.get(['currentPokemon','pc'], function(result) {
		pkmn = new Pokemon(result.pc[result.currentPokemon]);
		pkmn.exp += Math.random()*100000;
		result.pc[result.currentPokemon] = pkmn;
		chrome.storage.local.set({'pc': result.pc});
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
	return new_pkmn;
}

chrome.storage.local.get(['currentPokemon'], function(result) {
	if (result.currentPokemon) {
		checkHatch();
		checkLevelUp();
		checkEvolve();
		checkGetEgg();
		checkNewPokemon();
	}
})

document.getElementById("clear").addEventListener("click", function() {
	chrome.storage.local.clear();
	chrome.browserAction.setBadgeText({text: ""});
	location.reload();
}, false);

document.getElementById("hatchPokemon").addEventListener("click", hatchCurrent, false);
document.getElementById("giveEXPPokemon").addEventListener("click", giveEXPCurrent, false);
document.getElementById("forceEvolve").addEventListener("click", evolveCurrent, false);
document.getElementById("giveEgg").addEventListener("click", forceGiveEgg, false);

document.getElementById('close_notification').addEventListener('click', function() {
	document.getElementById('hatch_notification').innerHTML = "";
	document.getElementById('level_notification').innerHTML = "";
	document.getElementById('evolve_notification').innerHTML = "";
	document.getElementById('egg_notification').innerHTML = "";

	location.reload();
	document.getElementById('notification').close();
}, false);
document.getElementById("pc").addEventListener("click", function() {window.location = './html/pc.html'}, false);
