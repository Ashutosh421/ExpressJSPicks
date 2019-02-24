const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const app = express();

const mongoDBConnection = require('./helper/MongoDBConnection');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(logger('dev'));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.set('views', './views');

// Connect to the MongoDB database
mongoDBConnection.connectToDatabse().then(() => {
    console.log(`Successfully connected to the mongodb`);
}).catch((err) => console.err(`Error connecting to the mongodb: ${err}`));

const usersRouter = require('./routes/usersRouter');
app.use('/users', usersRouter);

const homeRouter = require('./routes/homeRouter');
app.get('/', homeRouter);


app.listen(process.env.PORT || 3000,
    () => console.log(`Listening to port 3000`));
