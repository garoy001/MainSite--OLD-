var menuLinks = [
	{
		text: 'Home',
		href: 'https://dev.gabrielroyce.com/index.html',
	},
	{
		text: 'projects',
		href: '#',
		subLinks: [
			{
				text: 'Weather App',
				href: 'https://dev.gabrielroyce.com/Projects/WeatherApp/index.html',
			},
			{
				text: 'API Project',
				href: 'https://dev.gabrielroyce.com/Projects/Project1/index.html',
			},
			{
				text: 'Game Project',
				href: 'https://dev.gabrielroyce.com/Projects/GameProject/index.html',
			},
		],
	},
	{
		text: 'Resume',
		href: 'https://dev.gabrielroyce.com/Resume/resumepage.html',
	},
];

//Grab the main section and customize
const mainEl = document.querySelector('main');
mainEl.style.backgroundColor = 'var(--main-bg)';
mainEl.classList.add('flex-ctr');

//Grab the top menu items and customize
const topMenuEl = document.querySelector('nav#top-menu');
topMenuEl.style.height = '100%';
topMenuEl.style.backgroundColor = 'var(--top-menu-bg)';
topMenuEl.classList.add('flex-around');

//loop through all the links and add them to the top menu
for (let link of menuLinks) {
	const newElement = document.createElement('a');
	newElement.setAttribute('href', link.href);
	newElement.innerHTML = link.text;
	topMenuEl.append(newElement);
}

//Second Group of tasks---------------------------

//Grab and customize the submenu
const subMenuEl = document.querySelector('#sub-menu');
subMenuEl.style.height = '100%';
subMenuEl.style.backgroundColor = 'var(--sub-menu-bg)';
subMenuEl.classList.add('flex-around');
subMenuEl.style.position = 'absolute';
subMenuEl.style.top = '0';

//Grab all the link elements
const topMenuLinks = document.querySelectorAll('a');
let showingSubMenu = false;

//Create the buildSubMenu function
function buildSubMenu(targetSubLinks) {
	subMenuEl.innerHTML = '';
	for (let link of targetSubLinks) {
		const newEl = document.createElement('a');
		newEl.setAttribute('href', link.href);
		newEl.classList.add('subMenuList');
		newEl.innerHTML = link.text;
		subMenuEl.append(newEl);
	}
}

//Add event listen to the top menu
//Begin topMenu event Listener >>>>>>>>>>>>>>
topMenuEl.addEventListener('click', function (e) {
	//prevent the default
	//contain the actual link being clicked
	let target = e.target;
	let targetObject;
	for (let links of menuLinks) {
		console.log(target.parentElement.children.subLinks);
		if (links.text == target.innerHTML) {
			let location = menuLinks.indexOf(links);
			targetObject = menuLinks[location];
		}
	}
	console.log(targetObject, '<<this is the target object');

	//if the target isn't an <a> element return
	if (target.nodeName != 'A') {
		return;
	}
	//Otherwise set and remove active
	else {
		//check if it's working
		//console.log(target.innerHTML);

		//If the target has a class of active already then remove it
		if (target.classList.contains('active')) {
			target.classList.remove('active');
			//stop showing sub-menu
			showingSubMenu = false;
			//move sub-menu to behind the top-menu
			subMenuEl.style.top = '0';
			return;
		}
		//remove the active class from all the links
		else {
			for (let link of topMenuLinks) {
				link.classList.remove('active');
			}
		}
		//-----------------------------------------------------

		//Add the active class to the clicked target
		target.classList.add('active');

		//if the target object has a sublinks value then set subMenu to true
		if (targetObject.subLinks) {
			showingSubMenu = true;
		}
		//otherwise set subMenu to false
		else {
			showingSubMenu = false;
		}

		//-----------------------------------------------------

		if (showingSubMenu) {
			buildSubMenu(targetObject.subLinks);
			subMenuEl.style.top = '100%';
		} else {
			subMenuEl.style.top = '0';
		}
	}
});
//End topMenu event Listener <<<<<<<<<<<<<<<<<<<<<

//Begin subMenu event Listener >>>>>>>>>>>>>>>>>>>>>>>>>>>>>

subMenuEl.addEventListener('click', (e) => {
	// e.preventDefault();
	if (e.target.nodeName != 'A') {
		return;
	} else {
		showingSubMenu = false;
		subMenuEl.style.top = '0';
		for (let link of topMenuLinks) {
			link.classList.remove('active');
		}
	}
});
