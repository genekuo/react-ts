import * as express from "express";
import * as path from "path";
import { Server } from "ws";

const app = express();

// Http Server
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../simple-ws-client.html')));

const httpServer = app.listen(8080, "localhost", () => {
        console.log(`HTTP server is listening on localhost:8080`);
});

// WebSocket Server
const wsServer = new Server({port: 8085});
console.log(`WebSocket Server is listening on localhost:8085`);

wsServer.on('connection', wsClient => {
    wsClient.send('This message is pushed by the WebSocket server');
    wsClient.onerror = (error) => console.log(`The server received" ${error['code']}`);
})
