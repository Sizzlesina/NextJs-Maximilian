/*
@ In this lecture:
- Create a next.config.js file and :

const {PHASE_DEVELOPMENT_SERVER} = require("next/constants")

module.exports =() => {
  if(phase === PHASE_DEVELOPMENT_SERVER){
    return {
      mongodb_username : ....,
      env : {
      mongodb_password : ....,
      mongodb_clustername : ....,
      mongodb_database : ....,
      },
    };
  };

  ! With a different database 
   return {
    mongodb_username : ....,
     env : {
    mongodb_password : ....,
    mongodb_clustername : ....,
    mongodb_database : ....,
    },
    };
};

! Instead of this method we used a .env.local file for the whole connection string URI
*/
