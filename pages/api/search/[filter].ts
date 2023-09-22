import type { NextApiRequest, NextApiResponse } from 'next';
import { Product } from '../../../models';
import { db } from '../../../database';
import { IProduct } from '@/interfaces';


type Data = 
| { message: string }
| IProduct[]

function handler (req: NextApiRequest, res: NextApiResponse<Data>) {

    switch( req.method ) {

        case 'GET':
            return searchProducts( req, res )

        default:
            return res.status(400).json({
                message: 'Bad request'
            })
    }


}


const searchProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    let { filter = '' } = req.query;

    if ( filter.length === 0 ) {
        return res.status(400).json({
            message: 'Debe especificar el filtro de búsqueda'
        })
    }

    filter = filter.toString().toLowerCase()

    await db.connect();

    const products = await Product.find({
        $text: { $search: filter }
    })
    .select('title tags images price inStock slug -_id')
    .lean();


    await db.disconnect();


    return res.status(200).json(products);
}

export default handler;
