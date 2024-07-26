import { Body, Controller, Delete, Get, Param, Post, Res } from '@nestjs/common';
import { Usuario } from 'src/models/Usuario';
import { UsuariosService } from './usuarios.service';
import { Response } from 'express';

@Controller('usuarios')
export class UsuariosController {

    constructor( private readonly servicio: UsuariosService){}

    @Post()
    crearUsuario(@Body() usuario: Usuario, @Res() res: Response){
        const user = this.servicio.crearUsuario(usuario);
        if(user){
            res.status(201).send();
        }else{
            res.status(400).send({error: 'Ya existe un usuario con el correo ingresado'});
        }
    }

    @Get(':id')
    obtenerUsuarioPorId(@Param('id') id: number, @Res() res: Response){
        const usuario = this.servicio.obtenerUsuarioPorId(id);
        if (usuario){
            res.status(200).send(usuario);
        } else {
            res.status(404).send({error: 'Usuario no existe'});
        }
    }

    @Get()
    obtenerUsuarios(){
        return this.servicio.obtenerUsuarios();
    }

    @Delete(':id')
    eliminarUsuarioPorId(@Param('id') id: number){
        this.servicio.eliminarUsuarioPorId(id);
    }

}
