const $form = $('#locationInput');
const $locationText = $('#locationText');
const $locationSubmit = $('#locationSubmit');
let tempsToday = {};
let weatherInWords = {};
let city = '';
function tempConvert(type, temp) {
	if (type == 'celsius') {
	}
	if (type == 'f') {
	}
}

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
		});
	});
});
