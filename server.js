const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const app = express();

app.use(express.json());
app.use(cors());

const db = knex ({
    client: 'pg',
    connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'postgres@123',
    database : 'smartbrain'
  }
});

//console.log(db.select('*').from('users'));
db.select('*').from('users').then(data => {
	console.log(data);
});

app.get('/', (req,res) => {
	//res.send('This is working!');
	res.send(database.users);
})

app.post('/signin', signin.handleSignin(db, bcrypt));
//app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) });
app.post('/register', (req,res) => { register.handleRegister(req, res, db, bcrypt) });

app.get('/profile/:id', (req, res) => { profile.handleProfile(req, res, db) });

app.put('/image', (req, res) => { image.handleImage(req, res, db) } );

app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) } )

app.listen(process.env.PORT || 3001, () => {
	console.log(`App is running on port ${process.env.PORT}``);
})