import Server from './classes/server';
import router from './routes/router';
import bodyParser from 'body-parser';
import cors from 'cors';

const nombre = "Alberto";

console.log(`Mi nombre es ${nombre}`);

const server = new Server();

// Body parser
server.app.use(bodyParser.urlencoded({extended:true}));
server.app.use(bodyParser.json());

// cors
server.app.use(cors({origin:true,credentials:true}));

// Rutas
server.app.use('/',router);

server.start( ()=> {
    console.log(`Servidor inicializado en el puerto ${server.port}`);
});


