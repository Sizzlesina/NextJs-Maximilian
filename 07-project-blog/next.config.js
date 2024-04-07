const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        mongodb_username: "sina",
        mongodb_password: "0DISV90IAIrIt4Zf",
        mongodb_clustername: "cluster0",
        mongodb_database: "blog",
      },
    };
  }

  return {
    env: {
      mongodb_username: "sina",
      mongodb_password: "0DISV90IAIrIt4Zf",
      mongodb_clustername: "cluster0",
      mongodb_database: "blog-dev",
    },
  };
};
