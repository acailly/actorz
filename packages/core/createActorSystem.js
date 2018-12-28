function createActorSystem() {
  const actors = {};

  function spawnActor(name, actorFunction) {
    actors[name] = actorFunction;
  }

  function sendToActor(name, message, sourceActorName) {
    const targetActorFunction = actors[name];
    if (targetActorFunction) {
      targetActorFunction(sourceActorName, message);
    } else {
      // TODO ACY Mieux gérer les erreurs ?
      throw new Error(`Actor not found: ${name}`);
    }
  }

  // TODO ACY Pas sur de celui la
  // On a besoin d'un destroy parce que les acteurs sont enregistrés et qu'il faut les désenregistrer
  // Si ce n'était pas le cas on aurait pas besoin du destroy
  function destroyActor(name) {
    actors[name] = undefined;
  }

  const actorSystem = { sendToActor, spawnActor, destroyActor };

  return actorSystem;
}

module.exports = createActorSystem;
