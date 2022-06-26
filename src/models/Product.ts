import mongoose, { Schema, model } from 'mongoose';

export interface Product extends mongoose.Document {
    name: {
        type: any;
        required:boolean;
    };
    brand: string;
    stock: {
        min: {
            type: any;
            default: number;
        };
        quantity: {
            type: any;
            required: boolean;
            default: number;
        }
    };
    category: string;
    subcategory: string;
};

const ProductSchema = new Schema({
    name: {
        type:String,
        required:true
    },
    brand: String,
    stock: {
        min: {
            default:0,
            type:Number
        },
        quantity: {
            type: Number,
            required: true,
            default:0
        }
    },
    category: String,
    subcategory: String
}, {
    timestamps:true,
    versionKey:false
});

export default model<Product>('Product', ProductSchema);