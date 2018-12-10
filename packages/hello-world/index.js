module.exports = function(actorSystem, myName) {
  console.log("Hello World!");
  return function(sourceActorName, message) {
    console.log("Hello", message);
  };
};
