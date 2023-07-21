const jwt = require("jsonwebtoken")

const verifyIsLoggedIn = (req, res, next) => {
    try {
        // next()
        // return  // to ignore the down code to:do remove later
        const token = req.cookies.auth_token
        if (!token) {
            return res.status(403).send("A token is required for authentication")
        }
        try {
            // verifying correct secret key from cookie 
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
            req.user = decoded
            // console.log(decoded)
            // assigns the decoded payload to req.user of all
            // the routes under it
            next()

        } catch (error) {
            return res.status(401).send("unauthorized. invalid token")
        }

        // next()
    } catch (error) {
        next(error)
    }
}

const verifyIsAdmin = async(req,res,next)=>{
    try{
        // next()
        // return  // to ignore the down code  to:do remove later
        if(req.user && req.user.isAdmin) {
            next()
        } else {
            return res.status(401).send("Unauthorized. Admin required")
        }
    }catch(err){
        next(err)
    }
}

module.exports = { verifyIsLoggedIn,verifyIsAdmin }