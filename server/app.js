const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const app = express();
const PORT = 3005;

app.use('/graphql', graphqlHTTP({
    schema, graphiql: true
}));

mongoose.connect('mongodb://127.0.0.1/graphql',{ useNewUrlParser: true }, (err) => {
    if (err) {
        console.log('error: ', err);
        throw err;
    }
    console.log('Successfully connected');
});

app.listen(PORT, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`Server started on port: ${PORT}`);
    }

});