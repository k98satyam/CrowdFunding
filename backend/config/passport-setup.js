const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20')
require('dotenv').config()
const User = require("../models/user.model")

passport.serializeUser((user,done) => {
    done(null,user.id)
})

passport.deserializeUser((id,done) => {
    User.findById(id)
        .then((user) => {
            done(null,user)
        })
})

//google
passport.use(
    new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRETE,
        callbackURL: '/auth/google/redirect'
    }, (accessToken, refreshToken, profile, done) => {
        // console.log(profile)
        User.findOne({ appId : profile.id })
            .then(currentUser => {
                if(currentUser) {
                    //if user already exists
                    console.log("already Exist Google : " + currentUser)
                    done(null,currentUser)
                }
                else {
                    //add new user
                    const user = new User({
                        username : profile.displayName,
                        appId : profile.id,
                        thumbnail : profile._json.picture,
                        appName : "Google"
                    })
                    user.save()
                        .then((newUser) => { 
                            console.log("New User Google" + newUser)
                            done(null,newUser)
                        })
                        .catch(err => console.log(err))
                }
            })
    })
)