import ratelimiter from "../config/upstash.js";

const rateLimiter= async function rateLimiter(req, res, next) {
    try {
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        const result = await ratelimiter.limit(ip);
        const {success}= await ratelimiter.limit("my-rate-limit")

        if (!success) {
            return res.status(429).json({ error: 'Too many requests, please try again later.' });
        }

        next();
    } catch (error) {
        console.error('Rate limiter error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

   
}       

 export default rateLimiter;