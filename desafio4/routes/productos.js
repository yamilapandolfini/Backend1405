const express = require ('express');

const routerProductos = express.Router()

const productos = [];

module.exports = routerProductos.get('/',(req,res)=>{
    if(productos.length == 0){
        res.send({error: "no hay productos cargados"}) 
    }else{
        res.send(productos)
    }
    
})

module.exports = routerProductos.get('/:id',(req,res)=>{
    let index = parseInt(req.params.id)
    let productoBuscado = productos.filter(x => x.id === index)
    if(productoBuscado.length == 0){
        res.send({error: "no encontramos el producto"}) 
    }else{
        res.send(productoBuscado)
    }
})

module.exports = routerProductos.post('/',(req,res)=>{
    let nuevoProducto = {
        'title': req.body.title,
        'price': req.body.price,
        'thumbnail': req.body.thumbnail,
        'id': productos.length + 1
    }

    productos.push(nuevoProducto)
    res.send(nuevoProducto)
})

module.exports = routerProductos.put('/:id',(req,res)=>{
    let indexModificar = parseInt(req.params.id)
    let productoModificado = productos.filter(x=> x.id === indexModificar)

    productoModificado = req.body
    productos[req.params.id -1] = productoModificado

    res.send("Producto Actualizado")

})
module.exports = routerProductos.delete('/:id',(req,res)=>{
    let indexBorrar = parseInt(req.params.id)
    let indiceaRemover = productos.findIndex(x=> x.id === indexBorrar)
    if(indiceaRemover != -1){
        productos.splice(indiceaRemover, 1)
        res.send("Producto borrado correctamente")
    }else{
        res.send({error : "Producto invalido"})
    }  
})
