import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/database';
import { Order, Product, User } from '@/models';

type Data = {
    numberOfOrders       : number; // total orders
    paidOrders           : number; // paid true
    pendingOrders        : number; // paid false
    numberOfClients      : number; // role client
    numberOfProducts     : number; // quantity
    productsZero         : number; // 0 stock
    //salesMonth          : number;
    productsByCatNature  : number;
    productsByCatFigure  : number;
    productsByCatAbstract: number;
}

async function handler (req: NextApiRequest, res: NextApiResponse<Data>) {

    await db.connect();
    const [
        numberOfOrders, 
        paidOrders,          
        pendingOrders,       
        numberOfClients,      
        numberOfProducts,
        productsZero, 
        //salesMonth,           
        productsByCatNature,       
        productsByCatFigure,       
        productsByCatAbstract,       

    ] = await Promise.all([
        Order.count(),
        Order.find({ isPaid: true }).count(),
        Order.find({ isPaid: false }).count(),
        User.find({ role: 'client'}).count(),
        Product.count(),
        Product.find({ inStock: 0 }).count(),
        // Order.aggregate([
        //     {
        //       $match: {
        //         isPaid: true,
        //         createdAt: {
        //           $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        //           $lte: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
        //         },
        //       },
        //     },
        //     {
        //       $group: {
        //         _id: null,
        //         totalNumberOfItems: { $sum: '$numberOfItems' },
        //       },
        //     },
        //   ])
        //   .then(result => {
        //     // Haz lo que necesites con result[0].totalNumberOfItems en tu API
        //   }),
        Product.find({ category: 'paisajes-naturaleza'}).count(),
        Product.find({ category: 'retrato-figuras'}).count(),
        Product.find({ category: 'abstracto-contemporaneo'}).count(),

    ])

    await db.disconnect();


    res.status(200).json({
        numberOfOrders,
        paidOrders,     
        pendingOrders,     
        numberOfClients,    
        numberOfProducts,
        productsZero,   
        //salesMonth,     
        productsByCatNature,   
        productsByCatFigure,      
        productsByCatAbstract,      

    })
}


export default handler