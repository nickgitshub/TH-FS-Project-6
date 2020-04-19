const express = require('express')
const data = require('./data.json')

const app = express();

app.use('/static', express.static('public'));

app.set('view engine', 'pug');


app.get('/', (req, res) => {
	res.render('index', { data: data })
	})

app.get('/about', (req, res) => {
	res.render('about')
	})

app.get('/projects/:id', (req, res) => {
	console.log(data[req.params.id])
	res.render('project', { data: data[req.params.id] })
	})

//an example of the error status being set to 404 in function creating the error
// app.use((req,res, next) => {
// 	const err = new Error('File Not Found');
// 	err.status = 404;
// 	next(err);
// })


// app.use((err, req, res, next) => {
// 	console.log(err)
// 	res.status(err.status);
// 	res.locals.error = err;
// 	res.render('error');
// })

app.listen(3000)