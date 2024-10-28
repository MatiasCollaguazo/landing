// Reemplaza con tu URL
const databaseURL = 'https://landing-57dbb-default-rtdb.firebaseio.com/coleccion.json';


let sendData = () => {
    // Obtén los datos del formulario
    const form = document.getElementById("form");
    const emailElement = document.querySelector(".form-control-lg")
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries()); // Convierte FormData a objeto
    data['saved'] = new Date().toLocaleString('es-CO', { timeZone: 'America/Guayaquil' })
    // Realiza la petición POST con fetch
    fetch(databaseURL, {
        method: 'POST', // Método de la solicitud
        headers: {
            'Content-Type': 'application/json' // Especifica que los datos están en formato JSON
        },
        body: JSON.stringify(data) // Convierte los datos a JSON
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.statusText}`);
            }
            return response.json(); // Procesa la respuesta como JSON
        })
        .then(result => {
            alert('Agradeciendo tu preferencia, nos mantenemos actualizados y enfocados en atenderte como mereces'); // Maneja la respuesta con un mensaje
            emailElement.classList.add('input-sended');
            setTimeout(() => {
                emailElement.classList.remove('input-sended');
            }, 5000)
            form.reset()

            
        })
        .catch(error => {
            alert('Hemos experimentado un error. ¡Vuelve pronto!'); // Maneja el error con un mensaje
        });
}

let ready = () => {
    //console.log('DOM está listo')
}

let loaded = (eventLoaded) => {
    const myform = document.getElementById("form");
    console.log(myform)
    myform.addEventListener('submit', (eventSubmit) => {
        eventSubmit.preventDefault();
        const emailElement = document.querySelector(".form-control-lg")
        const emailText = emailElement.value;
        if (emailText.length === 0) {
            emailElement.classList.add('input-error');
            emailElement.focus();
            emailElement.animate([
                { transform: 'translateX(0)' },    // Inicio en 0px
                { transform: 'translateX(8px)' }, // Mover a 50px
                { transform: 'translateX(-8px)' },// Mover a -50px
                { transform: 'translateX(0)' }     // Volver a 0px
            ], {

                duration: 300,
                iterations: 1,
                easing: 'linear'
            });
            emailElement.addEventListener('input', () => {
                if (emailElement.value.length > 0) {
                    emailElement.classList.remove('input-error'); // Quitar la clase de error
                }
            });
            emailElement.addEventListener('blur', () => {
                setTimeout(() => {
                    emailElement.classList.remove('input-error');
                }, 5000)
            });
            return;
        }
        sendData();
        return;
    });

}

window.addEventListener("DOMContentLoaded", ready);
window.addEventListener("load", loaded)