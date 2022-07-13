const fs = require('fs')
const moment = require("moment")

module.exports = class Carrito {
    constructor() {
        try {
            fs.readFileSync('./filesystem/carritos.json');
        } catch (error) {
            fs.writeFileSync('./filesystem/carritos.json', JSON.stringify([]));
        }
    }

    listar(id){
        let listadoCarrito = JSON.parse(fs.readFileSync('./filesystem/carritos.json'));
        return listadoCarrito;
    }

    crearCarrito(){
        let listadoCarrito = JSON.parse(fs.readFileSync('./filesystem/carritos.json'));
        let nowDate = moment().format('DD/MM/YYYY');
        let nowTime = moment().format('HH:mm:ss');
        let fecha = nowDate + ' ' + nowTime;
        let newCarrito = {
            id : listadoCarrito.length + 1,
            timestamp : fecha,
            productos : []
        }
        listadoCarrito.push(newCarrito)
        fs.writeFileSync('./filesystem/carritos.json',JSON.stringify(listadoCarrito))
        return `Nuevo Carrito creado con ID: ${newCarrito.id}`

    }

    borrarCarrito (id){
        let listadoCarrito = JSON.parse(fs.readFileSync('./filesystem/carritos.json'));
        let indice = listadoCarrito.findIndex(f => f.id == id);
        if(indice != -1){
            listadoCarrito.splice(indice, 1);
            fs.writeFileSync('./filesystem/carritos.json', JSON.stringify(listadoCarrito))
            return {msg: `El carrito con ID ${id} fue borrado`}
        }else{
            return {msg: 'ID de carrito no encontrado'}
        }
    }

    listarProductosCarrito (id){
        let listadoCarrito = JSON.parse(fs.readFileSync('./filesystem/carritos.json'));
        let indice = listadoCarrito.findIndex(f => f.id == id);
        if(indice != -1){
            let listadoProductosCarrito = listadoCarrito[indice]
            
            return listadoProductosCarrito.productos
        } else {
            return {msg: 'ID de carrito no encontrado'}
        }
    }

    agregarProducto (idCarrito, idProducto){
        let listadoCarrito = JSON.parse(fs.readFileSync('./filesystem/carritos.json'));
        let listadoProductos = JSON.parse(fs.readFileSync('./filesystem/productos.json'));
        let nowDate = moment().format('DD/MM/YYYY');
        let nowTime = moment().format('HH:mm:ss');
        let fechaUpdated = nowDate + ' ' + nowTime;
        let indiceCarrito = listadoCarrito.findIndex(f => f.id == idCarrito);
        let indiceProducto = listadoProductos.findIndex(x => x.id == idProducto);
        if(indiceCarrito != -1){
            if(indiceProducto != -1){
                listadoCarrito[indiceCarrito].productos.push(listadoProductos[indiceProducto])
                listadoCarrito[indiceCarrito].timestamp = fechaUpdated
                fs.writeFileSync('./filesystem/carritos.json', JSON.stringify(listadoCarrito))
                return {msg: 'Producto agregado al carrito'}
            } else {
                return {msg: 'Producto no encontrado'}
            }
        } else {
            return {msg: 'Carrito no encontrado'}
        }
    }

    borrarProdCarrito (idCarrito, idProducto){
        let listadoCarrito = JSON.parse(fs.readFileSync('./filesystem/carritos.json'));
        let nowDate = moment().format('DD/MM/YYYY');
        let nowTime = moment().format('HH:mm:ss');
        let fechaUpdated = nowDate + ' ' + nowTime;
        let indiceCarrito = listadoCarrito.findIndex(f => f.id == idCarrito);
        if(indiceCarrito != -1){
            let productosEnCarrito = listadoCarrito[indiceCarrito].productos
            let indiceProducto = productosEnCarrito.findIndex(x => x.id == idProducto);
            listadoCarrito[indiceCarrito].productos.splice(indiceProducto, 1);
            listadoCarrito[indiceCarrito].timestamp = fechaUpdated
            fs.writeFileSync('./filesystem/carritos.json', JSON.stringify(listadoCarrito))
            return {msg: 'Producto eliminado del carrito'}
        }else{
            return {msg: 'Carrito no encontrado'}
        }
    }
}