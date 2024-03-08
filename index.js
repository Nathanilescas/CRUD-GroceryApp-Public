import net from 'net';


const port = 3000;
const server = net.createServer((socket) => {
    console.log("Connection establish: " + socket.remoteAddress)
    
    socket.on()
});



server.listen(port, () => console.log("listening"));