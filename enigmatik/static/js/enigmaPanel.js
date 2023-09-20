function pullPanelSettings() {
  const rotorSettings = document.querySelectorAll(".rotor-order-value");
  const initialPositions = document.querySelectorAll(".rotor-initial");
  const ringPositions = document.querySelectorAll(".ring-position");
  let rotorSettingsString = "";
  let initialPositionsString = "";
  let ringPositionsString = "";
  rotorSettings.forEach((rotor) => {
    rotorSettingsString += rotor.value + " ";
  });
  rotorSettingsString = rotorSettingsString.slice(
    0,
    rotorSettingsString.length - 1
  );
  initialPositions.forEach((initial) => {
    initialPositionsString += initial.innerText + " ";
  });
  initialPositionsString = initialPositionsString.slice(
    0,
    initialPositionsString.length - 1
  );
  ringPositions.forEach((ring) => {
    ringPositionsString += ring.value + " ";
  });
  ringPositionsString = ringPositionsString.slice(
    0,
    ringPositionsString.length - 1
  );

  const rotorOrder = document.getElementById("rotor-order-values");
  rotorOrder.value = rotorSettingsString;

  const initialPosition = document.getElementById("initial-position-values");
  initialPosition.value = initialPositionsString;

  const ringPosition = document.getElementById("ring-values");
  ringPosition.value = ringPositionsString;

  console.log(rotorSettingsString, initialPositionsString, ringPositionsString);
  const submitBtn = document.getElementById("form-submit-btn");
  submitBtn.click();
}
// pullPanelSettings();

function incrementInitial(elem) {
  const alph = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const rotor = elem.nextElementSibling.firstElementChild.firstElementChild;
  const rotorImg = elem.nextElementSibling.lastElementChild;
  if (rotor.dataset.position == 25) {
    rotor.dataset.position = 0;
    rotor.innerText = alph[rotor.dataset.position];
  } else {
    rotor.dataset.position++;
    rotor.innerText = alph[rotor.dataset.position];
  }
  const picNumber = rotor.dataset.position % 4;
  rotorImg.src = "/static/imgs/enigma-board/rotorstep" + picNumber + ".png";
}

function decrementInitial(elem) {
  const alph = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const rotor = elem.previousElementSibling.firstElementChild.firstElementChild;
  const rotorImg = elem.previousElementSibling.lastElementChild;
  if (rotor.dataset.position == 0) {
    rotor.dataset.position = 25;
    rotor.innerText = alph[rotor.dataset.position];
  } else {
    rotor.dataset.position--;
    rotor.innerText = alph[rotor.dataset.position];
  }
  const picNumber = rotor.dataset.position % 4;
  rotorImg.src = "/static/imgs/enigma-board/rotorstep" + picNumber + ".png";
}
