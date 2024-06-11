const express = require("express");
const router = express.Router();
const passport = require("passport");
const UserService = require("../services/UserService");
const FacebookStrategy = require('passport-facebook').Strategy;
const dotenv = require('dotenv');
dotenv.config();


passport.use(
    new FacebookStrategy(
        {
            clientID: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
            callbackURL: process.env.FACEBOOK_CALLBACK_URL,
        },
        async function (accessToken, refreshToken, profile, cb) {

            const User_Service = new UserService()

            const user = await User_Service.finduserByIdAndProvider({ user_account_id: profile.id, user_provider: profile.provider })

            if (!user) {
                console.log('Adding new facebook user to DB..');
                const newCustomer = await User_Service.newCustomerWithSocial({ user_account_id: profile.id, user_provider: profile.provider, user_name: profile.displayName })
                console.log('newcustomer:', newCustomer)
                return cb(null, profile);
            } else {
                console.log('Facebook User already exist in DB..');
                console.log(profile);
                return cb(null, profile);
            }
        }
    )
);
router.get('/', passport.authenticate('facebook', { scope: 'email' }))

router.get('/callback', (req, res, next) => {
    passport.authenticate('facebook', (err, profile) => {
        req.user = profile
        next()
    })(req, res, next)
}, function (req, res) {
    res.redirect(`http://localhost:3000/login-success/${req.user?.id}/${req.user?.provider}`);
});

router.post('/login-succsess', async (req, res) => {
    const { userId, provider } = req.body
    const User_service = new UserService
    const user = await User_service.loginWithSocial({
        user_account_id: userId,
        user_provider: provider
    })
    user ? res.status(200).send({ message: 'Login success', metaData: user })
        : res.status(500).send({ message: "Login not success" })

})

module.exports = router