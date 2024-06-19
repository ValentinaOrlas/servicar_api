const jwt = require('jsonwebtoken');
const connection = require('../models/db');
const bcrypt = require('bcrypt');
import { Request, Response } from 'express';

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.params;

    try {
        const query = 'SELECT * FROM user WHERE email = ?';
        connection.query(query, [email], async (err: any, rows: any) => {
            if (err) {
                console.error('Error en la consulta de inicio de sesión:', err);
                return res.status(500).json({ message: 'Error del servidor', error: err });
            }
            if (rows.length === 0) {
                return res.status(401).json({ message: 'Credenciales inválidas' });
            }

            const user = rows[0];
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: 'Credenciales inválidas' });
            }

            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
            res.json({ token });
        });
    } catch (error) {
        console.error('Error en el controlador de inicio de sesión:', error);
        res.status(500).json({ message: 'Error del servidor', error });
    }
};
