const $form = $('#locationInput');
const $locationText = $('#locationText');
const $locationSubmit = $('#locationSubmit');

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
	const apiCallWeather = `https://api.openweathermap.org/data/2.5/weather?q=${locationText}&appid=2428f89e4496196c553a5b61abe465bf`;
	$.ajax(apiCallWeather).then((element) => {
		console.log(element);
		console.log(Object.values(element));

	});
});
