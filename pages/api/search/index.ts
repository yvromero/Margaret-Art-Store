import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    message: string
}

function handler (req: NextApiRequest, res: NextApiResponse<Data>) {
    res.status(400).json({ message: 'Debe especificar el filtro de búsqueda' })
}

export default handler;