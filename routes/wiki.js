const express = require('express');
const router = express.Router();
const { Page, User } = require('../models')
const { addPage, editPage, main, userList, userPages, wikiPage } = require('../views');


//localhost:3000/wiki/
router.get('/', async (req, res, next) => {
  try {
    const allpages = await Page.findAll()
    console.log(allpages)
    res.send(main(allpages))
  } catch (error) {
      console.log(error)
  }
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
   try {
      const [user, wasCreated] = await User.findOrCreate({
        where: {
          name: req.body.name,
          email: req.body.email
        }
      })

      const page = new Page(req.body)
      await page.save()  //save the page
      //after the page is saved, connect the page to the user by setting the page's authorid
      await page.setAuthor(user)  
      
      res.redirect(`/wiki/${page.slug}`)
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
    res.send(wikiPage(page))
  } catch (error) {next(error)}
})

module.exports = router;
