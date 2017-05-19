// Establish Functions and Variables
var chars = [];
var wincount = 0;
var selection = "";
var enemy = "";
var heroid = 0;
var enemyid = 0;
function reset() { // Reset Function
	chars = [
		{name : "Bastila", 		hp : 114, ba : 6, dmg : 6, cap : 9,  charid : 0},
		{name : "Malak", 		hp : 95,  ba : 8, dmg : 8, cap : 10, charid : 1},
		{name : "Revan", 		hp : 89,  ba : 9, dmg : 9, cap : 11, charid : 2},
		{name : "Carth", 		hp : 87,  ba : 7, dmg : 7, cap : 12, charid : 3},
	];
	for (var i = 0; i < chars.length; i++) {
		var charBtn = $("<button>");
		charBtn
			.addClass("hero-select")
			.html(chars[i].name + '<img class="smallimage" src="assets/' + chars[i].name + '.png">' + '<br><span class="hp' + chars[i].name + '">'  + chars[i].hp + '</span>')
			.attr("charname", chars[i].name)
			.attr("charid", chars[i].charid);
			console.log(charBtn, chars[i].name);
			$(".herozone").append(charBtn);
		};
	wincount = chars.length - 1;
	$(".message").text("Select your Opponent");
	$(".enemyzone").hide();
	$(".combatzone").hide();	
};
function combatnum() { // Pop-up Numbers
	var combatnum = $("<div>");
	combatnum
		.addClass("combatnum")
		.text(chars[heroid].dmg);
	$(".inCombat").append(combatnum);
	$(".combatnum").slideUp(500);
	var combatnum1 = $("<div>");
	combatnum1
		.addClass("combatnum1")
		.text(chars[enemyid].cap);
	$(".hero").append(combatnum1);
	$(".combatnum1").slideUp(500);
};
function heroselect() { // Select a Hero
	selection = $(this).attr("charname"); // Selection = Character Name.
	heroid = $(this).attr("charid");
	$(".victoryimg").remove();
	$(".enemyzone").show();
	$(this)
		.removeClass("hero-select")
		.addClass("hero");
	$(".hero-select")
		.appendTo(".enemyzone")
		.addClass("enemy-select")
		.removeClass("hero-select");
	console.log("selection: " + selection + ". heroid: " + heroid + ".");
};
function enemyselect() { // Select an Enemy
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
};
function combat() { // Combat
	if(chars[enemyid].hp >= 1 && chars[heroid].hp >= 1){
		chars[enemyid].hp -= chars[heroid].dmg;
		chars[heroid].hp -= chars[enemyid].cap;
		console.log("-----------------COMBAT---------------");
		console.log("Hero ID: " + heroid + ". Enemy ID: " + heroid);
		console.log("Enemy takes " + chars[heroid].dmg + ". New HP = " + chars[enemyid].hp);
		console.log("You take " + chars[enemyid].dmg + ". New HP = " + chars[heroid].hp);
		chars[heroid].dmg += chars[heroid].ba;
		console.log("You leveled up! Damage is now " + chars[heroid].dmg)
		$(".hp" +selection).text(chars[heroid].hp);
		$(".hp" +enemy).text(chars[enemyid].hp);
		combatnum();
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
			$(".enemyzone").append('<img class="victoryimg" src="./assets/' + chars[heroid].name + 'victory.png">')
			if(chars[heroid].hp <= 0){
				chars[heroid].hp = 1
			};
			$(".herozone").hide(300);
		};
	};
	if(wincount > 0 && chars[heroid].hp <= 0){
		chars[heroid].hp = 0;
		$(".message").text("Try Again!");
		$(".enemyzone").append('<img class="victoryimg" src="./assets/defeat.jpg">')
		$(".ezonerow").show(300);
		$(".inCombat").remove();
		$(".combatzone").hide(10);
		$(".enemy-select").hide(10);
		$(".herozone").hide(300);
	};
};
function victory(){
	$(".herozone").show(200);
	$(".hero").remove();
	$(".button").remove();
	$(this).remove();
	reset();
};
reset();
$(document).on('click', '.hero-select', heroselect); 		// Select Hero
$(document).on('click', '.enemy-select', enemyselect); 	// Select Enemy
$(document).on('click', '.inCombat', combat);				// Fight!
$(document).on('click', '.victoryimg', victory);				// Victory!