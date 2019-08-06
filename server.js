const express = require('express');
const port = 3000;
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');

// Set database connection credentials
const config = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tareas',
});
//Body parser
app.use( express.static( "public" ) );
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

// SELECT ALL
app.get('/tasks', (request, response) => {
    console.log("view all");
    config.query('SELECT * FROM todos', (error, result) => {
        if (error) throw error;
        response.send(result);
    });
});

//INSERT
app.post('/insert', function (request, response) {
    //console.log(request);
    console.log(request.body);
    
    config.query("INSERT INTO todos (idtarea, title, priority, description, name) VALUES ('"+request.body.idtarea+"','"+request.body.title+"','"+request.body.priority+"','"+request.body.description+"','"+request.body.name+"')", request.body , function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
      });
    response.redirect("/tasks");
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


app.listen(3000, () => {
   console.log("El servidor está inicializado en el puerto 3000");
});