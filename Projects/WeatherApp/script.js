const $form = $('#locationInput');
const $locationText = $('#locationText');
const $locationSubmit = $('#locationSubmit');
let tempsToday = {};
let weatherInWords = {};
let city = '';
const weatherData = {};
const temps = {};
//Temp Conversion
function tempConvert(type, temp) {
	if (type == 'celsius') {
		return Math.floor(temp - 273.15);
	}
	if (type == 'f') {
		return Math.floor(((temp - 273.15) * 9) / 5 + 32);
	}
}

//Data conversion
function dataConvert(type, temps) {
	for (const [key, value] of Object.entries(temps)) {
		if (key != 'humidity' && key != 'pressure') {
			temps[key] = tempConvert(type, value);
		}
	}
	console.log(temps);
}

//Get and organize data

$form.submit((element) => {
	element.preventDefault();
	let locationText = $locationText.val();
	locationText = locationText.split(' ').join('+');
	console.log(locationText);
	const apiCallGeo = `http://api.openweathermap.org/geo/1.0/direct?q=${locationText}&limit=5&appid=2428f89e4496196c553a5b61abe465bf`;
	$.ajax(apiCallGeo).then((element) => {
		let lat = element[0].lat;
		let lon = element[0].lon;
		const apiCallWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=2428f89e4496196c553a5b61abe465bf`;
		$.ajax(apiCallWeather).then((element) => {
			console.log(element);
			weatherData['name'] = element.name;
			weatherData['temps'] = element.main;
			weatherData['feel'] = element.weather[0].description;
			console.log(weatherData);
			dataConvert('f', weatherData.temps);
			renderData();
		});
	});
});

function renderData() {
	const $weatherInfoToday = $('#weatherInfoToday');
	$weatherInfoToday.html(`
	<h1>${weatherData.name}</h1>
	<div>
		<p>Feels Like ${weatherData.feel}</p>
		<p>Todays temperature is ${weatherData.temps.temp} with a high of ${weatherData.temps.temp_max} and a low of ${weatherData.temps.temp_min}</p>	
	</div>
	
	`);
}
