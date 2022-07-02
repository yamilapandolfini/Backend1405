const express = require ('express');
const productos = require ('../api/productos');
const path = require ('path')

const routerProductos = express.Router()


module.exports = routerProductos.get('/productos',(req,res)=>{
    if(productos.listaProductos.length == 0){
        res.send({error: "no hay productos cargados"}) 
    }else{
        res.render("lista_productos", {productos:productos.listaProductos})
    }
    
})

module.exports = routerProductos.post('/productos',(req,res)=>{
    let nuevoProducto = {
        'title': req.body.title,
        'price': req.body.price,
        'thumbnail': req.body.thumbnail,
        'id': productos.listaProductos.length + 1
    }

    productos.listaProductos.push(nuevoProducto)
    res.redirect("/productos")
})

