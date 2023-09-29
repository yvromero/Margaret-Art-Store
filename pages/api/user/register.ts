import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';

import { db } from '@/database';
import { User } from '@/models';
import { jwt } from '@/utils';


type Data = 
| { message: string }
| { 
    token: string;
    user: {
        email: string;
        name: string;
        role: string;
    }
}

function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

        switch( req.method ) {
            case 'POST':
                return registerUser(req, res)

            default:
                res.status(400).json({
                    message: 'Bad request'
                })
        }
}


const registerUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { email = '', password = '', name = '' } = req.body as { email: string, password: string, name: string };

    if ( password.length < 8 ) {
        return res.status(400).json({
            message: 'La contraseña debe contener un mínimo de 8 caracteres'
        });
    }
    
    if ( name.length < 3 ) {
        return res.status(400).json({
            message: 'El nombre debe contener un mínimo de 2 caracteres'
        });
    }

    
    //TODO: validar email
    // if ( email.length < 3 ) {
    //     return res.status(400).json({
    //         message: 'El nombre debe contener un mínimo de 2 caracteres'
    //     });
    // }

    await db.connect();
    const user = await User.findOne({ email });
    
    if ( user ) {
        await db.disconnect();
        return res.status(400).json({ message: 'Este correo ya se encuentra registrado'})
    }




    const newUser = new User({
        email: email.toLowerCase(),
        password: bcrypt.hashSync( password ),
        role: 'client',
        name,
    });
    
    try {
        await newUser.save({ validateBeforeSave: true });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Revisar logs del servidor'
        })
        
    }
    const { _id, role } = newUser;

    const token = jwt.signToken( _id, email );

    return res.status(200).json({
        token, //jwt
        user: {
            name,
            role,
            email,
        }
    })
}

export default handler;
