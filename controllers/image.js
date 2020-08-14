const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: '5dc31f858a694a68933be39da586fdbe'
});

const handleApiCall = (req, res) => {
	app.models.predict(
	    Clarifai.FACE_DETECT_MODEL, 
	    req.body.input
	)
	.then(data => {
		res.json(data);
	})
	.catch(err => res.staus(400).json('Unable to work with API'))
}

const handleImage = (req, res, db) => {
	const { id } = req.body;
	db('users').where('id', '=', id)
	  .increment('entries', 1)
	  .returning('entries')
	  .then(entries => {
	  	 //console.log(entries);
	  	 res.json(entries[0]);
	    })
	  .catch(err => res.status(400).json('Unable to get Entries'))
}	  

module.exports = {
	handleImage,
	handleApiCall
}