// Reemplaza con tu URL
const databaseURL = 'https://landing-57dbb-default-rtdb.firebaseio.com/citas.json';


let sendData = () => {
  const form = document.getElementById("form");
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  data['submitted_at'] = new Date().toISOString();

  fetch(databaseURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.statusText}`);
      }
      return response.json();
    })
    .then(() => {
      getAppointments();
      form.reset();
    })
    .catch(error => {
      alert('An error occurred. Please try again later.');
    });
};

let ready = () => {
  //console.log('DOM está listo')
  getAppointments();
}

let loaded = () => {
  const form = document.getElementById("form");
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    sendData();
  });
};

let getAppointments = async () => {
  try {
    const response = await fetch(databaseURL, {
      method: 'GET'
    });

    if (!response.ok) {
      alert('Error al cargar las citas agendadas');
      return;
    }

    const data = await response.json();

    if (data != null) {
      const appointments = document.getElementById('appointments');
      appointments.innerHTML = '';

      let appointmentCounts = new Map();

      for (let key in data) {
        let { appointment_date } = data[key];
        let appointmentDate = new Date(appointment_date);
        let dateString = appointmentDate.toLocaleDateString();

        if (appointmentCounts.has(dateString)) {
          appointmentCounts.set(dateString, appointmentCounts.get(dateString) + 1);
        } else {
          appointmentCounts.set(dateString, 1);
        }
      }

      let index = 1;
      for (let [date, count] of appointmentCounts) {
        let row = `
            <tr>
              <th>${index}</th>
              <td>${date}</td>
              <td>${count} citas</td>
            </tr>
          `;
        appointments.innerHTML += row;
        index++;
      }
    }
  } catch (error) {
    alert('Error al obtener las citas agendadas');
  }
};


window.addEventListener("DOMContentLoaded", getAppointments);
window.addEventListener("DOMContentLoaded", ready);
window.addEventListener("load", loaded)