var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');
const express = require("express");

const apps = express();

let data =  require('./posts.json');


const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://user:user@cluster0-m1e66.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});

// const admin = require('firebase-admin');
// const functions = require('firebase-functions');

// admin.initializeApp(functions.config().firebase);

// let db = admin.firestore();
// let docRef = db.collection('users').doc('alovelace');

// let setAda = docRef.set({
//   first: 'Ada',
//   last: 'Lovelace',
//   born: 1815
// });
// let aTuringRef = db.collection('users').doc('aturing');

// let setAlan = aTuringRef.set({
//   'first': 'Alan',
//   'middle': 'Mathison',
//   'last': 'Turing',
//   'born': 1912
// });

// db.collection('users').get()
//   .then((snapshot) => {
//     snapshot.forEach((doc) => {
//       console.log(doc.id, '=>', doc.data());
//     });
//   })
//   .catch((err) => {
//     console.log('Error getting documents', err);
//   });


const Post = mongoose.model('Post',
{
  "id": String,
  "page_id": Number,
  "name": String,
  "message": String,
  "description": String,
  "caption": String,
  "post_type": String,
  "status_type": String,
  "likes_count": Number,
  "comments_count": Number,
  "shares_count": Number,
  "love_count": Number,
  "wow_count": Number,
  "haha_count": Number,
  "sad_count": Number,
  "thankful_count": Number,
  "angry_count": Number,
  "link":String,
  "picture":String,
  "posted_at": String
});

console.log("\n\n Going to Start PORT = 80 \n\n");
bodyParser = require('body-parser');
apps.use('/something',express.static('index.html'))
// support parsing of application/json type post data
apps.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
apps.use(bodyParser.urlencoded({ extended: true }));


apps.listen(80);

apps.get('/search/:term',(req,res)=>{
  console.log("Got A Request")
  console.log(req.params)
  console.log(req.body)
  let { term } = req.params;

Post.find({ name:  {$regex: term} }).limit(10).exec( function (err, docs) { 
  res.status(200).json(docs);
  console.log("Throws")
});




})

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}
// const Cat = mongoose.model('Cat', { name: String });
// Cat.find((e,ss)=>{
//     console.log(ss)
// })
io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    // console.log(data);
  });

  socket.on('logout',(data)=>{
    console.log(data.my)
    var d = new Date();
    var n = d.getTime();
    console.log("\n Time - ",n)
   
    const kitty = new Cat({ name: data.my });
    
    kitty.save().then(() =>{
        
    var e = new Date();
    var m = e.getTime();
        Cat.find((err,chats)=>{
            console.log(chats)
            io.emit('ne',{chats:chats});
        });

        
        console.log('Your Data Saved !!')
    console.log("\n Time - ",m-n)
   } );
    
   
  })
});