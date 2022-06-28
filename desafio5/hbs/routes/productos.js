const express = require ('express');

const routerProductos = express.Router()

const productos = [];

module.exports = routerProductos.get('/productos',(req,res)=>{
    if(productos.length == 0){
        res.send({error: "no hay productos cargados"}) 
    }else{
        res.render("lista_productos", {productos:productos})
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
    res.redirect("/productos")
})

