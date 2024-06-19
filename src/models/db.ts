import mysql from 'mysql';

const connection = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password: 'cloe*',
    database: 'servicar'
});

export default connection;
