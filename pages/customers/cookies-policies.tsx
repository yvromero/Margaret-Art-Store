import { Box, Typography } from '@mui/material';
import { ShopLayout } from '@/components/layouts';

const CookiesPage = () => {
  return (
    <ShopLayout
      title='Política de cookies'
      pageDescription='Política de cookies de Margaret Art Store'
    >
      <Box
        display='flex'
        justifyContent='center'
        sx={{ display: 'flex', flexDirection: 'column', margin: '2rem' }}
      >
        <Typography
          variant='body1'
          sx={{ fontWeight: 'bold', marginBottom: '1rem' }}
        >
          POLÍTICA DE COOKIES
        </Typography>
        <Typography variant='body1' sx={{ fontWeight: 'bold' }}>
          Definición y función de la cookies
        </Typography>
        <p>
          ¿Qué son las cookies? Una cookie es un fichero que se descarga en su
          ordenador al acceder a determinadas páginas web. Las cookies permiten
          a una página web, entre otras cosas, almacenar y recuperar información
          sobre los hábitos de navegación de un usuario o de su equipo y,
          dependiendo de la información que contengan y de la forma en que
          utilice su equipo, pueden utilizarse para reconocer al usuario.
        </p>
        <Typography variant='body1' sx={{ fontWeight: 'bold' }}>
          ¿Qué tipos de cookies utiliza esta página web?
        </Typography>
        <ul>
          <li>
            <strong>Cookies de sesión-autenticación:</strong> Es una cookie
            especial que generalmente se almacena en el lado del cliente
            (navegador del usuario) y contiene información sobre la sesión
            actual del usuario, como su identificación y otros detalles
            relacionados con la autenticación. Esta cookie de sesión es segura y
            cifrada para garantizar la integridad y la seguridad de la
            información almacenada.
          </li>
          <li>
            <strong>Cookies temporales:</strong> Una cookie de sesión es una
            cookie temporal que se almacena en el navegador del usuario durante
            la duración de su sesión en el sitio web. Esta cookie contiene
            información específica de la sesión, como datos del carrito de
            compras o la identificación del usuario autenticado. Cuando el
            usuario cierra el navegador o termina la sesión, la cookie de sesión
            se elimina automáticamente.
          </li>
        </ul>
        <Typography variant='body1' sx={{ fontWeight: 'bold' }}>
          Revocación y eliminación de cookies
        </Typography>
        Usted puede permitir, bloquear o eliminar las cookies instaladas en su
        equipo mediante la configuración de las opciones del navegador instalado
        en su ordenador. En caso de que no permita la instalación de cookies en
        su navegador, es posible que no pueda acceder a algunas de las secciones
        de nuestra web. Para obtener más información sobre cómo bloquear el uso
        de cookies, puede visitar las diferentes páginas de ayuda de los
        navegadores:
        <ul>
          <li>
            Firefox desde{' '}
            <a
              href='https://support.mozilla.org/t5/Cookies-y-cach%C3%A9/Borrar-cookies/ta-p/16541'
              target='_blank'
            >
              https://support.mozilla.org/t5/Cookies-y-caché/Borrar-cookies/ta-p/16541
            </a>
          </li>
          <li>
            Chrome desde{' '}
            <a
              href='https://support.google.com/chrome/answer/95647?hl=es'
              target='_blank'
            >
              https://support.google.com/chrome/answer/95647?hl=es
            </a>
          </li>
          <li>
            Internet Explorer desde{' '}
            <a
              href='https://support.microsoft.com/es-es/help/17442/windows-internet-explorer-delete-manage-cookies'
              target='_blank'
            >
              https://support.microsoft.com/es-es/help/17442/windows-internet-explorer-delete-manage-cookies
            </a>
          </li>
          <li>
            Safari desde{' '}
            <a
              href='https://support.apple.com/es-es/guide/safari/sfri11471/mac'
              target='_blank'
            >
              https://support.apple.com/es-es/guide/safari/sfri11471/mac
            </a>
          </li>
          <li>
            Opera desde{' '}
            <a href='https://www.opera.com/es/privacy' target='_blank'>
              https://www.opera.com/es/privacy
            </a>
          </li>
        </ul>
        <Typography variant='body1' sx={{ fontWeight: 'bold' }}>
          Terceros prestadores de servicios
        </Typography>
        <p>
          <strong>Proveedores OAuth, como Google o GitHub:</strong> Estas
          cookies son cruciales para proporcionar una experiencia de usuario
          coherente y segura en aplicaciones web autenticadas.
        </p>
        <ul>
          <li>
            <strong>Google Auth:</strong> Cookies de autenticación
            <p>
              <strong>Finalidad de la cookie:</strong> Facilitar la
              interconexión entre los usuarios que utilicen Google y Margaret
              Art si lo desean
            </p>
          </li>

          <li>
            <strong>GitHub Auth:</strong> Cookies de autenticación
            <p>
              <strong>Finalidad de la cookie:</strong> Facilitar la
              interconexión entre los usuarios que utilicen GitHub y Margaret
              Art si lo desean
            </p>
          </li>

          <li>
            <strong>Next Auth:</strong> Cookies de sesión
            <p>
              <strong>Finalidad de la cookie:</strong> Se utiliza para almacenar
              el token de sesión y otra información relevante para la
              autenticación. Esta cookie de sesión es segura y cifrada para
              garantizar la integridad y la seguridad de la información
              almacenada.
            </p>
          </li>
        </ul>
      </Box>
    </ShopLayout>
  );
};

export default CookiesPage;
