const express = require("express");
const app = express();
 
const dotenv = require("dotenv");
dotenv.config();
 
//conectar con la base de datos
const {connection} = require("../config.db");
 
//Utilizando el método Get 
const getUsuarios = (request, response) => {
    connection.query("SELECT * FROM tb_usuarios",
    (error, results) => {
        if(error)
            throw error;
        response.status(200).json(results);
    });
};

//ruta de consumo
app.route("/user")
.get(getUsuarios);


//Utilizando el método post o metodo para crear usuarios 
const postUsuarios = (request, response) => {
    const {id_usuario, nombre_usuario, estado, direccion, correo_usuario, contrasena_usuario, telefono} = request.body;
    connection.query("insert INTO tb_usuarios (id_usuario, nombre_usuario, estado, direccion, correo_usuario, contrasena_usuario, telefono) values (?, ? , ?, ?, ?, ?, ?)",
    [id_usuario, nombre_usuario, estado, direccion, correo_usuario, contrasena_usuario, telefono],
    (error, results) => {
        if(error)
            throw error;
        response.status(201).json(results);
    });
};
app.route("/user")
.post(postUsuarios);

/* metodo put para actualizar usuarios*/

    const putUsuarios = (request, response) => {
    const {nombre_usuario, estado, direccion, correo_usuario, contrasena_usuario, telefono, id_usuario} = request.body;
connection.query ("update tb_usuarios set nombre_usuario = ?, estado ?= , direccion = ?, correo_usuario = ?, contrasena_usuario = ?, telefono= ?  where id_usuario= ?",
    [nombre_usuario, estado, direccion, correo_usuario, contrasena_usuario, telefono, id_usuario],
    (error, results) => {
        if(error)
            throw error;
        response.status(201).json(results);
    }) ;
}; 

app.route("/user")
.put(putUsuarios);

/* Metodo delete */

    const deleteUsuarios = (request, response) => {
    const id_usuario = request.params.id;
    connection.query("delete from tb_usuarios where id_usuario= ?",
    [id_usuario],
    (error, results) => {
        if(error)
            throw error;
        response.status(201).json(results);
    });
};
app.route("/user/:id")
.delete(deleteUsuarios); 


const postloginUsuario = (request, response) =>{
    const {correo_usuario, contrasena_usuario} = request.body;
    connection.query("SELECT correo_usuario, contraseña_usuario from tb_usuarios where correo_usuario = ? and contraseña_usuario = ?",
    [correo_usuario, contrasena_usuario],
      (error, results) => {
        if(error)
        throw error;
        response.status(201).json(['messagge','Iniciar Sesion']);
    });
};
app.route("/login")
.post(postloginUsuario);

const deleteloginUsuario = (request, response) =>{
    const id_usuario = request.params.id;
    connection.query("delete from tb_usuarios where id_usuario= ?",
    [id_usuario],
    (error, results) => {
        if(error)
            throw error;
        response.status(201).json(['messagge','Login eliminado']);
    });
};
app.route("/login")
.post(deleteloginUsuario);

const putLoginUsuario = (request, response) => {
    const {correo_usuario, contrasena_usuario, id_usuario} = request.body;
connection.query ("update tb_usuarios set correo_usuario = ?, contrasena_usuario = ?  where id_usuario= ?",
    [correo_usuario, contrasena_usuario, id_usuario],
    (error, results) => {
        if(error)
            throw error;
        response.status(201).json(results);
    }) ;
}; 

app.route("/login")
.put(putLoginUsuario);




/* //login

//Utilizando el método Get para el login
app.get('/', function (request, response) {
 // render login template algo malo
    response.sendFile(path.join(__dirname + '/login.html'));
    });

// Utilizando el metodo post para el login
//app.post('https://phpoll.com/login/process', function (request, response) {
    // Capturar del input
    let.username = request.body.username;
    let.password = request.body.password;
    console.log(username, password);
    if(username && password){
        connection.query('SELECT * from tb_usuario where username = ? and password=?' ),[username,  password] 
            if(error) throw error;
            if(results.length > 0){
                request.session.loggedin = true;
                request.session.username = username;
                //redirecionar a la pag home
            response.redirect('/home');
    } else{
            response.send('Incorrect Username and/or password')
    }
    response.end();
    } else {
    response.send('please enter  Username and password')
    response.end();
}
});  */


module.exports = app