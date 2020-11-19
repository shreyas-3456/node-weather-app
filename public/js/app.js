const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#messageone');
const messageTwo = document.querySelector('#messagetwo');

// fetch('http://localhost:3000/weather?address=').then((response) => {
// 	response.json().then((data) => {
// 		if (data.error) {
// 			return console.log(data.error);
// 		}
// 		console.log(data);
// 		console.log(data.location);
// 		console.log(data.forecast);
// 	});
// });

weatherForm.addEventListener('submit', (e) => {
	e.preventDefault();
	messageOne.textContent = '';
	messageTwo.textContent = 'loading ....';
	fetch(`http://localhost:3000/weather?address=${search.value}`).then(
		(response) => {
			response.json().then((data) => {
				if (data.error) {
					messageTwo.textContent = data.error;
					return console.log(data.error);
				}
				// console.log(data);
				// console.log(data.location);
				// console.log(data.forecast);
				messageOne.textContent = data.location;
				messageTwo.textContent = data.forecast;
			});
		}
	);
});
