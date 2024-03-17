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
            actualizarpag();
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

function actualizarpag(){ //Función para actualizar o refrescar la página.
    location.reload(); 
}

bienvenida();