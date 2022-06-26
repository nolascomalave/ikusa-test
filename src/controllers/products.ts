import { Request, Response, ErrorRequestHandler } from 'express';
import Product from '../models/Product';

// Returns all products sorted by their names:
export async function getAll(req: Request, res: Response) {
    try{
        let products = await Product.find().sort({name: 1});

        return res.status(200).json({
            errors:null,
            data:products,
            message:'Extracted data success!'
        });
    }catch(e:any){
        return res.status(500).json({
            errors:{
                server:e.toString()
            },
            data:null,
            message:'An error has occurred on the server!'
        });
    }
};

// Return the product especified by its _id:
export async function getByID(req: Request, res: Response) {
    const {ID} = req.params;

    try{
        let product = await Product.findOne({_id:ID});

        if(!product){
            return res.status(404).json({
                errors:{
                    ID: 'ID not match!'
                },
                data:null,
                message:'Product not found!'
            });
        }

        return res.status(200).json({
            errors:null,
            data:product,
            message:'Extracted data success!'
        });
    }catch(e:any){
        return res.status(500).json({
            errors:{
                server:e.toString()
            },
            data:null,
            message:'An error has occurred on the server!'
        });
    }
};

// Return the product especified by its _id:
export async function add(req: Request, res: Response) {
    try{
        // Body ya ha sido formateado en el middleware pasado para cumplir con la estructura del producto.
        let product = new Product(req.body);

        product.save();

        return res.status(201).json({
            errors:null,
            data:product,
            message:'Product registered succesfully!'
        });
    }catch(e:any){
        return res.status(500).json({
            errors:{
                server:e.toString()
            },
            data:null,
            message:'An error has occurred on the server!'
        });
    }
};

// Update the product and return the same updated:
export async function update(req: Request, res: Response) {
    let {ID} = req.params;
    try{
        // Body ya ha sido formateado en el middleware pasado para cumplir con la estructura del producto.
        let product = await Product.findByIdAndUpdate(ID, req.body);

        // Si el producto no es encontrado retorna un mensaje de error
        if(!product){
            return res.status(404).json({
                errors:{
                    ID: 'ID not match!'
                },
                data:null,
                message:'Product not found!'
            });
        }

        return res.status(200).json({
            errors:null,
            data:product,
            message:'Product updated succesfully!'
        });
    }catch(e:any){
        return res.status(500).json({
            errors:{
                server:e.toString()
            },
            data:null,
            message:'An error has occurred on the server!'
        });
    }
};

// Delete the product:
export async function deleteById(req: Request, res: Response) {
    let {ID} = req.params;
    try{
        let product = await Product.findByIdAndRemove(ID);

        // Si el producto no es encontrado retorna un mensaje de error
        if(!product){
            return res.status(404).json({
                errors:{
                    ID: 'ID not match!'
                },
                data:null,
                message:'Product not found!'
            });
        }

        return res.status(200).json({
            errors:null,
            data:product,
            message:'Product removed succesfully!'
        });
    }catch(e:any){
        return res.status(500).json({
            errors:{
                server:e.toString()
            },
            data:null,
            message:'An error has occurred on the server!'
        });
    }
};