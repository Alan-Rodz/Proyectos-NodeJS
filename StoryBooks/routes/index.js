//Bring in express
const express = require('express')
const router = express.Router()

//Already logged in / not logged in already control
const { ensureAuth, ensureGuest } = require('../middleware/auth')

//Bring in the story model
const Story = require('../models/Story')

//@desc Login / landing page
//@route GET / 
router.get('/', ensureGuest, (req, res)=>
{
    //Looks for the template/view login.hbs
    res.render('login',
    {
        layout: 'login',
    })
})

//@desc Dashboard
//@route GET /dashboard
router.get('/dashboard', ensureAuth, async (req, res)=>
{
    //Retrieve stories
    try 
    {
        const stories = await Story.find({user:req.user.id}).lean()
        //Looks for the template / view dashboard.hbs
        res.render('dashboard', 
        {
            name: req.user.firstName,
            stories
        })
    } 
    catch (error) 
    {
        console.error(error)
        res.render('error/500')
    }
})

module.exports = router