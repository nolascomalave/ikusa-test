import { Request, Response, ErrorRequestHandler, NextFunction } from 'express';
import HandleErrors from '../util/HandlerErrors';
import { validateSimpleText, validateCuantity } from '../util/validators';
import { cleanSpaces, ssre } from '../util/formats';
import Product from '../models/Product';

export async function handlerAdd(req: Request, res: Response, next: NextFunction){
    let {name, brand, min_stock, initial_stock, category, subcategory} = req.body;
    let errors = new HandleErrors(), exist: boolean = false;

    errors.set('name', validateSimpleText(name, 'name', 2, 25, true));
    errors.set('brand', validateSimpleText(brand, 'brand', 2, 25));
    errors.set('category', validateSimpleText(category, 'category', 2, 25));
    errors.set('subcategory', validateSimpleText(subcategory, 'subcategory', 2, 25));

    errors.set('minimum stock', validateCuantity({
        num: min_stock,
        name: 'minimum stock',
        min: 0,
        int: true
    }));

    errors.set('initial stock', validateCuantity({
        num: initial_stock,
        name: 'initial stock',
        min: min_stock,
        int: true,
        required: true
    }));

    // Verifica si existe un producto con el mismo nombre, la misma marca, la misma categoría y la misma subcategoría:
    if(!errors.getErrors()){
        name = cleanSpaces(name);
        brand = !!brand ? cleanSpaces(brand) : null;
        category = !!category ? cleanSpaces(category) : null;
        subcategory = !!subcategory ? cleanSpaces(subcategory) : null;

        try{
            let product: any = await Product.findOne({
                $and:[
                    {name: name},
                    {brand: brand},
                    {subcategory: subcategory},
                    {category: category}
                ]
            });

            exist = !!product;

            if(exist) errors.set('name', 'The product already exists!');
        }catch(e:any){
            // responde con datos en nulo, un mensaje general y los errores.
            return res.status(500).json({
                errors:{
                    server:e.toString()
                },
                data:null,
                message:'An error has occurred on the server!'
            });
        }
    }

    // responde al cliente con los errores si hay errores en la data requerida
    if(!!errors.getErrors()){
        return res.status(406).json({
            errors:errors.getErrors(),
            data:null,
            message:'Errors in the required data!'
        });
    }

    // Limpia el body y lo deja listo para crear un nuevo producto directamente con el mismo:
    req.body = {
        name,
        brand,
        stock:{
            min: min_stock,
            quantity: initial_stock
        },
        subcategory,
        category
    };

    return next();
}

export async function handlerUpdate(req: Request, res: Response, next: NextFunction){
    let {name, brand, min_stock, initial_stock, category, subcategory} = req.body;
    let {ID} = req.params;
    let errors = new HandleErrors(), exist: boolean = false;

    if(!ID) errors.set('ID', 'The ID product is required');

    errors.set('name', validateSimpleText(name, 'name', 2, 25, true));
    errors.set('brand', validateSimpleText(brand, 'brand', 2, 25));
    errors.set('category', validateSimpleText(category, 'category', 2, 25));
    errors.set('subcategory', validateSimpleText(subcategory, 'subcategory', 2, 25));

    errors.set('minimum stock', validateCuantity({
        num: min_stock,
        name: 'minimum stock',
        min: 0,
        int: true
    }));

    errors.set('initial stock', validateCuantity({
        num: initial_stock,
        name: 'initial stock',
        min: min_stock,
        int: true,
        required: true
    }));

    // Verifica si existe un producto con el mismo nombre, la misma marca, la misma categoría y la misma subcategoría:
    if(!errors.getErrors()){
        name = cleanSpaces(name);
        brand = !!brand ? cleanSpaces(brand) : null;
        category = !!category ? cleanSpaces(category) : null;
        subcategory = !!subcategory ? cleanSpaces(subcategory) : null;

        try{
            let product: any = await Product.findOne({
                $and:[
                    {_id: {$ne: ID}},
                    {name: name},
                    {brand: brand},
                    {subcategory: subcategory},
                    {category: category}
                ]
            });

            exist = !!product;

            if(exist) errors.set('name', 'The product already exists!');
        }catch(e:any){
            // responde con datos en nulo, un mensaje general y los errores.
            return res.status(500).json({
                errors:{
                    server:e.toString()
                },
                data:null,
                message:'An error has occurred on the server!'
            });
        }
    }

    // responde al cliente con los errores si hay errores en la data requerida
    if(!!errors.getErrors()){
        return res.status(406).json({
            errors:errors.getErrors(),
            data:null,
            message:'Errors in the required data!'
        });
    }

    // Limpia el body y lo deja listo para crear un nuevo producto directamente con el mismo:
    req.body = {
        name,
        brand,
        stock:{
            min: min_stock,
            quantity: initial_stock
        },
        subcategory,
        category
    };

    return next();
}