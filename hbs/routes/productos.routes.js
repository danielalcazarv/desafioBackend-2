/******Modulos******/
import express  from 'express';
import multer from 'multer';
import {productos} from '../../contenedor.js';

const routerProductos = express.Router();

async function middlewareGetIdNotFound (req,res,next){
    let id = Number(req.params.id);
    const prod = await productos.getById(id);
    if (prod==null){
        const msj = {msg:'Producto no encontrado'};
        return res.send(msj);
    }else{
        console.log("OK");
    }
    next();
}

routerProductos.get('/', async (req,res)=>{
    const prods = await productos.getAll();
    return res.status(200).json(prods);
});

routerProductos.get('/:id', middlewareGetIdNotFound, async (req,res)=>{
    let id = Number(req.params.id);
    const prod = await productos.getById(id);
    res.status(200).json(prod);
});

routerProductos.post('/', (req,res)=>{
    let obj = req.body;
    productos.save(obj)
    res.status(200).json({msg:'Producto Agregado', data: req.body});
});

routerProductos.delete('/:id', (req,res)=>{
    let id = Number(req.params.id);
    productos.deleteById(id);
    res.status(200).json({msg:'Producto Borrado'});
})

routerProductos.put('/:id', (req, res)=>{
    let id = Number(req.params.id);
    let obj = req.body;
    productos.update(id,obj);
    res.status(200).json({msg:'Producto Actualizado', new:{...req.body}});
});

export default routerProductos;