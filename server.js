/******Modulos******/
import express  from 'express';
import morgan from 'morgan';
import routerProductos from './src/routes/productos.routes.js'
//const {Router} = express;

//Instancia de servidor
const app = express();

/******Middleware******/
app.use(express.json());
app.use(morgan('tiny'));

//Segmento de rutas
//const router = Router();

/******Rutas******/
app.use('/api/productos', routerProductos) 

/*
app.get('/', (req, res)=>{
    res.send('Estas en el home');
})
router.get('/',(req, res)=>{
    res.send('Probando rutas')
})

app.use('/api/productos', router)


app.get('/productos', async (req, res)=>{
    const prods = await productos.getAll();
    res.send(prods);
})
app.get('/productoRandom', async (req, res)=>{
    const prods = await productos.getAll();
    const randomNumber = () => {
        return Math.floor(Math.random()*(prods.length)+1);//de esta forma el número aleatorio incluye al valor máximo.
    }
    const productoRandom = prods.find(obj => obj.id === randomNumber());
    res.send(productoRandom);
})*/
/******Servidor******/
const port = 8080;
app.listen(port, ()=>{
    console.log("Tu servidor esta corriendo en el puerto " + port);
})
app.on("error", error=> console.log("El error es: " + error))