var express = require('express');
var mysql = require('mysql2');
var bodyParser = require('body-parser');
var app = express();

app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'your_password_here',
    database: 'your_database_name_here'

})

app.get('/', (req, res) => {
    //FInd count users in database
    var q = "SELECT COUNT(*) AS count FROM users"
    connection.query(q, (err, results) => {
        if(err) throw err;
        var count = results[0].count;
        //Respond with that count
        // res.send("we have "+ count + " users")
        res.render('home', {data: count});
    })
    
    console.log('hi');
});

app.post('/register', (req,res) => {
    var email = req.body.email;

    var person = {
        email: email,
    }

    connection.query('INSERT INTO users SET ?', person, (err, result) => {
        if(err) throw err;
        // console.log(result);
        // res.send('Thank you!!!');
        res.redirect("/");
    })
})

app.listen(8080, () => {
    console.log('Server started at 8080!')
});
