const express = require('express');
const app = express();
const expressGraphL = require('express-graphql');
const schema = require('./schema');

app.use('/graphql', expressGraphL({
    schema:schema,
    graphql: true
}))

app.listen( 4000 , () => {
    console.log('server start on 3000');
})