const http = require("http");
var fs = require("fs");
const port = process.env.PORT || 8000;
// var path = require("path");
// var guestsPath = path.join(__dirname, "guests.json");

var server = http.createServer(function (req, res) {
  if (req.method === "GET" && req.url === "/pets") {
    fs.readFile("../pets.json", "utf8", function (err, petsJSON) {
      if (err) {
        console.error(err);

        res.statusCode = 404;

        res.setHeader("Content-Type", "text/plain");

        res.end("Internal Server Error");
      } else {
        res.statusCode = 200;

        res.setHeader("Content-Type", "application/javascript");
        console.log(`pets complete: ${petsJSON}`);
        res.end(petsJSON);
      }
    });
  } else if (req.method === "GET" && req.url === "/pets/0") {
    fs.readFile("../pets.json", "utf8", function (err, data) {
      if (err) {
        console.error(err);

        res.statusCode = 404;

        res.setHeader("Content-Type", "text/plain");

        res.end("Internal Server Error");
      } else {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/javascript");

        let array = JSON.parse(data);
        let pet0 = array[0];
        console.log(pet0);
        res.end(`pets/0`);
      }
    });
  } else if (req.method === "GET" && req.url === "/pets/1") {
    fs.readFile("../pets.json", "utf8", function (err, data) {
      if (err) {
        console.error(err);

        res.statusCode = 404;

        res.setHeader("Content-Type", "text/plain");

        res.end("Internal Server Error");
      } else {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/javascript");

        let array = JSON.parse(data);
        let pet1 = array[1];
        console.log(pet1);
        res.end(`pets/1`);
      }
    });
  } else if (
    (req.method === "GET" && req.url === "/pets/2") ||
    (req.method === "GET" && req.url === "/pets/-1")
  ) {
    res.statusCode = 404;

    res.setHeader("Content-Type", "text/plain");

    res.end("Internal Server Error");
  }
});

server.listen(port, function () {
  console.log("Listening on port", port);
});
