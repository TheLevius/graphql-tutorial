const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const schema = require('../schema/schema.js');
const app = express();
const PORT = 3005;

app.use('/graphql', graphqlHTTP({
    schema, graphiql: true
}));

app.listen(PORT, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`Server started on port: ${PORT}`);
    }

});