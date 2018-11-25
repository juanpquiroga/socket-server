import { Socket, Server } from "socket.io";
import { UsuariosLista } from '../classes/usuarios-lista';
import { Usuario } from '../classes/usuario';

export const usuariosConectados:UsuariosLista =  new UsuariosLista();

export const conectarCliente = (client:Socket) => {
    let usuario: Usuario = new Usuario( client.id );
    usuariosConectados.agregar( usuario );
};

export const desconectar = (cliente:Socket) => {
    cliente.on('disconnect',() => {
        console.log('Cliente desconectado');
        usuariosConectados.borrarUsuario(cliente.id);    
    });
};

export const mensaje = (cliente:Socket, io: Server) => {
    cliente.on('mensaje', (payload?: {de: string, cuerpo: string},callback?) => {
        console.log('Mensaje recibido ', payload);

        io.emit('mensaje-nuevo', payload );
    });
}

export const configurarUsuario = (cliente:Socket, io: Server) => {
    cliente.on('configurar-usuario', (payload: {nombre: string},callback: Function) => {
        console.log('Configurar usuario recibido ', payload);
        usuariosConectados.actualizarNombre(cliente.id,  payload.nombre);
        callback({
            ok: true,
            mensaje: `Usuario ${payload.nombre} configurado`
        });
    });
}
