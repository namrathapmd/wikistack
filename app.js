const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path')
const methodOverride = require('method-override')

const { db, Page, User } = require('./models');
const wikiRouter = require('./routes/wiki');
const userRouter = require('./routes/users')

const main = require('./views/main');

const app = express(); //creates an express app

//middleware
app.use(morgan('dev')); //logging middleware
app.use(methodOverride('_method')); // configure methodOverride to look for '_method'
app.use(express.static(path.join(__dirname + "./public"))); //serves static files in public folder
app.use(bodyParser.urlencoded({extended: false})); //helps in parsing req.body
app.use(bodyParser.json()); 

app.use('/wiki', wikiRouter); //any request under /wiki, use the wiki.js
app.use('/users', userRouter); //any request under /user use the users.js

//redirect requests coming into localhost 3000 to /wiki
app.get('/', (req, res, next)=>{ 
res.redirect('/wiki');
})


const PORT = 3000;
const init = async () => {
  try {
    //await Page.sync();
    //await User.sync();
    await db.sync()

    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}!`);
    });
  }
  catch(error) {console.log(error)}
}
init();
