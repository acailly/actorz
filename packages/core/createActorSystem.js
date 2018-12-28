const destroyMessage = require("./messages/destroy");

function createActorSystem(actorSystemName) {
  const actors = {};

  function spawnActor(actorName, actorFunction, options) {
    try {
      const actorInstance = actorFunction(actorSystem, actorName, options);
      actors[actorName] = actorInstance;
    } catch (e) {
      // TODO ACY Mieux gérer les erreurs ?
      console.error(`Cannot spawn actor ${actorName}:`, e);
    }
  }

  function sendToActor(targetActorName, message, sourceActorName) {
    const targetActorFunction = actors[targetActorName];
    if (targetActorFunction) {
      try {
        targetActorFunction(sourceActorName, message);
      } catch (e) {
        // TODO ACY Mieux gérer les erreurs ?
        console.error(
          `Cannot send message ${message} to actor ${targetActorName}:`,
          e
        );
      }
    } else {
      // TODO ACY Mieux gérer les erreurs ?
      console.error(`Actor not found: ${targetActorName}`);
    }
  }

  // TODO ACY Pas sur de celui la
  // On a besoin d'un destroy parce que les acteurs sont enregistrés et qu'il faut les désenregistrer
  // Si ce n'était pas le cas on aurait pas besoin du destroy
  function destroyActor(actorName, sourceActorName) {
    const actorInstance = actors[actorName];
    if (actorInstance) {
      actorInstance(sourceActorName, destroyMessage);
    }
    actors[actorName] = undefined;
  }

  function destroyAllActors() {
    Object.keys(actors).forEach(actorName =>
      destroyActor(actorName, actorSystemName)
    );
  }

  const actorSystem = {
    name: actorSystemName,
    sendToActor,
    spawnActor,
    destroyActor,
    destroyAllActors
  };

  return actorSystem;
}

module.exports = createActorSystem;
