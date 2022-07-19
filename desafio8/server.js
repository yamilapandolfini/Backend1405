const express = require('express')
const handlebars = require('express-handlebars')
const fs = require('fs')
const moment = require('moment')
const {Server: HttpServer} = require('http')
const {Server: IoServer} = require('socket.io')
const mariaOption = require('./models/options/mariadb')
const ProductosDB = require('./services/productos')
const MensajesDB = require('./services/mensajes')
const sqlOption = require('./models/options/sqLite.js')


const app = express()
const httpServer = new HttpServer(app)
const io = new IoServer(httpServer)
const dbproductos = new ProductosDB(mariaOption)
const dbmensajes = new MensajesDB(sqlOption)

app.use(express.static('public'))

const PORT = process.env.PORT || 8080

app.set("views", "./views")
app.set("view engine", "hbs")

app.use(express.json())
app.use(express.urlencoded({extended:true}))

try{
    dbproductos.crearTabla();
    dbmensajes.crearTabla();
    console.log('tablaCreada')
}catch(error){
    console.log(error)
}

io.on("connection", async (socket)=>{
    console.log(`nuevo cliente conectado ${socket.id}`)

    const productos = await dbproductos.selectProductos()
    const mensajes = await dbmensajes.selectMensajes()

    socket.emit('todos-mensajes', mensajes)
    socket.emit('todos-productos', productos)

    socket.on('mensajeNuevo', async (mensaje) =>{
        let nowDate = moment().format('DD/MM/YYYY')
        let nowTime = moment().format('HH:mm:ss')
        mensaje.date = nowDate
        mensaje.time = nowTime
        await dbmensajes.inserMensajes(mensaje)
        io.sockets.emit('cargar-mensajeNuevo', [mensaje])
        io.sockets.emit("todos-mensajes",mensajes)
    })

    socket.on('productoNuevo', async (producto)=>{       
        await dbproductos.inserProductos(producto)
        io.sockets.emit('cargar-nuevo-producto',[producto])
        io.sockets.emit("todos-productos",productos)
    })
})

const server = httpServer.listen(PORT,()=>{
    console.log(`Server Running on port: ${PORT} `)
})

server.on('error', (error)=>{
    console.error(`Error in Server ${error}`)
})


