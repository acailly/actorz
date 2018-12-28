const createActorSystem = require("./createActorSystem");
const destroyMessage = require("./messages/destroy");
const addSendListener = require("./util/addSendListener");
const addSpawnListener = require("./util/addSpawnListener");
const addDestroyListener = require("./util/addDestroyListener");
const addLogInConsole = require("./util/addLogInConsole");

module.exports = {
  createActorSystem,
  destroyMessage,
  addSendListener,
  addSpawnListener,
  addDestroyListener,
  addLogInConsole
};
