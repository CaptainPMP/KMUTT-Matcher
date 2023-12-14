const jwt = require('jsonwebtoken');
const auth = (req, res, next) => {
    // const authHeader = req.headers['authorization']
    // const token = authHeader && authHeader.split(' ')[1]
    console.log("all my cookies: ",req.cookies);
    const token = req.cookies.access_token;
    console.log("token : ", token);
    if(token === null || token === undefined) return res.sendStatus(401)

    // jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    //     if (err) return res.sendStatus(403)
    //     req.user = user
    //     next()
    // })
    jwt.verify(token, token, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}

module.exports = {auth}