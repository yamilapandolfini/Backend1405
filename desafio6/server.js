const express = require('express')
const handlebars = require('express-handlebars')
const fs = require('fs')
const moment = require('moment')
const {Server: HttpServer} = require('http')
const {Server: IoServer} = require('socket.io')
//const routerProductos = require ('./routes/productos.js')
const mensajes = JSON.parse(fs.readFileSync('./api/mensajes.json'))
const productos = JSON.parse(fs.readFileSync('./api/productos.json'))

const app = express()
const httpServer = new HttpServer(app)
const io = new IoServer(httpServer)

app.use(express.static('public'))

const PORT = process.env.PORT || 8080

app.set("views", "./views")
app.set("view engine", "hbs")

app.use(express.json())
app.use(express.urlencoded({extended:true}))


io.on("connection",(socket)=>{
    console.log(`nuevo cliente conectado ${socket.id}`)

    socket.emit('todos-mensajes', mensajes)
    socket.emit('todos-productos', productos)

    socket.on('mensajeNuevo', (mensaje) =>{
        let nowDate = moment().format('DD/MM/YYYY')
        let nowTime = moment().format('HH:mm:ss')
        mensaje.date = nowDate
        mensaje.time = nowTime
        mensajes.push(mensaje)
        fs.writeFileSync('./api/mensajes.json', JSON.stringify(mensajes))
        io.sockets.emit('cargar-mensajeNuevo', [mensaje])
    })

    socket.on('productoNuevo',(producto)=>{
        producto.id = productos.length + 1
        productos.push(producto)
        console.log("llegue aca")
        fs.writeFileSync('./api/productos.json', JSON.stringify(productos))
        io.sockets.emit('cargar-nuevo-producto',[producto])
    })
})

const server = httpServer.listen(PORT,()=>{
    console.log(`Server Running on port: ${PORT} `)
})

server.on('error', (error)=>{
    console.error(`Error in Server ${error}`)
})


