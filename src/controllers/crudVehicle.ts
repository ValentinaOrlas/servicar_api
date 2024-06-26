import { Request, Response } from 'express';
import connection from '../models/db';

export const crearVehiculo = async (req: Request, res: Response) =>{

    const { make, model, plaque,  year, email } = req.body;

    try {
        const query = 'INSERT INTO vehicle ( make, model, plaque,  year, email ) VALUES (?, ?, ?, ?, ?)';
        connection.query(query,[make, model, plaque,  year, email], (err: any, result: any)=>{

            if(err){
                console.error('Error en la consulta de verificación de correo:', err);
                return res.status(500).json({ error: 'Error en la base de datos', details: err });
            }
            res.status(201).json({ message: 'Vehiculo creado exitosamente' });

        });
    } catch (error) {
        console.error('Error ejecutando la consulta SQL:', error);
        res.status(500).json({ message: 'Error del servidor', error });
    }
};

export const obtenerVehicloPlaca = async ( req: Request, res: Response) =>{
    const plaqueVehicle = req.params.plaque;

    try {
        const query = 'SELECT * FROM vehicle WHERE plaque = ? ';
        connection.query(query, [ plaqueVehicle], (err: any, result: any)=>{

            if(err){
                console.log('Error en la conexión');
                return res.status(500).json({ message: 'Error en la conexión' });
            }
            if (result.length === 0) {
                return res.status(404).json({ message: 'Vehiculo no encontrado' });
            }
            res.status(200).json(result);
        })
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
}

export const obtenerAllVehicle = async ( req: Request, res: Response) =>{

    try {
        const query = ' SELECT * FROM vehicle';
        connection.query(query,[], (err: any, result: any )=>{
            if(err){
                console.log('Error en la conexión');
                return res.status(500).json({ message: 'Error en la conexión' });
            }
            res.status(200).json(result);
        });
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

export const actualizarVehicles = async (req: Request, res: Response) => {
    const { make, model, plaque, year, email } = req.body;
    const userPlaque = req.params.plaque;

    try {
        if (userPlaque) {
            const checkQuery = 'SELECT * FROM vehicle WHERE plaque = ?';
            connection.query(checkQuery, [userPlaque], (err: any, result: any) => {
                if (err) {
                    console.error('Error en la conexión al ejecutar checkQuery:', err);
                    return res.status(500).json({ message: 'Error en la conexión' });
                }

                if (result.length === 0) {
                    return res.status(404).json({ message: 'Vehículo no encontrado' });
                }

                const updateQuery = 'UPDATE vehicle SET make = ?, model = ?, plaque = ?, year = ? WHERE plaque = ?';
                connection.query(updateQuery, [make, model, plaque, year, userPlaque], (err: any, result: any) => {
                    if (err) {
                        console.error('Error en la conexión al ejecutar updateQuery:', err);
                        return res.status(500).json({ message: 'Error en la conexión' });
                    }

                    res.status(200).json({ message: 'Vehículo actualizado correctamente' });
                });
            });
        } else {
            res.status(400).json({ message: 'El campo placa es obligatorio' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};


