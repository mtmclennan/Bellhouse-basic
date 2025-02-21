module.exports = {
  apps: [
    {
      name: "Bellhouse",
      script: "npm",
      args: "start",
      cwd: "./",
      watch: false,
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
