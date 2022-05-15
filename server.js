const express = require("express");
const bodyparser = require('body-parser');
const path = require('path');
const mongoose = require("mongoose");
var Publishable_Key = 'pk_test_51KziMkSJfa0YLRUzzHGoFxJp5EgpU3iIEbeOxZnnARNOFrwOkg3mkq2yMk7R7nVuUhSQ4X8chDoXoP17TDm4umxx00gZl5GBV8';
var Secret_Key = 'sk_test_51KziMkSJfa0YLRUzYTaieQUXhegkrfQSS9L1732Iw7xyh3jMybiMYZ1HJJl2esfD5OE51Odq2l6A3jMkPUv4yip400xr0TFgjI';
const stripe = require('stripe')(Secret_Key);
const PORT = process.env.PORT || 8080;

const app = express();

app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());


app.set('view engine', 'ejs');

app.get('/', function(req, res){
    res.render('Home', {
    key: Publishable_Key
    });
});

app.post('/payment', function(req, res){
    stripe.customers.create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken,
        name: 'Gautam Sharma',
        address: {
            line1: 'TC 9/4 Old MES colony',
            postal_code: '110092',
            city: 'New Delhi',
            state: 'Delhi',
            country: 'India',
        }
    }).then((customer) => {
 
        return stripe.charges.create({
            amount: 7000,    // Charing Rs 25
            description: 'Web Development Product',
            currency: 'USD',
            customer: customer.id
        });
}).then((charge) => {
    res.send("Success") // If no error occurs
}).catch((err) => {
    res.send(err)    // If some error occurs
});
});

app.listen(PORT, ()=> {
    console.log(`server is running ${PORT}`);
});

