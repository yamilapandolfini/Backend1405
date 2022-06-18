const fs = require('fs');

class Contenedor{

    constructor(fileName){
        this.file = fileName;
        this.nameFile = this.file + '.txt';
        this.productos = []
    }

    async save(aName, aPrice, aThumbnail){
        let rFile;

        try{
           rFile = await fs.promises.readFile(__dirname + '/' + this.nameFile, 'utf-8');
        }
        catch(error){
            console.log("Error, el archivo no existe!");
        }

        if(rFile.length==0){
            let newProduct = {
                "title": aName,
                "Price": aPrice,
                "thumbnail" : aThumbnail,
                "id": this.productos.length + 1,
            }
            this.productos.push(newProduct);
    
            try{
                await fs.promises.writeFile(__dirname + '/' + this.nameFile, JSON.stringify(this.productos,null,'\t'));
                console.log("Producto agregado .. Su id es: " ,newProduct.id);
            }
            catch(error){
                console.log("Error, no se pudo escribir archivo");
            }

        }else{
            this.productos = JSON.parse(rFile);
            let newProduct = {
                "title": aName,
                "Price": aPrice,
                "thumbnail" : aThumbnail,
                "id": this.productos.length + 1,
            }
            this.productos.push(newProduct);
    
            try{
                await fs.promises.writeFile(__dirname + '/' + this.nameFile, JSON.stringify(this.productos,null,'\t'));
                console.log("Producto agregado .. Su id es: " ,newProduct.id);
            }
            catch(error){
                console.log("Error, no se pudo escribir archivo");
            }
        }

    }
    

    async getById(idSearch){
        let rFile;
        let productList;

        try{
           rFile = await fs.promises.readFile(__dirname + '/' + this.nameFile, 'utf-8');
        }
        catch(error){
            console.log("Error, el archivo no existe!");
        }

        productList = JSON.parse(rFile);
        
        let searchId =  productList.find(x => x.id === idSearch);
        
        if(searchId == undefined){
            console.log("null");
        }else{
            console.log(searchId);
        }
    }

    async getAll(){
        let rFile;
        let productList;

        try{
           rFile = await fs.promises.readFile(__dirname + '/' + this.nameFile, 'utf-8');
        }
        catch(error){
            console.log("Error, el archivo no existe!");
        }

        productList = JSON.parse(rFile);
        return productList;   
    }


    async deleteById(id){
        let rFile;
        let productList;

        try{
           rFile = await fs.promises.readFile(__dirname + '/' + this.nameFile, 'utf-8');
        }
        catch(error){
            console.log("Error, el archivo no existe!");
        }

        productList = JSON.parse(rFile);
        
        let indexProduc =  productList.findIndex(function(o){
            return o.id === id;
        })

        if(indexProduc !== -1){
            productList.splice(indexProduc,1);
            
        }

        try{
            await fs.promises.writeFile(__dirname + '/' + this.nameFile, JSON.stringify(productList,null,'\t'));
        }
        catch(error){
            console.log("Error, no se pudo eliminar el producto del archivo");
        }

        console.log(productList);

    }

    async deleteAll () {
        try {
            await fs.promises.writeFile(__dirname + '/' + this.archivo,'');
            console.log("Los productos se eliminaron correctamente del archivo");
        }
        catch (error) {
            console.log("Error!!, no se pudo borrar contenido del archivo");
        }
    }

}

//let test = new Contenedor("productos");


module.exports = Contenedor;