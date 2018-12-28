function addSpawnListener(actorSystem, listener) {
  // Monkey patching
  const originalSpawnActor = actorSystem.spawnActor;
  actorSystem.spawnActor = function(name, actorFunction) {
    if (listener.willSpawn) listener.willSpawn(name, actorFunction);
    originalSpawnActor(name, actorFunction);
    if (listener.spawned) listener.spawned(name, actorFunction);
  };
}

module.exports = addSpawnListener;
