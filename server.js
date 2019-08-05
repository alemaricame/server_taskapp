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
    console.log("view all");
    config.query('SELECT * FROM todos', (error, result) => {
        if (error) throw error;
        response.send(result);
    });
});

//INSERT
app.post('/insert', (request, response) => {
    console.log(JSON.parse(request.body));
    config.query('INSERT INTO todos (idtarea,title,priority,description,name) VALUES (?,?,?,?,?)', request.body, (error, result) => {
        if (error) throw error;
 
        response.status(201).send(`User added with ID: ${result.idtarea}`);
    });
});

//DELETE
app.get('/delete/:idtarea',(request,response)=>{
    console.log("delete");
       console.log("id:", request.params.idtarea);

         config.query('DELETE FROM todos WHERE idtarea= ?',request.params.idtarea, (error, result) => {
            if (error) throw error;
            response.status(201).send("Eliminado");
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