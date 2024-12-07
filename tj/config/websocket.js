import WebSocket, {WebSocketServer} from 'ws';

export async function setupWebsocket () {

        const PORT_SOCKET = 3002;
        const server = new WebSocketServer({port: PORT_SOCKET});

        let sockets = [];

        server.on('connection', (socket) => {
                sockets.push(socket);
                socket.on('message', (msg) => {
                        sockets.forEach(s => s.send(msg));
                });
                socket.on('close', () => {
                        sockets = sockets.filter(s => s !== socket);
                });
        });

        let clients = [
                new WebSocket(`ws://localhost:${PORT_SOCKET}`),
                new WebSocket(`ws://localhost:${PORT_SOCKET}`),
        ];

        clients.map(client => {
                client.on('message', msg => console.log(msg));
        });

        await new Promise(resolve => clients[0].once('open', resolve));
        // clients[0].send('Hello');
}

