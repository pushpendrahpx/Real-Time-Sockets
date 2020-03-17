var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://user:user@cluster0-m1e66.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});


app.listen(80);

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
const Cat = mongoose.model('Cat', { name: String });
Cat.find((e,ss)=>{
    console.log(ss)
})
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
            socket.emit('ne',{chats:chats});
        });

        
        console.log('Your Data Saved !!')
    console.log("\n Time - ",m-n)
   } );
    
   
  })
});