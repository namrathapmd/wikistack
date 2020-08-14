const express = require('express');
const router = express.Router();
const { Page, User } = require('../models')
const { addPage, editPage, main, userList, userPages, wikiPage } = require('../views');


//localhost:3000/wiki/
router.get('/', (req, res, next) => {
  res.send('this is the wiki homepage')
})


//POST: saves a new page in the database
router.post('/', async (req, res, next) => {
// --------req.body--------- 
// {name: "name-input-field",
// email: "email-input-field",
// title: "title-input-field",
// content: "content-textarea-field",
// status: "select-field"}
// text obtained from the add form page
//----------------------------------
// creates new instance of Page (a new row in Page table) 
// with the above input in the respective columns
  const page = new Page(req.body) 
   try {
      await page.save()
      res.redirect('/')
   } catch (error) { next(error) }
})

//localhost:3000/wiki/add
router.get('/add', (req, res, next) => {
  res.send(addPage()); //diplays this page at /wiki/add
})


//localhost:3000/wiki/:slug
router.get('/:slug', async(req,res,next)=>{
  try {
    const page = await Page.findOne({
      where: {
        slug: req.params.slug
      }
    })
    //console.log('title------>',page.title)
    res.send(wikiPage(page))
  } catch (error) {next(error)}
})

module.exports = router;
