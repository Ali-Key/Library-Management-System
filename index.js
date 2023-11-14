import server from "./api/index.js";

const port = 4000;

const hostname = "localhost";

server.listen(port, hostname, () => {
  console.log(
    `*============ Server running at http://${hostname}:${port}/ ============*`
  );
});
