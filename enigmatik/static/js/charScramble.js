const friendModalButton = document.getElementById("friend-modal-btn");

function openFriendModal() {
  friendModalButton.click();
  console.log("this ran");
}

text = "THE RUSSIANS ARE COMING I REPEAT THE RUSSIANS ARE COMING";

function scrambler(event) {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  let interval = null;
  // Need to add function to each message, when rendering page if friend then put decrepted
  // message inside of a data value in the card, then when the function runs it pulls in that decrypted string
  // to run in the function
  console.log("function running");
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
  const titleValue = title.innerText;
  // const titleValue = "alskdjfhalksjdhflakjsdhfljkdf";
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  let interval = null;
  // Need to add function to each message, when rendering page if friend then put decrepted
  // message inside of a data value in the card, then when the function runs it pulls in that decrypted string
  // to run in the function
  console.log("function running");
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
function descramblerMessage() {
  const message = document.getElementById("decr-message");
  const messageValue = message.innerText;
  // const titleValue = "alskdjfhalksjdhflakjsdhfljkdf";
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  let interval = null;
  // Need to add function to each message, when rendering page if friend then put decrepted
  // message inside of a data value in the card, then when the function runs it pulls in that decrypted string
  // to run in the function
  console.log("function running");
  let iteration = 0;

  clearInterval(interval);

  interval = setInterval(() => {
    message.innerText = message.innerText
      .split("")
      .map((letter, index) => {
        if (index < iteration) {
          return messageValue[index];
        }

        return letters[Math.floor(Math.random() * 26)];
      })
      .join("");

    if (iteration >= messageValue.length) {
      clearInterval(interval);
    }

    iteration += 1 / 2;
  }, 20);
}

// card unscramble
function descrambleCardTitle(elem) {
  const message = elem.querySelectorAll(".decrypted-title-reveal");
  const messageValue = message.innerText;
  // const titleValue = "alskdjfhalksjdhflakjsdhfljkdf";
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  let interval = null;
  // Need to add function to each message, when rendering page if friend then put decrepted
  // message inside of a data value in the card, then when the function runs it pulls in that decrypted string
  // to run in the function
  console.log("function running");
  let iteration = 0;

  clearInterval(interval);

  interval = setInterval(() => {
    message.innerText = message.innerText
      .split("")
      .map((letter, index) => {
        if (index < iteration) {
          return messageValue[index];
        }

        return letters[Math.floor(Math.random() * 26)];
      })
      .join("");

    if (iteration >= messageValue.length) {
      clearInterval(interval);
    }

    iteration += 1 / 2;
  }, 20);
}
