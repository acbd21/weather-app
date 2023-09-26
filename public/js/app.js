const weatherForm = document.querySelector("form");

weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const address = document.querySelector("#search").value;
  const messageOne = document.querySelector(".first");
  const messageTwo = document.querySelector(".second");

  messageTwo.textContent = "";
  messageOne.textContent = "Loading...";

  fetch(`/weather?address=${address}`).then((response) => {
    messageOne.textContent = "";
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        const {temperature, feelslike, humidity, address} = data;
        messageOne.textContent = `Address: ${address.toUpperCase()}`;
        messageTwo.textContent = `Temperature ${temperature}, feels like ${feelslike} and humidity is ${humidity}`;
      }
    });
  });
});
