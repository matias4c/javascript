//ENTREGA FINAL
let productos = [];
let productoFiltrado = [];

//cargamos el arreglo de productos
fetch('js/productos.json')
    .then(res => res.json())
    .then(data => {
        productos = data;
        productoFiltrado = productos;
        cargarProductos(productos)
    })

//Función que me permite cargar en html los productos que aparecen en el arreglo.
const contenedorProductos = document.querySelector("#contenedorProductos");

//Lo uso en dos intancias: una al cargar la pagina, y la otra al hacer click sobre los filtros (se ejecuta la funcion cuantas veces toque los filtros)
function cargarProductos(e){
    contenedorProductos.innerHTML = "";
    e.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("productDiv");
        div.innerHTML = `
                    <img class="productImg" src="${producto.imagen}" alt="${producto.nombre}">
                    <h2 class="productoNombre">${producto.nombre}</h2>
                    <div class="productInfo">
                        <div>
                            <span>${producto.vendido}</span>
                            <h3 class="productoPrecio">$${producto.precio}</h3>
                        </div>
                        <button class="boton-agregar" id="${producto.id}">Agregar</button>
                    </div>`
        contenedorProductos.append(div);
        //cada vez que se llame a la funcion para actualizar la carga de productos, se actualizan los botones.
        //Esto es para que el evento de click funcione en estos nuevos botones de productos cargados, sino el evento se queda solo en los botones de los productos que cargue por primera vez.
        actualizarBotones();
})
}
cargarProductos(productos);


//Funcion para mostrar carrito
function abrirCarrito(){
    document.getElementById('contenedorCarrito').style.display = 'flex';
}

//Funcion para ocultar carrito
function cerrarCarrito(){
    document.getElementById('contenedorCarrito').style.display = 'none';
}

//Evento al presionar la tecla ESC (se cierra el carrito)
document.addEventListener('keydown', function(event){
    if (event.key === "Escape") {
    cerrarCarrito();
}});



//Trabajando en el carrito

//Funcion que me actualiza los botones a los cuales voy a poder hacer click para luego ejecutar la funcion agregarCarrito
function actualizarBotones(){
    const botonesAgregar = document.querySelectorAll('.boton-agregar');
    
    //Evento al hacer click sobre el boton "Agregar"
    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarCarrito);
    });
}
actualizarBotones();

function cartelAgregadoCarrito(){
    Toastify({
        text: "Producto agregado a tu carrito",
        duration: 1000,
        newWindow: false,
        close: false,
        gravity: "top", 
        position: "right",
        stopOnFocus: false,
        style: {
          background: "linear-gradient(to right, #00b09b, #86b437)",
        }
    }).showToast();
}

function cartelQuitadoCarrito(){
    Toastify({
        text: "Producto eliminado de tu carrito",
        duration: 1000,
        newWindow: false,
        close: false,
        gravity: "top", 
        position: "right",
        stopOnFocus: false,
        style: {
          background: "linear-gradient(to right, #dc143c, #dd2748, #de3654)",
        }
    }).showToast();
}

//Funcion que agrega los productos al array productosCarrito, y despues lo muestra en html con otra funcion
let productosCarrito;

function agregarCarrito(e){
  //toma el id del boton que presiono
  const idBoton = e.currentTarget.id;
  //guardo en una constante el objeto (con todas sus propiedades) cuyo id coincide con el del boton presionado
  const productoAgregado = productos.find(producto => producto.id === idBoton);

  //Si ya existe el producto en el arreglo del carrito entonces...
  if(productosCarrito.some(elem => elem.id === idBoton)){
    //guardo en una constante la posicion del producto en el array
    const indexProducto = productosCarrito.findIndex(producto => producto.id === idBoton);
    //y le sumo 1 en cantidad (propiedad del objeto)
    productosCarrito[indexProducto].cantidad++;
  } else { //sino existe el producto en el array del carrito entonces...
    //al producto que estoy por agregar le sumo 1 en cantidad
    productoAgregado.cantidad = 1;
    //y lo mando con un push dentro del array del carrito
    productosCarrito.push(productoAgregado);
  }

  //si el tamaño del array es distinto de cero (es decir que tiene objetos)
  if(productosCarrito.length !== 0){
    //muestro en pantalla el boton flotante del carrito
    botonFlotante.style.display = 'flex';
  }
  
  actualizarNumeroCarrito();
  mostrarEnCarrito();
  actualizarLocalStorage();
  cartelAgregadoCarrito();
}


//selecciono los divs (por medio de sus ids) contenidos en .contenidoCarrito y los almaceno en una constante cada uno
const carritoVacio = document.querySelector('#carritoVacio');
const carritoConProductos = document.querySelector('#carritoConProductos');
const carritoPrecioTotal = document.querySelector('#carrito-boton-total');

//Funcion que me muestra en html los productos seleccionados (guardados en el array: productosCarrito) 
function mostrarEnCarrito(){
  //si el arreglo productoCarrito tiene al menos un objeto (no es vacio) entonces...
  if(productosCarrito){
      //oculto el div con texto e imagen que se muestra cuando esta vacio
      carritoVacio.classList.add('disabled');
      //muestro el div que contiene los productos
      carritoConProductos.classList.remove('disabled');
      //muestro el div que contiene el total del precio y botones (vaciar carrito - finalizar compra)
      carritoPrecioTotal.classList.remove('disabled');
      //resetear el contenido del html
      carritoConProductos.innerHTML = '';

      //por cada producto dentro del carrito arma lo siguiente:
      productosCarrito.forEach(producto => {
          const div = document.createElement("div");
          div.classList.add("carritoElement");
          div.innerHTML =`
              <div><img class="elementImg" src="${producto.imagen}" alt="${producto.nombre}"></div>
              <div class= "elementInfo">
                  <div class="elementInfoHijo">
                      <p>${producto.nombre}</p>
                      <p><small>${producto.cantidad} x </small>  <span>$${producto.precio}</span></p>
                  </div>
              </div>
              <button id="${producto.id}" class="boton-eliminar-producto"><i class='bx bx-trash'></i></button>`;
          carritoConProductos.append(div);
       });
      //llamo a totalFinal() para que se actualice el precio total (suma de todos los productos actualemte en el carrito) 
      totalFinal();
  }else{ //si no hay objetos en el arreglo productoCarrito (array vacio)
    //muestro el div con texto e imagen que aparece cuando el carrito esta vacio
    carritoVacio.classList.remove('disabled');
    //oculto el div que contiene los productos (cuando los hay)
    carritoConProductos.classList.add('disabled');
    //oculto el div que muestra el precio total y los botones (vaciar carrito - finalizar compra)
    carritoPrecioTotal.classList.add('disabled');
  }

  //guardo en una constante todos los botones del icono basura para eliminar productos
  const botonesEliminar = document.querySelectorAll('.boton-eliminar-producto');
  //para cada uno le damos el evento al hacer click, que llama a la funcion eliminarProducto()
  botonesEliminar.forEach(boton => {
      boton.addEventListener('click', eliminarProducto);
  });
}

//Funcion que hace la suma del precio total del carrito
function totalFinal(){
    //inicio el precio en cero
    let totalPrecio = 0;
    const total = document.querySelector('#total');

    //tomo la variable totalPrecio y por cada producto le sumo su precio multiplicado por su cantidad
    productosCarrito.forEach(producto => {
        totalPrecio += producto.precio * producto.cantidad;
    });

    //muestro el precio total con un textContent
    total.textContent = '$' + totalPrecio;
    //si el precio es cero (no hay productos en el carrito) entonces...
    if(totalPrecio === 0){
    //muestro el div con texto e imagen que aparece cuando el carrito esta vacio
    carritoVacio.classList.remove('disabled');
    //oculto el div que contiene los productos (cuando los hay)
    carritoConProductos.classList.add('disabled');
    //oculto el div que muestra el precio total y los botones (vaciar carrito - finalizar compra)
    carritoPrecioTotal.classList.add('disabled');
    }
}
//Evento al hacer click sobre boton de "Finalizar compra"
const botonComprar = document.querySelector('.carritoBotonComprar');

botonComprar.addEventListener('click', () => {
    cerrarCarrito();
    vaciarCarritoEntero();
})

//Evento al hacer click sobre boton de "Vaciar carrito"
//al presionar el botonVaciar
const botonVaciar = document.querySelector('.carritoBotonVaciar');

botonVaciar.addEventListener('click', () => {
    Swal.fire({
        title: '¿Estás seguro de vaciar todo el carrito?',
        icon: 'warning',
        iconColor: 'red',
        showCancelButton: true,
        confirmButtonText: 'Sí, seguro',
        cancelButtonText: 'No, no quiero'
        }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
            title: 'Productos removidos!',
            icon: 'success',
            text: 'Tu carrito está vacío.',
            showConfirmButton: false,
            timer: 2500
            })
            cerrarCarrito();
            vaciarCarritoEntero();
        }
        })
})



//Funcion que vacia el carrito
function vaciarCarritoEntero(){
    productosCarrito = [];
    carritoConProductos.innerHTML = '';
    carritoVacio.classList.remove('disabled');
    carritoConProductos.classList.add('disabled');
    carritoPrecioTotal.classList.add('disabled');
    actualizarNumeroCarrito();
    actualizarLocalStorage();
    //elimino del localStorage el arreglo de productos del carrito
    localStorage.removeItem("productosEnCarrito");
}

//Funcion que elimina un producto del carrito por unidad
function eliminarProducto(e){
    //guardo en una constante el id del boton presionado
    const idBoton = e.currentTarget.id;
    //guardo en una constante el objeto (con propiedades) del arreglo que coincide con mi id (para poder trabajar con la propiedad "cantidad")
    const productoEncontrado = productos.find(producto => producto.id === idBoton);

    //guardo en una constante el numero index (posicion) del objeto dentro del arreglo del carrito. (devuelve -1 si no coincide la igualdad que escribi dentro)
    const productoIndex = productosCarrito.findIndex(producto => producto.id === idBoton);
     //si esta condicion es true (significa que esta el producto en el arreglo)
    if (productoIndex !== -1) {
        //accede al arreglo del carrito[en la posicion del objeto en cuestion] y le resta 1 en cantidad
        productosCarrito[productoIndex].cantidad--;
        //si el arreglo[en la posicion del objeto en cuestion] tiene cantidad 0 (es decir que ya no esta en el arreglo)
        if (productosCarrito[productoIndex].cantidad === 0) {
            //elimina ese objeto del arreglo del carrito, por lo tanto se eliminar del html / estructura splice(posicion del objeto, cantidad a eliminar) elimina cierta cantidad de elementos a partir de ese indice o posicion
            productosCarrito.splice(productoIndex, 1);
        }
    }
    cartelQuitadoCarrito();
    mostrarEnCarrito();
    actualizarNumeroCarrito();
    actualizarLocalStorage();
}

//Boton de carrito flotante
const botonFlotante = document.querySelector('.carrito-flotante');
//evento de click y llama a la funcion abrirCarrito
botonFlotante.addEventListener('click', abrirCarrito);

//Funcion que actualiza el numero de productos del carrito
function actualizarNumeroCarrito(){
    const numeroCarrito = document.querySelector('.numero-cantidad');
    //reduce funciona como acumulador => toma un arreglo .reduce((primer argumento es donde se va a ir acumulando el resultado, segundo argumento es el elemento del array que vamos a usar), tercer argumento es donde iniciamos el acumulador en 0)
    const cantidadTotal = productosCarrito.reduce((cantidadAcumulada, producto) => cantidadAcumulada + producto.cantidad, 0);

    //Mostramos el resultado total mediante un textContent
    numeroCarrito.textContent = cantidadTotal;
    //si el carrito esta vacio entonces...
    if(cantidadTotal === 0){
      //ocultamos el boton flotante
      botonFlotante.style.display = 'none';
    } else { //si no esta vacio el carrito entonce...
      //mostramos el carrito flotante 
      botonFlotante.style.display = 'flex';
    }
}

//Funcion para actualizar el localStorage
function actualizarLocalStorage(){
  //guardo en la clave "productosEnCarrito" el valor de productosCarrito (es un array). Pero con el JSON.stringify se guarda el valor en tipo string
  localStorage.setItem("productosEnCarrito", JSON.stringify(productosCarrito));
}

//guardo en una constante el valor de "productosEnCarrito" (es un array pero en cadena de texto: string) pero al usar JSON.parse estoy transformando el valor de tipo string a su tipo original
//esa tranformacion me sirve para poder usar el arreglo que quedó guardado en el localStorage (es decir el arreglo que quedó guardado en el almacenamiento del sitio web)
const carritoEnLS = JSON.parse(localStorage.getItem('productosEnCarrito'));

//si el carrito en el localStorage tiene objetos (no es vacio) entonces...
if(carritoEnLS){
    //el arreglo de productos que quedaron guardados en el localStorage se lo asigno al arreglo productosCarrito 
    //(este ultimo arreglo es el que almacena los objetos seleccionados y luego por medio de una funcion los muestra en pantalla dentro del carrito)
    productosCarrito = carritoEnLS;
    // entonces al recargar la pagina se van a cargar los arreglos que quedaron guardados en el localStorage, y luego se van a mostar en pantalla
    mostrarEnCarrito();
    actualizarNumeroCarrito();
} else { //si el carrito esta vacio en el localStorage entonces inicializo el arreglo productosCarrito sin objetos
    productosCarrito = [];
}


//Filtros segun categoria (mostrar todos los productos, mostrar solo mouse, mostrar solo teclado....)
const botonesFiltros = document.querySelectorAll('.boton-filtro');
//asgino la variable productoFiltrado y lo inicializo con el valor productos (array que contiene todos los productos)
// let productoFiltrado = productos;
//inicializo el id 'todos' con la clase 'active' agregada, para que sea el boton por defecto
document.querySelector('#todos').classList.add('active');
const tituloSeccionProductos = document.querySelector('.tituloSeccionProductos');
let globalContentTitulo = document.querySelector('#todos').textContent;
//por cada boton hace lo siguiente...
botonesFiltros.forEach(boton => {
    //evento al hacer click...
    boton.addEventListener('click', (e) =>{
        const botonFiltro = e.currentTarget.id;
        //al hacer click sobre uno, los demas pierden la clase 'active' (pierden el estilo del boton)
        botonesFiltros.forEach(boton => boton.classList.remove('active'));
        //al hacer click sobre uno, los botones de la otra categoria Marcas pierden tambien la clase 'active' (pierden el estilo del boton)
        botonesMarcas.forEach(boton => boton.classList.remove('active'));
        //al boton que presiono le agrego la clase 'active' (le da estilo al boton)
        e.currentTarget.classList.add('active');
        const contentTitulo = document.querySelector(`#${botonFiltro}`).textContent;
        globalContentTitulo = contentTitulo;
        //si el boton de la categoria que seleccione es distinta de "todos los productos" entonces...
        if(botonFiltro != 'todos'){
            //guardo en una constante un nuevo array de productos que cumplan con la condicion
            productoFiltrado = productos.filter(producto => producto.categoria === botonFiltro);
            tituloSeccionProductos.innerHTML = `${contentTitulo}`
            //cargamos los productos en html, pero solo aquellos que filtramos
            cargarProductos(productoFiltrado);
        } else { //si el boton que seleccioné fue el de "todos los productos" entonces...
            tituloSeccionProductos.innerHTML = `${contentTitulo}`
            //los productos filtrados lo "reiniciamos" a un arreglo con todos los productos que tenemos
            productoFiltrado = productos;
            //cargamos todos los productos y los mostramos
            cargarProductos(productoFiltrado);
        }
    })
});

//Filtro por marca
//(aclaracion: el filtro por marca funciona sobre el filtro de categorias, ejemplo: selecciono categoria: mouse, y luego filtro segun la marca: redragon)
const botonesMarcas = document.querySelectorAll('.filtro-marca');

botonesMarcas.forEach(boton => {
  //le damos evento al hacer click
  boton.addEventListener('click', (e) =>{
        const botonesMarcasID = e.currentTarget.id;
        //al hacer click sobre uno, los demas pierden la clase 'active' (pierden el estilo del boton)
        botonesMarcas.forEach(boton => boton.classList.remove('active'));
        //al boton que presiono le agrego la clase 'active' (le da estilo al boton)
        e.currentTarget.classList.add('active');
        

        //si productoFiltrado tiene objetos (no es vacio) entonces...
        if(productoFiltrado){
            const contentTituloMarca = document.querySelector(`#${botonesMarcasID}`).textContent;
            tituloSeccionProductos.innerHTML = `${globalContentTitulo} <i class='bx bx-chevrons-right'></i> ${contentTituloMarca}`;

            const productoMarcaFiltrado = productoFiltrado.filter(producto => producto.marca === e.currentTarget.id);
            //cargamos los productos que filtramos por marca y los mostramos en pantalla
            cargarProductos(productoMarcaFiltrado);
        }
    })
})
