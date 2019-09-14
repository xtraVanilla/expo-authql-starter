module.exports = function(api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            assets: "./assets",
            client: "./client.ts",
            common: "./src/common",
            navigation: "./src/navigation/index.tsx",
            queries: "./src/api/queries/index.ts",
            mutations: "./src/api/mutations/index.ts",
            subscriptions: "./src/api/subscriptions/index.ts",
            auth: "./src/authentication/index.ts"
          }
        }
      ]
    ]
  };
};
