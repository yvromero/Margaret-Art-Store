import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { db } from '@/database';
import { IOrder } from '@/interfaces';
import { Order, Product } from '../../../models';

type Data = 
| { message: string }
| IOrder;

function handler (req: NextApiRequest, res: NextApiResponse<Data>) {

    switch( req.method ) {
        case 'POST':
            return createOrder( req, res );

        default:
            return res.status(400).json({ message: 'Bad request' })
    }

}

const createOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    

    const { orderItems, total } = req.body as IOrder;

    // Verificar sesion del usuario

    const session: any = await getServerSession(req, res, authOptions);

        if ( !session ) {
            return res.status(401).json({message:'Debe estar autenticado para realizar la operación'})
        }

    // Crear un arreglo con los productos que la persona quiere

    const productsIds = orderItems.map( product => product._id );
    await db.connect();


    const dbProducts = await Product.find({ _id: { $in: productsIds } });

    try {

        const subTotal = orderItems.reduce( ( prev, current ) => {
            const currentPrice = dbProducts.find( prod => prod.id === current._id )?.price;
            if ( !currentPrice ) {
                throw new Error('Verifique el carrito de nuevo, el producto no existe');
            }

            return (currentPrice * current.quantity) + prev
        }, 0 );


    const taxRate =  Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);
    const backendTotal = subTotal + (subTotal * taxRate) ;

        if ( total !== backendTotal ) {
            throw new Error('El total no corresponde con el monto a pagar');
        }



    // Todo bien hasta este punto

    const userId = session.user._id;
    const newOrder = new Order({ ...req.body, isPaid: false, user: userId });
    await newOrder.save();
    await db.disconnect();
    
    return res.status(201).json( newOrder );


    } catch (error:any) {
        await db.disconnect();
        console.log(error);
        res.status(400).json({
            message: error.message || 'Revise logs del servidor'
        })
    }

    // return res.status(201).json(req.body);
}

export default handler;