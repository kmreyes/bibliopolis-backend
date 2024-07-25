import { ItemPedido } from "./ItemPedido";
import { Usuario } from "./Usuario"

export class Pedido{
    constructor(
        public id: number,
        public usuario: Usuario,
        public fechaPedido: Date,
        public estado: string,
        public total: number,
        public items: ItemPedido[]

    ){}
}