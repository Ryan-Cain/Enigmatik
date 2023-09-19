// document.querySelector("h1").onmouseover = (event) => {
//   let iteration = 0;

//   clearInterval(interval);

//   interval = setInterval(() => {
//     event.target.innerText = event.target.innerText
//       .split("")
//       .map((letter, index) => {
//         if (index < iteration) {
//           return event.target.dataset.value[index];
//         }

//         return letters[Math.floor(Math.random() * 26)];
//       })
//       .join("");

//     if (iteration >= event.target.dataset.value.length) {
//       clearInterval(interval);
//     }

//     iteration += 1 / 3;
//   }, 100);
// };

text = "THE RUSSIANS ARE COMING I REPEAT THE RUSSIANS ARE COMING";

function scrambler(event) {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ__  ";

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
