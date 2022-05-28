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
        console.log(productList);   
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

let test = new Contenedor("productos");


///////////Tests///////////

/*Funcion Save*/
test.save("Remera",3000,"https://d3ugyf2ht6aenh.cloudfront.net/stores/454/305/products/calaca-andando-en-skate-blanca1-41c3504688c5a86c2e15124616671543-1024-1024.gif");
test.save("Patines",2500,"https://phantom-marca.unidadeditorial.es/d51d0a4ad3a33596caf9f3517ebc81fa/crop/0x78/1000x639/resize/1320/f/jpg/assets/multimedia/imagenes/2021/05/31/16224732603005.jpg");
test.save("Bicicleta",4500,"https://i.pinimg.com/originals/a0/92/57/a09257e284b0040ad926b52b2c54e85e.png");
test.save("Monopatin",3500,"http://d3ugyf2ht6aenh.cloudfront.net/stores/001/245/791/products/718e032a-238d-42be-9830-d470019ae09a-78dd77bf4cb874088c16232991142539-640-0.jpg");
test.save("Pecera",3000,"https://d3ugyf2ht6aenh.cloudfront.net/stores/454/305/products/calaca-andando-en-skate-blanca1-41c3504688c5a86c2e15124616671543-1024-1024.gif");

/*Funcion getAll*/

test.getAll();

/*Funcion getById*/

test.getById(3);

/*Funcion deleteById*/

test.deleteById(2);

/*Funcion deleteAll*/

test.deleteAll();