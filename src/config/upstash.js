import { Redis } from '@upstash/redis'
import{Ratelimit} from '@upstash/ratelimit'
import "dotenv/config";
//const redis = Redis.fromEnv()

const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
  //url: "https://fond-mutt-24629.upstash.io",
  //token: "AWA1AAIjcDEwMDMwYzJhYWUxMjI0ZmJjYWYxNjczMGI2YWQ1NTA3YnAxMA",
  limiter:Ratelimit.slidingWindow(4,"60 s"),
});

export default ratelimit;

//await redis.set("foo", "bar");
//await redis.get("foo");