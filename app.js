const express = require('express');
const morgan = require('morgan');
const { db, Page, User } = require('./models')
const wikiRoute = require('./routes/wiki');
const views = require('./views/main')
const { urlencoded } = require('express');
//don't forget to an app instance of express.
const app = express();
const PORT = 3000;
app.use(morgan('dev'));
//we are service the public folder.
app.use(express.static(__dirname + "/public"));
app.use('/wiki', wikiRoute);

//if there is an issue with req.body check here.
app.use(urlencoded({
  extended: false
}))

db.authenticate()
  .then(() => {
    console.log('connected to the database');
  })

app.get('/', (req, res, next)=>{
res.redirect('/wiki');
res.send(views())
})


const init = async () => {
  try {
    await Page.sync();
    await User.sync();
    // make sure that you have a PORT constant
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}!`);
    });
  }
  catch(error) {console.log(error)}
}
init();
