import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';

import { db } from '@/database';
import { User } from '@/models';
import { jwt } from '@/utils';
import { IUser } from '@/interfaces';


type Data = 
|{ message: string }
|{ 
    token: string;
    user: {
        name: string;
        email: string;
        role: string;
    }
}

function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

        switch( req.method ) {
            case 'POST':
                return loginUser(req, res)

            default:
                res.status(400).json({
                    message: 'Bad request'
                })
        }
}


const loginUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { email = '', password = '' } = req.body as IUser;//prueba

    await db.connect();
    const user = await User.findOne({ email });
    await db.disconnect();

    if ( !user ) {
        return res.status(400).json({ message: 'Correo o contraseña no válidos - Email'})
    }

    if ( !bcrypt.compareSync( password, user.password! ) ) {
        return res.status(400).json({ message: 'Correo o contraseña no válidos - Password'})
    }

    const { name, role, _id } = user;

    const token = jwt.signToken( _id, email );

    return res.status(200).json({
        token, //jwt
        user: {
            name, email, role
        }
    })
}

export default handler;



