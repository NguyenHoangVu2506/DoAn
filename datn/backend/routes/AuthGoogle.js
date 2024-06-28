const express = require("express");
const router = express.Router();
const passport = require("passport");
const UserService = require("../services/UserService");
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const dotenv = require('dotenv');
dotenv.config();

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL,
        },
        async function (accessToken, refreshToken, profile, cb) {
            const User_Service = new UserService()

            const user = await User_Service.finduserByIdAndProvider({
                user_account_id: profile.id,
                user_provider: profile.provider, user_email: profile.emails[0].value
            })
            if (!user) {
                console.log('Adding new google user to DB..');
                const newCustomer = await User_Service.newCustomerWithSocial({
                    user_account_id: profile.id,
                    user_name: profile.displayName,
                    user_provider: profile.provider,
                    user_email: profile.emails[0].value,
                    user_avatar: profile.photos[0].value
                })
                console.log('newcustomer:', newCustomer)
                return cb(null, profile);
            } else {
                console.log('Google User already exist in DB..');
                console.log(profile);
                return cb(null, profile);
            }
        }
    )
);
router.get('/', passport.authenticate('google', { scope: ['profile', 'email'] })
);
router.get(
    '/callback',
    (req, res, next) => {
        passport.authenticate('google', (err, profile) => {
            req.user = profile
            next()
        })(req, res, next)
    }, (req, res) => {
        res.redirect(`http://localhost:3000/login-success/${req.user?.id}/${req.user?.provider}`); // Successful authentication, redirect success.
    }
    //http://localhost:3000/login-success/117700183914595727289/google 
);
router.post('/login-success', async (req, res) => {
    const { userId, provider } = req.body
     console.log(req.body)
    const User_service = new UserService
    
    const user = await User_service.loginWithSocial({
        user_account_id: userId,
        user_provider: provider
    })
    user ? res.status(200).send({ message: 'Login success', metaData: user })
        : res.status(500).send({ message: "Login not success" })
});


 module.exports=router