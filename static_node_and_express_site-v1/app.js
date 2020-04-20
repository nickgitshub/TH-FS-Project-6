const express = require('express')
const data = require('./data.json')

const app = express();

//setting route to static files
app.use('/static', express.static('public'));

app.set('view engine', 'pug');

//route to index page
app.get('/', (req, res) => {
	return res.render('index', { data: data }); 
})

//route to about page
app.get('/about', (req, res) => {
	return res.render('about');
})

//route to be used for retrieving projects
app.get('/projects/:id', (req, res, next) => {
	//redirecting projects to error page if the id number request goes beyond number of objects in data
	if(req.params.id >= data.length){
		console.log("----------------\n BAM \n --------------------")
		const err = new Error('Project Not Found');
		err.status = 404;
		next(err);
	}else{
		return res.render('project', { data: data[req.params.id] });
	}
	
})

//404 error being created if no route is found
app.use((req,res, next) => {
	const err = new Error('Route Not Found');
	err.status = 404;
	next(err);
})

//renders errors if any are caught on page
app.use((err, req, res, next) => {
	console.log(err)
	res.status(err.status);
	res.locals.error = err;
	res.render('error');
})

app.listen(3000, console.log("App now running on Port 3000"))