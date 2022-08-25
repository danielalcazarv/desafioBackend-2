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
//EJS
app.set('view engine', 'ejs');
app.set('views','./views')

/******Rutas*****/
app.get('/', (req,res)=>{
    res.render('pages/index', {boton:false})
});

app.get('/productos', async (req, res)=>{
    const prods = await productos.getAll();
    res.render('pages/index',{api:prods,boton:true})
});

app.post('/', (req,res)=>{
    let obj = req.body;
    productos.save(obj)
    res.render('pages/index', {boton:false})
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