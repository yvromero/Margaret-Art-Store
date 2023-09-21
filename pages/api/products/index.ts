import type { NextApiRequest, NextApiResponse } from 'next';
import { db, SHOP_CONSTANTS } from '../../../database';
import { Product } from '../../../models';
import { IProduct } from '../../../interfaces/products';


type Data = 
| {message: string}
| IProduct[]


function handler (req: NextApiRequest, res: NextApiResponse<Data>) {

    switch( req.method ){
        case 'GET':
            return getProducts( req, res )

        default:
            return res.status(400).json({
                message: 'Bad request'
            })
    }
}


const getProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { category = 'all' } = req.query;

    let condition = {};

    if ( category !== 'all' && SHOP_CONSTANTS.validCategory.includes(`${category}`)) {
        condition = { category };
    }
    

    await db.connect();
    const products = await Product.find(condition)
                                .select('title images price inStock slug -_id')
                                .lean();
    await db.disconnect();

    return res.status(200).json( products );
}


export default handler;