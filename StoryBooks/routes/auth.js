//Bring in express
const express = require('express')
const router = express.Router()

//Bring in passport
const passport = require('passport')

//@desc Authenticate with google
//@route GET /auth/google 
router.get('/google', passport.authenticate('google', { scope: ['profile']}))

//@desc Google Auth callback
//@route GET /auth/google/callback
router.get('/google/callback', passport.authenticate('google', {failureRedirect:'/'}), 
(req, res)=>
{
    res.redirect('/dashboard')
})

//@desc Logout user
//@route /auth/logout
router.get('/logout', (req, res)=>
{
    req.logout()
    res.redirect('/')
})

module.exports = router