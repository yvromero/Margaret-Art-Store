export interface ICartProduct {
    _id: string;
    image: string;
    price: number;
    framed: string;
    dimensions: string;
    slug: string;
    title: string;
    category: 'paisajes-naturaleza'|'retrato-figuras'|'abstracto-contemporaneo';
    quantity: number;
}