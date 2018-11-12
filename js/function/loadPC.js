chrome.storage.local.get(['pc'], function(result) {
	pc_data = result.pc;
	for (var p in pc_data) {
		var pkmn = document.createElement('div');
		pkmn.id = p;
		pkmn.className = "pokemon_card";

		var image = document.createElement('img');
		image.src = pc_data[p].sprite;
		image.alt = pc_data[p].name;
		image.className = "pkmn_image";
		pkmn.appendChild(image);

		pkmn.appendChild(document.createElement('hr'));

		if (pc_data[p].isEgg) {
			var egg = document.createElement('span');
			egg.innerHTML = "Egg";
			egg.className = 'pkmn_sex';
			pkmn.appendChild(egg);

		} else {
			var level = document.createElement('span');
			var sex = document.createElement('span');
			var shiny = document.createElement('span');

			level.className = 'pkmn_level';
			level.innerHTML = pc_data[p].level;

			sex.className = 'pkmn_sex';
			sex.innerHTML = pc_data[p].sex;

			if (pc_data[p].isShiny) {
				shiny.className = 'pkmn_shiny';
				shiny.innerHTML = '*';
			}

			pkmn.appendChild(sex);
			pkmn.appendChild(shiny);
			pkmn.appendChild(level);
		}

		pkmn.addEventListener('click', function() {
			chrome.storage.local.set({'currentPokemon': this.id});
			window.location = '../main.html';
		});

		document.getElementById('pc').appendChild(pkmn);
	}
});

// //Hatch all eggs
// chrome.storage.local.get(['pc'], function(r) {
// 	var a = r.pc;
// 	for (i in a) {
// 		console.log(a[i]);
// 		var t = new Pokemon(a[i]);
// 		t.hatch();
// 		a[i] = t;
//     }
// 	chrome.storage.local.set({'pc': a});
// });
