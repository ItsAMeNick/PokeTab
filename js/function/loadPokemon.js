chrome.storage.sync.get('currentPokemon', function(result) {
	pkmn = result.currentPokemon;
	if (pkmn) {
		pkmn = new Pokemon(pkmn);
		console.log(pkmn);

		//Handle Name, sex, and level display
		document.getElementById('pkmn_name').innerHTML = pkmn.name;
		if (!pkmn.isEgg) {
			document.getElementById('pkmn_sex').innerHTML = pkmn.sex;
			document.getElementById('pkmn_level').innerHTML = "Lv." + pkmn.level;
		}

		//Set the image and filler text
		document.getElementById('pkmn_image').src = pkmn.sprite;
		document.getElementById('pkmn_image').alt = pkmn.name;

		//Add egg animation
		if (pkmn.isEgg) {
			document.getElementById('image_class').classList.add("egg_image");
		}

		//Fill in the exp bar
		if (!pkmn.isEgg) {
			if (pkmn.level === 100) {
				document.getElementById('exp_bar').value = 100;
				document.getElementById('exp_bar').max = 100;
			} else {
				var exp_lower = level_curves[pkmn.curve](pkmn.level);
				var exp_upper = level_curves[pkmn.curve](pkmn.level+1);
				document.getElementById('exp_bar').value = pkmn.exp-exp_lower;
				document.getElementById('exp_bar').max = exp_upper-exp_lower;
			}
		} else {
			document.getElementById('exp_bar').value = pokemon_data[pkmn.dex].egg_cycles - pkmn.eggCycles;
			document.getElementById('exp_bar').max = pokemon_data[pkmn.dex].egg_cycles;
		}

		var message = "";
		if (pkmn.isEgg) {
			if (pkmn.eggCycles >= 41) {
				message = "It looks as though this Egg will take a long time yet to hatch.";
			} else if (pkmn.eggCycles >= 11) {
				message = "What Pokemon will hatch from this Egg? It doesn't seem close to hatching.";
			} else if (pkmn.eggCycles >= 6) {
				message = "It appears to move occasionally. It may be close to hatching.";
			} else {
				message = "Sounds can be heard coming from inside! This Egg will hatch soon!";
			}
		} else {
			message = pkmn.character;
		}
		document.getElementById('pkmn_message').innerHTML = message;

		chrome.storage.sync.get(['pc'], function(result) {
			document.getElementById('egg').innerHTML = "You Have: " + result.pc.length + " eggs";
		})

	} else {
		console.log("YAINT POKEMON");	
	}
});