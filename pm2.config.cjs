module.exports = {
  apps: [
    {
      name: 'vite-app',
      script: 'npm',
      args: 'run dev -- --host',
      env: {
        NODE_ENV: 'development',
      },
    },
  ],
};

