import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import connection from '../models/db';

export const register = async (req: Request, res: Response) => {
    const { fullName, email, password, role } = req.body;

    try {
        // Verificar si el correo ya existe
        const checkEmailSql = 'SELECT email FROM user WHERE email = ?';
        connection.query(checkEmailSql, [email], async (err: any, result: any) => {
            if (err) {
                console.error('Error en la consulta de verificación de correo:', err);
                return res.status(500).json({ error: 'Error en la base de datos', details: err });
            }
            if (result.length > 0) {
                console.log('Correo ya registrado:', email);
                return res.status(400).json({ error: 'El correo ya está registrado' });
            }

            try {
                // Si el correo no existe, proceder con el registro
                const hashedPassword = await bcrypt.hash(password, 5);
                const query = 'INSERT INTO user (fullName, email, password, role) VALUES (?, ?, ?, ?)';
                connection.query(query, [fullName, email, hashedPassword, role], (err: any, result: any) => {
                    if (err) {
                        if (err.code === 'ER_DUP_ENTRY') {
                            console.error('Correo duplicado:', email);
                            return res.status(400).json({ error: 'El correo ya está registrado' });
                        }
                        console.error('Error al registrar el usuario:', err);
                        return res.status(500).json({ error: 'Error en la base de datos', details: err });
                    }
                    res.status(201).json({ message: 'Usuario creado exitosamente' });
                    // if(role == 'Mechanic'){
                    //     const query = 'INSERT INTO mechanic (fullName) VALUES (?)'
                    //     connection.query(query,[fullName],(err: any, result: any)=>{
                    //         if (err) {
                    //             console.error('Error en la consulta de verificación de correo:', err);
                    //             return res.status(500).json({ error: 'Error en la base de datos', details: err });
                    //         }
                    //         res.status(201).json({ message: 'Usuario y mecánico creados exitosamente' });
                    //     });
                    // }
                });
            } catch (hashError) {
                console.error('Error al hashear la contraseña:', hashError);
                res.status(500).json({ message: 'Error del servidor', error: hashError });
            }
        });
    } catch (error) {
        console.error('Error ejecutando la consulta SQL:', error);
        res.status(500).json({ message: 'Error del servidor', error });
    }
};
