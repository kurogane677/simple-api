const WebSocket = require("ws");
const User = require("../models/user");

const userSocket = (server) => {
  const wss = new WebSocket.Server({ server });

  wss.on("connection", (ws) => {
    console.log("Client connected");

    ws.on("message", async (message) => {
      const data = JSON.parse(message);

      if (data.type === "getUsers") {
        const users = await User.findAll();
        ws.send(JSON.stringify({ type: "usersList", users }));
      }
    });

    ws.on("close", () => {
      console.log("Client disconnected");
    });
  });
};

module.exports = userSocket;
