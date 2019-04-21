var config = {
    connectionString: process.env.CONNECTION_STRING,
    tokenSecret: process.env.TOKEN_SECRET,
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
    email: process.env.EMAIL,
    password: process.env.PASSWORD
}

module.exports = config;