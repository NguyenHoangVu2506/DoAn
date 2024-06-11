passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: GOOGLE_CALLBACK_URL,
      },
      async function (accessToken, refreshToken, profile, cb) {
  
        const user = await RPCRequest("CUSTOMER_RPC", {
          type: "FIND_CUSTOMER_BY_ID_AND_PROVIDER",
          data: {
            customer_account_id: profile.id,
            customer_provider: profile.provider,
            customer_email: profile.emails[0].value
          }
        })
        if (!user) {
          console.log('Adding new google user to DB..');
          const newCustomer = await RPCRequest("CUSTOMER_RPC", {
            type: "NEW_CUSTOMER_WITH_SOCIAL",
            data: {
              customer_account_id: profile.id,
              customer_name: profile.displayName,
              customer_provider: profile.provider,
              customer_email: profile.emails[0].value,
              customer_avatar: profile.photos[0].value
            }
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