const path = require("path");
const actorSystem = require("./actor-system");
const config = require("../../actorz.config.json");

const actorsToSpawn = config.spawn;

actorsToSpawn.forEach(actorToSpawn => {
  const actorImplementation = require(path.join("..", actorToSpawn.type));
  actorSystem.spawnActor(
    actorToSpawn.name,
    actorImplementation(actorSystem, actorToSpawn.name)
  );
});
