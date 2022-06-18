const contenedor = require ('./contenedor');

const express = require ('express');
const fs = require('fs');

const app = express();
const contenedorproductos = new contenedor('productos');

const PORT =8080;
const server = app.listen(PORT,()=>{
    console.log(`Listening on PORT ${PORT}`)
})

app.get('/',(req,res)=>{
    res.send("Main Page");
});

app.get('/productos',async(req,res)=>{
    try{
        let productList = await contenedorproductos.getAll();
        res.send(productList);
    }catch(error){
        res.send(error);
    }

})

app.get('/productoRandom',async(req,res)=>{

    let data = await contenedorproductos.getAll();
    let totalproductos = data.length -1;
    let random = parseInt(Math.random()*(totalproductos-0+1)+0)
    let randomprod = data[random];
    let show ={
        "item": randomprod
    }
    res.send(show)
})



