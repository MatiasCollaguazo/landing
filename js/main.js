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
            //alert('Agradeciendo tu preferencia, nos mantenemos actualizados y enfocados en atenderte como mereces'); // Maneja la respuesta con un mensaje
            emailElement.classList.add('input-sended');
            setTimeout(() => {
                emailElement.classList.remove('input-sended');
            }, 5000)
            form.reset();
            getData();
            
        })
        .catch(error => {
            alert('Hemos experimentado un error. ¡Vuelve pronto!'); // Maneja el error con un mensaje
        });
}

let ready = () => {
    //console.log('DOM está listo')
    getData();
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
                { transform: 'translateX(0)' },
                { transform: 'translateX(8px)' },
                { transform: 'translateX(-8px)' },
                { transform: 'translateX(0)' }
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

let getData = async () => {  
    try {
        const response = await fetch(databaseURL, {
            method: 'GET'
        });

        if (!response.ok) {
          alert('Hemos experimentado un error. ¡Vuelve pronto!');
        }
        const data = await response.json();

        if(data != null) {

            // Cuente el número de suscriptores registrados por fecha a partir del objeto data
            let countSuscribers = new Map()

            if (Object.keys(data).length > 0) {
                for (let key in data) {
       
                    let { email, saved } = data[key]
                       
                    let date = saved.split(",")[0]
                       
                    let count = countSuscribers.get(date) || 0;
                    countSuscribers.set(date, count + 1)
                }
            }
          
            // END

            // Genere y agregue filas de una tabla HTML para mostrar fechas y cantidades de suscriptores almacenadas 
            if (countSuscribers.size > 0) {

                subscribers.innerHTML = ''
       
                let index = 1;
                for (let [date, count] of countSuscribers) {
                    let rowTemplate = `
                        <tr>
                            <th>${index}</th>
                            <td>${date}</td>
                            <td>${count}</td>
                        </tr>`
                    subscribers.innerHTML += rowTemplate
                    index++;
                }
            }
            // END
        }

      } catch (error) {
        // Muestra cualquier error que ocurra durante la petición
        alert('Hemos experimentado un error. ¡Vuelve pronto!'); // Maneja el error con un mensaje
      }

}


window.addEventListener("DOMContentLoaded", ready);
window.addEventListener("load", loaded)