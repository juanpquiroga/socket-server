import express from 'express';
import { SERVER_PORT } from '../globals/environment';
import socketIO from "socket.io";
import http from 'http';
import * as socket from '../sockets/sockets';

export default class Server {
    private static _instance: Server;
    public app: express.Application;
    public port: number;
    public io: socketIO.Server;
    public httpServer: http.Server;

    private constructor() {
        this.app = express();
        this.port = SERVER_PORT;

        // inicializar IO
        // Funciona sobre httpServer
        this.httpServer = new http.Server(this.app);
        this.io = socketIO(this.httpServer);

        this.escucharSockets();
    }

    public static get instance() {
        return this._instance || (this._instance = new this());
    }

    private escucharSockets(){
        console.log('Escuchar sockets');
        this.io.on('connection', client => {
            console.log('Cliente conectado', client.id );
            socket.conectarCliente(client);
            socket.desconectar(client);
            socket.mensaje(client, this.io);
            socket.configurarUsuario(client, this.io);
        });
        
    }

    start( callback: Function ){
        this.httpServer.listen(this.port,callback);
    }
}