function addSpawnListener(actorSystem, listener) {
  // Monkey patching
  const originalSpawnActor = actorSystem.spawnActor;
  actorSystem.spawnActor = function(name, actorFunction, options) {
    if (listener.willSpawn) listener.willSpawn(name, actorFunction, options);
    originalSpawnActor(name, actorFunction, options);
    if (listener.spawned) listener.spawned(name, actorFunction, options);
  };
}

module.exports = addSpawnListener;
