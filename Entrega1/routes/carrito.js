const express = require('express')
const Carrito = require('../controller/carrito')
const routerCarrito = express.Router()

routerCarrito.get('/:id?', (req, res) => {
    let listaCarritos = new Carrito().listar(req.params.id)
    res.send(listaCarritos)
})

routerCarrito.post('/', (req, res) => {
    let nuevoCarrito = new Carrito().crearCarrito()
    res.send(`Nuevo carrito creado con ID: ${nuevoCarrito}`);
})

routerCarrito.delete('/:id', (req, res) => {
    let borrarCarrito = new Carrito().borrarCarrito(req.params.id)
    res.send(borrarCarrito)
})

routerCarrito.get('/:id/productos', (req, res) => {
    let productosCarrito = new Carrito().listarProductosCarrito(req.params.id)
    res.send(productosCarrito)
})

routerCarrito.post('/:id/productos', (req, res) => {
    let productoAgregar = new Carrito().agregarProducto(req.params.id, req.body.id)
    res.send(productoAgregar)
})

routerCarrito.delete('/:id/productos/:id_prod', (req, res) => {
    let productoBorrar = new Carrito().borrarProdCarrito(req.params.id, req.params.id_prod)
    res.send(productoBorrar)
})


module.exports = routerCarrito
