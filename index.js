const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': ,
		'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
	}
};

fetch('https://exercisedb.p.rapidapi.com/exercises', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));
