class Pokemon {
	constructor(data, isEgg=true) {
		if (Number.isInteger(data)) {
			this.id = Math.floor(Math.random()*100000);

			this.dex = data;
			this.isShiny = (Math.floor(Math.random()*100) <= 1);
			if (isEgg) {
				this.name = "Egg";
			} else {
				this.name = pokemon_data[data].name;
			}

			if (Math.random() > pokemon_data[data].gender_ratio) {
				this.sex = "&#9792;"; //Female
			} else {
				this.sex = "&#9794;"; //Male
			}

			this.isEgg = isEgg;
			this.eggCycles = pokemon_data[data].egg_cycles;

			if (isEgg) {
				this.sprite = egg_url;
			} else {
				if (this.isShiny) {
					this.sprite = pokemon_data[data].image_shiny;
				} else {
					this.sprite = pokemon_data[data].image_src;
				}
			}

			this.level = 1;
			this.iv = {
				"sp_defense": Math.floor(Math.random()*32),
				"sp_attack": Math.floor(Math.random()*32),
				"speed": Math.floor(Math.random()*32),
				"defense": Math.floor(Math.random()*32),
				"attack": Math.floor(Math.random()*32),
				"hp": Math.floor(Math.random()*32)
			}
			this.character = this.determineNature(this.iv);

			this.exp = 0;
			this.curve = pokemon_data[data].curve;

			this.evo_lv = pokemon_data[data].evolution_lv;
			this.evo_to = pokemon_data[data].evolution_p;

		} else {
			this.id = 			data.id;
			this.dex =			data.dex;
			this.isShiny =		data.isShiny;
			this.name =			data.name;
			this.sex =			data.sex;
			this.isEgg =		data.isEgg;
			this.eggCycles =	data.eggCycles;
			this.sprite = 		data.sprite;
			this.level =		data.level;
			this.iv = 			data.iv;
			this.character = 	data.character;
			this.exp = 			data.exp;
			this.curve = 		data.curve;
			this.evo_lv = 		data.evo_lv;
			this.evo_to = 		data.evo_to;
		}
	}

	determineNature(iv) {
		var max_stat_val = -1;
		var max_stat_type = "";
		for (var i = 0; i < 6; i++) {
			if (iv[Object.keys(iv)[i]] > max_stat_val) {
				max_stat_val = iv[Object.keys(iv)[i]];
				max_stat_type = Object.keys(iv)[i];
			}
		}

		if (max_stat_val === 31) {
			switch(max_stat_type) {
				case "hp":
					return "Loves to eat";
				case "attack":
					return "Proud of its power";
				case "defense":
					return "Sturdy body";
				case "sp_attack":
					return "Highly curious";
				case "sp_defense":
					return "Strong willed";
				case "speed":
					return "Likes to run";
			}
		} else if (max_stat_val > 25) {
			switch(max_stat_type) {
				case "hp":
					return "Takes plenty of siestas";
				case "attack":
					return "Likes to thrash about";
				case "defense":
					return "Capable of taking hits";
				case "sp_attack":
					return "Mischievous";
				case "sp_defense":
					return "Somewhat vain";
				case "speed":
					return "Alert to sounds";
			}
		} else if (max_stat_val > 20) {
			switch(max_stat_type) {
				case "hp":
					return "Nods off a lot";
				case "attack":
					return "A little quick tempered";
				case "defense":
					return "Highly persistent";
				case "sp_attack":
					return "Thoroughly cunning";
				case "sp_defense":
					return "Strongly defiant";
				case "speed":
					return "Impetuous and silly";
			}
		} else if (max_stat_val > 10) {
			switch(max_stat_type) {
				case "hp":
					return "Scatters things often";
				case "attack":
					return "Likes to fight";
				case "defense":
					return "Good endurance";
				case "sp_attack":
					return "Often lost in thought";
				case "sp_defense":
					return "Hates to lose";
				case "speed":
					return "Somewhat of a clown";
			}
		} else {
			switch(max_stat_type) {
				case "hp":
					return "Likes to relax";
				case "attack":
					return "Quick tempered";
				case "defense":
					return "Good perseverance";
				case "sp_attack":
					return "Very finicky";
				case "sp_defense":
					return "Somewhat stubborn";
				case "speed":
					return "Quick to flee";
			}
		}
	}

	hatch() {
		if (this.isEgg) {
			this.isEgg = false;
			this.name = pokemon_data[this.dex].name;
			if (this.isShiny) {
				this.sprite = pokemon_data[this.dex].image_shiny;
			} else {
				this.sprite = pokemon_data[this.dex].image_src;
			}
		}
		console.log("This pokemon is hatched!")
	}

	levelMatch() {
		this.level = exp_curves[this.curve](this.exp);
		if (this.level > 100) {
			this.level = 100;
			this.exp = level_curves[this.curve](100);
		}
	}

	levelSet(lv) {
		this.exp = level_curves[this.curve](lv);
	}

	evolve() {
		//Check if this pokemono can even evolve
		if (this.evo_to != -1) {
			this.dex = this.evo_to;
			this.name = pokemon_data[this.dex].name;

			if (this.isShiny) {
				this.sprite = pokemon_data[this.dex].image_shiny;
			} else {
				this.sprite = pokemon_data[this.dex].image_src;
			}

			this.curve = pokemon_data[this.dex].curve;
			this.evo_lv = pokemon_data[this.dex].evolution_lv;
			this.evo_to = pokemon_data[this.dex].evolution_p;
		} else {
			console.log("THIS POKEMON CANNOT EVOLVE!")
		}
	}
};
