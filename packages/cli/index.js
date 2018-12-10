const inquirer = require("inquirer");

const questions = [
  {
    type: "input",
    name: "message",
    message: "message (<targetActorName>:<messageBody>):"
  }
];

function ask(actorSystem, myName) {
  inquirer.prompt(questions).then(answers => {
    if (answers.message !== "exit") {
      const targetActorName = answers.message.substr(
        0,
        answers.message.indexOf(":")
      );
      const messageBody = answers.message.substr(
        answers.message.indexOf(":") + 1
      );
      actorSystem.sendToActor(targetActorName, messageBody, myName);
      ask(actorSystem, myName);
    }
  });
}

module.exports = function(actorSystem, myName) {
  ask(actorSystem, myName);
  return function(sourceActorName, message) {};
};
