const http = require("http");
const app = require("./app");
const userSocket = require("./sockets/userSocket");

const server = http.createServer(app);

userSocket(server);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
