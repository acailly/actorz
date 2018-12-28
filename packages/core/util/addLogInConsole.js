const addSendListener = require("./addSendListener");
const addSpawnListener = require("./addSpawnListener");
const addDestroyListener = require("./addDestroyListener");

function addLogInConsole(actorSystem) {
  addSendListener(actorSystem, {
    willSend: (name, message, sourceActorName) =>
      console.log(`[SEND] ${sourceActorName} => ${name} :`, message)
  });

  addSpawnListener(actorSystem, {
    willSpawn: (name, actorFunction, options) =>
      console.log(`[SPAWN] ${name} with options`, options)
  });

  addDestroyListener(actorSystem, {
    willDestroy: name => console.log(`[DESTROY] ${name}`)
  });
}

module.exports = addLogInConsole;
