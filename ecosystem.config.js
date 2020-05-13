module.exports = {
  apps: [
    {
      name: 'core-user',
      script: './dist/index.js',
      watch: false,
      instances: 'max',
      exec_mode: 'cluster',
      merge_logs: true,
      env_production: { NODE_ENV: 'production' },
    },
  ],
};
