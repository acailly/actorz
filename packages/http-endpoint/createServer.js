const http = require("http");
const url = require("url");

function createServer({ port, actorSystem }) {
  return http
    .createServer(function(req, res) {
      if (req.method === "POST") {
        const parsedUrl = url.parse(req.url);

        let body = "";
        req.on("data", function(chunk) {
          body += chunk;
        });

        req.on("end", function() {
          res.writeHead(200);
          res.end();

          const path = parsedUrl.pathname;
          const payload = JSON.parse(body);

          if (path === "/send") {
            const { targetActorName, message, sourceActorName } = payload;
            actorSystem.sendToActor(targetActorName, message, sourceActorName);
            return;
          } else if (path === "/spawn") {
            const { actorName, actorFunction, options } = payload;
            actorSystem.spawnActor(actorName, actorFunction, options);
            return;
          } else if (path === "/destroy") {
            const { actorName, sourceActorName } = payload;
            actorSystem.destroyActor(actorName, sourceActorName);
            return;
          } else if (path === "/destroyAllActors") {
            actorSystem.destroyAllActors();
            return;
          }
        });
      } else {
        res.statusCode = 404;
        res.end(`${parsedUrl} not found!`);
      }
    })
    .listen(parseInt(port));
}

module.exports = createServer;
