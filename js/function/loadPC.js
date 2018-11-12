var sort_function = {
	"top": {
		"LvH" : function(p1, p2) {
			p1 = pc_data[p1];
			p2 = pc_data[p2];
			if(p1.isEgg) return -1;
			if(p2.isEgg) return 1;
			return p2.level - p1.level;
		},
		"LvL" : function(p1, p2) {
			p1 = pc_data[p1];
			p2 = pc_data[p2];
			if(p1.isEgg) return -1;
			if(p2.isEgg) return 1;
			return p1.level - p2.level;
		},
		"DexH" : function(p1, p2) {
			p1 = pc_data[p1];
			p2 = pc_data[p2];
			if(p1.isEgg) return -1;
			if(p2.isEgg) return 1;
			return p2.dex - p1.dex;
		},
		"DexL" : function(p1, p2) {
			p1 = pc_data[p1];
			p2 = pc_data[p2];
			if(p1.isEgg) return -1;
			if(p2.isEgg) return 1;
			return p1.dex - p2.dex;
		}
	},
	"bottom": {
		"LvH" : function(p1, p2) {
			p1 = pc_data[p1];
			p2 = pc_data[p2];
			if(p1.isEgg) return 1;
			if(p2.isEgg) return -1;
			return p2.level - p1.level;
		},
		"LvL" : function(p1, p2) {
			p1 = pc_data[p1];
			p2 = pc_data[p2];
			if(p1.isEgg) return 1;
			if(p2.isEgg) return -1;
			return p1.level - p2.level;
		},
		"DexH" : function(p1, p2) {
			p1 = pc_data[p1];
			p2 = pc_data[p2];
			if(p1.isEgg) return 1;
			if(p2.isEgg) return -1;
			return p2.dex - p1.dex;
		},
		"DexL" : function(p1, p2) {
			p1 = pc_data[p1];
			p2 = pc_data[p2];
			if(p1.isEgg) return 1;
			if(p2.isEgg) return -1;
			return p1.dex - p2.dex;
		}
	}
}


chrome.storage.local.get(['pc', 'pcSort', 'eggPosition'], function(result) {
	pc_data = result.pc;

	if (!result.pcSort) result.pcSort = "DexL";
	if (!result.eggPosition) result.eggPosition = "bottom";
	var sorted_p = Object.keys(pc_data).sort(sort_function[result.eggPosition][result.pcSort]);

	var doing_eggs = result.eggPosition == "top";

	for (var i in sorted_p) {
		if (doing_eggs) {
			if (!pc_data[sorted_p[i]].isEgg) {
				doing_eggs = false;
				var gap = document.createElement('hr');
				gap.className = "gap";
				document.getElementById('pc').appendChild(gap);
			}
		} else {
			if (pc_data[sorted_p[i]].isEgg) {
				doing_eggs = true;
				var gap = document.createElement('hr');
				gap.className = "gap";
				document.getElementById('pc').appendChild(gap);
			}
		}

		var p = sorted_p[i];
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
