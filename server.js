/******Modulos******/
import express  from 'express';
import path from 'path';
import {fileURLToPath} from 'url';
import morgan from 'morgan';

//Solucion a __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Instancia de servidor
const app = express();
import routerProductos from './src/routes/productos.routes.js'

/******Middleware******/
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));
app.use(express.static(__dirname +'/public'));

/*app.use(function(err,req,res,next){
    console.error(err.stack);
    res.status(400).send({error: "Producto no econtrado"})
})*/ 


/******Rutas******/
app.use('/api/productos', routerProductos) ;

/******Servidor******/
const port = 8080;
app.listen(port, ()=>{
    console.log("Tu servidor esta corriendo en el puerto " + port);
})
app.on("error", error=> console.log("El error es: " + error))