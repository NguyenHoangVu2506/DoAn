
const FacebookStrategy = require('passport-facebook').Strategy;
const UserService = require("../services/UserService")
module.exports = (
    passport
)=>{
    passport.use(
        new FacebookStrategy(
            {
                clientID: process.env.FACEBOOK_CLIENT_ID,
                clientSecret: process.env.FACEBOOK_SECRET_KEY,
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
    
}
