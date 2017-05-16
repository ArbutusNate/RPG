$(document).ready(function() {
	var chars;
	var wincount;
	var selection = "";
	var enemy = "";
	var heroid;
	var enemyid;
	// Page Set-Up
	function reset() {
		chars = [
		{name : "Bastila", 		hp : 100, ba : 6, dmg : 6, cap : 30, charid : 0},
		{name : "Malak", 		hp : 120, ba : 8, dmg : 8, cap : 25, charid : 1},
		{name : "Revan", 		hp : 110, ba : 9, dmg : 9, cap : 10, charid : 2},
		{name : "Carth", 		hp : 115, ba : 7, dmg : 7, cap : 20, charid : 3},
		// {name : "Jarjar",		hp : 90,  ba : 8, dmg : 6, cap : 25, charid : 4},
		];
		for (var i = 0; i < chars.length; i++) {
			var charBtn = $("<button>");
			charBtn
				.addClass("hero-select")
				.html(chars[i].name + "<img class = smallimage src =assets/" + chars[i].name + ".png>" + "<br> <span class = hp" + chars[i].name + ">"  + chars[i].hp + "</span>")
				.attr("charname", chars[i].name)
				.attr("charid", chars[i].charid);
				console.log(charBtn, chars[i].name);
				$(".herozone").append(charBtn);
			};
		wincount = chars.length - 1;
		$(".enemyzone").hide();
		$(".combatzone").hide();	
	};
	$(document).on('click', 'button.hero-select', function(){ // Select Hero
		selection = $(this).attr("charname"); // Selection = Character Name.
		heroid = $(this).attr("charid");
		$(".enemyzone").show();
		$(this)
			.removeClass("hero-select")
			.addClass("hero")
		$(".hero-select")
			.appendTo(".enemyzone")
			.addClass("enemy-select")
			.removeClass("hero-select");
		console.log("selection: " + selection + ". heroid: " + heroid + ".");
	});
	$(document).on('click', 'button.enemy-select', function(){ 		// Select Enemy
		enemy = $(this).attr("charname");
		enemyid = $(this).attr("charid");
		$(this)
			.removeClass("hero-select")
			.removeClass("enemy-select")
			.addClass("inCombat");
		console.log(selection + " vs. " + enemy);
		$(".ezonerow").hide(300);
		$(".combatzone").show(300);									// Animation for hiding .ezonerow
		$(".inCombat").appendTo(".combatzone");
	});
	$(document).on('click', 'button.inCombat', function() { 		// Fight!
		if(chars[enemyid].hp >= 1){
			chars[enemyid].hp -= chars[heroid].dmg;
			chars[heroid].hp -= chars[enemyid].dmg;
			console.log("-----------------COMBAT---------------");
			console.log("Hero ID: " + heroid + ". Enemy ID: " + heroid);
			console.log("Enemy takes " + chars[heroid].dmg + ". New HP = " + chars[enemyid].hp);
			console.log("You take " + chars[enemyid].dmg + ". New HP = " + chars[heroid].hp);
			chars[heroid].dmg += chars[heroid].ba;
			console.log("You leveled up! Damage is now " + chars[heroid].dmg)
			$(".hp" +selection).text(chars[heroid].hp);
			$(".hp" +enemy).text(chars[enemyid].hp);
		};
		if(chars[enemyid].hp <= 0){
			chars[enemyid].hp = 0;
			wincount--;
			console.log("You Defeated. Win count: " + wincount);
			$(".hp" +selection).text(chars[heroid].hp);
			$(".hp" +enemy).text(chars[enemyid].hp);
			$(".ezonerow").show(300); 								// Animation for showing .ezonerow
			$(".combatzone").hide(300); 
			$(".inCombat").hide(150);								// Animation for hiding inCombat
			if(wincount <= 0){
				$(".message").text("You win!")
				$(".enemyzone").append("<img class = 'victoryimg' src=./assets/" + chars[heroid].name + "victory.png>")
				$(".herozone").hide(300);
			}
		};
	});
	$(document).on('click', 'img.victoryimg', function(){
		console.log("working");
		$(".herozone").show(200);
		$(".hero").remove();
		reset();
	});
});