const main = document.getElementById("main");
const addUser = document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const showMillionairesBtn = document.getElementById("show-millionaires");
const sortBtn = document.getElementById("sort");
const calculateWealthBtn = document.getElementById("calculate-wealth");

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

async function getRandomUser() {
	const res = await fetch("https://randomuser.me/api");
	const data = await res.json();

	const user = data.results[0];

	const newUser = {
		name: `${user.name.first} ${user.name.last}`,
		money: Math.floor(Math.random() * 1000000),
	};

	addData(newUser);
}

//double the amount of mmoney

function doubleMoney() {
	data = data.map((item) => {
		return { ...item, money: item.money * 3 };
	});

	updateDOM();
}

function SorByRichest() {
	data.sort((user1, user2) => user2.money - user1.money);

	updateDOM();
}

function showMillionaires() {
	data = data.filter((user) => user.money > 100000);

	updateDOM();
}

function calculateWealth() {
	const wealth = data.reduce((acc, user) => (acc += user.money), 0);

	const wealthEl = document.createElement("div");
	wealthEl.innerHTML = `<h3>Total Wealth: <strong> ${formatMoney(
		wealth
	)}</strong></h3>`;
	main.appendChild(wealthEl);
}

function addData(obj) {
	data.push(obj);

	updateDOM();
}

function updateDOM(providedData = data) {
	//clear the main div

	main.innerHTML = "<h2><strong>Person</strong> Wealth</h2>";

	providedData.forEach((item) => {
		const element = document.createElement("div");
		element.classList.add("person");
		element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(
			item.money
		)}`;
		main.appendChild(element);
	});
}

/// form at monerrt

function formatMoney(number) {
	return "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

//EVent Listners

addUser.addEventListener("click", getRandomUser);
doubleBtn.addEventListener("click", doubleMoney);
sortBtn.addEventListener("click", SorByRichest);
showMillionairesBtn.addEventListener("click", showMillionaires);
calculateWealthBtn.addEventListener("click", calculateWealth);
