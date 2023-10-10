import http from "http";
import { Server } from "socket.io";

const PORT = 5000;

const server = http.createServer();
server.listen(PORT, () => {
  console.log("Server listenning on port 5000...");
});

const io = new Server(server);
