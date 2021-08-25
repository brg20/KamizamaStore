

// Arrays //
let carrito = [];
let carritoJSON = []; //  Carrito con JSON.stringify para guardar en Storage

let total = 0; // almacenar total de precios


// FEATURES DEL BOX DONDE SE MUESTRA EL CARRITO//
const fondoGris = $("#fondoGris"); // Fondo gris detras del box
const boxCarrito = $('#boxCarrito'); // Box carrito

// Icono del carrito //
$("#carritoIcono").on('click', mostrarCarrito);
$("#carritoNumero").on('click', mostrarCarrito);


// OBTENER DATOS DEL LOCAL//
if(localStorage.getItem("carrito") !== null){
    carrito = JSON.parse(localStorage.getItem("carrito"));
    total = parseInt(localStorage.getItem("totalPrecios"));
    $("#carritoNumero").html(carrito.length);
}


// FUNCION PARA AGREGAR UN MANGA AL CARRITO
function agregarManga(idBoton){
    for(item of mangas){
        if(idBoton == item.id){
            item.agregarCarrito();
            item.sumarTotal();
            $("#alerta").append(`<div><i class="fas fa-check"></i> Agregaste:<br>${item.nombre}</div>`)
            $("#alerta div").fadeIn(1000)
                .delay(3000)
                .fadeOut(1000);
            setTimeout(function() { $('#alerta div:first-child').remove();}, 4000);
        }
    }
}


// Funcion para saber cuantas veces se repite el elemento en el carrito //
function contadorCarrito(x){
    let n = 0;
    for(item of carrito){
        if (item.id === x) {
            n++
        }
    }
    return n;
}

// Funcion para devolver carrito limpio sin elementos repetidos //
function devolverCarritoLimpio(){
    let carritoSinRepetidos = [];
    
    for(item of mangas){
        let x = carrito.find(el => el.id === item.id)
        if(typeof x == "undefined"){
        }else{
            carritoSinRepetidos.push(x);
        }
    }
    return carritoSinRepetidos;
}



// MOSTRAR CARRITO AL HACER CLICK SOBRE EL ICONO DEL CARRITO
function mostrarCarrito(){
    let itemsCarritoHTML = "";
    let carritoLimpio = devolverCarritoLimpio(); // Carrito sin items repetidos

    // Crear tabla con cada elemento del carrito y guardarlo en itemsCarritoHTML
    for(let item of carritoLimpio){
        itemsCarritoHTML += `
            <tr>
                <td>${item.nombre}</td>
                <td>ARS$ ${item.precio}</td>
                <td>${contadorCarrito(item.id)}</td>
                <td><button onClick="borrarDelCarrito(${item.id})"><i class="fas fa-trash-alt"></i></button></td>
            </tr>`
    }       

    // Modificar el contenido de la tabla y agregar el itemsCarritoHTML
    if(carrito.length == 0){
        $("#boxCarrito").html(`
            <div class="boxSinItems">
                <i class="fas fa-shopping-cart fa-shopping-cart--sinItems" id="carritoIcono"></i><br>
                <p class="p_sinItems">No hay artículos en el carrito</p>
            </div>
        `);
    }else(
    $("#boxCarrito").html(`
        <div>
            <table>
                <tr>
                    <th>Manga</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th></th>
                </tr>  
                ${itemsCarritoHTML}
                <caption>Total: ARS$ ${total}</caption>
            </table>
            <button id="eliminarTodo" onClick="eliminarTodo()">Eliminar todo</button>
            <a href="compra.html" class="confirmar">Confirmar Compra</a>
        </div>    
    `))
    
    // Habilitar-deshabilitar visibilidad del box el carrito
    fondoGris.fadeIn();
    boxCarrito.slideDown();
}


//Salir del carrito //
fondoGris.on('click', function(){
    boxCarrito.slideUp();
    fondoGris.fadeOut();
})

// BORRAR CARRITO CON BOTON #eliminarTodo EN EL BOX
function eliminarTodo(){
    carrito = [];

    // Actualizar carrito en el Local Storage
    carritoJSON = JSON.stringify(carrito);
    localStorage.setItem("carrito", carritoJSON);

    // Actualizar contador en el icono del carrito
    $("#carritoNumero").html(carrito.length);

    // Actualizar el document
    mostrarCarrito();
    borrarLocalVacio();
}

// BORRAR EL LOCAL STORAGE SI EL KEY carrito ESTA VACIO
function borrarLocalVacio(){
    let x = JSON.parse(localStorage.getItem("carrito"));
    if(x.length == 0){
        localStorage.removeItem("carrito");
        localStorage.removeItem("totalPrecios");
    }
}

// BORRAR ITEM DEL CARRITO Y RESTAR DEL PRECIO
function borrarDelCarrito(e){

    // Restar precios del total y actualizar Local Storage
    for(item of mangas){
        if(e == item.id){
            item.restarTotal();
        }
    }
    
    //Borar items del carrito
    for(let i = carrito.length-1; i>(-1);  i-=1){
        if (carrito[i].id == e) {
            carrito.splice(i, 1); 
        }
    }

    // Actualizar carrito en el Local Storage
    carritoJSON = JSON.stringify(carrito);
    localStorage.setItem("carrito", carritoJSON);

    // Actualizar contador en el icono del carrito
    $("#carritoNumero").html(carrito.length);

    // Actualizar el document con los mangas restantes en el carrito y el total de precios
    mostrarCarrito();
    borrarLocalVacio();
}