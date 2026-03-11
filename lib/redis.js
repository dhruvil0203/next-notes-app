import Redis from 'ioredis';

const redisUrl = process.env.REDIS_URL || '';

let redis = null;

if (redisUrl) {
    redis = new Redis(redisUrl, {
        retryStrategy(times) {
            if (times > 3) return null;
            return Math.min(times * 100, 3000);
        },
        tls: redisUrl.startsWith('rediss://') ? {} : undefined,
    });

    redis.on('error', (err) => {
        if (err.code !== 'ECONNRESET') {
            console.error('Redis error:', err.message);
        }
    });
}

export default redis;
