const express = require('express')
const routerProductos = require ('./routes/productos.js')

const app = express()
const PORT = process.env.PORT || 8080

app.set("views", "./views")
app.set("view engine", "ejs")

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/', routerProductos)

app.get("/", (req,res)=>{
    res.render('form_producto')
})

app.listen(PORT, ()=>`Server running on PORT ${PORT}`)

