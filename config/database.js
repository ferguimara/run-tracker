const mongoose = require('mongoose');
const connectionString = process.env.DATABASE_URI;

mongoose.connect(connectionString, {
	useNewUrlParser: true, 
	useCreateIndex: true, 
	useUnifiedTopology: true, 
	useFindAndModify: false,
});

mongoose.connection.on('connected', function(){
    console.log('Connected to MongoDB');
});