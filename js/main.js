//PRIMER PRE-ENTREGA
function bienvenida(){
    let edad = parseInt(prompt("Ingrese su edad."));
    let nombre = prompt("Ingrese su nombre.");
    let respuesta = "";
    let respuestaMin;
    
    //Primero pedimos la edad, luego el nombre. En caso de que sea mayor a 18 años le vamos a dejar entrar a comprar en nuestro sitio web,
    //pero si es menor de 18 años le vamos a decir que necesita la supervisión de un adulto para realizar compras online.
    
    if(edad >= 18){ //Si ingresa que es mayor de 18 años entonces le damos la bienvenida a nuestro sitio web.
            alert("Bienvenido " + nombre + ". Puedes ingresar a ver nuestros productos.");
    } else if (isNaN(edad)){ //Si la edad no corresponde a un número le decimos que no es correcto y le actualizamos la página.
            alert("La edad asignada no corresponde a un numero. Vuelva a intentarlo.");
            actualizarPag();
    } else{ //Por otro lado, si ingresa que es menor de 18 años le decimos que necesita la supervisión de una adulto.
            alert("Bienvenido " + nombre + ". Se necesita la supervisión de un adulto para realizar compras online.")
           
            while(respuestaMin !== 'si'){ //En este ciclo le preguntamos si está con un adulto.
                respuesta = prompt('Si se encuentra bajo la supervisión de un adulto ingrese "Si"'); //Si la respuesta es "si" termina el ciclo y le damos la bienvenida.
                respuestaMin = respuesta.toLowerCase(); //respuestaMin es para convertir el "si" en miniscula y poder compararlo. Evito hacer cada caso de combinación de mayúsculas con minúsculas.

                if(respuestaMin !== 'si'){ //Si la respuesta no es "si" le decimos que llame a un adulto. (Vuelve a empezar el ciclo)
                    alert('Llama a un adulto');
                }
            }
            alert('Bienvenidos, pueden ingresar a ver nuestros productos.') //Cartel de bienvenida que se muestra al terminar el ciclo.
    }

}

function actualizarPag(){ //Función para actualizar o refrescar la página.
    location.reload(); 
}

//Llamo a la función para iniciar
bienvenida();



//SEGUNDA PRE-ENTREGA
//Un arreglo con todos los productos, llevan nombre, precio, imagen y disponibilidad para ser vendido.
const productos = [
    //Mouse
        {nombre: "Mouse Redragon Rgb Centrophorus 2 M601", precio:18500, imagen: "./img/componentes/centrophorus.jpg", vendido: "DISPONIBLE"},
        {nombre: "Mouse Redragon Griffin White", precio:20500, imagen: "./img/componentes/griffin.jpg", vendido: "DISPONIBLE"},
        {nombre: "Mouse Gamer Redragon Impact M908", precio:29200, imagen: "./img/componentes/impact.jpg", vendido: "DISPONIBLE"},
        {nombre: "Mouse Gamer Redragon Cobra Fps M711 Negro", precio:34600, imagen: "./img/componentes/cobra.jpg", vendido: "DISPONIBLE"},
    //Teclados
        {nombre: "Teclado Redragon k618w Horus Fs Wireless White Switch Red SP", precio:89000, imagen: "./img/componentes/horus.jpg", vendido: "DISPONIBLE"},
        {nombre: "Teclado Gamer Redragon Shiva K512 White", precio:39650, imagen: "./img/componentes/shiva.jpg", vendido: "DISPONIBLE"},
        {nombre: "Teclado Redragon Fizz Pro White/Pink k616-Rgb", precio:64550, imagen: "./img/componentes/fizz.jpg", vendido: "DISPONIBLE"},
        {nombre: "Teclado Redragon Horus Mini White K632W-RGB Cable", precio:61150, imagen: "./img/componentes/horusmini.jpg", vendido: "DISPONIBLE"},
    //Auriculares
        {nombre: "Auricular Redragon H260 Hylas RGB Black", precio: 32250, imagen: "./img/componentes/hylas.jpg", vendido: "DISPONIBLE"},
        {nombre: "Auricular Redragon Ire Wireless H848 Blanco Gris", precio: 58950, imagen: "./img/componentes/ire.jpg", vendido: "DISPONIBLE"},
        {nombre: "Auricular Redragon Zeus X PINK RGB", precio: 82600, imagen: "./img/componentes/zeus.jpg", vendido: "DISPONIBLE"},
        {nombre: "Auricular Redragon Pandora 7.1 H350 White Rgb", precio: 53550, imagen: "./img/componentes/pandora.jpg", vendido: "DISPONIBLE"},
    ]

//Función que me permite cargar al html los productos que aparecen en el arreglo.
const contenedorProductos = document.querySelector("#contenedorProductos");

function cargarProductos(){
    productos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("productDiv");
        div.innerHTML = `
                    <img class="productImg" src="${producto.imagen}" alt="${producto.nombre}">
                    <h2>${producto.nombre}</h2>
                    <div class="productInfo">
                        <div>
                            <span>${producto.vendido}</span>
                            <h3>$${producto.precio}</h3>
                        </div>
                        <button>Agregar</button>
                    </div>`;
        contenedorProductos.append(div);
})
}

cargarProductos();


//Función para mostrar la lista de productos //
function mostrarProductos(){
    let mensaje = "Productos disponibles:\n";
    let num = 0;
    productos.forEach((producto, num) => {
    //Estructura del mensaje: Contador. nombre del producto - precio del producto
      mensaje = mensaje + `${num + 1}. ${producto.nombre} - $${producto.precio}\n`;
    });

    alert(mensaje); //Muestra el mensaje (lista de productos completa) //
}

  
//Función para realizar una compra //
function comprar(){
    let carrito = [];
    let continuarComprando = true;
  
    //Mientras continuarComprando sea true, es decir mientras el usuario no ingrese el numero 0 para finalizar la compra el ciclo continua//
    while(continuarComprando){
      mostrarProductos();
      const productoSeleccionado = prompt("Ingrese el número del producto que desea comprar (0 para finalizar la compra):");
      //constante indiceProducto es el numero seleccionado por el usuario pero restado en 1 para que me coincida con la posicion del producto en el arreglo//
      const indiceProducto = parseInt(productoSeleccionado) - 1;
  

      //Si el usuario ingresa 0: continuarComprando lo convierto false y se detiene el ciclo//
      if(productoSeleccionado === "0") {
        continuarComprando = false;
      } 
      //Si el usuario ingresa un número Y el número está contenido entre 0 y el tamaño de la lista de productos//
      else if(!isNaN(indiceProducto) && indiceProducto >= 0 && indiceProducto < productos.length) {
        carrito.push(productos[indiceProducto]); //Entonces hago un push del producto seleccionado dentro del carrito //
        alert(`${productos[indiceProducto].nombre} agregado al carrito.`); //Le digo al usuario que se agrego dicho producto//
      } 
      //Si el número no coincide con nada de lo que especificamos (letras o números fuera del tamaño de la lista) //
      else{
        alert("Por favor, ingrese un número válido.");
      }
    }
  
    //Calcular el total del carrito //
    let total = 0;
    //Basicamente es la suma de cada uno de los productos que hay en el carrito //
    carrito.forEach(producto => {
      total = total + producto.precio;
    });
  
    //Mostrar resumen de la compra//
    let resumenCompra = "Resumen de la compra:\n";
    //A cada elemento del carrito lo voy mostrando con nombre y precio //
    carrito.forEach(producto => {
      resumenCompra = resumenCompra + `${producto.nombre} - $${producto.precio}\n`;
    });
    //Una vez terminado de imprimir todos los elementos del carrito muestro en pantalla el Total de la compra //
    resumenCompra = resumenCompra + `Total: $${total}`;
    
    alert(resumenCompra); //Muestra el resumen de compra //
}
  
//Llamo a la función para iniciar//
comprar();
  