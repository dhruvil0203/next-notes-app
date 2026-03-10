import Redis from 'ioredis';

const redisUrl = process.env.REDIS_URL || '';

let redis = null;

if (redisUrl) {
    redis = new Redis(redisUrl, {
        retryStrategy(times) {
            if (times > 3) return null; // stop retrying after 3 attempts
            return Math.min(times * 100, 3000);
        },
        maxRetriesPerRequest: 1,
        tls: redisUrl.startsWith('rediss://') ? {} : undefined,
    });

    redis.on('error', (err) => {
        if (err.code !== 'ECONNRESET') {
            console.error('Redis error:', err.message);
        }
    });
}

export const isRedisReady = () => redis && redis.status === 'ready';

export default redis;
