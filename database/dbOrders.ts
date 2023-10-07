import { IOrder } from "@/interfaces";
import { isValidObjectId } from "mongoose";
import { db } from ".";
import { Order } from "@/models";

export const getOrderById = async ( id: string ): Promise<IOrder | null> => {

    if ( !isValidObjectId(id) ) {
        return null;
    }

    await db.connect();
    const order = await Order.findById( id ).lean();

    if ( !order ) {
        return null;
    }

    return JSON.parse(JSON.stringify(order));
}