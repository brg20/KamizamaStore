let datos=[]; // Array de productos desde stock.json//
let mangas = []; // mangas//


// GET stock.json
let url = "stock.json"
$.getJSON(url, function(response, state){
    if(state == "success"){
        datos = response;

        // GUARDAR datos EN EL ARRAY managas CON SUS ATRIBUTOS Y FUNCIONES
        for(let item of datos){
            managas.push(new Manga(item.id, item.nombre, item.tomo, item.precio, item.imagen));
        }

        //GUARDAR ARRAY mangas EN EL LOCAL STORAGE
        let mangasJSON = JSON.stringify(mangas);
        localStorage.setItem("data", mangasJSON);

        // AGREGAR mangaS AL DOCUMENT
        for(let el of datos){
            $("#mangasDOM").append(
                `<div class="manga">
                    <div class="imagen_manga">
                        <img src="${el.imagen}" alt="${el.nombre}">
                    </div>
                    <div class="descripcion_manga">
                        <p class="descripcion_manga--nombre">${el.nombre}</p>
                        <p class="descripcion_manga--tomo">${el.tomo}</p>
                        <p class="descripcion_manga--precio">$ARS ${el.precio}</p>
                        <button onClick="agregarJuego(${el.id})">Agregar</button>
                    </div>
                </div>`
            );
        };
    }
});

//para construir objetos dentro del array mangas
function Manga(id, nombre, tomo, precio, imagen){
    this.id = parseInt(id);
    this.nombre = nombre;
    this.tomo = tomo;
    this.precio = parseInt(precio);
    this.imagen = imagen;
    
    this.agregarCarrito = function(){
        carrito.push(new Manga(this. id, this.nombre, this.tomo, this.precio, this.imagen));
        
        //Actualizar en el Local Storage
        carritoJSON = JSON.stringify(carrito);
        localStorage.setItem("carrito", carritoJSON);

        // Numero de items en el icono del carrito
        $("#carritoNumero").html(carrito.length);
    }   

    // Sumar el total de precios
    this.sumarTotal = function(){
        total += this.precio;
        
        // Actualizar el total de precios en el Local Storage
        localStorage.setItem("totalPrecios", total);
    }

    // Restar del total de precios
    this.restarTotal = function(){
        total = total - (this.precio * contadorCarrito(this.id));
        
        // Actualizar el total de precios en el Local Storage
        localStorage.setItem("totalPrecios", total);
    }
}
