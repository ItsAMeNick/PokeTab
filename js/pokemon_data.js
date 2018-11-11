var egg_url = "https://cdn.bulbagarden.net/upload/1/1e/Spr_6x_Egg.png";

var tab_exp = [
	0,9,19,31,31,43,43,44,55,56,67,67,69,79,81,91,92,94,104,106,116,117,119,129,131,141,
	142,144,154,156,166,167,169,179,181,191,192,194,204,206,216,217,219,229,231,241,242,
	244,254,256,266,267,269,279,281,291,292,294,304,306,316,317,319,329,331,341,342,344,
	354,356,366,367,369,379,381,391,392,394,404,406,416,417,419,429,431,441,442,444,454,
	456,466,467,469,479,481,491,492,494,504,504,0
	];

var exp_curves = {
	"MF": function(exp) {
		level = Math.floor(Math.cbrt(exp));
		return level;
	},
	"F": function(exp) {
		level = Math.floor(Math.cbrt(5*exp/4));
		return level
	},
	"MS": function(exp) {
		level = (-1/6) * (Math.cbrt(5)) *
				Math.cbrt(2 * Math.sqrt(81*Math.pow(exp, 2) - 16695*exp + 1387600) - 18*exp + 1855)
				+ ((25*Math.pow(5, 2/3))/(2*Math.cbrt(2*Math.sqrt(81*Math.pow(exp, 2) - 16695*exp + 1387600) - 18*exp + 1855)))
				+ 25/6;
		level = Math.floor(parseFloat(level.toFixed(4)));
		return level;
	},
	"S": function(exp) {
		level = Math.floor(Math.cbrt(4*exp/5));
		return level;
	}
}

var level_curves = {
	"MF": function(level) {
		min_exp = Math.pow(level, 3);
		return min_exp;
	},
	"F": function(level) {
		min_exp = (4/5) * Math.pow(level, 3);
		return min_exp;
	},
	"MS": function(level) {
		min_exp = ((6/5) * Math.pow(level, 3))
					- (15 * Math.pow(level, 2))
					+ (100*level) -140;
		return min_exp;
	},
	"S": function(level) {
		min_exp = (5/4) * Math.pow(level, 3);
		return min_exp;
	}
}

var pokemon_data = {
	"1": {
		"name": "Bulbasaur",
		"dex": 1,
		"image_src": "https://img.pokemondb.net/sprites/black-white/anim/normal/bulbasaur.gif",
		"image_shiny": "https://img.pokemondb.net/sprites/black-white/anim/shiny/bulbasaur.gif",
		"gender_ratio": .875,
		"egg_cycles": 20,
		"egg_pokemon": 1,
		"curve": "MS",
		"evolution_lv": 16,
		"evolution_p": 2
	},
	"2": {
		"name": "Ivysaur",
		"dex": 1,
		"image_src": "https://img.pokemondb.net/sprites/black-white/anim/normal/ivysaur.gif",
		"image_shiny": "https://img.pokemondb.net/sprites/black-white/anim/shiny/ivysaur.gif",
		"gender_ratio": .875,
		"egg_cycles": 20,
		"egg_pokemon": 1,
		"curve": "MS",
		"evolution_lv": 32,
		"evolution_p": 3
	},
	"3": {
		"name": "Venusaur",
		"dex": 1,
		"image_src": "https://img.pokemondb.net/sprites/black-white/anim/normal/venusaur.gif",
		"image_shiny": "https://img.pokemondb.net/sprites/black-white/anim/shiny/venusaur.gif",
		"gender_ratio": .875,
		"egg_cycles": 20,
		"egg_pokemon": 1,
		"curve": "MS",
		"evolution_lv": 101,
		"evolution_p": -1
	},
	"4": {
		"name": "Charmander",
		"dex": 4,
		"image_src": "https://img.pokemondb.net/sprites/black-white/anim/normal/charmander.gif",
		"image_shiny": "https://img.pokemondb.net/sprites/black-white/anim/shiny/charmander.gif",
		"gender_ratio": .875,
		"egg_cycles": 20,
		"egg_pokemon": 4,
		"curve": "MS",
		"evolution_lv": 16,
		"evolution_p": 5
	},
	"5": {
		"name": "Charmeleon",
		"dex": 5,
		"image_src": "https://img.pokemondb.net/sprites/black-white/anim/normal/charmeleon.gif",
		"image_shiny": "https://img.pokemondb.net/sprites/black-white/anim/shiny/charmeleon.gif",
		"gender_ratio": .875,
		"egg_cycles": 20,
		"egg_pokemon": 4,
		"curve": "MS",
		"evolution_lv": 36,
		"evolution_p": 6
	},
	"6": {
		"name": "Charizard",
		"dex": 6,
		"image_src": "https://img.pokemondb.net/sprites/black-white/anim/normal/charizard.gif",
		"image_shiny": "https://img.pokemondb.net/sprites/black-white/anim/shiny/charizard.gif",
		"gender_ratio": .875,
		"egg_cycles": 20,
		"egg_pokemon": 4,
		"curve": "MS",
		"evolution_lv": 101,
		"evolution_p": -1
	},
	"7": {
		"name": "Squirtle",
		"dex": 7,
		"image_src": "https://img.pokemondb.net/sprites/black-white/anim/normal/squirtle.gif",
		"image_shiny": "https://img.pokemondb.net/sprites/black-white/anim/shiny/squirtle.gif",
		"gender_ratio": .875,
		"egg_cycles": 20,
		"egg_pokemon": 7,
		"curve": "MS",
		"evolution_lv": 16,
		"evolution_p": 8
	},
	"8": {
		"name": "Wartortle",
		"dex": 8,
		"image_src": "https://img.pokemondb.net/sprites/black-white/anim/normal/wartortle.gif",
		"image_shiny": "https://img.pokemondb.net/sprites/black-white/anim/shiny/wartortle.gif",
		"gender_ratio": .875,
		"egg_cycles": 20,
		"egg_pokemon": 7,
		"curve": "MS",
		"evolution_lv": 36,
		"evolution_p": 9
	},
	"9": {
		"name": "Blastoise",
		"dex": 9,
		"image_src": "https://img.pokemondb.net/sprites/black-white/anim/normal/blastoise.gif",
		"image_shiny": "https://img.pokemondb.net/sprites/black-white/anim/shiny/blastoise.gif",
		"gender_ratio": .875,
		"egg_cycles": 20,
		"egg_pokemon": 7,
		"curve": "MS",
		"evolution_lv": 101,
		"evolution_p": -1
	},
	"10": {
		"name": "Caterpie",
		"dex": 10,
		"image_src": "https://img.pokemondb.net/sprites/black-white/anim/normal/caterpie.gif",
		"image_shiny": "https://img.pokemondb.net/sprites/black-white/anim/shiny/caterpie.gif",
		"gender_ratio": .5,
		"egg_cycles": 15,
		"egg_pokemon": 10,
		"curve": "MF",
		"evolution_lv": 7,
		"evolution_p": 11
	},
	"11": {
		"name": "Metapod",
		"dex": 11,
		"image_src": "https://img.pokemondb.net/sprites/black-white/anim/normal/metapod.gif",
		"image_shiny": "https://img.pokemondb.net/sprites/black-white/anim/shiny/metapod.gif",
		"gender_ratio": 0.5,
		"egg_cycles": 15,
		"egg_pokemon": 10,
		"curve": "MF",
		"evolution_lv": 10,
		"evolution_p": 12
	},
	"12": {
		"name": "Butterfree",
		"dex": 12,
		"image_src": "https://img.pokemondb.net/sprites/black-white/anim/normal/butterfree.gif",
		"image_shiny": "https://img.pokemondb.net/sprites/black-white/anim/shiny/butterfree.gif",
		"gender_ratio": 0.5,
		"egg_cycles": 15,
		"egg_pokemon": 10,
		"curve": "MF",
		"evolution_lv": 101,
		"evolution_p": -1
	},
	"13": {
		"name": "Weedle",
		"dex": 13,
		"image_src": "https://img.pokemondb.net/sprites/black-white/anim/normal/weedle.gif",
		"image_shiny": "https://img.pokemondb.net/sprites/black-white/anim/shiny/weedle.gif",
		"gender_ratio": 0.5,
		"egg_cycles": 15,
		"egg_pokemon": 13,
		"curve": "MF",
		"evolution_lv": 7,
		"evolution_p": 14
	},
	"14": {
		"name": "Kakuna",
		"dex": 14,
		"image_src": "https://img.pokemondb.net/sprites/black-white/anim/normal/kakuna.gif",
		"image_shiny": "https://img.pokemondb.net/sprites/black-white/anim/shiny/kakuna.gif",
		"gender_ratio": 0.5,
		"egg_cycles": 15,
		"egg_pokemon": 13,
		"curve": "MF",
		"evolution_lv": 10,
		"evolution_p": 15
	},
	"15": {
		"name": "Beedrill",
		"dex": 15,
		"image_src": "https://img.pokemondb.net/sprites/black-white/anim/normal/beedrill.gif",
		"image_shiny": "https://img.pokemondb.net/sprites/black-white/anim/shiny/beedrill.gif",
		"gender_ratio": 0.5,
		"egg_cycles": 15,
		"egg_pokemon": 13,
		"curve": "MF",
		"evolution_lv": 101,
		"evolution_p": -1
	},
	"16": {
		"name": "Pidgey",
		"dex": 16,
		"image_src": "https://img.pokemondb.net/sprites/black-white/anim/normal/pidgey.gif",
		"image_shiny": "https://img.pokemondb.net/sprites/black-white/anim/shiny/pidgey.gif",
		"gender_ratio": 0.5,
		"egg_cycles": 15,
		"egg_pokemon": 16,
		"curve": "MS",
		"evolution_lv": 18,
		"evolution_p": 17
	},
	"17": {
		"name": "Pidgeotto",
		"dex": 17,
		"image_src": "https://img.pokemondb.net/sprites/black-white/anim/normal/pidgeotto.gif",
		"image_shiny": "https://img.pokemondb.net/sprites/black-white/anim/shiny/pidgeotto.gif",
		"gender_ratio": 0.5,
		"egg_cycles": 15,
		"egg_pokemon": 16,
		"curve": "MS",
		"evolution_lv": 36,
		"evolution_p": 18
	},
	"18": {
		"name": "Pidgeot",
		"dex": 18,
		"image_src": "https://img.pokemondb.net/sprites/black-white/anim/normal/pidgeot.gif",
		"image_shiny": "https://img.pokemondb.net/sprites/black-white/anim/shiny/pidgeot.gif",
		"gender_ratio": 0.5,
		"egg_cycles": 15,
		"egg_pokemon": 16,
		"curve": "MS",
		"evolution_lv": 101,
		"evolution_p": -1
	},
	"19": {
		"name": "Rattata",
		"dex": 19,
		"image_src": "https://img.pokemondb.net/sprites/black-white/anim/normal/rattata.gif",
		"image_shiny": "https://img.pokemondb.net/sprites/black-white/anim/shiny/rattata.gif",
		"gender_ratio": 0.5,
		"egg_cycles": 15,
		"egg_pokemon": 19,
		"curve": "MF",
		"evolution_lv": 20,
		"evolution_p": 20
	},
	"20": {
		"name": "Raticate",
		"dex": 20,
		"image_src": "https://img.pokemondb.net/sprites/black-white/anim/normal/raticate.gif",
		"image_shiny": "https://img.pokemondb.net/sprites/black-white/anim/shiny/raticate.gif",
		"gender_ratio": 0.5,
		"egg_cycles": 15,
		"egg_pokemon": 19,
		"curve": "MF",
		"evolution_lv": 101,
		"evolution_p": -1
	},
	"21": {
		"name": "Spearow",
		"dex": 21,
		"image_src": "https://img.pokemondb.net/sprites/black-white/anim/normal/spearow.gif",
		"image_shiny": "https://img.pokemondb.net/sprites/black-white/anim/shiny/spearow.gif",
		"gender_ratio": 0.5,
		"egg_cycles": 15,
		"egg_pokemon": 21,
		"curve": "MF",
		"evolution_lv": 20,
		"evolution_p": 22
	},
	"22": {
		"name": "Fearow",
		"dex": 22,
		"image_src": "https://img.pokemondb.net/sprites/black-white/anim/normal/fearow.gif",
		"image_shiny": "https://img.pokemondb.net/sprites/black-white/anim/shiny/fearow.gif",
		"gender_ratio": 0.5,
		"egg_cycles": 15,
		"egg_pokemon": 21,
		"curve": "MF",
		"evolution_lv": 101,
		"evolution_p": -1
	}
}

// "##": {
// 		"name": "",
// 		"dex": ##,
// 		"image_src": "",
// 		"image_shiny": "",
// 		"gender_ratio": 0,
// 		"egg_cycles": 0,
// 		"egg_pokemon": 0,
// 		"curve": "MF",
// 		"evolution_lv": 101,
// 		"evolution_p": -1
// 	}