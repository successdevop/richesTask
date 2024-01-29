const http = require("http");
const index = require("fs").readFileSync("./index.html");

const server = http.createServer((req, res) => {
  let url = req.url;
  if (url === "/") {
    res.end(index);
    return;
  }
  if (url === "/about") {
    res.end(`${require("fs").readFileSync("./about.html")}`);
    return;
  }
  if (url === "/contact") {
    res.end(`${require("fs").readFileSync("./contact.html")}`);
    return;
  }

  res.end(`${require("fs").readFileSync("./pageNotFound.html")}`);
});

server.listen(5000, () => {
  console.log(`Server listening at port : 5000`);
});
