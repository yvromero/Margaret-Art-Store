import { Navbar } from '@/components/ui';
import Footer from '@/components/ui/Footer';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from '@mui/material';

const AboutPage: React.FC = () => {
  return (
    <>
      <Navbar />
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '100vh',
          overflow: 'hidden',
          backgroundImage: 'url("/darkbrushes.webp")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Container
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            color: 'whitesmoke',
          }}
        >
          <Typography variant='h3' align='center' gutterBottom>
            Bienvenido a Margaret Art Store
          </Typography>
          <Typography variant='h1' align='center' paragraph>
            Conoce al artista Margarita Ruiz
          </Typography>
          <Box display='flex' justifyContent='center' mt={4}>
            <Button variant='contained' color='primary' href='/'>
              Ir a la galeria
            </Button>
          </Box>
        </Container>
      </Box>

      <Container sx={{ mt: 15 }}>
        <Typography variant='h1' align='center' gutterBottom>
          Margaret Art Store
        </Typography>
        <Typography variant='body1' align='center' gutterBottom>
          ¡Hola! Soy <strong>Margarita Ruiz</strong> (fundadora y directora de
          Margaret Art Store) y junto con mis colaboradores. ¡Te invitamos a que
          conozcas nuestro proyecto!
        </Typography>
        <Typography variant='body1' align='center' gutterBottom paragraph>
        <strong>Margaret Art Store </strong> tiene sus raíces en el año 2008, cuando inició como
          una galería física en Paraguay. Sin embargo, la evolución y adaptación
          a las circunstancias cambiantes se volvieron esenciales. La galería,
          consciente de la importancia de expandir su alcance, ha tomado la
          decidida acción de embarcarse en el mundo virtual.
        </Typography>
        <Typography variant='body1' align='center' gutterBottom paragraph>
          Esta transformación no solo representa un cambio en la forma en que la
          galería presenta sus obras, sino también una respuesta a la creciente
          demanda de accesibilidad y apreciación del arte desde diversos
          rincones del mundo.
        </Typography>
        <Typography variant='body1' align='center' gutterBottom paragraph>
          Con esta nueva fase de su historia,{' '}
          <strong>Margaret Art Store </strong>
          continúa su misión de acercar el arte a más personas, ofreciendo una
          experiencia única y accesible para los amantes del arte en todo el
          mundo. Su visión va más allá de las paredes físicas de una galería
          tradicional, buscando inspirar y conectar con audiencias diversas a
          través de la expresión artística.
        </Typography>
      </Container>

      <Container sx={{ mt: 15 }}>
        <Card>
          <Grid container mb={10}>
            <Grid item xs={12} md={4}>
              <CardMedia
                component='img'
                className='rounded-image'
                image='/margaritaruiz.jpg'
                alt='Margarita Ruiz'
                sx={{
                  objectFit: 'cover',
                  borderRadius: 10,
                  height: '100%', // Ajusta la altura según tu preferencia
                }}
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <CardContent
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center', // Centra el contenido verticalmente
                  height: '100%', // Ajusta la altura según tu preferencia
                }}
              >
                <Typography variant='body1' gutterBottom>
                  Soy una artista autodidacta y cada día doy gracias por este
                  don.
                </Typography>
                <Typography variant='body1' gutterBottom>
                  En mis obras, busco capturar la esencia dinámica del
                  movimiento, jugar con la luz y explorar la diversidad del
                  color. Mi enfoque se centra en acercarme a la belleza natural
                  de una manera única, utilizando la creatividad para expresar
                  la riqueza de nuestro entorno.
                </Typography>
                <Typography variant='body1' gutterBottom>
                  Pintar para mí, es como hablar sin palabras, y de esta manera
                  voy escribiendo las letras en mi lienzo, formando  así
                  <strong> “LAS PALABRAS DE MI ALMA”</strong>
                </Typography>
                <Typography variant='h6' alignItems='end' gutterBottom>
                  <strong>Margarita Ruiz</strong>
                </Typography>
              </CardContent>
            </Grid>
          </Grid>
        </Card>
      </Container>
      <Footer />
    </>
  );
};

export default AboutPage;
