"use strict";
window.addEventListener("load", ready);

let points = 0;
let lives = 0;

function ready() {
  console.log("JavaScript ready!");
  document.querySelector("#btn_start").addEventListener("click", start);
  document.querySelector("#btn_restart").addEventListener("click", start);
  document
    .querySelector("#btn_go_to_start")
    .addEventListener("click", showStartScreen);
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
  console.log("Reset lives");
  // sæt lives til 3
  lives = 3;
  //nulstil visning af liv (flag vi ser)
  document.querySelector("#ukraine-flag1").classList.remove("broken_heart");
  document.querySelector("#ukraine-flag2").classList.remove("broken_heart");
  document.querySelector("#ukraine-flag3").classList.remove("broken_heart");
  document.querySelector("#ukraine-flag1").classList.add("active_heart");
  document.querySelector("#ukraine-flag2").classList.add("active_heart");
  document.querySelector("#ukraine-flag3").classList.add("active_heart");
  console.log("reset lives 2");
}

function resetPoints() {
  // nulstil point
  points = 0;
  // nulstil vising af point
  displayPoints();
}

// function resetPositions() {
// console.log ("reset positions")
// document
// .querySelector("#paratrooper_container")
// .classList.remove("falling", "position1", "position2", "position3", "position4");
// document
// .querySelector("#emergency-kit_container")
// .classList.remove("falling","position1","position2","position3","position4");
// document
// .querySelector("#us-container_container")
// .classList.remove("falling", "position1", "position2", "position3", "position4");
// document
// .querySelector("#eu-container_container")
// .classList.remove("falling", "position1", "position2", "position3", "position4");
// document
// .querySelector("#missile_container")
// .classList.remove("falling-diagonal", "position5", "position6");
//document.querySelector("#paratrooper_container").classList.add("position1");
//document.querySelector("#emergency-kit_container").classList.add("position2");
//document.querySelector("#us-container_container").classList.add("position3");
//document.querySelector("#eu-container_container").classList.add("position4");
//document.querySelector("#missile_container").classList.add("position5");
// }

// function animationsRestart() {
// console.log("animations restart");
// const coin = this;

// genstart falling animation
// coin.classList.remove("falling");
// coin.offsetWidth;
// coin.classList.add("falling");

// fjern alle positioner
// coin.classList.remove(
// "position1",
// "position2",
// "position3",
// "position4",
// "position5"
// );

// sæt position til en ny klasse
// const p = Math.ceil(Math.random() * 5);
// coin.classList.add(`position${p}`);
// }

function start() {
  console.log("JavaScript kører!");

  resetLives();
  resetPoints();
  showGameScreen();
  // resetPositions();

  // Stop musik fra Level Comlete og Game Over
  document.querySelector("#sound_gameOver").pause();
  document.querySelector("#sound_levelComplete").pause();

  // Start baggrundsmusik
  document.querySelector("#sound_war").play();

  // start timer
  startTimer();

  // nulstil point og liv
  points = 0;
  lives = 3;

  // skjul startskærm
  document.querySelector("#start").classList.add("hidden");

  //Nulstil animationer
  document
    .querySelector("#paratrooper_container")
    .classList.remove(
      "falling1",
      "position1",
      "position2",
      "position3",
      "position4"
    );
  document
    .querySelector("#emergency-kit_container")
    .classList.remove(
      "falling3",
      "position1",
      "position2",
      "position3",
      "position4"
    );
  document
    .querySelector("#us-container_container")
    .classList.remove(
      "falling",
      "position1",
      "position2",
      "position3",
      "position4"
    );
  document
    .querySelector("#eu-container_container")
    .classList.remove(
      "falling2",
      "position1",
      "position2",
      "position3",
      "position4"
    );
  document
    .querySelector("#missile_container")
    .classList.remove("falling-diagonal", "position5", "position6");
  document.querySelector("#paratrooper_container").offsetWidth;
  document.querySelector("#emergency-kit_container").offsetWidth;
  document.querySelector("#us-container_container").offsetWidth;
  document.querySelector("#eu-container_container").offsetWidth;
  document.querySelector("#missile_container").offsetWidth;

  // Start animationer
  document.querySelector("#paratrooper_container").classList.add("falling1");
  document.querySelector("#paratrooper_container").classList.add("position4");
  document.querySelector("#us-container_container").classList.add("falling");
  document.querySelector("#us-container_container").classList.add("position2");
  document.querySelector("#eu-container_container").classList.add("falling2");
  document.querySelector("#eu-container_container").classList.add("position3");
  document
    .querySelector("#missile_container")
    .classList.add("falling-diagonal");
  document.querySelector("#missile_container").classList.add("position5");
  document.querySelector("#emergency-kit_container").classList.add("falling3");
  document.querySelector("#emergency-kit_container").classList.add("position1");

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

  // Registrer når bunden rammes
  // document
  // .querySelector("#paratrooper_container")
  // .addEventListener("animationiteration", animationsRestart);
  // document
  // .querySelector("#eu-container_container")
  // .addEventListener("animationiteration", animationsRestart);
  // document
  // .querySelector("#us-container_container")
  // .addEventListener("animationiteration", animationsRestart);
  // document
  // .querySelector("#emergency-kit_container")
  // .addEventListener("animationiteration", animationsRestart);
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
  document.querySelector("#paratrooper_container").classList.remove("falling1");
  document.querySelector("#paratrooper_container").offsetWidth;
  document.querySelector("#paratrooper_container").classList.add("falling1");
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
  document
    .querySelector("#eu-container_container")
    .classList.remove("position1", "position2", "position3", "position4");

  let pos = Math.floor(Math.random() * 4) + 1;
  document
    .querySelector("#eu-container_container")
    .classList.add("position" + pos);

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
  document
    .querySelector("#missile_container")
    .classList.remove("falling-diagonal");
  document.querySelector("#missile_container").offsetWidth;
  document
    .querySelector("#missile_container")
    .classList.add("falling-diagonal");
  document
    .querySelector("#missile_container")
    .classList.remove("position5", "position6");

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
  // if (points >= 50) {
  // levelComplete();
  // } else {
  // showDecrementedLives;
  // }
}

function displayPoints() {
  console.log("vis point");
  document.querySelector("#point_count").textContent = points;
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

// function incrementLives() {
// console.log("få et liv");
// lives++;
// showIncrementedLives();
// }

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

function startTimer() {
  // Sæt timer-animationen (shrink) i gang ved at tilføje klassen shrink til time_sprite
  document.querySelector("#time_sprite").classList.add("shrink");

  // Tilføj en eventlistener som lytter efter at animationen er færdig (animationend) og kalder funktionen timeIsUp
  document
    .querySelector("#time_sprite")
    .addEventListener("animationend", timeIsUp);
}

function timeIsUp() {
  console.log("Tiden er gået!");

  if (points >= 50) {
    levelComplete();
  } else {
    gameOver();
  }
}

function stopGame() {
  // Stop animationer
  document.querySelector("#sound_war").pause();
  document.querySelector("#paratrooper_container").classList.remove("falling");
  document.querySelector("#us-container_container").classList.remove("falling");
  document.querySelector("#eu-container_container").classList.remove("falling");
  document
    .querySelector("#missile_container")
    .classList.remove("falling-diagonal");
  document
    .querySelector("#emergency-kit_container")
    .classList.remove("falling");

  // Fjern click
  document
    .querySelector("#paratrooper_container")
    .removeEventListener("click", clickParatrooper);
  document
    .querySelector("#us-container_container")
    .removeEventListener("click", clickUsContainer);
  document
    .querySelector("#eu-container_container")
    .removeEventListener("click", clickEuContainer);
  document
    .querySelector("#missile_container")
    .removeEventListener("click", clickMissile);
  document
    .querySelector("#emergency-kit_container")
    .removeEventListener("click", clickEmergencyKit);

  //Stop for mist liv, hvis der ikke klikkes på missile eller paratrooper
  document
    .querySelector("#paratrooper_container")
    .removeEventListener("animationiteration", decrementLives);
  document
    .querySelector("#missile_container")
    .removeEventListener("animationiteration", decrementLives);

  //Stop automatisk point, når us-container, eu-container og emergencykit lander på jorden
  document
    .querySelector("#us-container_container")
    .removeEventListener("animationiteration", incrementPoints);
  document
    .querySelector("#eu-container_container")
    .removeEventListener("animationiteration", incrementPoints);
  document
    .querySelector("#emergency-kit_container")
    .removeEventListener("animationiteration", incrementPoints);

  // Stop og nulstil lyde, fx baggrundsmusik
  document.querySelector("#sound_war").pause();
  document.querySelector("#sound_war").currentTime = 0;

  // nulstil timer - fjern animationen fra timeren (fjern klassen shrink fra time_sprite)
  document.querySelector("#time_sprite").classList.remove("shrink");
}
