const express = require('express')
const data = require('./data.json')

const app = express();

app.use('/static', express.static('public'));

app.set('view engine', 'pug');


app.get('/', (req, res) => {
	return res.render('index', { data: data }); 
	})

app.get('/about', (req, res) => {
	return res.render('about');
	})

app.get('/projects/:id', (req, res) => {
	return res.render('project', { data: data[req.params.id] });
	})

//404 error being created if no route is found
app.use((req,res, next) => {
	const err = new Error('File Not Found');
	err.status = 404;
	next(err);
})


app.use((err, req, res, next) => {
	console.log(err)
	res.status(err.status);
	res.locals.error = err;
	res.render('error');
})

app.listen(3000, console.log("App now running on Port 3000"))