"use strict";
window.addEventListener("load", ready);

let points = 0;
let lives = 0;

function ready() {
  console.log("JavaScript ready!");
  document.querySelector("#btn_start").addEventListener("click", start);
  document.querySelector("#btn_restart").addEventListener("click", start);
  document.querySelector("#btn_go_to_start").addEventListener("click", showStartScreen);
}

function showGameScreen() {
  // Skjul startskærm, game over og level complete
  document.querySelector("#start").classList.add("hidden");
  document.querySelector("#game_over").classList.add("hidden");
  document.querySelector("#level_complete").classList.add("hidden");
}

function showStartScreen() {
  // fjern hidden fra startskærm og tilføj til game over og level complete
  document.querySelector("#start").classList.remove("hidden");
  document.querySelector("#game_over").classList.add("hidden");
  document.querySelector("#level_complete").classList.add("hidden");
}

function resetLives() {
  // sæt lives til 3
  lives = 3;
  //nulstil visning af liv (hjerte vi ser)
  document
    .querySelector("#ukraine-flag1")
    .classList.remove("ukraine_flag_no_visibility");
  document
    .querySelector("#ukraine-flag2")
    .classList.remove("ukraine_flag_no_visibility");
  document
    .querySelector("#ukraine-flag3")
    .classList.remove("ukraine_flag_no_visibility");
  document.querySelector("#ukraine-flag1").classList.add("ukraine-flag");
  document.querySelector("#ukraine-flag2").classList.add("ukraine-flag");
  document.querySelector("#ukraine-flag3").classList.add("ukraine-flag");
}

function resetPoints() {
  // nulstil point
  points = 0;
  // nulstil vising af point
  displayPoints();
}

function start() {
  console.log("JavaScript kører!");

  resetLives();
  resetPoints();
  showGameScreen();

  // Start baggrundsmusik
  document.querySelector("#sound_war").play();

  // start alle animationer
    
  // Registrer click
    
  // Registrer når bunden rammes
   

  // nulstil point og liv
  points = 0;
  lives = 3;

  // skjul startskærm
  document.querySelector("#start").classList.add("hidden");

  // Start animationer
  document.querySelector("#paratrooper_container").classList.add("falling");
  document.querySelector("#paratrooper_container").classList.add("position1");
  document.querySelector("#us-container_container").classList.add("falling");
  document.querySelector("#us-container_container").classList.add("position2");
  document.querySelector("#eu-container_container").classList.add("falling");
  document.querySelector("#eu-container_container").classList.add("position3");
  document
    .querySelector("#missile_container")
    .classList.add("falling-diagonal");
  document.querySelector("#missile_container").classList.add("position5");
  document.querySelector("#emergency-kit_container").classList.add("falling");
  document.querySelector("#emergency-kit_container").classList.add("position4");

  //Mist liv, hvis der ikke klikkes på missile eller paratrooper
  document
    .querySelector("#paratrooper_container")
    .addEventListener("animationiteration", decrementLives);
  document
    .querySelector("#missile_container")
    .addEventListener("animationiteration", decrementLives);

  //Få automatisk point, når us-container, eu-container og emergencykit lander på jorden
  document
    .querySelector("#us-container_container")
    .addEventListener("animationiteration", incrementPoints);
  document
    .querySelector("#eu-container_container")
    .addEventListener("animationiteration", incrementPoints);
  document
    .querySelector("#emergency-kit_container")
    .addEventListener("animationiteration", incrementPoints);

  // Registrer click
  document
    .querySelector("#paratrooper_container")
    .addEventListener("click", clickParatrooper);
  document
    .querySelector("#us-container_container")
    .addEventListener("click", clickUsContainer);
  document
    .querySelector("#eu-container_container")
    .addEventListener("click", clickEuContainer);
  document
    .querySelector("#missile_container")
    .addEventListener("click", clickMissile);
  document
    .querySelector("#emergency-kit_container")
    .addEventListener("click", clickEmergencyKit);
}
  
  
function clickParatrooper() {
  console.log("Click paratrooper");
  document.querySelector("#sound_gunshot").currentTime = 0;
  document.querySelector("#sound_gunshot").play();
  // Forhindrer gentagne clicks
  document
    .querySelector("#paratrooper_container")
    .removeEventListener("click", clickParatrooper);

  // Stop paratrooper container
  document.querySelector("#paratrooper_container").classList.add("paused");

  // sæt forsvind-animation på paratrooper
  document.querySelector("#paratrooper_sprite").classList.add("zoom_out");

  // når forsvind-animation er færdig: paratrooperGone
  document
    .querySelector("#paratrooper_container")
    .addEventListener("animationend", paratrooperGone);

  // Giv point
  incrementPoints();
}

function paratrooperGone() {
  // fjern event der bringer os herind
  document
    .querySelector("#paratrooper_container")
    .removeEventListener("animationend", paratrooperGone);

  // fjern forsvind-animation
  document.querySelector("#paratrooper_sprite").classList.remove("zoom_out");

  // fjern pause
  document.querySelector("#paratrooper_container").classList.remove("paused");

  // genstart falling animation
  document.querySelector("#paratrooper_container").classList.remove("falling");
  document.querySelector("#paratrooper_container").offsetWidth;
  document.querySelector("#paratrooper_container").classList.add("falling");
  document
    .querySelector("#paratrooper_container")
    .classList.remove("position1", "position2", "position3", "position4");
  let pos = Math.floor(Math.random() * 4) + 1;
  document
    .querySelector("#paratrooper_container")
    .classList.add("position" + pos);

  // gør det muligt at klikke på paratrooper igen
  document
    .querySelector("#paratrooper_container")
    .addEventListener("click", clickParatrooper);
}

function clickUsContainer() {
  console.log("Click US Container");
  // Forhindr gentagne clicks
  document.querySelector("#sound_explosion").currentTime = 0;
  document.querySelector("#sound_explosion").play();
  document
    .querySelector("#us-container_container")
    .removeEventListener("click", clickUsContainer);

  // Stop us-container
  document.querySelector("#us-container_container").classList.add("paused");

  // sæt forsvind-animation på us-container
  document.querySelector("#us-container_sprite").classList.add("zoom_out");

  // når forsvind-animation er færdig: us-containerGone
  document
    .querySelector("#us-container_container")
    .addEventListener("animationend", usContainerGone);

  // Mist liv
  decrementLives();
}

function usContainerGone() {
  // fjern event der bringer os herind
  document
    .querySelector("#us-container_container")
    .removeEventListener("animationend", usContainerGone);

  // fjern forsvind-animation
  document.querySelector("#us-container_sprite").classList.remove("zoom_out");

  // fjern pause
  document.querySelector("#us-container_container").classList.remove("paused");

  // genstart falling animation
  document.querySelector("#us-container_container").classList.remove("falling");
  document.querySelector("#us-container_container").offsetWidth;
  document.querySelector("#us-container_container").classList.add("falling");
  document
    .querySelector("#us-container_container")
    .classList.remove("position1", "position2", "position3", "position4");

  let pos = Math.floor(Math.random() * 4) + 1;
  document
    .querySelector("#us-container_container")
    .classList.add("position" + pos);

  // gør det muligt at klikke på us-container igen
  document
    .querySelector("#us-container_container")
    .addEventListener("click", clickUsContainer);
}

function clickEuContainer() {
  console.log("Click EU Container");
  document.querySelector("#sound_explosion").currentTime = 0;
  document.querySelector("#sound_explosion").play();
  // Forhindr gentagne clicks
  document
    .querySelector("#eu-container_container")
    .removeEventListener("click", clickEuContainer);

  // Stop eu-container
  document.querySelector("#eu-container_container").classList.add("paused");

  // sæt forsvind-animation på eu-container
  document.querySelector("#eu-container_sprite").classList.add("zoom_out");

  // når forsvind-animation er færdig: euContainerGone
  document
    .querySelector("#eu-container_container")
    .addEventListener("animationend", euContainerGone);

  // Mist liv
  decrementLives();
}

function euContainerGone() {
  // fjern event der bringer os herind
  document
    .querySelector("#eu-container_container")
    .removeEventListener("animationend", euContainerGone);

  // fjern forsvind-animation
  document.querySelector("#eu-container_sprite").classList.remove("zoom_out");

  // fjern pause
  document.querySelector("#eu-container_container").classList.remove("paused");

  // genstart falling animation
  document.querySelector("#eu-container_container").classList.remove("falling");
  document.querySelector("#eu-container_container").offsetWidth;
  document.querySelector("#eu-container_container").classList.add("falling");
  document.querySelector("#eu-container_container").classList.remove("position1", "position2", "position3", "position4");

  let pos = Math.floor(Math.random() * 4) + 1;
  document.querySelector("#eu-container_container").classList.add("position" + pos);

  // gør det muligt at klikke på eu-container igen
  document
    .querySelector("#eu-container_container")
    .addEventListener("click", clickEuContainer);
}

function clickMissile() {
  console.log("Click missile");
  document.querySelector("#sound_explosion").currentTime = 0;
  document.querySelector("#sound_explosion").play();
  // Forhindr gentagne clicks
  document
    .querySelector("#missile_container")
    .removeEventListener("click", clickMissile);

  // Stop missile container
  document.querySelector("#missile_container").classList.add("paused");

  // sæt forsvind-animation på missile
  document.querySelector("#missile_sprite").classList.add("zoom_out");

  // når forsvind-animation er færdig: missileGone
  document
    .querySelector("#missile_container")
    .addEventListener("animationend", missileGone);

  incrementPoints();
}

function missileGone() {
  // fjern event der bringer os herind
  document
    .querySelector("#missile_container")
    .removeEventListener("animationend", missileGone);

  // fjern forsvind-animation
  document.querySelector("#missile_sprite").classList.remove("zoom_out");

  // fjern pause
  document.querySelector("#missile_container").classList.remove("paused");

  // genstart falling-diagonal animation
  document.querySelector("#missile_container").classList.remove("falling-diagonal");
  document.querySelector("#missile_container").offsetWidth;
  document.querySelector("#missile_container").classList.add("falling-diagonal");
  document.querySelector("#missile_container").classList.remove("position5", "position6");

  let pos = Math.floor(Math.random() * 2) + 5;
  document.querySelector("#missile_container").classList.add("position" + pos);

  // gør det muligt at klikke på missile igen
  document
    .querySelector("#missile_container")
    .addEventListener("click", clickMissile);
}

function clickEmergencyKit() {
  console.log("Click emergency-kit");
  document.querySelector("#sound_explosion_emergency-kit").currentTime = 0;
  document.querySelector("#sound_explosion_emergency-kit").play();
  // Forhindr gentagne clicks
  document
    .querySelector("#emergency-kit_container")
    .removeEventListener("click", clickEmergencyKit);

  // Stop emergency kit container
  document.querySelector("#emergency-kit_container").classList.add("paused");

  // sæt forsvind-animation på emergency kit
  document.querySelector("#emergency-kit_sprite").classList.add("zoom_out");

  // når forsvind-animation er færdig: emergencyKitGone
  document
    .querySelector("#emergency-kit_container")
    .addEventListener("animationend", emergencyKitGone);

  decrementLives();
}

function emergencyKitGone() {
  // fjern event der bringer os herind
  document
    .querySelector("#emergency-kit_container")
    .removeEventListener("animationend", emergencyKitGone);

  // fjern forsvind-animation
  document.querySelector("#emergency-kit_sprite").classList.remove("zoom_out");

  // fjern pause
  document.querySelector("#emergency-kit_container").classList.remove("paused");

  // genstart falling animation
  document
    .querySelector("#emergency-kit_container")
    .classList.remove("falling");
  document.querySelector("#emergency-kit_container").offsetWidth;
  document.querySelector("#emergency-kit_container").classList.add("falling");
  document
    .querySelector("#emergency-kit_container")
    .classList.remove("position1", "position2", "position3", "position4");

  let pos = Math.floor(Math.random() * 4) + 1;
  document
    .querySelector("#emergency-kit_container")
    .classList.add("position" + pos);

  // gør det muligt at klikke på emergency-kit igen
  document
    .querySelector("#emergency-kit_container")
    .addEventListener("click", clickEmergencyKit);
}

function incrementPoints() {
  console.log("Giv point");
  points++;
  console.log("har nu " + points + " point");
  displayPoints();
  if (points >= 50) {
    levelComplete();
  } else {
    showDecrementedLives;
  }
}

function displayPoints() {
  console.log("vis point");
  document.querySelector("#coin_count").textContent = points;
}

function decrementLives() {
  console.log("mist et liv");
  showDecrementedLives();
  lives--;
  if (lives <= 0) {
    gameOver();
  } else {
    showDecrementedLives;
  }
}

function incrementLives() {
  console.log("få et liv");
  lives++;
  showIncrementedLives();
}

function showDecrementedLives() {
  document
    .querySelector("#ukraine-flag" + lives)
    .classList.remove("ukraine-flag");
  document.querySelector("#ukraine-flag" + lives).classList.add("broken_heart");
}

//function showIncrementedLives() {
//  document.querySelector("#heart" + lives).classList.remove("broken_heart");
//  document.querySelector("#heart" + lives).classList.add("active_heart");
//}

function gameOver() {
  console.log("Game over");
  document.querySelector("#sound_gameOver").play();
  document.querySelector("#game_over").classList.remove("hidden");
  stopGame();
}

function levelComplete() {
  console.log("You win");
  document.querySelector("#sound_levelComplete").play();
  document.querySelector("#level_complete").classList.remove("hidden");
  stopGame();
}

function stopGame() {
  // Stop animationer
  document.querySelector("#sound_war").pause();
  document.querySelector("#paratrooper_container").classList.remove("falling");
  document.querySelector("#us-container_container").classList.remove("falling");
  document.querySelector("#eu-container_container").classList.remove("falling");
  document.querySelector("#missile_container").classList.remove("falling-diagonal");
  document.querySelector("#emergency-kit_container").classList.remove("falling");

  // Fjern click
  document.querySelector("#paratrooper_container").removeEventListener("click", clickParatrooper);
  document.querySelector("#us-container_container").removeEventListener("click", clickUsContainer);
  document.querySelector("#eu-container_container").removeEventListener("click", clickEuContainer);
  document.querySelector("#missile_container").removeEventListener("click", clickMissile);
  document.querySelector("#emergency-kit_container").removeEventListener("click", clickEmergencyKit);
}
