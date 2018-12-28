function addSendListener(actorSystem, listener) {
  // Monkey patching
  const originalSendToActor = actorSystem.sendToActor;
  actorSystem.sendToActor = function(name, message, sourceActorName) {
    if (listener.willSend) listener.willSend(name, message, sourceActorName);
    originalSendToActor(name, message, sourceActorName);
    if (listener.sent) listener.sent(name, message, sourceActorName);
  };
}

module.exports = addSendListener;
