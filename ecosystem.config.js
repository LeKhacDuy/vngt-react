// PM2 chay thang next start, khong qua lop npm + sh.
// Nho vay PM2 giam sat dung tien trinh next-server va tu khoi dong lai duoc khi no chet.
module.exports = {
  apps: [{
    name: 'vngt-web',
    cwd: '/code/vngt-new',
    script: './node_modules/next/dist/bin/next',
    args: 'start -H 127.0.0.1',
    exec_mode: 'fork',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '600M',
    env: {
      NODE_ENV: 'production',
      NODE_OPTIONS: '--max-old-space-size=400',
      HOSTNAME: '127.0.0.1',
      PORT: 3000
    }
  }]
};
