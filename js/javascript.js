$(document).ready(function() {
	// Variables
	var chars1 = ["Luke", "Vader", "Ratts", "Jarjar"];
	var chars = [
		{name : "Luke", hp : 100, ba : 6, dmg : 6, cap : 15},
		{name : "Vader", hp : 120, ba : 8, dmg : 8, cap : 25},
		{name : "Ratts", hp : 110, ba : 9, dmg : 9, cap : 10},
		{name: "Jarjar", hp : 115, ba : 7, dmg : 7, cap : 20}
	];
	var selection = "";
	var enemy = "";
	var hselected = false;
	var eselected = false;

	// Page Set-Up
	for (var i = 0; i < chars.length; i++) {
		var charBtn = $("<button>");
		charBtn
			.addClass("hero-select")
			.html(chars[i].name + "<br>" + chars[i].hp)
			.attr("charname", chars[i].name);
			console.log(charBtn, chars[i].name);
			$(".herozone").append(charBtn);
	};

	// Hero and Enemy Selection
	$(".hero-select").on("click", function(){ // On the click of a hero-select button...
		if (hselected === true && eselected === true){
			//Establish Variables
			var enemyHP = chars.enemy;
			console.log(enemyHP);
			//Subtract HP from both characters
			//Add attack damage to selection
		};		
		if (hselected === true && eselected === false){ // select an enemy
			enemy = $(this).attr("charname");
			$(this)
				.removeClass("hero-select")
				.addClass("inCombat");
			console.log(selection + " vs. " + enemy);
			eselected = true;
			$(".inCombat").appendTo(".combatzone");

		};
		if (hselected === false && eselected === false){ // select a hero
			selection = $(this).attr("charname"); // Selection = Character Name.
			$(this)
				.removeClass("hero-select")
				// .off("click");
			hselected = true;
			console.log(selection);
			console.log(hselected);
			$(".hero-select")
				.appendTo(".enemyzone")
				.addClass("enemy-select");

		};
	});
	// // FIGHT!
	// $(".enemy-select").on("click", function(){
	// 	enemy = this.name;
	// 	console.log(enemy);
		
	// });
});



	// var luke = {
	// 	hp : 100,
	// 	ap : 6,
	// 	cap : 15,
	// };
	// var vader = {
	// 	hp : 120,
	// 	ap : 8,
	// 	cap : 25,
	// };
	// var ratts = {
	// 	hp : 110,
	// 	ap : 9,
	// 	cap : 10,
	// };
	// var jarjar = {
	// 	hp : 115,
	// 	ap : 7,
	// 	cap : 20,
	// };
