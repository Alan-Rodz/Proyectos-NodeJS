//Bring GoogleOAuth20 module
const GoogleStrategy = require('passport-google-oauth20').Strategy

//Bring in mongoose
const mongoose = require('mongoose')

//Bring the user model in
const User = require('../models/User')

//We retrieve the passport object we're getting from app.js
module.exports = function(passport)
{
    //Create our google strategy
    passport.use(new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: '/auth/google/callback'
        },
        
        //Async await since were working with mongoose
        async(accessToken, refreshToken, profile, done) => 
        {
            //Create a new user object
            const newUser = 
            {
                googleId: profile.id,
                displayName: profile.displayName,
                firstName: profile.name.givenName, 
                lastName: profile.name.familyName, 
                image: profile.photos[0].value
            }

            try 
            {
                //See if the user exists
                let user = await User.findOne({googleId: profile.id})
                if(user)
                {
                    done(null, user)
                }
                //If there is no user we create one
                else
                {
                    user = await User.create(newUser)
                    done(null, user)
                }
            } 
            catch (error) 
            {
                console.error(error)
            }


        } 
    ))

    passport.serializeUser((user, done) =>
    {
        done(null, user.id)
    })

    passport.deserializeUser((id, done) =>
    {
        User.findById(id, (err, user) =>
        {
            done(err, user)
        })
    })

}