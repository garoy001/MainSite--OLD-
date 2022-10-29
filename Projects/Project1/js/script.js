const hider = document.querySelectorAll('.hiddenItem');
let resultClicker = document.querySelectorAll('.previousContainer');
const $form = $('#ingredientInput');
const $ingredientText = $('#ingredientText');
const $ingredientSubmit = $('#ingredientSubmit');
const $previousResults = $('#previousResults');
const previousResults = [];
const previousSearches = [];

//Hiding Functions
hider.forEach((element) => {
	hideData(element);
});

function hideData(element) {
	element.classList.add('hiddenItemHide');
}
function showData(element) {
	element.classList.remove('hiddenItemHide');
}

/////////

$form.submit((element) => {
	element.preventDefault();
	//render previous
	renderPrevious();
	//get ingredient from input
	let ingredientText = $ingredientText.val();
	ingredientText = ingredientText.split(' ').join('+');
	$ingredientText.val('');
	//get object
	let requestUrl = `https://api.edamam.com/api/food-database/v2/parser?app_id=23ca1269&app_key=03ce4ec0e27290be7e2d51202833afdf&ingr=${ingredientText}&nutrition-type=cooking`;
	$.ajax(requestUrl).then((element) => {
		let foodInfo = element.parsed[0].food;
		console.log(foodInfo);
		//show the results text
		hider.forEach((element) => {
			showData(element);
		});
		//render the current search
		renderData(foodInfo);
	});
});

function getData(str) {
	renderPrevious();
	let requestUrl = `https://api.edamam.com/api/food-database/v2/parser?app_id=23ca1269&app_key=03ce4ec0e27290be7e2d51202833afdf&ingr=${str}&nutrition-type=cooking`;
	$.ajax(requestUrl).then((element) => {
		let foodInfo = element.parsed[0].food;
		console.log(foodInfo);
		//render the current search
		renderData(foodInfo);
	});
}
//Rendering Functions
//-----------------------------
//Render the food data from the current search
function renderData(foodInfo) {
	if (previousSearches.indexOf(foodInfo.label) == -1) {
		previousResults.push(foodInfo);
		previousSearches.push(foodInfo.label);
	}
	const $resultsBox = $('#resultsBox');
	$resultsBox.html(`
    <img src=${foodInfo.image}>
    <h2>${foodInfo.label}</h2>
    <p>Calories = ${foodInfo.nutrients.ENERC_KCAL} kCal</p>
	<p>Fat = ${foodInfo.nutrients.FAT} g</p>

    `);
}
//Render the previous search
function renderPrevious() {
	$previousResults.html('');
	previousResults.forEach((element) => {
		$previousResults.append(`
		<div class="previousContainer" id="${element.label}" ret="${element.label}">
		<img src=${element.image} class="previousImage" ret="${element.label}">
		<h4 class="previousLabel" ret="${element.label}">${element.label}</h4>
		</div>
		`);
	});
	let resultClicker = document.querySelectorAll('.previousContainer');
	resultClicker.forEach((element) => {
		element.addEventListener('click', function () {
			renderingGate(element);
		});
	});
}

function renderingGate(element) {
	console.log(element);
	let attr = element.className;
	console.log(attr);
	console.log(element.getAttribute('ret'));
	if (
		attr == 'previousContainer' ||
		attr == 'previousImage' ||
		attr == 'previousLabel'
	) {
		getData(element.getAttribute('ret'));
	}
}
////////////////////

// {
//     "foodId": "food_b517334aiij8xjave2iu9b75zron",
//     "label": "Croissant",
//     "knownAs": "croissants",
//     "nutrients": {
//         "ENERC_KCAL": 406,
//         "PROCNT": 8.2,
//         "FAT": 21,
//         "CHOCDF": 45.8,
//         "FIBTG": 2.6
//     },
//     "category": "Generic foods",
//     "categoryLabel": "food",
//     "image": "https://www.edamam.com/food-img/590/590b8e57dd922af23adc3b4578a9033a.gif"
// }
