const express = require('express');  //importing express
const bodyParser = require('body-parser'); //importing bodyparser
const mongoose = require('mongoose'); //importing mongoose
const port=process.env.PORT || 8003;

const app = express();
app.use(bodyParser.json());  //use body parser for parsing the data
app.use(express.static('public')); // use static file like html css etc..
app.use(bodyParser.urlencoded({
  extended: false
}));
//
//building the connection with database    
mongoose.connect("mongodb://127.0.0.1:27017/form", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connection to MongoDB successful")) //if the connection is succesful
  .catch((err) => console.error("Error connecting to MongoDB:", err));  //if there is error

const db = mongoose.connection;
db.on('error', () => console.error("Error connecting to the database"));
db.once('open', () => console.log("Connected to the database"));

//creating the schemaaa....
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
});

//collection part....
const User = mongoose.model('User', userSchema);
// form that use in frontend 
app.post("/form", (req, res) => {    //action attribute given
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
 
//for new user to store data 
  const newUser = new User({
    username:  username,
    email: email,
    password: password,
  });
  //when new user save the data then redirect to 

  newUser.save()
    .then(() => {
      console.log("User saved successfully");
      return res.redirect('signup.html'); //when new user save the data then redirect to  this page 
    })
    .catch((err) => {
      console.error("Error saving user:", err);
      return res.status(500).send("Error saving user");
    });
});


app.get("/", (req, res) => {
  res.send("Hello from Kaif");
  return res.redirect('hsk.html');
});


app.listen(8003, () => {
  console.log("Server is running on port 3000"); //listening  the port 
});