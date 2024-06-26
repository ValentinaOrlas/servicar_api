interface Vehicle {
    id: number;
    make: string;
    model: string;
    year: number;
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('vehicle-form') as HTMLFormElement;
    const vehicleList = document.getElementById('vehicle-list') as HTMLDivElement;

    // Fetch and display vehicles
    fetch('/createvehicle')
        .then(response => response.json())
        .then((data: Vehicle[]) => {
            data.forEach(vehicle => {
                addVehicleToDOM(vehicle);
            });
        });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const make = (document.getElementById('make') as HTMLInputElement).value;
        const model = (document.getElementById('model') as HTMLInputElement).value;
        const year = parseInt((document.getElementById('year') as HTMLInputElement).value);

        const vehicle: Omit<Vehicle, 'id'> = { make, model, year };

        fetch('/createvehicle', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(vehicle),
        })
            .then(response => response.json())
            .then((data: Vehicle) => {
                addVehicleToDOM(data);
                form.reset();
            });
    });

    function addVehicleToDOM(vehicle: Vehicle) {
        const div = document.createElement('div');
        div.className = 'vehicle-item';
        div.innerHTML = `
            <span>${vehicle.make} ${vehicle.model} (${vehicle.year})</span>
            <button onclick="deleteVehicle(${vehicle.id}, this)">Delete</button>
        `;
        vehicleList.appendChild(div);
    }
});

function deleteVehicle(id: number, button: HTMLButtonElement) {
    fetch(`/createvehicle/${id}`, {
        method: 'DELETE',
    })
        .then(() => {
            button.parentElement?.remove();
        });
}
