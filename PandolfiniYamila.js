class Usuario{
    constructor(nombre, apellido, libros, mascotas){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros ;
        this.mascotas = mascotas;
    }

    getFullName(){
        let nombreCompleto = this.nombre +" "+this.apellido;
        console.log(`${nombreCompleto}`);
    }

    addMascota(mascota){
        let nuevaMascota = mascota;
        this.mascotas.push(nuevaMascota);
    }

    countMascota(){
        let cantidadMascotas = this.mascotas.length;
        console.log(cantidadMascotas);
    }

    addBook(book,autor){
        let libroNuevo = {
            nombre: book,
            autor: autor,
        }
        this.libros.push(libroNuevo);
    }

    getBooks(){
        let listaLibros = this.libros.map (a => a.nombre)
        console.log(listaLibros);
    }
}

let usuario = new Usuario ("Laura"," No Esta",[{nombre:"La Magia del Orden", autor:"Marie Kondo"}], ["perro"]);


usuario.getFullName();
usuario.addMascota("gato");
usuario.countMascota();
usuario.addBook("harry Potter","Jk Rowling");
usuario.addBook("El Elemento","Ken Robinson");
usuario.getBooks();


