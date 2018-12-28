const path = require("path");
const createActorSystem = require("./createActorSystem");
const addLogInConsole = require("./util/addLogInConsole");
const config = require("../../actorz.config.json");

const actorSystem = createActorSystem();
addLogInConsole(actorSystem);

const actorsToSpawn = config.spawn;

actorsToSpawn.forEach(actorToSpawn => {
  const actorImplementation = require(path.join("..", actorToSpawn.type));
  actorSystem.spawnActor(
    actorToSpawn.name,
    actorImplementation(actorSystem, actorToSpawn.name)
  );
});
