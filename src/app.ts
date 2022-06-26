import express, { Application } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import multer, { Multer } from 'multer';

//import categories from './routes/categories';
//import subcategories from './routes/subcategories';
import products from './routes/products';

export default class App {
    protected app: Application | null = null;
    protected upload: Multer = multer();

    constructor(protected port: number){
        this.app=express();
        this.middlewares();
        this.routes();
    }

    private middlewares(): void {
        this.app?.use(cors());
        this.app?.use(cookieParser());
        this.app?.use(express.urlencoded({extended:true}));
        this.app?.use(this.upload.none());
    }

    private routes(): void {
        //this.app?.use('/categories', categories);
        //this.app?.use('/subcategories', subcategories);
        this.app?.use('/products', products);
    }

    public async listen():Promise<void>{
        try{
            await this.app?.listen(this.port);
            console.log(`App listen on port ${this.port}!`);
        }catch(e:any){
            console.warn(e);
        }
    }
}