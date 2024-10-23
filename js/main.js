let ready = () => {
    //console.log('DOM está listo')
}

let loaded = (eventLoaded) => {
    let myform = document.getElementById("form");
    console.log(myform)
    myform.addEventListener('submit', (eventSubmit)=>{
        eventSubmit.preventDefault();
        const emailElement = document.querySelector(".form-control-lg")
        const emailText = emailElement.value;
        if (emailText.length===0) {
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
                setTimeout(()=>{
                    emailElement.classList.remove('input-error');
                },5000)
            });
        }
    });
    
}

window.addEventListener("DOMContentLoaded", ready);
window.addEventListener("load", loaded)