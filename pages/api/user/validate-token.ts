import type { NextApiRequest, NextApiResponse } from 'next';

import { db } from '@/database';
import { User } from '@/models';
import { jwt } from '@/utils';


type Data = 
|{ message: string }
|{ 
    token: string;
    user: {
        email: string;
        name: string;
        role: string;
    }
}

function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

        switch( req.method ) {
            case 'GET':
                return checkToken(req, res)

            default:
                res.status(400).json({
                    message: 'Bad request'
                })
        }
}


const checkToken = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { token = '' } = req.cookies;

    let userId = '';

    try {
        userId = await jwt.isValidToken( token );

    } catch (error) {
        return res.status(401).json({
            message: 'Token de autorizacion no es válido'
        })
    }

    await db.connect();
    const user = await User.findById( userId ).lean();
    await db.disconnect();

    if ( !user ) {
        return res.status(400).json({ message: 'Usuario no existe' })
    }

    const { _id, email, name, role } = user;

    return res.status(200).json({
        token: jwt.signToken( _id, email ),
        user: {
            email,
            name,
            role
        }
    })
}

export default handler;
