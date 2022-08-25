/******Modulos******/
import express from 'express';
import path from 'path';
import {fileURLToPath} from 'url';
import morgan from 'morgan';
import handlebars from 'express-handlebars';
import {productos} from './contenedor.js';

//Solucion a __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Instancia de servidor
const app = express();
//import routerProductos from './src/routes/productos.routes.js'

/******Middleware******/
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));
app.use(express.static(__dirname +'/public'));

//Motores de plantillas
//HBS
app.engine('hbs', handlebars.engine({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname +'/views/layouts',
    partialsDir: __dirname +'/views/partials'
}));
app.set('view engine', 'hbs');
app.set('views','./views');

/******Rutas******/
//app.use('/api/productos', routerProductos);

app.get('/', (req,res)=>{
    res.render('main',{boton:false})
});

app.get('/productos', async (req, res)=>{
    const prods = await productos.getAll();
    res.render('main',{api:prods, boton:true})
});

app.post('/', (req,res)=>{
    let obj = req.body;
    productos.save(obj)
    res.render('main',{boton:false})
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
app.on("error", error=> console.log("El error es: " + error));