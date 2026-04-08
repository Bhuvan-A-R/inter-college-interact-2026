import { Redis } from '@upstash/redis';

// Replace with your Upstash REST API URL and Token
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!, // Add this to your .env file
  token: process.env.UPSTASH_REDIS_REST_TOKEN!, // Add this to your .env file
});

export default redis;
