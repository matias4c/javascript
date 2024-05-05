
const formularioDatos = document.querySelector('#form-datos');
const contenedorDatos = document.querySelector('#contenedorDatos');
const barraProgreso = document.querySelector('.progress-bar');

const botonDatos = document.querySelector('#boton-datos');

//evento al hacer click sobre el boton de confirmar datos (en formulario)
botonDatos.addEventListener('click', () => {
        //checkValidity es para que se ejecute cuando el formulario este completo (sin campos olbigatorios vacios)
    if(formularioDatos.checkValidity()){
        //preventDefault para que no se recargue la pagina al hacer submit (enviar formulario)
        formularioDatos.addEventListener('submit', (e) => {e.preventDefault()})
        document.querySelector('.lateralNumero').classList.remove('active');
        document.querySelector('#numero2').classList.add('active');
        barraProgreso.style.width = '50%'

        const div = document.querySelector("#principal-datos");
        div.innerHTML = `
            <h1 class="principal-titulo">Medio de Pago</h1>
            <form class="formulario-pago" id="form-pago">
                
                <div class="row">
                    <div class="col-md">
                        <div class="form-floating">
                            <input type="text" class="form-control" id="checkoutNombre" placeholder="Nombre en la tarjeta" required>
                            <label for="checkoutNombre">Nombre en la tarjeta</label>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md col-md-8">
                        <div class="form-floating">
                            <input type="number" class="form-control" id="checkoutNumeroTarjeta" placeholder="Número de la tarjeta" required>
                            <label for="numeroTarjeta">Número de la tarjeta</label>
                        </div>
                    </div>
                    <div class="col-md col-md-2">
                        <div class="form-floating">
                            <input type="number" class="form-control" id="checkoutExpiracionTarjeta" placeholder="Expiración" required>
                            <label for="expiracionTarjeta">Expiración</label>
                        </div>
                    </div>
                    <div class="col-md col-md-2">
                        <div class="form-floating">
                            <input type="number" class="form-control" id="checkoutCvvTarjeta" placeholder="CVV" required>
                            <label for="cvvTarjeta">CVV</label>
                        </div>
                    </div>
                </div>

                <button type="submit" class="btn btn-primary" id="boton-pago"><h6>Confirmar Pago</h6></button>
            </form>`
        contenedorDatos.append(div);

        const formularioPago = document.querySelector('#form-pago');
        const botonPago = document.querySelector('#boton-pago');
        
        //evento al hacer click sobre el boton de confirmar medio de pago (en formulario)
        botonPago.addEventListener('click', () => {
            //checkValidity es para que se ejecute cuando el formulario este completo (sin campos olbigatorios vacios)
            if(formularioPago.checkValidity()){
                //preventDefault para que no se recargue la pagina al hacer submit (enviar formulario)
                formularioPago.addEventListener('submit', (e) => {e.preventDefault()})
                
                setTimeout(()=> {
                    barraProgreso.style.width = '100%';
                    document.querySelector('#numero2').classList.remove('active');
                    document.querySelector('#numero3').classList.add('active');
                    const div = document.querySelector("#principal-datos");
                    div.innerHTML = `<h1 class='principal-titulo'>Pago confirmado <i class='bx bx-check'></i></h1>
                    <div class='formulario-confirmacion'><h3>¡Muchas gracias!</h3>
                    <h4>Nos pondremos en contacto cuanto antes para realizar el envío.</h4>
                    <a class="btn-primary" href="index.html"><i class='bx bx-left-arrow-alt'></i> Volver a la tienda</a></div>`
                    contenedorDatos.append(div);
                }, 1000)
            }
        });
    }
});
