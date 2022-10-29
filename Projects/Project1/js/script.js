const hider = document.querySelectorAll('.hiddenItem');
const $form = $('#ingredientInput');
const $ingredientText = $('#ingredientText');
const $ingredientSubmit = $('#ingredientSubmit');
const $previousResults = $('#previousResults');
const previousResults = [];

hider.forEach((element) => {
	hideData(element);
});

$form.submit((element) => {
	element.preventDefault();
	renderPrevious();
	let ingredientText = $ingredientText.val();
	ingredientText = ingredientText.split(' ').join('+');
	let requestUrl = `https://api.edamam.com/api/food-database/v2/parser?app_id=23ca1269&app_key=03ce4ec0e27290be7e2d51202833afdf&ingr=${ingredientText}&nutrition-type=cooking`;
	$.ajax(requestUrl).then((element) => {
		let foodInfo = element.parsed[0].food;
		console.log(foodInfo);
		hider.forEach((element) => {
			showData(element);
		});
		renderData(foodInfo);
	});
});

function renderData(foodInfo) {
	previousResults.push(foodInfo);
	const $resultsBox = $('#resultsBox');
	$resultsBox.html(`
    <img src=${foodInfo.image}>
    <h2>${foodInfo.label}</h2>
    <p>Calories = ${foodInfo.nutrients.ENERC_KCAL}</p>
	<p>Fat = ${foodInfo.nutrients.FAT}</p>

    `);
}

function renderPrevious() {
	previousResults.forEach((element) => {
		$previousResults.append(`
		<div class="previousContainer">
		<img src=${element.image} class="previousImage">
		<h2 class="previousLabe">${element.label}</h2>
		</div>
		`);
	});
}

function hideData(element) {
	element.classList.add('hiddenItemHide');
}
function showData(element) {
	element.classList.remove('hiddenItemHide');
}

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
