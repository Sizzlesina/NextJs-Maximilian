const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        mongodb_username: "nextAuth",
        mongodb_password: "Pqp3alyBophwbBOK",
        mongodb_clustername: "cluster0",
        mongodb_database: "auth-demo",
      },
    };
  }

  return {
    env: {
      mongodb_username: "nextAuth",
      mongodb_password: "Pqp3alyBophwbBOK",
      mongodb_clustername: "cluster0",
      mongodb_database: "auth",
    },
  };
};
