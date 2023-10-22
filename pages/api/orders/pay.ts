import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios';
import { IPaypal } from '@/interfaces';
import { db } from '../../../database';
import { Order, Product } from '../../../models';



type Data = {
    message: string
}

function handler (req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch ( req.method ) {
        case 'POST':
            return payOrder ( req, res );

        default:
            return res.status(400).json({ message: 'Bad request'})
    }
}

const getPaypalBearerToken = async():Promise<string|null>=> {

    const PAYPAL_CLIENT= process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
    const PAYPAL_SECRET= process.env.PAYPAL_SECRET;

    const base64Token = Buffer.from(`${ PAYPAL_CLIENT }:${ PAYPAL_SECRET }`, 'utf-8').toString('base64');
    const body = new URLSearchParams('grant_type=client_credentials');

    try {
        
        const { data } = await axios.post( process.env.PAYPAL_OAUTH_URL || '', body, {
            headers: {
                'Authorization': `Basic ${ base64Token }`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        return data.access_token;

    } catch (error) {
        if ( axios.isAxiosError(error) ) {
            console.log(error.response?.data);
        } else {
            console.log(error);
        }
        return null;
    }
}


const payOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

   // Validar que la sesion corresponda al usuario que genero la orden

    const paypalBearerToken = await getPaypalBearerToken();

    if ( !paypalBearerToken ) {
        return res.status(400).json({ message: 'No se pudo generar el token de transacción'})
    }

    // Realizar la peticion con el token para confirmar con Paypal el estado de la operacion
    const { transactionId = '', orderId = '' } = req.body;

    // Validar que el estado de la transaccion en Paypal sea Completado
    const { data } = await axios.get<IPaypal.PaypalOrderStatusResponse> (`${ process.env.PAYPAL_ORDERS_URL }/${ transactionId }`, {
        headers: {
            'Authorization': `Bearer ${ paypalBearerToken }`, 
        }
    });
    
    if ( data.status !== 'COMPLETED' ) {
        return res.status(401).json({ message: 'Orden no reconocida' })
    }

    // Validar que la orden en Mongo se haya generado
    await db.connect();
    const dbOrder = await Order.findById( orderId );

    if ( !dbOrder ) {
    await db.disconnect();
        return res.status(401).json({ message: 'Orden no encontrada en la base de datos' });
    }

    // Validar que monto el monto de la orden en Mongo sea el mismo que el monto de la transaccion
    if ( dbOrder.total !== Number(data.purchase_units[0].amount.value) ) {
        await db.disconnect();
        return res.status(400).json({ message: 'El monto del pago no corresponde con el monto de la orden generada'});

    }

     // Validar stock para cada producto en el pedido y restar la cantidad llevada del stock
     for (const orderItem of dbOrder.orderItems) {
        const dbProduct = await Product.findById(orderItem._id);

    // Verificar que el id del producto exista y el stock mayor a la cantidad llevada
        if (!dbProduct || dbProduct.inStock < orderItem.quantity) {
            await db.disconnect();
            return res.status(400).json({ message: 'No hay suficiente stock disponible para uno o más productos en el pedido' });
        }

    // Restar la cantidad del stock de cada producto
        dbProduct.inStock -= orderItem.quantity;
        await dbProduct.save();
    }

            
        dbOrder.transactionId = transactionId;
        dbOrder.isPaid = true;//Actualizar a true
        await dbOrder.save(); 

        await db.disconnect();


    return res.status(200).json({ message: 'Transacción completada' })
}

export default handler;