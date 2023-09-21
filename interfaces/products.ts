export interface IProduct {
    _id: string;
    description: string;
    images: string[];
    inStock: number;
    price: number;
    framed: string;
    dimensions: string;
    weight: string;
    slug: string;
    tags: string[];
    title: string;
    materials: string;
    theme: ITheme;
    category: 'paisajes-naturaleza'|'retrato-figuras'|'abstracto-contemporaneo'

    //TODO: agregar createAT y updateAT
    createAt: string;
    updateAt: string;

}

export type ITheme = 
    |'Natura'
    |'Urbano'
    |'Rural'
    |'Marino'
    |'Floral'
    |'Bodegones'
    |'Animales'
    |'Vistoso';