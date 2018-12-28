const { destroyMessage } = require("../core");
const createServer = require("./createServer");

module.exports = function(actorSystem, myName, options) {
  const server = createServer({ port: options.port, folder: options.folder });
  console.log(`Server listening on port ${options.port}`);
  return function(sourceActorName, message) {
    if (message === destroyMessage) {
      server.close(() => console.log("Server closed"));
    }
  };
};
