$(mostrarCarritoCompra);

// Funcion para mostrar mangas en compra.html
function mostrarCarritoCompra(){
    let itemsCarritoHTML = "";
    let carritoLimpio = devolverCarritoLimpio(); // Carrito sin items repetidos

    // Crear tabla con cada elemento del carrito y guardarlo en itemsCarritoHTML
    for(let item of carritoLimpio){
        itemsCarritoHTML += `
            <tr>
                <td>${item.nombre}</td>
                <td>${item.tomo}</td>
                <td>ARS$ ${item.precio}</td>
                <td>${contadorCarrito(item.id)}</td>
                <td><button onClick="borrarCompra(${item.id})"><i class="fas fa-trash-alt"></i></button></td>
            </tr>`    
    }

    $("#compraBox div").html(`
        <table class="table_compra" id="tableCompra">
            <tr>
                <th>Manga</th>
                <th>Tomo</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th></th>
            </tr>
            ${itemsCarritoHTML}
        </table>
        
        `);
}

// BORRAR ITEM DEL CARRITO Y RESTAR DEL PRECIO
function borrarCompra(e){

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
    mostrarCarritoCompra();
    borrarLocalVacio();
}

mostrarCarritoCompra();