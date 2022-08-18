/******Modulos******/
import express  from 'express';
import morgan from 'morgan';
import routerProductos from './src/routes/productos.routes.js'

//Instancia de servidor
const app = express();

/******Middleware******/
app.use(express.json());
app.use(morgan('tiny'));


/******Rutas******/
app.use('/api/productos', routerProductos) 


/******Servidor******/
const port = 8080;
app.listen(port, ()=>{
    console.log("Tu servidor esta corriendo en el puerto " + port);
})
app.on("error", error=> console.log("El error es: " + error))