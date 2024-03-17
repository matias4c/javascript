function bienvenida(){
    let edad = parseInt(prompt("Ingrese su edad."));
    let nombre = prompt("Ingrese su nombre.");
    let respuesta = "";
    let respuestaMin;
    
    if(edad >= 18){
            alert("Bienvenido " + nombre + ". Puedes ingresar a ver nuestros productos.");
    } else if (isNaN(edad)){
            alert("La edad asignada no corresponde a un numero. Vuelva a intentarlo.");
            actualizarpag();
    } else{
            alert("Bienvenido " + nombre + ". Se necesita la supervisión de un adulto para realizar compras online.")
           
            while(respuestaMin !== 'si'){
                respuesta = prompt('Si se encuentra bajo la supervisión de un adulto ingrese "Si"');
                respuestaMin = respuesta.toLowerCase();

                if(respuestaMin !== 'si'){
                    alert('Llama a un adulto');
                }
            }
            alert('Bienvenidos, pueden ingresar a ver nuestros productos.')
    }

}

function actualizarpag(){
    location.reload();
}

bienvenida();