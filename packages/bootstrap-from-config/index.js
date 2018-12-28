const path = require("path");
const { createActorSystem, addLogInConsole } = require("../core");
const config = require("../../actorz.config.json");

const actorSystem = createActorSystem();
addLogInConsole(actorSystem);

const actorsToSpawn = config.spawn;

actorsToSpawn.forEach(actorToSpawn => {
  const actorFunction = require(path.join("..", actorToSpawn.type));
  actorSystem.spawnActor(
    actorToSpawn.name,
    actorFunction,
    actorToSpawn.options
  );
});
