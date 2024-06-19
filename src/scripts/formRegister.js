document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('registerForm');
    const modal = document.getElementById('confirmationModal');
    const closeButton = document.querySelector('.close-button');
    const confirmButton = document.getElementById('confirmButton');

    const submitForm = function (event) {
        event.preventDefault(); // Evita que el formulario se envíe de forma predeterminada
        const fullNameElement = document.getElementById('fullName');
        const emailElement = document.getElementById('email');
        const passwordElement = document.getElementById('password');
        const roleElement = document.getElementById('role');
        if (!fullNameElement || !emailElement || !passwordElement || !roleElement) {
            console.error('Uno o más elementos del formulario no se encontraron');
            return;
        }
        const fullName = fullNameElement.value;
        const email = emailElement.value;
        const password = passwordElement.value;
        const role = roleElement.value;
        const formData = {
            fullName: fullName,
            email: email,
            password: password,
            role: role
        };
        
        fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(function (response) {
            if (!response.ok) {
                throw new Error("Network response was not ok: ".concat(response.status, " ").concat(response.statusText));
            }
            return response.json();
        })
            .then(function (data) {
            // Mostrar el modal
            modal.style.display = 'block';
            // Limpiar los campos del formulario
            form.reset();
        })
            .catch(function (error) {
            alert("Error: ".concat(error.message));
        });
    };
    // Agrega el evento de submit al formulario
    if (form) {
        form.addEventListener('submit', submitForm);
    }
    else {
        console.error('Formulario no encontrado');
    }
    closeButton.addEventListener('click', function () {
        modal.style.display = 'none';
    });
    confirmButton.addEventListener('click', function () {
        modal.style.display = 'none';
    });
    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});
