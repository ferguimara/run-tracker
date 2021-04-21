const mongoose = require('mongoose');
const connectionString = 'mongodb+srv://admin:abc1234@cluster0.bynt1.mongodb.net/run-tracker?retryWrites=true&w=majority';

mongoose.connect(connectionString, {
	useNewUrlParser: true, 
	useCreateIndex: true, 
	useUnifiedTopology: true, 
	useFindAndModify: false,
});

mongoose.connection.on('connected', function(){
    console.log('Connected to MongoDB');
});