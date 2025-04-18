var today = document.querySelector(".today");
var city = document.querySelector(".today .location .city");
var todayName = document.querySelector(".today .date .day");
var todayDate = document.querySelector(".today .date .year");
var todayDegree = document.querySelector(" .today-info .degree ");
var todayImage = document.querySelector(".today-info img ");
var todayDesc = document.querySelector(".today-info .desc");
var todayHumidity = document.querySelector(".humidity");
var todayWind_dir = document.querySelector(".today-info .wind_dir");
var todayVis_km = document.querySelector(".today-info .vis_km");
var cityInput = document.querySelector(".city-input");
var findCity = document.querySelector(".search-form");
async function getData(cityName) {
  try {
    var request = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=d5c4e6c3a5174239832134144251404&q=${cityName}&days=3`
    );
    var data = await request.json();

    var dateOfToday = getDayName(data.location.localtime);
    todayName.innerHTML = dateOfToday;
    display(data.forecast.forecastday);
    city.innerHTML = ` ${data.location.name} ${data.location.country}`;
    console.log(data);

    todayDate.innerHTML = formatDate(data.location.localtime);
    todayDegree.innerHTML = data.current.temp_c;
    todayImage.src = `https:${data.current.condition.icon}`;
    todayDesc.innerHTML = data.current.condition.text;
    todayHumidity.innerHTML = `${data.current.humidity}%`;
    todayWind_dir.innerHTML = data.current.wind_dir;
    todayVis_km.innerHTML = `${data.current.vis_km}km/h`;
  } catch (error) {
    showError(error);
  }
}
getData("suez");

function getDayName(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-US", { weekday: "long" });
}
function formatDate(dateStr) {
  return dateStr.split(" ")[0];
}

findCity.addEventListener("submit", function (e) {
  e.preventDefault();
  getData(cityInput.value);
});

function showError(error) {
  Toastify({
    text: `City Not Found !,${error}`,
    duration: 3000,
    gravity: "top",
    position: "right",
    backgroundColor: "red",
  }).showToast();
}

function display(forecastday) {
  console.log(forecastday);

  for (let i = 1; i < forecastday.length; i++) {
    document.querySelector(`#day${i} .day`).innerHTML = getDayName(
      forecastday[i].date
    );

    document.querySelector(`#day${i} .degree`).innerHTML =
      forecastday[i].day.maxtemp_c;

    document.querySelector(
      `#day${i} .small`
    ).innerHTML = `${forecastday[i].day.mintemp_c} <span class="symbol">o</span> c
`;
    document.querySelector(
      `#day${i} img`
    ).src = `https:${forecastday[i].day.condition.icon}`;

    document.querySelector(
      `#day${i} .desc`
    ).innerHTML = `${forecastday[i].day.condition.text}`;

  }
}
