import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth';
import connection from './models/db';

const app = express();

// Middleware CORS
app.use(cors());
app.options('*', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    res.send();
});

// Middleware para analizar el cuerpo de las solicitudes
app.use(express.json());

app.use((req, res, next) => {
    console.log(`Request Method: ${req.method}, Request URL: ${req.url}`);
    next();
});
// Definición de rutas
app.use(authRoutes);

app.set('port', process.env.PORT || 3000);

// Conexión a la base de datos
connection.connect((err: any) => {
    if (err) {
        console.error('Error connecting to the database:', err);
    } else {
        console.log('Conexión exitosa a la base de datos');
    }
});

// Iniciar el servidor
app.listen(app.get('port'), () => {
    console.log(`Server running on port ${app.get('port')}`);
});
