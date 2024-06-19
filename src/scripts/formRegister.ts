document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registerForm') as HTMLFormElement;
    const modal = document.getElementById('confirmationModal') as HTMLDivElement;
    const closeButton = document.querySelector('.close-button') as HTMLSpanElement;
    const confirmButton = document.getElementById('confirmButton') as HTMLButtonElement;

    const submitForm = (event: Event) => {
        event.preventDefault(); // Evita que el formulario se envíe de forma predeterminada

        const fullNameElement = document.getElementById('fullName') as HTMLInputElement | null;
        const emailElement = document.getElementById('email') as HTMLInputElement | null;
        const passwordElement = document.getElementById('password') as HTMLInputElement | null;
        const roleElement = document.getElementById('role') as HTMLSelectElement | null;

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

        console.log('Datos del formulario:', formData);

        fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            // Mostrar el modal
            modal.style.display = 'block';

            // Limpiar los campos del formulario
            form.reset();
        })
        .catch(error => {
            alert(`Error: ${error.message}`);
        });
    };

    // Agrega el evento de submit al formulario
    if (form) {
        form.addEventListener('submit', submitForm);
    } else {
        console.error('Formulario no encontrado');
    }

    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    confirmButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event: MouseEvent) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});

