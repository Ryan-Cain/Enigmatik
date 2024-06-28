const friendModalButton = document.getElementById("friend-modal-btn");

function openFriendModal() {
	friendModalButton.click();
}

text = "THE RUSSIANS ARE COMING I REPEAT THE RUSSIANS ARE COMING";

function scrambler(event) {
	const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

	let interval = null;
	// Need to add function to each message, when rendering page if friend then put decrepted
	// message inside of a data value in the card, then when the function runs it pulls in that decrypted string
	// to run in the function
	let iteration = 0;

	clearInterval(interval);

	interval = setInterval(() => {
		event.target.innerText = event.target.innerText
			.split("")
			.map((letter, index) => {
				if (index < iteration) {
					return text[index];
				}

				return letters[Math.floor(Math.random() * 26)];
			})
			.join("");

		if (iteration >= text.length) {
			clearInterval(interval);
		}

		iteration += 1 / 2;
	}, 20);
}

function descramblerTitle() {
	const title = document.getElementById("decr-title");
	if (title) {
		const titleValue = title.innerText;
		// const titleValue = "alskdjfhalksjdhflakjsdhfljkdf";
		const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

		let interval = null;
		// Need to add function to each message, when rendering page if friend then put decrepted
		// message inside of a data value in the card, then when the function runs it pulls in that decrypted string
		// to run in the function
		let iteration = 0;

		clearInterval(interval);

		interval = setInterval(() => {
			title.innerText = title.innerText
				.split("")
				.map((letter, index) => {
					if (index < iteration) {
						return titleValue[index];
					}

					return letters[Math.floor(Math.random() * 26)];
				})
				.join("");
			if (iteration >= titleValue.length) {
				clearInterval(interval);
			}
			iteration += 1 / 2;
		}, 20);
	}
}
function descramblerMessage() {
	const message = document.getElementById("decr-message");
	const messageValue = message.innerText;
	// const titleValue = "alskdjfhalksjdhflakjsdhfljkdf";
	const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

	let interval = null;
	let iteration = 0;

	const spacedMessage = addSpaces(messageValue);
	clearInterval(interval);
	interval = setInterval(() => {
		message.innerText = spacedMessage
			.split("")
			.map((letter, index) => {
				if (index < iteration) {
					return spacedMessage[index].toUpperCase();
				}
				return letters[Math.floor(Math.random() * 26)];
			})
			.join("");

		if (iteration >= spacedMessage.length) {
			clearInterval(interval);
		}

		iteration += 1;
	}, 20);
}

// card unscramble
function descrambleCardTitle(elem) {
	const message = elem.querySelector(".decrypted-title-reveal");
	const messageDisplay = elem.querySelector("h2");

	if (message && messageDisplay) {
		const testTitle = addSpaces(message.innerText).toUpperCase();
		const messageValue = message.innerText;
		if (testTitle != messageDisplay.innerText) {
			// const titleValue = "alskdjfhalksjdhflakjsdhfljkdf";
			const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

			let interval = null;
			// Need to add function to each message, when rendering page if friend then put decrepted
			// message inside of a data value in the card, then when the function runs it pulls in that decrypted string
			// to run in the function
			let iteration = 0;
			const spacedMessage = addSpaces(messageValue);
			clearInterval(interval);

			interval = setInterval(() => {
				messageDisplay.innerText = spacedMessage
					.split("")
					.map((letter, index) => {
						if (index < iteration) {
							return spacedMessage[index].toUpperCase();
						}
						return letters[Math.floor(Math.random() * 26)];
					})
					.join("");

				if (iteration >= spacedMessage.length) {
					clearInterval(interval);
				}

				iteration += 1 / 2;
			}, 20);
			message.remove();
		}
	}
}
function descrambleCardMessage(elem) {
	const message = elem.querySelector(".decrypted-message-reveal");
	const messageDisplay = elem.querySelector(".message");
	if (message && messageDisplay) {
		const messageValue = message.innerText;
		const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

		let interval = null;
		let iteration = 0;

		const spacedMessage = addSpaces(messageValue);
		clearInterval(interval);
		interval = setInterval(() => {
			messageDisplay.innerText = spacedMessage
				.split("")
				.map((letter, index) => {
					if (index < iteration) {
						return spacedMessage[index].toUpperCase();
					}
					return letters[Math.floor(Math.random() * 26)];
				})
				.join("");
			if (iteration >= spacedMessage.length) {
				clearInterval(interval);
			}

			iteration += 1;
		}, 20);
		message.remove();
	}
}
function addSpaces(input) {
	const chars = input.split("");
	let result = [];
	for (let i = 0; i < chars.length; i++) {
		result.push(chars[i]);
		if ((i + 1) % 4 === 0 && i + 1 !== chars.length) {
			result.push(" ");
		}
	}
	return result.join("");
}
function addSpacesToTitles() {
	const cards = document.querySelectorAll(".card");
	if (cards) {
		for (let i = 0; i < cards.length; i++) {
			const title = cards[i].querySelector("h2");
			if (title && !title.innerText.includes(" ")) {
				const spacedMessage = addSpaces(title.innerText);
				title.innerText = spacedMessage;
			}
		}
	}
}
function checkAndAddSpaces(elem) {
	const text = elem.innerText;
	if (!text.includes(" ")) {
		elem.innerText = addSpaces(text);
	}
}
function addSpacesToReadMessagePage() {
	const encryptedTitle = document.querySelector(".encrypted .message .title");
	checkAndAddSpaces(encryptedTitle);
	const encryptedMessage = document.querySelector(".encrypted .message p");
	checkAndAddSpaces(encryptedMessage);
	const decryptedTitle = document.querySelector(".decrypted .message .title");
	checkAndAddSpaces(decryptedTitle);
	const decryptedMessage = document.querySelector(".decrypted .message p");
	checkAndAddSpaces(decryptedMessage);
}
