function addDestroyListener(actorSystem, listener) {
  // Monkey patching
  const originalDestroyActor = actorSystem.destroyActor;
  actorSystem.destroyActor = function(name) {
    if (listener.willDestroy) listener.willDestroy(name);
    originalDestroyActor(name);
    if (listener.destroyed) listener.destroyed(name);
  };
}

module.exports = addDestroyListener;
