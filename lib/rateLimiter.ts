import redis from './upstash'; // Import your Upstash Redis setup

const RATE_LIMIT_WINDOW = 60; // 60 seconds
const MAX_REQUESTS = 100; // Max requests per IP per window

export async function rateLimit(key: string): Promise<boolean> {
  const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
  const bucketKey = `rate_limit:${key}:${currentTime}`;

  const count = await redis.incr(bucketKey); // Increment the request count
  if (count === 1) {
    await redis.expire(bucketKey, RATE_LIMIT_WINDOW); // Set expiry for the key
  }

  return count <= MAX_REQUESTS; // Return true if within the limit
}
