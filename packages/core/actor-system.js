const actors = {};

function spawnActor(name, actorFunction) {
  console.log(`[NEW] ${name}`);
  actors[name] = actorFunction;
}

function sendToActor(name, message, sourceActorName) {
  const targetActorFunction = actors[name];
  if (targetActorFunction) {
    console.log(`[SEND] ${sourceActorName} => ${name}`);
    targetActorFunction(sourceActorName, message);
  } else {
    throw new Error("Actor not found:", name);
  }
}

const actorSystem = { sendToActor, spawnActor };

module.exports = actorSystem;
