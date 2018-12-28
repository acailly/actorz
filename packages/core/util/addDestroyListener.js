function addDestroyListener(actorSystem, listener) {
  // Monkey patching
  const originalDestroyActor = actorSystem.destroyActor;
  actorSystem.destroyActor = function(name, sourceActorName) {
    if (listener.willDestroy) listener.willDestroy(name, sourceActorName);
    originalDestroyActor(name, sourceActorName);
    if (listener.destroyed) listener.destroyed(name, sourceActorName);
  };
}

module.exports = addDestroyListener;
