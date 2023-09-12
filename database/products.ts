interface SeedProduct {
    description: string;
    images: string[];
    inStock: number;
    price: number;
    framed: string;
    dimensions: string;
    weight: string;
    slug: string; //url de las paginas en vez de ID
    tags: string[]; //consulta a tags para busquedas
    title: string;
    materials: string;
    theme: ValidTheme;
    category: 'paisajes-naturaleza'|'retrato-figuras'|'abstracto-contemporaneo'
}

type ValidTheme = 
    |'Natura'
    |'Urbano'
    |'Rural'
    |'Marino'
    |'Floral'
    |'Bodegones'
    |'Animales'
    |'Vistoso';

interface SeedData {
    products: SeedProduct[],
}

export const initialData: SeedData = {
    products: [
        {
            description: "Esta pintura exhibe una textura rica y vívida que cobra vida a través de su relieve intrincado. Los colores, que van desde tonos profundos de azul y púrpura hasta cálidos matices de dorado y rojo, se combinan en un juego armonioso de luces y sombras. Cada trazo y relieve contribuyen a crear una obra de arte que invita a explorarla táctilmente, permitiendo que los espectadores se sumerjan en la profundidad y la energía de la pintura.",
            images: [
                'vistoso-2.jpg'
            ],
            inStock: 1,
            price: 800,
            framed: 'No',
            dimensions: '40x95cm',
            weight: '0.845g',
            slug: "la_diversion_texturizada",
            tags: ['diversión-textura','colores','manchas','trazos'],
            title: "Diversión Texturizada",
            materials: 'Lienzo',
            theme: 'Vistoso',
            category: 'abstracto-contemporaneo'
        },
        {
            description: "Ecos en 'Gris y Tierra' es una pintura al óleo de estilo abstracto que evoca una sensación de misterio y serenidad. En esta obra, tonalidades grises sutiles se mezclan con manchas terrosas, creando una atmósfera enigmática y cautivadora.",
            images: [
                'vistoso-1.jpg'
            ],
            inStock: 1,
            price: 900,
            framed: 'No',
            dimensions: '120x60cm',
            weight: '1.200g',
            slug: "ecos_en_gris_y_tierra",
            tags: ['abstracto','contemporaneo'],
            title: "Ecos en Gris y Tierra",
            materials: 'Lienzo',
            theme: 'Vistoso',
            category: 'abstracto-contemporaneo'
        },
        {
            description: " Pinceladas texturizadas de colores que sugieren formas cuadradas en una obra de arte abstracta y evocativa.",
            images: [
                'vistoso-3.jpg'
            ],
            inStock: 1,
            price: 800,
            framed: 'No',
            dimensions: '40x95cm',
            weight: '0.845g',
            slug: "la_abstraccion_texturizada",
            tags: ['abstraccion-textura','colores','cuadrados','hombre'],
            title: "Abstracción Texturizada",
            materials: 'Lienzo',
            theme: 'Vistoso',
            category: 'abstracto-contemporaneo'
        },
        {
            description: "En 'Jardín de Explosión Cromática', el espectador se sumerge en un mundo de exuberante diversidad de colores. Esta obra rebosa vitalidad y alegría con flores de tonos vivos y vibrantes que chocan y se entrelazan en una explosión de cromatismo.Cada flor parece competir por destacar en esta fiesta de color, creando una sensación de alegría y vitalidad que ilumina cualquier espacio en el que se exhiba.",
            images: [
                'floral-2.jpg'
            ],
            inStock: 1,
            price: 650,
            framed: 'No',
            dimensions: '20x50cm',
            weight: '0.600g',
            slug: "jardin_explosion_cromatica",
            tags: ['jardin','explosion-cromatica','flores','colores'],
            title: "Jardín de Explosión Cromática",
            materials: 'Lienzo',
            theme: 'Floral',
            category: 'paisajes-naturaleza'
        },
        {
            description: "En 'Sutilidad Suculenta', las suculentas son las protagonistas de una escena donde su belleza se ve realzada por un fondo esfumado. La representación detallada de estas plantas contrasta con la suavidad del fondo, creando una sensación de serenidad y equilibrio.",
            images: [
                'floral-3.jpg'
            ],
            inStock: 1,
            price: 660,
            framed: 'No',
            dimensions: '30x40cm',
            weight: '0.650g',
            slug: "sutilidad_suculenta",
            tags: ['suculentas','sutilidad-suculenta','flores'],
            title: "Sutilidad Suculenta",
            materials: 'Lienzo',
            theme: 'Floral',
            category: 'paisajes-naturaleza'
        },
        {
            description: "Las flores se entrelazan en un baile de colores y formas. La delicadeza de las flores contrasta con la riqueza de los tonos formados, creando una obra que irradia alegría y belleza natural.",
            images: [
                'floral-4.jpg'
            ],
            inStock: 1,
            price: 650,
            framed: 'No',
            dimensions: '20x50cm',
            weight: '0.600g',
            slug: "el_encanto_floral",
            tags: ['rosas', 'girasoles','flores'],
            title: "Encanto Floral",
            materials: 'Lienzo',
            theme: 'Floral',
            category: 'paisajes-naturaleza'
        },
        {
            description: "En 'Fuego Floral', el artista deslumbra con una explosión de colores cálidos que capturan la esencia de un jardín en plena efervescencia. Los tonos naranja, amarillo y rojo se mezclan en una danza vibrante de pinceladas espatuladas que crean la ilusión de un fuego ardiente entre las flores",
            images: [
                'floral-1.jpg'
            ],
            inStock: 1,
            price: 450,
            framed: 'No',
            dimensions: '45x15cm',
            weight: '0.400g',
            slug: "fuego_floral",
            tags: ['fuego-floral','flores','colores'],
            title: "Fuego Floral",
            materials: 'Lienzo',
            theme: 'Floral',
            category: 'paisajes-naturaleza'
        },
        {
            description: "Un majestuoso ramo de rosas y otras flores, lleno de colores y texturas vibrantes, que destilan belleza y elegancia en una obra cautivadora.",
            images: [
                'floral-9.jpg'
            ],
            inStock: 1,
            price: 450,
            framed: 'No',
            dimensions: '45x15cm',
            weight: '0.400g',
            slug: "el-esplendor-floral",
            tags: ['esplendor-floral','flores','colores'],
            title: "Esplendor Floral",
            materials: 'Lienzo',
            theme: 'Floral',
            category: 'paisajes-naturaleza'
        },
        {
            description: "En 'Primavera Vintage de Peonías', el artista combina la nostalgia del estilo vintage con la frescura de la primavera a través de la representación detallada de peonías en pleno florecimiento. Los tonos suaves y los matices pastel evocan una sensación de romanticismo y encanto antiguo. Esta obra transporta al espectador a un jardín de época, donde las peonías despiertan con gracia y elegancia en un mundo de belleza atemporal.",
            images: [
                'floral-8.jpg'
            ],
            inStock: 1,
            price: 650,
            framed: 'No',
            dimensions: '45x15cm',
            weight: '0.420g',
            slug: "primavera_vintage_de_peonías",
            tags: ['peonias', 'vintage-peonias','primavera-vintage-peonias'],
            title: "Primavera Vintage de Peonías",
            materials: 'Lienzo',
            theme: 'Floral',
            category: 'paisajes-naturaleza'
        },
        {
            description: "En 'Campos de Lirios Amarillos', la naturaleza se despliega en toda su espléndida simplicidad. Este cuadro evoca la serenidad y la paz que se encuentran en los vastos campos de lirios amarillos. La paleta de tonos amarillos suaves crea una atmósfera luminosa y reconfortante que invita a la contemplación y la calma.",
            images: [
                'floral-6.jpg'
            ],
            inStock: 1,
            price: 650,
            framed: 'No',
            dimensions: '25x60cm',
            weight: '0.710g',
            slug: "campos_de_lirios_amarillos",
            tags: ['lirios', 'campos_amarillos','lirios-amarillos','flores-amarillas','flores'],
            title: "Campos de Lirios Amarillos",
            materials: 'Lienzo',
            theme: 'Floral',
            category: 'paisajes-naturaleza'
        },
        {
            description: "La pintura 'Elegancia en Rosa' retrata la delicadeza y la sofisticación de una peonía en plena floración. Con tonos rosados suaves y detalles meticulosos, esta obra capta la belleza atemporal de esta flor. Cada pincelada resalta la exquisita textura de los pétalos y la serenidad que emana de esta peonía, convirtiéndola en una pieza artística que evoca una sensación de calma y admiración.",
            images: [
                'floral-5.jpg'
            ],
            inStock: 1,
            price: 650,
            framed: 'No',
            dimensions: '25x40cm',
            weight: '0.600g',
            slug: "encanto_floral",
            tags: ['peonia', 'peonia-rosa','peonia-serena', 'flor-rosada','flores'],
            title: "Peonia Serena",
            materials: 'Lienzo',
            theme: 'Floral',
            category: 'paisajes-naturaleza'
        },
        {
            description: "En 'Resplandor de Girasoles', la energía y vitalidad de los girasoles son capturadas de manera única mediante pinceladas espatuladas. La obra irradia la luminosidad y la alegría característica de estas flores icónicas. Los colores vibrantes y las texturas audaces dan vida a un campo de girasoles en constante movimiento, invitando al espectador a sumergirse en su cálido resplandor.",
            images: [
                'floral-7.jpg'
            ],
            inStock: 1,
            price: 650,
            framed: 'No',
            dimensions: '25x60cm',
            weight: '0.720g',
            slug: "resplandor_de_girasoles",
            tags: ['girasoles', 'resplandor-girasoles','flores-amarillas','flores'],
            title: "Resplandor de Girasoles",
            materials: 'Lienzo',
            theme: 'Floral',
            category: 'paisajes-naturaleza'
        },
        {
            description: "La pintura 'Travesía al Atardecer' captura la serenidad de un escenario en el que un sol naranja se sumerge en un mar de tonos marinos. Un barco solitario navega hacia el horizonte, rodeado por la suave y cálida luz del atardecer. Esta obra transmite una sensación de paz y reflexión, invitando al espectador a embarcarse en un viaje de contemplación y calma mientras el día llega a su fin.",
            images: [
                'marino-1.jpg'
            ],
            inStock: 1,
            price: 640,
            framed: 'No',
            dimensions: '25x45cm',
            weight: '0.550g',
            slug: "travesia_al_atardecer",
            tags: ['travesia','marino','mar','atardecer','barcos'],
            title: "Travesía al Atardecer",
            materials: 'Lienzo',
            theme: 'Marino',
            category: 'paisajes-naturaleza'
        },
        {
            description: "En 'Barcos Pesqueros en Reposo', la escena del puerto cobra vida con la presencia tranquila de los barcos pesqueros. Estos barcos, desgastados por el trabajo en el mar, descansan en el puerto mientras el día avanza. La pintura captura la esencia de la vida portuaria, transmitiendo una sensación de comunidad y la laboriosa rutina de los pescadores. La paleta de colores evoca la autenticidad y el encanto de un puerto en un momento de pausa y serenidad.",
            images: [
                'marino-2.jpg'
            ],
            inStock: 1,
            price: 570,
            framed: 'No',
            dimensions: '40x40cm',
            weight: '0.420g',
            slug: "barcos_pesqueros_en_reposo",
            tags: ['barcos','marina','mar','puerto','pesqueros'],
            title: "Barcos Pesqueros en Reposo",
            materials: 'Lienzo',
            theme: 'Marino',
            category: 'paisajes-naturaleza'
        },
        {
            description: "En 'Encuentro en la Incertidumbre', la técnica espatulada crea una atmósfera en la que un atardecer naranja y azul marino baña a personas distantes que se acercan en medio de la marea. A pesar de no ver sus expresiones, la composición evoca una profunda sensación de incertidumbre y anticipación. La marea creciente y el atardecer inminente se combinan para simbolizar un momento de cambio y desafío, donde los protagonistas avanzan hacia un futuro incierto en medio de la belleza natural pero desconcertante del mar.",
            images: [
                'marino-3.jpg'
            ],
            inStock: 1,
            price: 670,
            framed: 'No',
            dimensions: '25x45cm',
            weight: '0.530g',
            slug: "atardecer_de_alta_mar",
            tags: ['atardecer','travesia','marino','barcos','marea'],
            title: "Atardecer en Alta Mar",
            materials: 'Lienzo',
            theme: 'Marino',
            category: 'paisajes-naturaleza'
        },
        {
            description: "En 'Navegando hacia el Sol', el artista utiliza la técnica espatulada para crear una escena impresionante en la que un sol naranja ilumina un barco solitario en medio del mar. Las montañas difusas en el fondo añaden profundidad y misterio a la obra, mientras la luz dorada del sol acaricia suavemente la escena. La pintura transmite una sensación de esperanza y aventura, ya que el barco navega hacia el horizonte, dispuesto a enfrentar los desafíos desconocidos del viaje.",
            images: [
                'marino-4.jpg'
            ],
            inStock: 1,
            price: 650,
            framed: 'No',
            dimensions: '25x45cm',
            weight: '0.550g',
            slug: "navegando_hacia_el_sol",
            tags: ['navegando','sol','travesia','marino','barco','montañas','atardecer'],
            title: "Navegando hacia el Sol",
            materials: 'Lienzo',
            theme: 'Marino',
            category: 'paisajes-naturaleza'
        },
        {
            description: "En 'Soledad en la Niebla', el artista emplea la técnica espatulada para crear una escena evocadora en la que un solitario hombre se encuentra en medio de la inmensidad del mar y la niebla. El cielo y el mar se mezclan en tonos amarillo gris platinado y azul, creando una sensación de misterio y aislamiento. La obra transmite la idea de la soledad del individuo en la vastedad del entorno natural, evocando emociones de reflexión y contemplación en medio de la incertidumbre del horizonte.",
            images: [
                'marino-5.jpg'
            ],
            inStock: 1,
            price: 690,
            framed: 'No',
            dimensions: '25x45cm',
            weight: '0.550g',
            slug: "soledad_en_la_niebla",
            tags: ['navegando','niebla','travesia','marino','barco'],
            title: "Soledad en la Niebla",
            materials: 'Lienzo',
            theme: 'Marino',
            category: 'paisajes-naturaleza'
        },
        {
            description: "En 'Amanecer en Velero', el artista utiliza la técnica espatulada para capturar la belleza serena de un barco velero navegando en aguas cristalinas al amanecer. El cielo, pintado con pinceladas difuminadas, sugiere la llegada de un nuevo día con tonos suaves y cálidos. La pintura transmite una sensación de paz y esperanza mientras el velero avanza con gracia a través de las tranquilas aguas, simbolizando el comienzo de una nueva aventura bajo la suave luz del amanecer.",
            images: [
                'marino-6.jpg'
            ],
            inStock: 1,
            price: 680,
            framed: 'No',
            dimensions: '25x45cm',
            weight: '0.550g',
            slug: "el_amanecer_en_el_velero",
            tags: ['velero', 'amanecer','barco','mar-cristalino','cielo'],
            title: "Amanecer en Velero",
            materials: 'Lienzo',
            theme: 'Marino',
            category: 'paisajes-naturaleza'
        },
        {
            description: "En 'Otoño Reflejado en el Río', la escena natural se transforma en un paisaje de temporada. Un río puro y cristalino serpentea a través de la naturaleza circundante. Las ramas que se extienden desde los árboles sin hojas se reflejan delicadamente en la superficie del agua, creando un efecto de calma y serenidad. Algunos árboles exhiben hojas en tonos blancos, naranjas, rosas suaves y amarillos, revelando la paleta de colores característica del otoño. Esta pintura captura la esencia de un otoño húmedo y apacible.",
            images: [
                'natura-2.jpg'
            ],
            inStock: 1,
            price: 540,
            framed: 'No',
            dimensions: '30x20cm',
            weight: '0.470g',
            slug: "sueños_de_un_eco_otoñal",
            tags: ['rio','otoño','neblina','árboles','ramas'],
            title: "Sueños de un eco otoñal",
            materials: 'Lienzo',
            theme: 'Natura',
            category: 'paisajes-naturaleza'
        },
        {
            description: "En 'El Roble Rosa junto al Río', el artista transporta al espectador a un paisaje montañoso donde un majestuoso roble de hojas rosadas se alza al lado de un río sereno. La niebla envuelve las montañas distantes y los pinos a lo lejos, creando un aura de misterio. El roble, con sus hojas en tonos rosados, es el punto focal de la composición y simboliza la esperanza de la primavera que está por llegar. La pintura transmite una sensación de belleza tranquila y anticipación en medio de la neblina y la serenidad del río.",
            images: [
                'natura-1.jpg'
            ],
            inStock: 1,
            price: 540,
            framed: 'No',
            dimensions: '30x20cm',
            weight: '0.470g',
            slug: "amanecer_en_el_velero",
            tags: ['árbol-rosa','rio','neblina','montañas','pino'],
            title: "Misterio en las Montañas",
            materials: 'Lienzo',
            theme: 'Natura',
            category: 'paisajes-naturaleza'
        },
        {
            description: "Esta pintura evoca una escena tranquila que representa el paso del tiempo. Las flores emergen de aguas estancadas en el terreno, simbolizando la belleza y la renovación que pueden surgir incluso en lugares aparentemente inertes. El cuadro captura la armonía entre el flujo y la quietud, invitando a la reflexión sobre el ciclo de la vida y la naturaleza en constante cambio",
            images: [
                'natura-3.jpg'
            ],
            inStock: 1,
            price: 670,
            framed: 'No',
            dimensions: '40x85cm',
            weight: '0.540g',
            slug: "transicion_serena",
            tags: ['serena','flores-silvestres','agua','estanque'],
            title: "Transición Serena",
            materials: 'Lienzo',
            theme: 'Natura',
            category: 'paisajes-naturaleza'
        },
        {
            description: "En 'Vibrante vida urbana', la representación abstracta cobra vida con calles bulliciosas y personajes coloridos bajo cada edificio que albergan tiendas. Esta obra captura la energía vibrante de una era marcada por el cambio y la extravagancia, donde las calles están llenas de vida y la ciudad se convierte en un escenario para personajes memorables.",
            images: [
                'urbano-3.jpg'
            ],
            inStock: 1,
            price: 820,
            framed: 'No',
            dimensions: '40x85cm',
            weight: '0.735g',
            slug: "vibrante-vida-urbana",
            tags: ['otra-época','urbana','colores','personas','edificios','calles'],
            title: "Vibrante Vida Urbana",
            materials: 'Lienzo',
            theme: 'Urbano',
            category: 'retrato-figuras'
        },
        {
            description: "En 'Ecos de Otra Época en Espatulado', el artista transporta al espectador a un comedor que parece anclado en el pasado. Los tonos cálidos de tierra, naranjas y amarillos crean una atmósfera nostálgica. Las mesas y sillas evocan un encanto vintage, mientras las ventanas y los cuadros parecen llevarnos a otra era. Esta obra captura la esencia de un lugar donde el tiempo parece detenerse, invitando a la reflexión y la nostalgia por tiempos pasados.",
            images: [
                'urbano-1.jpg'
            ],
            inStock: 1,
            price: 810,
            framed: 'No',
            dimensions: '42x85cm',
            weight: '0.710g',
            slug: "ecos_de_otra_epoca_en_espatulado",
            tags: ['otra-época','espatulado','mesas','bar','ventanas'],
            title: "Ecos de Otra Época en Espatulado",
            materials: 'Lienzo',
            theme: 'Urbano',
            category: 'retrato-figuras'
        },
        {
            description: "En 'Callejón de Colores y Recuerdos',  captura una escena donde casas en tonos pasteles, con persianas exhiben techos de tienda. En el pintoresco escenario, las personas pasean vestidas con gorritos de épocas pasadas. Esta obra fusiona la nostalgia con la vida contemporánea, creando un espacio donde los colores y las personas evocan recuerdos de tiempos que ya pasaron, pero que aún están presentes en el corazón de la ciudad.",
            images: [
                'urbano-2.jpg'
            ],
            inStock: 1,
            price: 800,
            framed: 'No',
            dimensions: '40x87cm',
            weight: '0.715g',
            slug: "callejon-de-colores-y-recuerdos",
            tags: ['otra-época','callejón','colores','personas','casas','techos'],
            title: "Callejón de Colores y Recuerdos",
            materials: 'Lienzo',
            theme: 'Urbano',
            category: 'retrato-figuras'
        },
        {
            description: "En 'Alegría en Movimiento', el artista captura la esencia de un pastor alemán corriendo con felicidad. Las pinceladas dinámicas y enérgicas transmiten la alegría y la vitalidad de este peludo amigo en movimiento, celebrando la belleza y la inocencia de su espíritu juguetón.",
            images: [
                'animales-1.jpg'
            ],
            inStock: 1,
            price: 640,
            framed: 'No',
            dimensions: '25x25cm',
            weight: '0.430g',
            slug: "alegria_en_movimiento",
            tags: ['perro','animales','plenitud','alegría','peludo','pastor-alemán'],
            title: "Alegría en Movimiento",
            materials: 'Lienzo',
            theme: 'Animales',
            category: 'retrato-figuras'
        },
        {
            description: "En 'Delicias en la Mesa', el artista rinde homenaje a los detalles más finos de la vida cotidiana. Un pan cuidadosamente cortado, una jarra de miel transparente adornada con flores pintadas que parecen margaritas y una taza de té reposan sobre un plato. Cada elemento es una obra de arte por sí mismo, y juntos crean una escena que celebra la belleza en la simplicidad.",
            images: [
                'bodegon-1.jpg'
            ],
            inStock: 1,
            price: 810,
            framed: 'No',
            dimensions: '40x85cm',
            weight: '0.730g',
            slug: "delicias_en_la_mesa",
            tags: ['pan','miel','jarra','vaso','plato','té','mesa','hojas-de-menta'],
            title: "Delicias en la Mesa",
            materials: 'Lienzo',
            theme: 'Bodegones',
            category: 'retrato-figuras'
        },
        {
            description: "En 'El Enigma de las Ruedas', la pintura desafía al espectador a descifrar el significado oculto detrás de esta escena intrigante, donde el hombre y las ruedas se funden en un enigma visual cautivador.",
            images: [
                'urbano-4.jpg'
            ],
            inStock: 1,
            price: 820,
            framed: 'No',
            dimensions: '45x45cm',
            weight: '0.645g',
            slug: "el-enigma-de-las-ruedas",
            tags: ['estilo-ecléctico','azul y negro','ruedas','hombre'],
            title: "El Enigma de las Ruedas",
            materials: 'Lienzo',
            theme: 'Urbano',
            category: 'retrato-figuras'
        },

    ]

};