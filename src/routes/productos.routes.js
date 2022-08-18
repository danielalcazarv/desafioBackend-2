/******Modulos******/
import express  from 'express';
import multer from 'multer';
import {productos} from '../../contenedor.js';

const routerProductos = express.Router();


routerProductos.get('/', async (req,res)=>{
    const prods = await productos.getAll();
    return res.json(prods);
});

routerProductos.get('/:id', async (req,res)=>{
    let id = Number(req.params.id);
    const prod = await productos.getById(id);
    res.json(prod);
});

routerProductos.post('/', (req,res)=>{
    let obj = req.body;
    res.json(productos.save(obj));
});

routerProductos.delete('/:id', async (req,res)=>{
    let id = Number(req.params.id);
    const prodDelete= await productos.deleteById(id);
    res.json(prodDelete);
})

export default routerProductos;