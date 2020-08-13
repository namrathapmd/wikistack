const express = require('express');
const router = express.Router();
const addPage = require('../views/addPage');
/*
GET	/wiki/	/	retrieve all wiki pages
POST	/wiki/	/
GET	/wiki/add/	/add
*/
//route to wiki
router.get('/', (req, res, next)=>{
  console.log('this is the wiki')
  res.send('this worked')
})

router.post('/', (req, res, next)=>{
  console.log('posting a new wiki page.')
  res.send('this worked')
})

router.get('/add', (req, res, next)=>{
  console.log('place to add a new post.')
  res.send(addPage());
})


module.exports = router;
