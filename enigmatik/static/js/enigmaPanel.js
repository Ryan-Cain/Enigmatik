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

  const keyPairString = pullKeyPairs();

  const rotorOrder = document.getElementById("rotor-order-values");
  rotorOrder.value = rotorSettingsString;

  const initialPosition = document.getElementById("initial-position-values");
  initialPosition.value = initialPositionsString;

  const ringPosition = document.getElementById("ring-values");
  ringPosition.value = ringPositionsString;

  const keyPairs = document.getElementById("key-swap-values");
  keyPairs.value = keyPairString;

  console.log(rotorSettingsString, initialPositionsString, ringPositionsString);
  const submitBtn = document.getElementById("form-submit-btn");
  submitBtn.click();
}

function pullKeyPairs() {
  const keyboard = document.querySelector(".keys-only");
  const allKeys = keyboard.querySelectorAll("input");
  const colorKeys = {
    blue: "",
    green: "",
    yellow: "",
    red: "",
    brown: "",
    purple: "",
    darkgoldenrod: "",
    grey: "",
    pink: "",
    lightseagreen: "",
  };
  allKeys.forEach((key) => {
    if (colorKeys.hasOwnProperty(key.dataset.color)) {
      colorKeys[key.dataset.color] += key.value;
    }
  });
  keyValues = Object.values(colorKeys);
  finalKeyPairArr = [];
  keyValues.forEach((keyPair) => {
    if (keyPair.length == 2) {
      finalKeyPairArr.push(keyPair);
    }
  });
  return finalKeyPairArr.join(", ");
}

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

function keyPairs(elem) {
  const keyboard = document.querySelector(".keys-only");
  const allKeys = keyboard.querySelectorAll("input");
  const allColors = [
    "blue",
    "green",
    "yellow",
    "red",
    "brown",
    "purple",
    "darkgoldenrod",
    "grey",
    "pink",
    "lightseagreen",
  ];
  let availableColors = [];

  let colorCount = {
    blue: 0,
    green: 0,
    yellow: 0,
    red: 0,
    brown: 0,
    purple: 0,
    darkgoldenrod: 0,
    grey: 0,
    pink: 0,
    lightseagreen: 0,
  };

  console.log(
    "key '" +
      elem.value +
      "' color is " +
      elem.dataset.color +
      " on function click"
  );

  // if a color is clicked that is not blank, all keys with that color will be made blank
  if (elem.dataset.color != "null") {
    allKeys.forEach((key) => {
      if (key.dataset.color == elem.dataset.color) {
        key.dataset.color = "null";
        key.style.border = "3px solid black";
        key.style.color = "black";
        colorCount[elem.dataset.color] = 0;
      }
    });
  }
  // loops over keys and counts current colors used
  allKeys.forEach((key) => {
    colorCount[key.dataset.color]++;
  });
  console.log(colorCount);

  // goes through full ordered color list and if color isnt being used for two keys, then it is added to the available colors array
  allColors.forEach((color) => {
    if (colorCount[color] < 2) {
      availableColors.push(color);
    }
  });
  console.log("available colors are ", availableColors);

  // make latest key press have the first available color in the available color array
  if (availableColors.length > 0) {
    elem.dataset.color = availableColors[0];
    elem.style.border = `3px solid ${availableColors[0]}`;
    elem.style.color = `${availableColors[0]}`;
    console.log(
      "key '" +
        elem.value +
        "' color is " +
        elem.dataset.color +
        " on function end"
    );
  }
}
