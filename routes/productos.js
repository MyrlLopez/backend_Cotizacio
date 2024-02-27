 
const express = require("express");
const app = express();
 
const dotenv = require("dotenv");
dotenv.config();
 
//conectar con la base de datos
const {connection} = require("../config.db");
 
//Utilizando el método Get
const getProductos = (request, response) => {
    connection.query("SELECT * FROM tb_productos",
    (error, results) => {
        if(error)
            throw error;
        response.status(200).json(results);
    });
};

//ruta de consumo
app.route("/productos")
.get(getProductos);

//Utilizando el método post
const postProductos = (request, response) => {
    const {id_productos,  detalle_producto, precio, estado} = request.body;
    connection.query(" INSERT INTO tb_productos (id_productos,  detalle_producto, precio, estado) values (?, ? , ?, ?)",
    [id_productos,  detalle_producto, precio, estado],
    (error, results) => {
        if(error)
            throw error;
            response.status(201).json(['success','Producto guardado']);
    });
};
app.route("/productos")
.post(postProductos);

/* metodo put */
const putProductos = (request, response) => {
    const {detalle_producto, precio, estado, id_productos }= request.body;
    connection.query ("update tb_productos set detalle_producto = ? , precio =? , estado =?  where id_productos = ?",
    [detalle_producto, precio, estado, id_productos],
    (error, results) => {
        if(error)
            throw error;
            response.status(201).json(['success','Producto modificado']);
    }) ;
}; 

app.route("/productos")
.put(putProductos);
   

/* Metodo delete */

    const deleteProductos = (request, response) => {
    const {id_productos} = request.params.id;
    connection.query("delete from tb_productos where id_productos= ?",
    [id_productos],
    (error, results) => {
        if(error)
            throw error;
            response.status(201).json(['success','producto eliminado']);
    });
};
app.route("/productos")
.delete(deleteProductos); 

module.exports = app