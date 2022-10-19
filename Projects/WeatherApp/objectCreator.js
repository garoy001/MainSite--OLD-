function getWeatherData(values) {
	let weatherDataTemp = {};
	let weatherData = {};
	Object.values(values).forEach((item, index) => {
		weatherDataTemp[index] = item;
	});
	Object.values(weatherDataTemp).forEach((item, index) => {
		if (index == 3) {
			weatherData['temperatures'] = item;
		} else if (index == 1) {
			weatherData['tempFeeling'] = item[0];
		} else if (index == 0) {
			weatherData['coord'] = item;
		} else if (index == 11) {
			weatherData['city'] = item;
		}
	});
	console.log(weatherData);
}
