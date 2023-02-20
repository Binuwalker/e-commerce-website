const sendToken = (user, statusCode, res) => {

    //Creating JWToken
    const token = user.getJWToken();

    //Setting Cookies
    const options = {
        expires: new Date(Date.now() + process.env.COOKIES_EXPIRES_TIME *24 *60 *60 *1000),
        httpOnly: true,
    }


    res.status(statusCode)
    .cookie("token", token, options)
    .json({
        success: true,
        token,
        user
    })

}

module.exports = sendToken;