module.exports = {
    apps: [{
        name: "vngt-web",
        script: "npm",
        args: "start",
        env: {
            NODE_ENV: "production",
            PORT: 3000
        }
    }]
}
