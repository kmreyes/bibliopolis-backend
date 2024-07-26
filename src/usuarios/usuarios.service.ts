import { Injectable } from '@nestjs/common';
import { Usuario } from 'src/models/Usuario';
import { UsuarioDTO } from 'src/models/UsuarioDTO';

@Injectable()
export class UsuariosService {
    private usuarios: Usuario[] = [];
    private usuariosSinPassword: UsuarioDTO[] = [];

    verificarUsuarioUnico(usuario: Usuario): boolean{
        for(let i: number = 0; i < this.usuarios.length; i++){
            if(usuario.correoElectronico == this.usuarios[i].correoElectronico){
                return false;
            }
        }return true;
    }

    crearUsuario(usuario: Usuario): Usuario{
        if(this.verificarUsuarioUnico(usuario)){
            usuario.id = this.usuarios.length + 1;
            this.usuarios.push(usuario);
            const usuarioDTO = new UsuarioDTO(usuario.id, usuario.nombre, usuario.correoElectronico, usuario.direccion, usuario.historialPedidos); 
            this.usuariosSinPassword.push(usuarioDTO);
            return usuario;
        }else{
            return null;
        }
    }

    obtenerUsuarioPorId(id: number): UsuarioDTO{
        for(let i: number = 0; i < this.usuariosSinPassword.length; i++){
            if(this.usuariosSinPassword[i].id == id){
                return this.usuariosSinPassword[i];
            }
        }
        return null;
    }

    obtenerUsuarios(): UsuarioDTO[]{
        return this.usuariosSinPassword;
    }

    eliminarUsuarioPorId(id: number): void{
        for(let i: number = 0; i < this.usuarios.length; i++){
            if(this.usuarios[i].id == id){
                this.usuarios.splice(i-1, 1);
            }
        }
        for(let i: number = 0; i < this.usuariosSinPassword.length; i++){
            if(this.usuariosSinPassword[i].id == id){
                this.usuariosSinPassword.splice(i-1, 1);
            }
        }
    }

}
