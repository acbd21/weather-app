const weatherForm = document.querySelector("form");

weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const address = document.querySelector("#search").value;
  const messageOne = document.querySelector(".first");
  const messageTwo = document.querySelector(".second");

  messageTwo.textContent = "";
  messageOne.textContent = "Loading...";

  fetch(`http://localhost:3000/weather?address=${address}`).then((response) => {
    messageOne.textContent = "";
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        messageOne.textContent = `Address: ${data.address.toUpperCase()}`;
        messageTwo.textContent = `Temperature ${data.temperature} and feels like ${data.feelslike}`;
      }
    });
  });
});
