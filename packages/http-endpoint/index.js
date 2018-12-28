const { destroyMessage } = require("../core");
const createServer = require("./createServer");

module.exports = function(actorSystem, myName, options) {
  const server = createServer({
    port: options.port,
    actorSystem
  });
  return function(sourceActorName, message) {
    if (message === destroyMessage) {
      server.close();
    }
  };
};
