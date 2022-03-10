// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
	res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
app.get('/api/hello', function (req, res) {
	res.json({ greeting: 'hello API' });
});

app.get('/api/:date?', function (req, res) {
	const dateInput = req.params.date;
	let date = '';
	let milisecons = 0;
	if (dateInput === undefined) {
		date = new Date().toUTCString();
		milisecons = new Date().getTime();
	} else {
		if (isNaN(dateInput)) {
			date = new Date(dateInput).toUTCString();
			if (date === 'Invalid Date') {
				return res.json({ error: 'Invalid Date' });
			}
			milisecons = Date.parse(dateInput);
		} else {
			date = new Date(Number(dateInput)).toUTCString();
			milisecons = Number(dateInput);
			console.log(date);
		}
	}
	res.json({ unix: milisecons, utc: date });
});

// listen for requests :)
// port can be process.env.PORT
var listener = app.listen(process.env.PORT, function () {
	console.log('Your app is listening on port ' + listener.address().port);
});
