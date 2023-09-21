import { IProduct } from '@/interfaces';
import mongoose, { Schema, model, Model } from 'mongoose';


const productSchema = new Schema({
    description: { type: String, required: true },
    images: [{ type: String }],
    inStock: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true, default: 0 },
    framed: {
        type: String,
        enum: ['SI', 'NO'],
        required: true
    },
    dimensions: { type: String, required: true },
    weight: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    tags: [{ type: String }],
    title: { type: String, required: true },
    materials: { type: String, required: true },
    theme:{
        type: String,
        enum: {
            values:[
                'Natura',
                'Urbano',
                'Rural',
                'Marino',
                'Floral',
                'Bodegones',
                'Animales',
                'Vistoso'
            ],
            message: '{VALUE} no es un tema válido'
        }
    },
    category:{
        type: String,
        enum: {
            values:[
                'paisajes-naturaleza',
                'retrato-figuras',
                'abstracto-contemporaneo'
            ],
            message: '{VALUE} no es una categoría válida'
        }
    }
},{
        timestamps: true
});

//TODO: Crear indice de MONGO

const Product: Model<IProduct> = mongoose.models.Product || model('Product', productSchema);

export default Product;