const fs = require('fs')
const moment = require('moment')

module.exports = class Producto{
    constructor(){
        try{
            fs.readFileSync('./filesystem/productos.json')
        } catch(error){
            fs.writeFileSync('./filesystem/productos.json',JSON.stringify([]))
        }
    }

    listar(id){
        let listadoProductos = JSON.parse(fs.readFileSync('./filesystem/productos.json'))
        if(!id){
            return listadoProductos
        }else{
            let productoBuscado = listadoProductos.filter(x=>x.id === parseInt(id))
            return productoBuscado
        }
    }
    
    buscarProducto(id){
        let listadoProductos = JSON.parse(fs.readFileSync('./filesystem/productos.json'))
        let indice = listadoProductos.findIndex(f => f.id == id);
        if(indice != -1){
            return listadoProductos[indice]
        }else{
            return {msg: `ID de producto no encontrado`}
        }
    }

    crear({nombre,descripcion,codigo,foto,precio,stock}){
        let listadoProductos = JSON.parse(fs.readFileSync('./filesystem/productos.json'))
        let nowDate = moment().format('DD/MM/YYYY');
        let nowTime = moment().format('HH:mm:ss');
        let fecha = nowDate + ' ' + nowTime;
        listadoProductos.push({
            id: listadoProductos.length + 1,
            timestamp: fecha,
            nombre,
            descripcion,
            codigo,
            foto,
            precio,
            stock
        })
        fs.writeFileSync('./filesystem/productos.json',JSON.stringify(listadoProductos))
        return listadoProductos[listadoProductos.length-1].id;
    }

    actualizar({id,nombre,descripcion,codigo,foto,precio,stock}){
        let listadoProductos = JSON.parse(fs.readFileSync('./filesystem/productos.json'))
        let nowDate = moment().format('DD/MM/YYYY');
        let nowTime = moment().format('HH:mm:ss');
        let fecha = nowDate + ' ' + nowTime;
        if(listadoProductos.find(f => f.id == id)){
            let producto_edit = listadoProductos.find(f => f.id == id);
            let indice = listadoProductos.findIndex(f => f.id == id);
            producto_edit.timestamp = fecha;
            producto_edit.nombre = nombre;
            producto_edit.descripcion = descripcion;
            producto_edit.codigo = codigo;
            producto_edit.foto = foto;
            producto_edit.precio = precio;
            producto_edit.stock = stock;
            listadoProductos[indice] = producto_edit;
            fs.writeFileSync('./filesystem/productos.json',JSON.stringify(listadoProductos));
            return{msg: `el Producto con ID ${id} fue actualizado`}
        }else{
            return {msg: `ID de producto no encontrado`};
        }
    }

    borrar(id){
        let listadoProductos = JSON.parse(fs.readFileSync('./filesystem/productos.json'));
        let indice = listadoProductos.findIndex(f=> f.id ==id);
        if(indice != -1){
            listadoProductos.splice(indice,1);
            fs.writeFileSync('./filesystem/productos.json',JSON.stringify(listadoProductos))
            return {msg: `el Producto con ID ${id} fue eliminado`}
        }else{
            return{msg: `ID de producto no encontrado`}
        }
    }

}

