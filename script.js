const weatherData = [];
const searchBtn = document.getElementById("search");
const searchInput = document.querySelector("input");

async function fetchData(location) {
  const response =
    await fetch(`https://api.weatherapi.com/v1/current.json?key=d64997c5b844426e9b2200308251505&q=${location}&aqi=yes
`);
  if (response.status == 400) {
    alert("Data not found");
    return null;
  } else {
    const jsonData = await response.json();
    return jsonData;
  }
  console.log(jsonData);
}

searchBtn.addEventListener("click", async function () {
  const location = searchInput.value;
  if (!location) {
    return;
  }
  const data = await fetchData(location);
  if (data == null) {
    return;
  }
  console.log(data);

  weatherData.push({
    temperature: data.current.temp_c,
    cityName: data.location.name,
    timeAndDate: data.location.localtime.split(" "),
    imgUrl: data.current.condition.icon,
    condition: data.current.condition.text,
    day: data.current.is_day,
  });

  searchInput.value = "";

  rander();
});

function componentWeather(
  cityName,
  currentDate,
  currentTime,
  currentTemperature,
  is_day,
  condition,
  imgUrl
) {
  const location = document.getElementById("location");
  const date = document.getElementById("date");
  const time = document.getElementById("time");
  const temperature = document.getElementById("temperature");
  const Wcondition = document.getElementById("condition");
  const url = document.getElementById("img");
  const day = document.getElementById("day");

  /* ************************************************** */

  temperature.innerHTML = currentTemperature + "°C";
  location.textContent = cityName;
  date.textContent = currentDate;
  time.textContent = currentTime;
  url.src = imgUrl;
  Wcondition.textContent = condition;
  console.log(is_day);

  switch (is_day) {
    case 1:
      day.innerHTML = "Friday";
      break;
    case 2:
      day.innerHTML = "Saturday";
      break;
    case 3:
      day.innerHTML = "Sunday";
      break;
    case 4:
      day.innerHTML = "Monday";
      break;
    case 5:
      day.innerHTML = "Tuesday";
      break;
    case 6:
      day.innerHTML = "Wednesday";
      break;
    case 0:
      day.innerHTML = "Thrusday";
  }
  console.log(day);

  weatherData.pop();
}

function rander() {
  console.log(weatherData[0]);

  const { temperature, cityName, timeAndDate, day, imgUrl, condition } =
    weatherData[0];
  componentWeather(
    cityName,
    timeAndDate[0],
    timeAndDate[1],
    temperature,
    day,
    condition,
    imgUrl
  );
}
