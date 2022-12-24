import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config()

const fetchuser = (req, res, next) => {
    //Get the user from the JWT Token and add id to request object
    const token = req.header('auth-token');
    if(!token) {
        res.status(401).send('Access Denied!');
    } 
    try {
        const data = jwt.verify(token, process.env.JWT_SECRET);
        req.user = data.user;
        next();
        
    } catch (error) {
        res.status(401).send('Access Denied!');
    }
}

export default fetchuser;