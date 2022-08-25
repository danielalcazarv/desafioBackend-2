/******Modulos******/
import express from 'express';
import path from 'path';
import {fileURLToPath} from 'url';
import morgan from 'morgan';
import {productos} from './contenedor.js';

//Solucion a __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Instancia de servidor
const app = express();

/******Middleware******/
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));
app.use(express.static(__dirname +'/public'));

//Motores de plantillas
//PUG

app.set('view engine', 'pug');
app.set('views','./views')

/******Rutas******/
app.get('/', (req,res)=>{
    res.render('formulario')
});

app.get('/productos', async (req, res)=>{
    const prods = await productos.getAll();
    res.render('productos',{api:prods})
});

app.post('/', (req,res)=>{
    let obj = req.body;
    productos.save(obj)
    res.render('formulario')
});

//Errores globales
app.use(function(err,req,res,next){
    console.error(err.stack);
    res.status(err.status || 500).send({error: "Algo se rompió"})
});

/******Servidor******/
const port = 8080;
app.listen(port, ()=>{
    console.log("Tu servidor esta corriendo en el puerto " + port);
})
app.on("error", error=> console.log("El error es: " + error))