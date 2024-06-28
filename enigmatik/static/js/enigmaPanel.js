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
	const rotorOrderDOM = document.getElementById("rotor-order-values-dom");
	rotorOrder.value = rotorSettingsString;
	rotorOrderDOM.innerText = rotorSettingsString;

	const initialPosition = document.getElementById("initial-position-values");
	const initialPositionDOM = document.getElementById(
		"initial-position-values-dom"
	);
	initialPosition.value = initialPositionsString;
	initialPositionDOM.innerText = initialPositionsString;

	const ringPosition = document.getElementById("ring-values");
	const ringPositionDOM = document.getElementById("ring-values-dom");
	ringPosition.value = ringPositionsString;
	ringPositionDOM.innerText = ringPositionsString;

	const keyPairs = document.getElementById("key-swap-values");
	const keyPairsDOM = document.getElementById("key-swap-values-dom");
	const keyPairsDOM2 = document.getElementById("key-swap-values-dom2");
	keyPairs.value = keyPairString;
	keyPairsDOM.innerText = keyPairString;
	keyPairsDOM2.innerText = keyPairString;

	// const submitBtn = document.getElementById("form-submit-btn");
	// submitBtn.click();
}
function removeSpaces(e) {
	e.preventDefault();
	const msgTitle = document.getElementById("#msg-title");
	msgTitle.value = msgTitle.value.replaceAll(" ", "");
	const msgText = document.getElementById("#msg-txt");
	msgText.value = msgTitle.value.replaceAll(" ", "");
	document.getElementById("create-msg-form").submit();
}

function pullKeyPairs() {
	const keyboard = document.querySelector(".keys-only");
	const allKeys = keyboard.querySelectorAll("input");
	const colorKeys = {
		blue: "",
		green: "",
		orange: "",
		red: "",
		brown: "",
		purple: "",
		darkgoldenrod: "",
		darkgrey: "",
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
	pullPanelSettings();
}

function decrementInitial(elem) {
	const alph = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	const rotor =
		elem.previousElementSibling.firstElementChild.firstElementChild;
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
	pullPanelSettings();
}

function keyPairs(elem) {
	const keyboard = document.querySelector(".keys-only");
	// const allKeys = Array.from(keyboard.querySelectorAll("input"));
	const allKeys = keyboard.querySelectorAll("input");
	const allColors = [
		"blue",
		"green",
		"orange",
		"red",
		"brown",
		"purple",
		"darkgoldenrod",
		"darkgrey",
		"pink",
		"lightseagreen",
	];
	let availableColors = [];

	let colorCount = {
		blue: 0,
		green: 0,
		orange: 0,
		red: 0,
		brown: 0,
		purple: 0,
		darkgoldenrod: 0,
		darkgrey: 0,
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

	console.log(typeof elem.dataset.color);
	// if a color is clicked that is not blank, all keys with that color will be made blank
	if (elem.dataset.color) {
		const elementColor = elem.dataset.color;
		allKeys.forEach((key) => {
			console.log(
				"key.dataset.color is " + key.dataset.color,
				"elem.dataset.color " + elem.dataset.color,
				"element color is " + elementColor
			);
			if (key.dataset.color && key.dataset.color == elementColor) {
				console.log("toast");
				key.dataset.color = null;
				key.style.border = "3px solid black";
				key.style.color = "black";
			}
		});
	}
	allKeys.forEach((key) => {
		const color = key.dataset.color;
		if (color) colorCount[key.dataset.color]++;
	});

	// goes through full ordered color list and if color isnt being used for two keys, then it is added to the available colors array
	allColors.forEach((color) => {
		if (colorCount[color] < 2) {
			availableColors.push(color);
		}
	});
	console.log("available colors are ", availableColors);

	// make latest key press have the first available color in the available color array
	// if (availableColors.length > 0) {
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
	// }
	// loops over keys and counts current colors used
	allKeys.forEach((key) => {
		const color = key.dataset.color;
		if (color) colorCount[key.dataset.color]++;
	});
	console.log(colorCount);
	pullPanelSettings();
}

// hide enigma panel if the message isnt private
function hideEnigmaPanel() {
	const enigmaPanel = document.getElementById("enigma-panel");
	const enigmaSettingsNote = document.getElementById("enigma-settings-note");
	enigmaPanel.classList.add("d-none");
	enigmaSettingsNote.classList.add("d-none");
}
// show enigma panel if the message is private
function showEnigmaPanel() {
	const enigmaPanel = document.getElementById("enigma-panel");
	const enigmaSettingsNote = document.getElementById("enigma-settings-note");
	enigmaPanel.classList.remove("d-none");
	enigmaSettingsNote.classList.remove("d-none");
}

// click submit button outside of form
function submitForm() {
	const submitBtn = document.getElementById("form-submit-btn");
	pullPanelSettings();
	submitBtn.click();
}
