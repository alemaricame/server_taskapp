const express = require('express');
const port = 3000;
const app = express();
const mysql = require('mysql');

// Set database connection credentials
const config = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tareas',
});


// SELECT ALL
app.get('/tasks', (request, response) => {
    config.query('SELECT * FROM todos', (error, result) => {
        if (error) throw error;
 
        response.send(result);
    });
});

//INSERT
app.post('/tasks', (request, response) => {
    pool.query('INSERT INTO todos SET ?', request.body, (error, result) => {
        if (error) throw error;

        response.status(201).send(`Tarea número ${result.idtarea} agregada`);
    });
});

//DELETE
app.delete('/tasks/:idtarea',(request,response)=>{
    const id = request.params.idtarea;
    config.query('DELETE FROM todos WHERE idtarea=?',id, (error, result) => {
        if (error) throw error;
 
        response.send('Tarea eliminada!');
    });
});

// UPDATE
app.put('/task/:idtarea', (request, response) => {
    const id = request.params.id;
 
    config.query('UPDATE todos SET ? WHERE id = ?', [request.body, id], (error, result) => {
        if (error) throw error;
 
        response.send('Tarea editada!');
    });
});

app.listen(3000, () => {
   console.log("El servidor está inicializado en el puerto 3000");
});