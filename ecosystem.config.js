module.exports = {
    apps: [
        {
            name: 'vngt-web',
            script: 'npm',
            args: 'start',
            instances: 1, // Chạy 1 instance để tiết kiệm RAM trên VPS nhỏ
            autorestart: true,
            watch: false,
            max_memory_restart: '800M', // Restart nếu chiếm quá 800MB RAM
            env: {
                NODE_ENV: 'production',
                PORT: 3000,
            },
        },
    ],
};
