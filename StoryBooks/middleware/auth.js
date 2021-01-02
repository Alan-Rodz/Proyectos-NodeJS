//Middleware is a function that has access to the request and response objects
module.exports = 
{
    //If we already logged in we can move on, else redirect to homepage ('/')
    ensureAuth: function ( req, res, next)
    {
        if(req.isAuthenticated())
        {
            return next()
        }
        else
        {
            res.redirect('/')
        }
    },

    //If we already logged in, we cant go to login page but rather we get redirected to dashboard
    ensureGuest: function(req, res, next)
    {
        if(req.isAuthenticated())
        {
            res.redirect('/dashboard')
        }
        else
        {
            return next()
        }
    }
}