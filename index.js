const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'ce38d7e0e2mshf57ca5c97f2edcfp1a3c3ejsn84444674f0ed',
		'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
	}
};

fetch('https://exercisedb.p.rapidapi.com/exercises', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));