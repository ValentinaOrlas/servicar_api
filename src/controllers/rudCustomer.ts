import { Request, Response, response } from 'express';
import connection from '../models/db';

export const actualizarCustomer = async (req: Request, res: Response) => {
    const { fullName, email, password, role } = req.body;
    const userEmail = req.params.email;

    try {
        if (userEmail) {
            const checkQuery = 'SELECT * FROM user WHERE email = ?';
            connection.query(checkQuery, [userEmail], (err: any, result : any) => {
                if (err) {
                    console.log('Error en la conexión');
                    return res.status(500).json({ message: 'Error en la conexión' });
                }

                if (result.length === 0) {
                    return res.status(404).json({ message: 'Usuario no encontrado' });
                }

                const updateQuery = 'UPDATE user SET fullName = ?, email = ?, password = ?, role = ? WHERE email = ?';
                connection.query(updateQuery, [fullName, email, password, role, userEmail], (err : any, result : any ) => {
                    if (err) {
                        console.log('Error en la conexión');
                        return res.status(500).json({ message: 'Error en la conexión' });
                    }

                    res.status(200).json({ message: 'Usuario actualizado correctamente' });
                });
            });
        } else {
            res.status(400).json({ message: 'El campo email es obligatorio' });
        }
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

export const obtenerAllCustomer = async (req: Request, res: Response)=>{
    const { fullName, email, password, role } = req.body;

    try {
        const query = 'SELECT * FROM user';
        connection.query(query,[ fullName, email, password, role], (err: any, result: any)=>{
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
export const customerEmail = async (req: Request, res: Response) => {
    const emailUser = req.params.email;
    try {
        const query = 'SELECT * FROM user WHERE email = ?';
        if (emailUser) {
            connection.query(query, [emailUser], (err: any, result: any) => {
                if (err) {
                    console.log('Error en la conexión');
                    return res.status(500).json({ message: 'Error en la conexión' });
                }
                if (!result.length) {
                    return res.status(404).json({ message: 'Usuario no encontrado' });
                }
                res.status(200).json(result);
            });
        } else {
            res.status(400).json({ message: 'El parámetro email es obligatorio' });
        }
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};