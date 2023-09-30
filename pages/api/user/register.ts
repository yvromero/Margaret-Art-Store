import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';

import { db } from '@/database';
import { User } from '@/models';
import { jwt, validations } from '@/utils';

type Data = 
| { message: string }
| { 
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
                return registerUser(req, res)

            default:
                res.status(400).json({
                    message: 'Bad request'
                })
        }
}

const registerUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { name = '', email = '', password = '' } = req.body as { name: string, email: string, password: string };

    if ( password.length < 8 ) {
        return res.status(400).json({
            message: 'La contraseña debe contener un mínimo de 8 caracteres'
        });
    }
    
    if ( name.length < 2 ) {
        return res.status(400).json({
            message: 'El nombre debe contener un mínimo de 2 caracteres'
        });
    }

    
    if ( !validations.isValidEmail( email ) ) {
        return res.status(400).json({
            message: 'El correo no tiene el formato esperado'
        });
    }

    await db.connect();
    const user = await User.findOne({ email });

    if ( user ) {
        return res.status(400).json({ 
            message: 'Este correo ya se encuentra registrado'
        })
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
            email,
            role,
        }
    })
}

export default handler;
