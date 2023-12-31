import type { NextApiRequest, NextApiResponse } from 'next';
import { isValidObjectId } from 'mongoose';

import { db } from '../../../database';
import { IProduct } from '../../../interfaces';
import { Product } from '../../../models';
import { v2 as cloudinary } from 'cloudinary';
cloudinary.config( process.env.CLOUDINARY_URL || '' );


type Data = 
| { message: string }
| IProduct[]
| IProduct | null;


function handler (req: NextApiRequest, res: NextApiResponse<Data>) {

    switch ( req.method ) {
        case 'GET':
            return getProducts( req, res );

        case 'PUT':
            return updateProduct( req, res );

        case 'POST':
            return createProduct( req, res );

        // case 'DELETE':
        //     return deleteProduct( req, res );
        
            default:
                res.status(400).json({ message: 'Bad request' });
    }
}


const getProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    await db.connect();

    const products = await Product.find()
        .sort({ title: 'asc' })
        .lean();

    await db.disconnect();

    const updatedProducts = products.map( product => {
        product.images = product.images.map( image => {
            return image.includes('http') ? image : `${ process.env.HOST_NAME}products/${ image }`
        });

        return product;
    })

    // Actualizar imagenes

    res.status(200).json( updatedProducts );
}



const updateProduct = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { _id = '', images =[] } = req.body as IProduct;

    if ( !isValidObjectId( _id ) ) {
        return res.status(400).json({ message: 'El id del producto no es válido'});
    }

    if ( images.length  < 1 ) {
        return res.status(400).json({ message: 'Se requiere la carga mínima de una imagen'});
    }



    try {
        
        await db.connect();

        const product = await Product.findById(_id);

        if (!product ) {
            await db.disconnect();
            return res.status(400).json({ message: 'No existe un producto con ese ID' })
        }


     // Eliminar fotos en Cloudinary
    
    product.images.forEach( async(image) => {
        if ( !images.includes(image) ){
             // Borrar de cloudinary
            const [ fileId, extension ] = image.substring( image.lastIndexOf('/') + 1 ).split('.')
            console.log({ image, fileId, extension });
            await cloudinary.uploader.destroy( fileId );
        }
    });

        const updatedProduct = await Product.findOneAndUpdate({ _id: product._id}, 
            req.body, { new: true });
        await db.disconnect();

        return res.status(200).json( updatedProduct )

    } catch (error) {

        console.log(error);

        await db.disconnect();
        return res.status(400).json({ message: 'Revisar la consola del servidor' });
    }
}


const createProduct = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    const { images = [] } = req.body as IProduct;

    if ( images.length < 1 ) {
        return res.status(400).json({ message: 'El producto requiere la carga de 1 imagen' });
    }
    

    
    try {
        await db.connect();
        const productInDB = await Product.findOne({ slug: req.body.slug });
        if ( productInDB ) {
            await db.disconnect();
            return res.status(400).json({ message: 'Ya existe un producto con ese slug' });
        }
        
        const product = new Product( req.body );
        await product.save();
        await db.disconnect();

        res.status(201).json( product );


    } catch (error) {
        console.log(error);
        await db.disconnect();
        return res.status(400).json({ message: 'Revisar logs del servidor' });
    }

}


// const deleteProduct = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
//     if (req.method === 'DELETE') {

//         const { id } = req.query;
        
//             if (!isValidObjectId(id)) {
//             return res.status(400).json({ message: 'ID de producto no válido' });
//             }
        
//             try {
//             await db.connect();
//             const productDeleted = await Product.findByIdAndDelete(id);
        
//             if (!productDeleted) {
//                 return res.status(404).json({ message: 'Producto no encontrado' });
//             }

//             await db.disconnect();
//             res.status(204).end(); 

//             } catch (error) {
//             console.error('Error en la solicitud de eliminación:', error);
//             await db.disconnect();
//             res.status(500).json({ message: 'Error en el servidor' });
//             }
//     }
// }

export default handler
