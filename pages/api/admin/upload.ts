import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import fs from 'fs';

type Data ={
    message: string
}

export const config = {
    api: {
        bodyParser: false,
    }
}
function handler (req: NextApiRequest, res: NextApiResponse<Data>) {

        switch (req.method) {
            case 'POST':

                return uploadFile( req, res );

            default:
                res.status(400).json({ message: 'Bad request' });
        }
}

const parseFiles = async (req: NextApiRequest) => {

}

const uploadFile = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    await parseFiles(req);
    res.status(200).json({ message: 'Imagen subida exitosamente' });
}


export default handler
