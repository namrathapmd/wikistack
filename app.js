const express = require('express');
const morgan = require('morgan');

const views = require('./views/main')
const { urlencoded } = require('express');
//don't forget to an app instance of express.
const app = express();
const PORT = 3000;
app.use(morgan('dev'));
//we are service the public folder.
app.use(express.static(__dirname + "/public"));


//if there is an issue with req.body check here.
app.use(urlencoded({
  extended: false
}))



app.get('/', (req, res, next)=>{
console.log('hello world');
res.send(views())

})


app.listen(PORT, ()=>{
  console.log(`listening on PORT ${PORT}`)
})
